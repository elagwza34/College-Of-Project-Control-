# Content backend

Django provides the private content dashboard and a versioned read-only public API.

## Local setup

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

