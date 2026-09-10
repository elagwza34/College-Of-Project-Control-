from django.urls import include, path

urlpatterns = [
    path("", include("apps.content.urls")),
    path("cms/", include("apps.cms.urls")),
]

