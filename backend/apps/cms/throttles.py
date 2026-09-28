from rest_framework.throttling import SimpleRateThrottle


class RemoteAddressThrottle(SimpleRateThrottle):
    """Rate limit keyed on the connected IP.

    Rates are never hard coded here: each scope resolves through
    ``REST_FRAMEWORK['DEFAULT_THROTTLE_RATES']`` so an operator can retune a
    limit from the environment without shipping code.
    """

    def get_cache_key(self, request, view):
        # A trusted reverse proxy must set REMOTE_ADDR. Never trust client-supplied XFF.
        return self.cache_format % {'scope': self.scope, 'ident': request.META.get('REMOTE_ADDR', 'unknown')}


class LoginThrottle(RemoteAddressThrottle):
    scope = 'dashboard-login'


class PasswordResetThrottle(RemoteAddressThrottle):
    scope = 'dashboard-password-reset'


class EnquiryThrottle(RemoteAddressThrottle):
    scope = 'enquiry-submission'


class MaintenanceAccessThrottle(RemoteAddressThrottle):
    """The maintenance code is six digits, so guessing must be rate limited."""

    scope = 'maintenance-access'


class MaintenanceStatusThrottle(RemoteAddressThrottle):
    scope = 'maintenance-status'


class PublicListThrottle(RemoteAddressThrottle):
    """Guards the public collection endpoints against scraping loops."""

    scope = 'public-list'
