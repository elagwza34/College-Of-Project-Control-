from django.urls import path

from . import views
from .ipc import ipc_images_list
from .articles import articles_list, article_detail
from . import events
from . import testimonials

urlpatterns = [
    path('testimonials/', testimonials.public_reviews),
    path('testimonials/programmes/', testimonials.catalogue),
    path('testimonials/submit/', testimonials.submit_review),
    path('testimonials/<int:pk>/photo/', testimonials.photo),
    path("articles/", articles_list, name="articles-list"),
    path("articles/<slug:slug>/", article_detail, name="article-detail"),
    path("ipc-images/", ipc_images_list, name="ipc-images-list"),
    path("site/", views.site_detail, name="site-detail"),
    path("navigation/", views.navigation, name="navigation"),
    path("pages/home/", views.homepage, name="homepage"),
    path("pages/<slug:slug>/", views.page_detail, name="page-detail"),
    path("mentors/", views.mentors_list, name="mentors-list"),
    path("mentors/<int:pk>/", views.mentor_detail, name="mentor-detail"),
    path("coaches/", views.coaches_list, name="coaches-list"),
    path("partners/", views.partners_list, name="partners-list"),
    path("professional-credentials/", views.professional_credentials_list, name="professional-credentials-list"),
    path("sectors/", views.sectors_list, name="sectors-list"),
    path("sectors/<slug:slug>/", views.sector_detail, name="sector-detail"),
    path("events/", events.legacy_events, name="events-list"),
    path("events/library/", events.event_library, name="event-library"),
    path("events/options/", events.event_options, name="event-options"),
    path("events/<slug:slug>/", events.event_detail, name="event-detail"),
    path("integrations/eventbrite/webhook/<str:secret>/", events.eventbrite_webhook, name="eventbrite-webhook"),
    path("enquiries/", views.create_enquiry, name="create-enquiry"),
]
