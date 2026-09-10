# Content backend

Django provides the private content dashboard and a versioned read-only public API.

## Local setup

When `backend/.env` contains the configured database/settings, use the local
launcher so the server connects to that database (ordinary `manage.py` does not
load `.env` automatically):

```powershell
cd backend
python run_local.py runserver 127.0.0.1:8000
```

The Vite frontend forwards `/api` and `/media` to this server. A `502` response
usually means it is stopped. Missing database migrations require applying
`python run_local.py migrate` to the configured database with its owner's approval.
The launcher never applies migrations automatically.

```powershell
cd backend
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Open `http://127.0.0.1:8000/admin/` and sign in with the superuser account.

## Content workflow

1. Edit **Site settings** for the brand, header call-to-action and footer content.
2. Create **Navigation menus** for header, footer and legal links.
3. Create a **Page** with a unique slug.
4. Add and order **Page sections** inside the page.
5. Keep the page as Draft while editing, then change it to Published.
6. The frontend requests `/api/v1/pages/{slug}/` and renders its ordered sections.
