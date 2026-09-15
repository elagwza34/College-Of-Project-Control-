from io import BytesIO
from pathlib import Path
from zipfile import ZipFile
from xml.etree import ElementTree
from rest_framework.exceptions import ValidationError

MAX_UPLOAD = 5 * 1024 * 1024
MAX_TEXT = 80000


def extract_document(upload):
    if upload.size > MAX_UPLOAD:
        raise ValidationError('Use a file smaller than 5 MB.')
    data = upload.read(MAX_UPLOAD + 1)
    if len(data) > MAX_UPLOAD:
        raise ValidationError('Use a file smaller than 5 MB.')
    suffix = Path(upload.name).suffix.lower()
    try:
        if suffix in {'.txt', '.md'}:
            text = data.decode('utf-8-sig')
        elif suffix == '.pdf':
            from pypdf import PdfReader
            reader = PdfReader(BytesIO(data))
            if reader.is_encrypted or len(reader.pages) > 100:
                raise ValidationError('Use an unencrypted PDF with at most 100 pages.')
            parts = []
            for page in reader.pages:
                parts.append(page.extract_text() or '')
                if sum(map(len, parts)) > MAX_TEXT:
                    raise ValidationError('Split this document into files of at most 80,000 characters.')
            text = '\n\n'.join(parts)
        elif suffix == '.docx':
            with ZipFile(BytesIO(data)) as archive:
                info = archive.getinfo('word/document.xml')
                if info.file_size > 2 * 1024 * 1024:
                    raise ValidationError('This Word document is too large to extract.')
                xml = archive.read(info)
                if b'<!DOCTYPE' in xml or b'<!ENTITY' in xml:
                    raise ValidationError('Unsupported Word document.')
                root = ElementTree.fromstring(xml)
                ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
                text = '\n'.join(''.join(p.itertext()) for p in root.findall('.//w:p', ns))
        else:
            raise ValidationError('Supported files: PDF, DOCX, TXT and Markdown.')
    except ValidationError:
        raise
    except Exception as exc:
        # No document contents or parser details are exposed in the response.
        raise ValidationError('Could not read this file. Try a text export instead.') from exc
    text = text.replace('\x00', '').strip()
    if len(text) < 20:
        raise ValidationError('No readable text found. Scanned PDFs need OCR before uploading.')
    if len(text) > MAX_TEXT:
        raise ValidationError('Split this document into files of at most 80,000 characters.')
    return text
