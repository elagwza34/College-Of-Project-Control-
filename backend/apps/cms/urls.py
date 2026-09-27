from .page_content import content_catalogue, section_content
from django.urls import include, path
from .auth import DashboardLogin, dashboard_logout, request_password_reset, confirm_password_reset
from rest_framework.routers import DefaultRouter

from . import views
from apps.chatbot.views import KnowledgeSourceViewSet, assistant_settings, dashboard_status
from apps.content.ipc import IpcImageViewSet
from apps.content.articles import ArticleViewSet
from apps.content.case_studies import CaseStudyViewSet
from apps.content import views as content_views
from apps.content import events
from apps.content.testimonials import TestimonialViewSet

router = DefaultRouter()
router.register('chatbot/sources', KnowledgeSourceViewSet, basename='cms-chatbot-source')
router.register('testimonials', TestimonialViewSet, basename='cms-testimonial')
router.register("articles", ArticleViewSet, basename="cms-article")
router.register("case-studies", CaseStudyViewSet, basename="cms-case-study")
router.register("ipc-images", IpcImageViewSet, basename="cms-ipc-image")
router.register("pages", views.PageViewSet, basename="cms-page")
router.register("sections", views.SectionViewSet, basename="cms-section")
router.register("navigation-groups", views.NavigationGroupViewSet, basename="cms-navigation-group")
router.register("navigation-items", views.NavigationItemViewSet, basename="cms-navigation-item")
router.register("media", views.MediaAssetViewSet, basename="cms-media")
router.register("mentors", views.MentorViewSet, basename="cms-mentor")
router.register("coaches", views.CoachViewSet, basename="cms-coach")
router.register("partners", views.PartnerViewSet, basename="cms-partner")
router.register("professional-credentials", views.ProfessionalCredentialViewSet, basename="cms-professional-credential")
router.register("sectors", views.SectorViewSet, basename="cms-sector")
router.register("short-courses", views.ShortCourseViewSet, basename="cms-short-course")
router.register("events", events.EventViewSet, basename="cms-event")
router.register("event-categories", events.EventCategoryViewSet, basename="cms-event-category")
router.register("enquiries", views.EnquiryViewSet, basename="cms-enquiry")

urlpatterns = [
    path("page-content/", content_catalogue),
    path("page-content/<str:key>/", section_content),
    path('chatbot/status/', dashboard_status),
    path('chatbot/settings/', assistant_settings),
    path("maintenance/", content_views.cms_maintenance_settings),
    path("eventbrite/settings/", events.sync_settings),
    path("eventbrite/test/", events.test_connection),
    path("eventbrite/sync/", events.request_sync),
    path("eventbrite/jobs/", events.sync_jobs),
    path("eventbrite/jobs/<int:pk>/retry/", events.retry_sync),
    path("auth/login/", DashboardLogin.as_view(), name="cms-login"),
    path("auth/logout/", dashboard_logout, name="cms-logout"),
    path("auth/password-reset/", request_password_reset, name="cms-password-reset"),
    path("auth/password-reset/<str:uidb64>/<str:token>/", confirm_password_reset, name="cms-password-reset-confirm"),
    path("", include(router.urls)),
]
