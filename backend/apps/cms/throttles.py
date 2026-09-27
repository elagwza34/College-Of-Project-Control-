from rest_framework.throttling import SimpleRateThrottle


class RemoteAddressThrottle(SimpleRateThrottle):
    def get_cache_key(self, request, view):
        # A trusted reverse proxy must set REMOTE_ADDR. Never trust client-supplied XFF.
        return self.cache_format % {'scope': self.scope, 'ident': request.META.get('REMOTE_ADDR', 'unknown')}


class LoginThrottle(RemoteAddressThrottle):
    scope = 'dashboard-login'
    rate = '10/min'


class PasswordResetThrottle(RemoteAddressThrottle):
    scope = 'dashboard-password-reset'
    rate = '5/hour'


class EnquiryThrottle(RemoteAddressThrottle):
    scope = 'enquiry-submission'
    rate = '5/hour'
