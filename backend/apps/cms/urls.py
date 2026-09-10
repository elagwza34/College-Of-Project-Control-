from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from . import views
from apps.content.ipc import IpcImageViewSet
from apps.content.articles import ArticleViewSet
from apps.content import events
from apps.content.testimonials import TestimonialViewSet

router = DefaultRouter()
router.register('testimonials', TestimonialViewSet, basename='cms-testimonial')
router.register("articles", ArticleViewSet, basename="cms-article")
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
router.register("events", events.EventViewSet, basename="cms-event")
router.register("event-categories", events.EventCategoryViewSet, basename="cms-event-category")
router.register("enquiries", views.EnquiryViewSet, basename="cms-enquiry")

urlpatterns = [
    path("eventbrite/settings/", events.sync_settings),
    path("eventbrite/test/", events.test_connection),
    path("eventbrite/sync/", events.request_sync),
    path("eventbrite/jobs/", events.sync_jobs),
    path("eventbrite/jobs/<int:pk>/retry/", events.retry_sync),
    path("auth/login/", obtain_auth_token, name="cms-login"),
    path("", include(router.urls)),
]
