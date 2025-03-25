from django.urls import path
from .views import (
      # Login View
      Login,
      # User Views
      CreateUserView, UserListCreate, UserDetail,
      
      # Religion Views
      ReligionListCreate, ReligionDetail,
      
      # Denomination Views
      DenominationListCreate, DenominationDetail,
      
      # Place of Worship Views
      PlaceOfWorshipListCreate, PlaceOfWorshipDetail,
      
      # Saved Places Views
      SavedPlaceListCreate, SavedPlaceDetail,
      
      # Review Views
      ReviewListCreate, ReviewDetail,
   )
from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView # User-made view to create users
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView # Prebuilt views that allow us to access JWT tokens AND refresh existing ones


urlpatterns = [
      # LOGIN
      path("login/", Login.as_view(), name="login"),

      # USERS
      path("users/", UserListCreate.as_view(), name="user-list-create"),
      path("users/create/", CreateUserView.as_view(), name="user-create"),
      path("users/<str:user_identifier>/", UserDetail.as_view(), name="user-detail"),
      
      # RELIGIONS
      path("religions/", ReligionListCreate.as_view(), name="religion-list-create"),
      path("religions/<int:pk>/", ReligionDetail.as_view(), name="religion-detail"),
      
      # DENOMINATIONS
      path("denominations/", DenominationListCreate.as_view(), name="denomination-list-create"),
      path("denominations/<int:pk>/", DenominationDetail.as_view(), name="denomination-detail"),
      
      # PLACES OF WORSHIP
      path("places/", PlaceOfWorshipListCreate.as_view(), name="placeofworship-list-create"),
      path("places/<int:pk>/", PlaceOfWorshipDetail.as_view(), name="placeofworship-detail"),
      
      # SAVED PLACES
      path("saved-places/", SavedPlaceListCreate.as_view(), name="savedplace-list-create"),
      path("saved-places/<int:pk>/", SavedPlaceDetail.as_view(), name="savedplace-detail"),
      
      # REVIEWS
      path("reviews/", ReviewListCreate.as_view(), name="review-list-create"),
      path("reviews/<int:pk>/", ReviewDetail.as_view(), name="review-detail"),
   ]
