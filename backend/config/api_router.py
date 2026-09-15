from apps.cms.page_content import public_content
from django.urls import include, path

urlpatterns = [
    path("page-content/", public_content),
    path("chatbot/", include("apps.chatbot.urls")),
    path("", include("apps.content.urls")),
    path("cms/", include("apps.cms.urls")),
]
