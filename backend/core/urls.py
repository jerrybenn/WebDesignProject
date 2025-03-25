from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView # User-made view to create users


urlpatterns = [
    # Admin
    path("admin/", admin.site.urls), # Native Django admin suite pathing
    # API App Urls.py pathing
    path("api/", include("api.urls")) # Forward requests to the API url app's urls.py file (api/urls.py)
]
