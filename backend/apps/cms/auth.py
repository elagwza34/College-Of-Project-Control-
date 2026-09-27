from datetime import timedelta
import logging

from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.db import transaction
from django.db.models import Q
from django.utils.encoding import force_str
from django.utils import timezone
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import api_view, authentication_classes, permission_classes, throttle_classes
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .authentication import ExpiringTokenAuthentication
from .permissions import IsDashboardUser
from .throttles import LoginThrottle, PasswordResetThrottle


logger = logging.getLogger(__name__)


class DashboardLogin(ObtainAuthToken):
    throttle_classes = [LoginThrottle]

    def post(self, request, *args, **kwargs):
        username_or_email = str(request.data.get("username") or request.data.get("email") or "").strip()
        password = request.data.get("password")
        if not username_or_email or not isinstance(password, str):
            raise ValidationError({"non_field_errors": ["Unable to log in with provided credentials."]})

        matched_user = get_user_model().objects.filter(
            Q(username__iexact=username_or_email) | Q(email__iexact=username_or_email)
        ).order_by("pk").first()
        auth_username = matched_user.get_username() if matched_user else username_or_email
        user = authenticate(request=request, username=auth_username, password=password)
        if not user:
            raise ValidationError({"non_field_errors": ["Unable to log in with provided credentials."]})
        if not user.is_staff:
            raise ValidationError({'non_field_errors': ['Unable to log in with provided credentials.']})
        with transaction.atomic():
            get_user_model().objects.select_for_update().get(pk=user.pk)
            Token.objects.filter(user=user, created__lte=timezone.now() - timedelta(seconds=settings.CMS_TOKEN_MAX_AGE)).delete()
            token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, headers={'Cache-Control': 'no-store'})


@api_view(['POST'])
@authentication_classes([ExpiringTokenAuthentication])
@permission_classes([IsDashboardUser])
def dashboard_logout(request):
    request.auth.delete()
    return Response(status=204, headers={'Cache-Control': 'no-store'})


def password_reset_link(user):
    uid = urlsafe_base64_encode(str(user.pk).encode())
    token = default_token_generator.make_token(user)
    return f"{settings.DASHBOARD_PASSWORD_RESET_URL}/{uid}/{token}"


@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
@throttle_classes([PasswordResetThrottle])
def request_password_reset(request):
    email = str(request.data.get('email') or '').strip()[:254]
    response = {'detail': 'If an eligible account matches that email, a password-reset link has been sent.'}
    if not email:
        return Response(response)

    user = get_user_model().objects.filter(
        Q(email__iexact=email) | Q(username__iexact=email), is_staff=True, is_active=True
    ).order_by('pk').first()
    recipient = (user.email or user.username) if user else ''
    if not user or '@' not in recipient:
        return Response(response)

    try:
        link = password_reset_link(user)
        send_mail(
            subject='Reset your CPCM Dashboard password',
            message=(
                'We received a request to reset your CPCM Dashboard password.\n\n'
                f'Use this link within one hour:\n{link}\n\n'
                'If you did not request this, you can ignore this email.'
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[recipient],
            fail_silently=False,
        )
        if settings.DEBUG and settings.EMAIL_BACKEND in {
            "django.core.mail.backends.console.EmailBackend",
            "django.core.mail.backends.locmem.EmailBackend",
        }:
            response["reset_link"] = link
    except Exception:
        logger.exception('Dashboard password-reset email could not be sent.')
    return Response(response)


@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
@throttle_classes([PasswordResetThrottle])
def confirm_password_reset(request, uidb64, token):
    try:
        user_id = force_str(urlsafe_base64_decode(uidb64))
        user = get_user_model().objects.filter(pk=user_id, is_staff=True, is_active=True).first()
    except (TypeError, ValueError, OverflowError):
        user = None
    if not user or not default_token_generator.check_token(user, token):
        return Response({'detail': 'This password-reset link is invalid or has expired.'}, status=400)

    password = request.data.get('password')
    if not isinstance(password, str):
        raise ValidationError({'password': 'Enter a new password.'})
    try:
        validate_password(password, user)
    except ValidationError as error:
        raise ValidationError({'password': list(error.messages)})
    with transaction.atomic():
        user.set_password(password)
        user.save(update_fields=['password'])
        Token.objects.filter(user=user).delete()
    return Response({'detail': 'Your password has been reset. You can now sign in.'})
