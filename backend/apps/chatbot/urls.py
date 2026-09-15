from django.urls import path
from . import views

urlpatterns = [path('chat/', views.chat), path('status/', views.status)]
