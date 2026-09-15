from rest_framework import viewsets
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.db.models import Q
from django.utils import timezone

from apps.content.models import Coach, Enquiry, Event, MentorProfile, Partner, ProfessionalCredential, Sector

from .models import MediaAsset, NavigationGroup, NavigationItem, Page, Section
from .permissions import IsDashboardUser
from .serializers import (
    DashboardCoachSerializer,
    DashboardEnquirySerializer,
    DashboardEventSerializer,
    DashboardMentorSerializer,
    DashboardPartnerSerializer,
    DashboardProfessionalCredentialSerializer,
    DashboardSectorSerializer,
    MediaAssetSerializer,
    NavigationGroupSerializer,
    NavigationItemSerializer,
    PageSerializer,
    SectionSerializer,
)


class PageViewSet(viewsets.ModelViewSet):
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    permission_classes = [IsDashboardUser]
    lookup_field = "pk"

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        lookup = self.kwargs.get(self.lookup_field)
        from rest_framework.generics import get_object_or_404
        if lookup.isdigit():
            return get_object_or_404(queryset, pk=int(lookup))
        return get_object_or_404(queryset, slug=lookup)


class SectionViewSet(viewsets.ModelViewSet):
    serializer_class = SectionSerializer
    permission_classes = [IsDashboardUser]

    def get_queryset(self):
        queryset = Section.objects.all()
        page_id = self.request.query_params.get("page")
        if page_id:
            queryset = queryset.filter(page_id=page_id)
        return queryset


class NavigationGroupViewSet(viewsets.ModelViewSet):
    queryset = NavigationGroup.objects.all()
    serializer_class = NavigationGroupSerializer
    permission_classes = [IsDashboardUser]


class NavigationItemViewSet(viewsets.ModelViewSet):
    serializer_class = NavigationItemSerializer
    permission_classes = [IsDashboardUser]

    def get_queryset(self):
        queryset = NavigationItem.objects.all()
        group_id = self.request.query_params.get("group")
        if group_id:
            queryset = queryset.filter(group_id=group_id)
        return queryset


class MediaAssetViewSet(viewsets.ModelViewSet):
    queryset = MediaAsset.objects.all()
    serializer_class = MediaAssetSerializer
    permission_classes = [IsDashboardUser]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)


class MentorViewSet(viewsets.ModelViewSet):
    queryset = MentorProfile.objects.all()
    serializer_class = DashboardMentorSerializer
    permission_classes = [IsDashboardUser]
    parser_classes = [MultiPartParser, FormParser, JSONParser]


class CoachViewSet(viewsets.ModelViewSet):
    queryset = Coach.objects.all()
    serializer_class = DashboardCoachSerializer
    permission_classes = [IsDashboardUser]
    parser_classes = [MultiPartParser, FormParser, JSONParser]


class PartnerViewSet(viewsets.ModelViewSet):
    queryset = Partner.objects.all()
    serializer_class = DashboardPartnerSerializer
    permission_classes = [IsDashboardUser]
    parser_classes = [MultiPartParser, FormParser, JSONParser]


class ProfessionalCredentialViewSet(viewsets.ModelViewSet):
    queryset = ProfessionalCredential.objects.all()
    serializer_class = DashboardProfessionalCredentialSerializer
    permission_classes = [IsDashboardUser]
    parser_classes = [MultiPartParser, FormParser, JSONParser]


class SectorViewSet(viewsets.ModelViewSet):
    queryset = Sector.objects.all()
    serializer_class = DashboardSectorSerializer
    permission_classes = [IsDashboardUser]
    parser_classes = [MultiPartParser, FormParser, JSONParser]


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = DashboardEventSerializer
    permission_classes = [IsDashboardUser]


class EnquiryViewSet(viewsets.ModelViewSet):
    queryset = Enquiry.objects.all()
    serializer_class = DashboardEnquirySerializer
    permission_classes = [IsDashboardUser]
    http_method_names = ["get", "patch", "post", "head", "options"]

    def create(self, request, *args, **kwargs):
        from rest_framework.exceptions import MethodNotAllowed
        raise MethodNotAllowed('POST')

    def get_queryset(self):
        qs = Enquiry.objects.select_related('assigned_to').all()
        if self.action != 'list':
            return qs
        query = self.request.query_params
        if query.get('search'):
            term = query['search'][:200]
            qs = qs.filter(Q(name__icontains=term) | Q(email__icontains=term) | Q(organisation__icontains=term) | Q(message__icontains=term))
        if query.get('status'):
            qs = qs.filter(status=query['status'])
        if query.get('unread') == 'true':
            qs = qs.filter(read_at__isnull=True)
        if query.get('due') == 'true':
            qs = qs.filter(follow_up_at__lte=timezone.now()).exclude(status='closed')
        return qs

    @action(detail=False, methods=['get'])
    def notifications(self, request):
        qs = Enquiry.objects.filter(read_at__isnull=True)
        return Response({'unread_count': qs.count(), 'latest': list(qs.values('id', 'name', 'enquiry_type', 'created_at')[:5])})

    @action(detail=True, methods=['post'])
    def read(self, request, pk=None):
        obj = self.get_object()
        Enquiry.objects.filter(pk=obj.pk, read_at__isnull=True).update(read_at=timezone.now())
        obj.refresh_from_db()
        return Response(self.get_serializer(obj).data)

    @action(detail=False, methods=['get'])
    def team(self, request):
        return Response(list(get_user_model().objects.filter(is_staff=True, is_active=True).values('id', 'username')))


# Enquiry read state is separate from the admissions follow-up status.
