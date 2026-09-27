# Security review — 2026-09-16

## Scope and conclusion

Reviewed the Django/DRF API and React dashboard, authentication and permissions,
public submissions, upload/document handlers, Eventbrite requests/webhooks,
CMS preview messages, production settings, and installed application dependencies.
This is a source review and local automated verification, not a penetration test
of the deployed service or a guarantee that no vulnerabilities remain. Historical
Git objects and the archived WordPress plugin under `docs/plugin-review` were not
audited as part of the running application.

## Findings addressed

| Finding | Change |
| --- | --- |
| CMS login allowed unlimited password attempts | Limit to 10 requests per minute per remote address; return HTTP 429. Client-supplied forwarded headers cannot reset the key. |
| Login issued tokens to nonstaff accounts | Require active staff before issuing a dashboard token. Existing API staff checks remain enforced. |
| Tokens never expired and logout only cleared browser storage | Enforce a 12-hour maximum lifetime; add server-side token revocation and wait for it before completing logout. Failed revocation is visible to the user. |
| Public enquiries had no request limit; explicitly declared fields lost model length limits | Limit submissions to 5 per hour per remote address, restore field lengths, and cap messages at 10,000 characters. |
| Existing testimonial/webhook throttles trusted arbitrary forwarded headers by default | Set DRF `NUM_PROXIES=0`; use the connection address. |
| Installed backend libraries had known advisories | Raise supported minimum versions in `backend/requirements.txt`; test upgraded dependencies in an isolated directory. |

The initial Python audit reported **47 advisories across 4 packages**:

| Installed package | Initial version | Advisory count | Required minimum after review |
| --- | --- | --- | --- |
| Django | 5.2.16 | 1 | 5.2.17 |
| djangorestframework | 3.17.1 | 2 | 3.17.2 |
| Pillow | 11.3.0 | 35 | 12.3.0 |
| sqlparse | 0.5.5 | 9 | 0.6.0 |

An advisory count is not a count of demonstrated exploits in this application.
For example, the Django advisory concerns GeoDjango, which this project does not
enable. Update nevertheless to avoid retaining known vulnerable dependencies.

## Remaining deployment work and limitations

1. **Install the updated requirements into the actual backend runtime and restart
   it.** The machine's shared Python installation and production deployment were
   not modified. The verification installation lives under the ignored
   `frontend/.cache/backend-verified` directory.
2. **Protect `/admin/login/` at the reverse proxy or identity layer.** The CMS API
   limiter does not cover Django's separate admin login. Restrict administrative
   access and apply shared login rate limits/MFA where available.
3. **Use shared rate limiting for production.** Default Django local-memory cache
   is per process, resets on restart, and DRF throttles are not atomic. Configure
   shared caching and upstream limits; application throttles alone are not a
   brute-force or denial-of-service guarantee. Ensure the trusted proxy sets
   `REMOTE_ADDR` correctly; behind an unconfigured proxy all clients share a key.
4. **Browser token storage remains JavaScript-readable.** A same-origin XSS could
   steal the token from localStorage during its lifetime. An HttpOnly cookie/CSRF
   migration and a tested Content Security Policy remain separate hardening work.
   The DRF token model uses one token per account, so logout revokes other browser
   sessions sharing that account's token as well.
5. **Serve uploads safely.** Enforce request size/time limits at the proxy, serve
   public media from a separate non-executable origin, and keep private uploads
   inaccessible except through the permission-checked API. Actual hosting,
   HTTPS/proxy headers, media routing, secrets and database access were not tested.
6. Requirements remain version ranges rather than a hash-locked deployment set.
   Repeat dependency auditing for each deployment's resolved environment.

Existing protections observed: staff-only CMS permissions; session CSRF checks;
published-only public content; private pending testimonial photos; bounded and
re-encoded testimonial uploads; constrained Eventbrite API paths and disabled
redirects; encrypted integration tokens; same-origin/source checks on preview
messages; HTTPS/cookie/HSTS settings in production configuration. These findings
do not assert complete coverage of all possible attack paths.

## Dashboard change

Removed Content Ownership from the sidebar, overview and router. Its old URLs
fall through to the existing dashboard redirect. The unreferenced component file
was retained because it contained pre-existing user edits; it is no longer loaded
or shipped by the dashboard build.

## Verification

- `npm audit --json`: 0 known vulnerabilities (263 dependency entries).
- Backend suite: 66 tests passed both before and after the dependency upgrade, including new
  real-token permission, expiry, revocation, throttling and oversized input tests.
- TypeScript, ESLint and the production frontend build passed.
- Django `check --deploy` passed with synthetic production environment values;
  this did not validate live deployment settings or connect to the live database.
- Python dependency audit covers installed direct dependencies and their active
  transitive dependencies, including `psycopg[binary]`, on this Windows runtime.
- Final `pip-audit`: **0 known vulnerabilities across 13 upgraded backend
  dependencies**. Verified versions: Django 5.2.17, DRF 3.18.1, Pillow 12.3.0,
  sqlparse 0.6.0, psycopg/psycopg-binary 3.3.5, django-cors-headers 4.9.0,
  cryptography 50.0.1, pypdf 6.18.1, asgiref 3.12.1, cffi 2.1.1,
  pycparser 3.0 and tzdata 2026.4. Audit results are point-in-time findings.

Implementation references: [DRF authentication](https://www.django-rest-framework.org/api-guide/authentication/)
and [DRF throttling and its limitations](https://www.django-rest-framework.org/api-guide/throttling/).
