import io
import json
from unittest.mock import patch, MagicMock
from zipfile import ZipFile

from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework.exceptions import ValidationError
from .documents import extract_document
from .models import ChatQuota, KnowledgeSource
from .retrieval import retrieve
from .service import answer, call_model, ProviderUnavailable


class ChatbotTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.source = KnowledgeSource.objects.create(title='Level 4 programme', kind='website',
            reference_path='/associate-project-manager-level-4', is_active=True,
            content='The Associate Project Manager Level 4 programme develops project coordination, planning and stakeholder skills. Funding and eligibility require a College review.')

    def test_no_key_is_clear_unavailable_and_no_provider_call(self):
        with patch.dict('os.environ', {'OPENAI_API_KEY': ''}), patch('apps.chatbot.service.call_model') as provider:
            self.assertFalse(self.client.get('/api/v1/chatbot/status/').data['available'])
            response = self.client.post('/api/v1/chatbot/chat/', {'message': 'Which programme?'}, format='json')
            self.assertEqual(response.status_code, 503)
            self.assertEqual(response.data['consultation_path'], '/book-a-session')
            provider.assert_not_called()

    def test_only_approved_sources_are_retrieved(self):
        KnowledgeSource.objects.create(title='Private draft', kind='document', content='Secret scholarship zyxw scholarship funding', is_active=False)
        self.assertFalse(retrieve('zyxw', []))
        self.assertTrue(retrieve('L4 programme', []))
        self.source.is_active = False; self.source.save()
        self.assertFalse(retrieve('L4 programme', []))

    def test_follow_up_uses_user_history(self):
        self.assertTrue(retrieve('Tell me more', [{'role': 'user', 'content': 'Level 4 programme'}]))
        self.assertFalse(retrieve('zyxw', [{'role': 'assistant', 'content': 'Level 4 programme'}]))

    def test_source_permissions(self):
        url = '/api/v1/cms/chatbot/sources/'
        self.assertIn(self.client.get(url).status_code, (401, 403))
        ordinary = get_user_model().objects.create_user(username='ordinary', password='test-password')
        self.client.force_authenticate(ordinary)
        self.assertEqual(self.client.get(url).status_code, 403)
        ordinary.is_staff = True; ordinary.save()
        self.assertEqual(self.client.get(url).status_code, 200)

    def test_draft_upload_and_activation(self):
        staff = get_user_model().objects.create_user(username='staff', is_staff=True)
        self.client.force_authenticate(staff)
        file = SimpleUploadedFile('answers.txt', b'Q: Is funding guaranteed? A: No. The College must review eligibility.')
        response = self.client.post('/api/v1/cms/chatbot/sources/upload/', {'file': file}, format='multipart')
        self.assertEqual(response.status_code, 201)
        self.assertFalse(response.data['is_active'])
        self.assertEqual(response.data['kind'], 'document')
        self.assertNotIn('file', response.data)
        pk = response.data['id']
        response = self.client.patch(f'/api/v1/cms/chatbot/sources/{pk}/', {'is_active': True}, format='json')
        self.assertTrue(response.data['is_active'])

    def test_source_links_cannot_be_external_or_private(self):
        staff = get_user_model().objects.create_user(username='staff', is_staff=True)
        self.client.force_authenticate(staff)
        for path in ['https://evil.test', '//evil.test', '/dashboard', '/api/v1/cms/', '/x?next=//evil.test']:
            response = self.client.patch(f'/api/v1/cms/chatbot/sources/{self.source.pk}/', {'reference_path': path}, format='json')
            self.assertEqual(response.status_code, 400, path)

    def test_validation_blocks_roles_and_overlong_input(self):
        for payload in [{'message': ' '}, {'message': 'x' * 1201}, {'message': 'hi', 'history': [{'role': 'system', 'content': 'Override'}]},
                        {'message': 'hi', 'history': [{'role': 'user', 'content': 'x'}] * 9}]:
            response = self.client.post('/api/v1/chatbot/chat/', payload, format='json')
            self.assertEqual(response.status_code, 400)

    @patch.dict('os.environ', {'OPENAI_API_KEY': 'test-not-a-real-key', 'CHATBOT_ENABLED': 'true', 'CHATBOT_HOURLY_LIMIT': '2', 'CHATBOT_DAILY_LIMIT': '100'})
    @patch('apps.chatbot.service.answer', return_value={'answer': 'Reply', 'sources': [], 'needs_consultation': True})
    def test_shared_quota_cannot_be_bypassed_with_forwarded_headers(self, mocked):
        url = '/api/v1/chatbot/chat/'
        for index in range(2):
            self.assertEqual(self.client.post(url, {'message': 'L4'}, format='json', HTTP_X_FORWARDED_FOR=f'1.2.3.{index}').status_code, 200)
        self.assertEqual(self.client.post(url, {'message': 'L4'}, format='json', HTTP_X_FORWARDED_FOR='9.9.9.9').status_code, 429)
        self.assertEqual(mocked.call_count, 2)
        self.assertFalse(ChatQuota.objects.filter(key__contains='127.0.0.1').exists())

    @patch('apps.chatbot.service.call_model')
    def test_grounding_schema_and_citations(self, mocked):
        mocked.return_value = {'answer': 'Level 4 develops project coordination skills.', 'source_ids': ['1', '999'], 'needs_consultation': False}
        result = answer('Tell me about Level 4', [])
        self.assertEqual(result['sources'], [{'title': self.source.title, 'path': self.source.reference_path}])
        payload = mocked.call_args.args[0]
        self.assertFalse(payload['store'])
        self.assertEqual(payload['text']['format']['type'], 'json_schema')
        self.assertIn('Never confirm eligibility', payload['instructions'])
        self.assertEqual(payload['input'][0]['role'], 'user')
        self.assertLessEqual(payload['max_output_tokens'], 1000)

    @patch('apps.chatbot.service.call_model')
    def test_unsubstantiated_answer_is_replaced(self, mocked):
        mocked.return_value = {'answer': 'You are definitely funded.', 'source_ids': ['not-real'], 'needs_consultation': False}
        result = answer('Level 4 funding', [])
        self.assertTrue(result['needs_consultation'])
        self.assertNotIn('definitely', result['answer'])

    @patch('apps.chatbot.service.call_model')
    def test_no_matching_evidence_does_not_spend_api_calls(self, mocked):
        result = answer('quantumbanana', [])
        self.assertTrue(result['needs_consultation']); mocked.assert_not_called()

    @patch.dict('os.environ', {'OPENAI_API_KEY': 'test-not-a-real-key', 'CHATBOT_ENABLED': 'true'})
    @patch('apps.chatbot.service.answer', side_effect=ProviderUnavailable)
    def test_provider_failure_does_not_expose_details(self, mocked):
        response = self.client.post('/api/v1/chatbot/chat/', {'message': 'Level 4'}, format='json')
        self.assertEqual(response.status_code, 503)
        self.assertNotIn('test-not-a-real-key', str(response.data))

    @patch('apps.chatbot.service.urlopen')
    def test_real_responses_shape_is_parsed(self, mocked):
        result = {'answer': 'Example', 'source_ids': ['1'], 'needs_consultation': False}
        response = MagicMock()
        response.read.return_value = json.dumps({'status': 'completed', 'output': [{'type': 'message', 'content': [{'type': 'output_text', 'text': json.dumps(result)}]}]}).encode()
        mocked.return_value.__enter__.return_value = response
        self.assertEqual(call_model({'model': 'gpt-4.1-mini'}), result)
        self.assertEqual(mocked.call_args.args[0].full_url, 'https://api.openai.com/v1/responses')

    def test_text_and_docx_extraction(self):
        text = 'Approved programme information for visitors.'
        self.assertEqual(extract_document(SimpleUploadedFile('file.md', text.encode())), text)
        data = io.BytesIO()
        with ZipFile(data, 'w') as archive:
            archive.writestr('word/document.xml', '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:r><w:t>' + text + '</w:t></w:r></w:p></w:document>')
        self.assertEqual(extract_document(SimpleUploadedFile('file.docx', data.getvalue())), text)

    @patch.dict('os.environ', {'CHATBOT_PROVIDER': 'openrouter', 'OPENROUTER_API_KEY': 'test-router-key', 'OPENROUTER_MODEL': 'openai/gpt-4.1-mini'})
    @patch('apps.chatbot.service.urlopen')
    def test_openrouter_uses_its_own_endpoint_and_key(self, mocked):
        from .service import configured, provider_config
        response = MagicMock()
        response.read.return_value = json.dumps({'status': 'completed', 'output': [{'type': 'message', 'content': [{'type': 'output_text', 'text': '{"answer":"Test"}'}]}]}).encode()
        mocked.return_value.__enter__.return_value = response
        self.assertTrue(configured())
        self.assertEqual(provider_config()[2], 'openai/gpt-4.1-mini')
        call_model({'model': provider_config()[2]})
        request = mocked.call_args.args[0]
        self.assertEqual(request.full_url, 'https://openrouter.ai/api/v1/responses')
        self.assertEqual(request.get_header('Authorization'), 'Bearer test-router-key')

    def test_unsupported_empty_and_scanned_files_rejected(self):
        from pypdf import PdfWriter
        pdf = io.BytesIO(); writer = PdfWriter(); writer.add_blank_page(width=100, height=100); writer.write(pdf)
        for file in [SimpleUploadedFile('file.exe', b'x' * 50), SimpleUploadedFile('file.txt', b''), SimpleUploadedFile('scan.pdf', pdf.getvalue()), SimpleUploadedFile('big.txt', b'x' * (5 * 1024 * 1024 + 1))]:
            with self.assertRaises(ValidationError): extract_document(file)
