"""Explicit live IPC smoke check; uses an existing staff token without logging it.

Creates one hidden test image, edits it and deletes that exact record in finally.
Run only when the configured database has been authorized for this verification.
"""
import json
import urllib.request

from run_local import load_local_environment


def main():
    load_local_environment()
    import django
    django.setup()
    from rest_framework.authtoken.models import Token

    token = Token.objects.filter(user__is_staff=True, user__is_active=True).first()
    if not token:
        raise RuntimeError("No existing staff session available for live verification.")
    base = "http://127.0.0.1:3001/api/v1/"

    def request(path, method="GET", payload=None, authenticated=True):
        headers = {"Content-Type": "application/json"}
        if authenticated:
            headers["Authorization"] = f"Token {token.key}"
        req = urllib.request.Request(base + path, method=method, headers=headers,
                                     data=json.dumps(payload).encode() if payload is not None else None)
        with urllib.request.urlopen(req, timeout=20) as response:
            data = response.read()
            return response.status, json.loads(data) if data else None

    status, images = request("cms/ipc-images/")
    assert status == 200 and isinstance(images, list)
    print(f"Authenticated dashboard list: HTTP {status}, {len(images)} images")
    record_id = None
    try:
        status, created = request("cms/ipc-images/", "POST", {
            "image_url": "https://example.com/ipc-runtime-check.png",
            "alt_text": "Temporary IPC runtime check", "order": 32767, "is_active": False,
        })
        record_id = created["id"]
        assert status == 201
        print("Add image by URL: HTTP 201 (hidden test record)")
        status, updated = request(f"cms/ipc-images/{record_id}/", "PATCH", {
            "alt_text": "Temporary IPC runtime check updated", "order": 32766,
        })
        assert status == 200 and updated["order"] == 32766
        print("Edit image: HTTP 200")
        status, public = request("ipc-images/", authenticated=False)
        assert status == 200 and all(item["id"] != record_id for item in public)
        print(f"Public gallery: HTTP 200, {len(public)} visible images; hidden record excluded")
    finally:
        if record_id is not None:
            status, _ = request(f"cms/ipc-images/{record_id}/", "DELETE")
            assert status == 204
            print("Delete test image: HTTP 204")
    _, final = request("cms/ipc-images/")
    assert {item["id"] for item in final} == {item["id"] for item in images}
    print("Verified: no test image remains; original image collection preserved.")


if __name__ == "__main__":
    main()
