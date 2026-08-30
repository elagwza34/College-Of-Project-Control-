from django.urls import path

from . import views

urlpatterns = [
    path("site/", views.site_detail, name="site-detail"),
    path("navigation/", views.navigation, name="navigation"),
    path("pages/home/", views.homepage, name="homepage"),
    path("pages/<slug:slug>/", views.page_detail, name="page-detail"),
]

