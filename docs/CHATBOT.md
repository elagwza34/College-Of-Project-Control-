# Programme assistant

The English-language assistant answers programme, funding and eligibility questions using approved sources and directs visitors to the existing `/book-a-session` consultation form. It does not create an appointment or submit the form for the visitor.

## Enable the API

Add these server environment values (locally, `backend/.env`):

```dotenv
OPENAI_API_KEY=your-key-here
OPENAI_MODEL=gpt-4.1-mini
CHATBOT_ENABLED=true
CHATBOT_HOURLY_LIMIT=20
CHATBOT_DAILY_LIMIT=500
```

Restart Django after changing them. Run local commands with `python run_local.py ...` so `.env` is loaded. Production must inject these environment variables into the Django process. Never put the key in frontend files, a `VITE_` variable, or a dashboard source.

For OpenRouter instead of a direct OpenAI account, use:

```dotenv
CHATBOT_PROVIDER=openrouter
OPENROUTER_API_KEY=your-openrouter-key
OPENROUTER_MODEL=openai/gpt-4.1-mini
```

The same Responses payload is sent to OpenRouter's `/api/v1/responses` endpoint. Messages and retrieved excerpts are then processed by OpenRouter and its selected model provider. Their account and retention settings apply. The server accepts only the two fixed provider endpoints, not arbitrary API URLs.

The application uses OpenAI's [Responses API and structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs), a bounded output, and `store: false`. Change `OPENAI_MODEL` to a model that supports this API/schema. Setting a key does not verify billing or model access: test a real question after enabling it. Provider retention is governed by your OpenAI account's data settings; `store: false` is not a promise of zero provider retention.

## Setup

```powershell
cd backend
python -m pip install -r requirements.txt
python run_local.py migrate
python run_local.py import_chatbot_website
```

The committed `backend/apps/chatbot/website_knowledge.json` contains exported public website content. Importing again adds missing sources without overwriting staff edits. Inspect the sources in `/dashboard/chatbot` before going live.

## Add or maintain knowledge

Open **Dashboard → Programme assistant**:

- Add a question as the title and the approved answer as its content.
- Upload PDF, DOCX, TXT or Markdown (up to 5 MB). The server extracts text and saves a **draft**; it does not retain or publish the original binary file. PDFs must contain readable text, not scanned images; up to 100 pages and 80,000 extracted characters per source.
- Review the extracted text, tick **Active**, then save. Information in an active source can be repeated publicly by the assistant; do not use learner records or internal-only documents.
- Add an optional public website path for a clickable source reference. Documents without a public path are cited by title.
- Deactivate outdated content and save to exclude it immediately.

Website content is a **snapshot**, not a live crawler. After editing programme copy, start the frontend and refresh it:

```powershell
cd frontend
npm.cmd run chatbot:export
# Review the generated website_knowledge.json diff.
cd ../backend
python run_local.py import_chatbot_website --replace
```

The exporter requires Chrome/Chromium; set `CHROME_PATH` if necessary. It reads allowlisted public routes from `http://localhost:3000` (`CHATBOT_SITE_ORIGIN` can override this). `--replace` overwrites website-source text, preserves activation states and leaves custom documents/Q&A untouched. Retired sources must be deactivated in the dashboard.

## Behaviour and operation

- Retrieval uses local keyword ranking with limited chunks, followed by an AI response using those chunks. It supports short follow-ups using recent user turns. No embeddings, file uploads to OpenAI, tool execution or general web browsing are performed.
- The model is instructed to stay within programme guidance, treat source text as data, cite evidence and defer individual funding/eligibility decisions to the College. Unknown or uncited responses lead to a consultation handoff. These measures reduce unsupported answers; review sample conversations before launch.
- Messages are kept only in browser page memory. The application does not persist chat transcripts. Recent messages and selected source excerpts are sent to OpenAI for an answer. Standard infrastructure/provider logs have their own retention policies.
- Database-backed hourly client limits and a daily global cap limit request counts across workers. No raw IP is stored. Configure your trusted reverse proxy to set `REMOTE_ADDR` correctly; arbitrary forwarded headers are deliberately ignored. Set an OpenAI account spend limit as well, since request counts do not measure token spend. Expired counters are removed on subsequent requests.
- If the key is absent, the feature is disabled, or the provider fails, the visitor sees an unavailable/retry message and can still request a consultation. It does not show fabricated AI replies.
- The assistant launcher moves above the sticky programme CTA. It is outside the global CTA styling and is not displayed inside the dashboard.

## Verification

```powershell
cd backend
python manage.py test apps.chatbot --settings=config.settings.test
cd ../frontend
npm.cmd run type-check
npm.cmd run lint
npm.cmd run build
npm.cmd run test:chatbot:browser
```

Backend tests use a temporary SQLite database and mocked provider responses; browser tests use mocked assistant replies to test the UI without paid API calls. A real provider test remains necessary after adding the key.
