# College of Project Control

The current phase focuses on the React interface and design system. Product pages will be added incrementally, followed by the Django REST API and PostgreSQL/Neon integration.

## Run the frontend

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

The approved primary colour is `#002F2C`, supported by the deeper `#001714`. The complete brand scale is defined in `frontend/src/styles/index.css`.

## Content dashboard

The independent `backend` directory contains the Django content dashboard and REST API. See `docs/CMS.md` for the page, section, header and footer publishing workflow.

The English programme assistant is configured in [docs/CHATBOT.md](docs/CHATBOT.md). Manage its approved sources at `/dashboard/chatbot`; the API key belongs in the backend environment.

## Find a page section

Open `frontend/src/pages/<page>/components/` and choose the file named after the section's visible label. Each page includes a section guide. Start with the [page index](frontend/src/pages/README.md) or the [editing guide](docs/PAGE_COMPONENTS.md).
