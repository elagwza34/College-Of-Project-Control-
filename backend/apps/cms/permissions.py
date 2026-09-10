from rest_framework.permissions import BasePermission


class IsDashboardUser(BasePermission):
    """Only staff accounts may use the dashboard API."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)
