from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, generics
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import make_password

# User-made imports
from .serializers import *
from .models import *


# START - USERS
class CreateUserView(generics.CreateAPIView):
   """Allows only superusers to create new users."""
   queryset = User.objects.all()
   serializer_class = UserSerializer
   permission_classes = [IsAuthenticated]
   
   def create(self, request, *args, **kwargs):
      if not request.user.is_superuser:
         return Response({"error": "Only superusers can create new users."}, status=status.HTTP_403_FORBIDDEN)
      return super().create(request, *args, **kwargs)


class UserListCreate(generics.ListCreateAPIView):
   """Authenticated users can list users; only superusers can create users."""
   serializer_class = UserSerializer
   permission_classes = [IsAuthenticated]
   
   def get_queryset(self):
      user = self.request.user
      return User.objects.all() if user.is_superuser else User.objects.filter(user_id=user.user_id)
   
   def create(self, request, *args, **kwargs):
      if not request.user.is_superuser:
         return Response({"error": "Only superusers can create new users."}, status=status.HTTP_403_FORBIDDEN)
      return super().create(request, *args, **kwargs)


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
   """Retrieve, update, or delete user details (restricted to superusers)."""
   queryset = User.objects.all()
   serializer_class = UserSerializer
   permission_classes = [IsAuthenticated]
   
   def get_object(self):
      user_identifier = self.kwargs['user_identifier']
      try:
         return get_object_or_404(User, pk=int(user_identifier))
      except ValueError:
         return get_object_or_404(User, d_number=user_identifier)
   
   def perform_update(self, serializer):
      if not self.request.user.is_superuser:
         return Response({"error": "Only superusers can update users."}, status=status.HTTP_403_FORBIDDEN)
      if 'password' in serializer.validated_data:
         serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
      serializer.save()
   
   def perform_destroy(self, instance):
      if not self.request.user.is_superuser:
         return Response({"error": "Only superusers can delete users."}, status=status.HTTP_403_FORBIDDEN)
      instance.delete()


# STOP - USERS


# START - RELIGION
class ReligionListCreate(generics.ListCreateAPIView):
   """List and create religions (superuser creation only)."""
   queryset = Religion.objects.all()
   serializer_class = ReligionSerializer
   permission_classes = [IsAuthenticated]
   
   def create(self, request, *args, **kwargs):
      if not request.user.is_superuser:
         return Response({"error": "Only superusers can create religions."}, status=status.HTTP_403_FORBIDDEN)
      return super().create(request, *args, **kwargs)


class ReligionDetail(generics.RetrieveUpdateDestroyAPIView):
   """Retrieve, update, or delete a religion instance."""
   queryset = Religion.objects.all()
   serializer_class = ReligionSerializer
   permission_classes = [IsAuthenticated]
   
   def perform_update(self, serializer):
      if not serializer.validated_data:
         return Response({"error": "Provide at least one valid field for update."}, status=status.HTTP_400_BAD_REQUEST)
      serializer.save()


# STOP - RELIGION


# START - DENOMINATION
class DenominationListCreate(generics.ListCreateAPIView):
   """List/create denominations. Supports filtering by religion."""
   serializer_class = DenominationSerializer
   permission_classes = [IsAuthenticated]
   
   def get_queryset(self):
      queryset = Denomination.objects.all()
      religion_id = self.request.query_params.get('religion_id')
      return queryset.filter(religion_id=religion_id) if religion_id else queryset


class DenominationDetail(generics.RetrieveUpdateDestroyAPIView):
   """Retrieve, update, or delete a denomination instance."""
   queryset = Denomination.objects.all()
   serializer_class = DenominationSerializer
   permission_classes = [IsAuthenticated]


# STOP - DENOMINATION


# START - PLACE OF WORSHIP
class PlaceOfWorshipListCreate(generics.ListCreateAPIView):
   """List/create places of worship with optional denomination filtering."""
   serializer_class = PlaceOfWorshipSerializer
   permission_classes = [IsAuthenticated]
   
   def get_queryset(self):
      queryset = PlaceOfWorship.objects.all()
      denomination_id = self.request.query_params.get('denomination_id')
      return queryset.filter(denomination_id=denomination_id) if denomination_id else queryset


class PlaceOfWorshipDetail(generics.RetrieveUpdateDestroyAPIView):
   """Retrieve, update, or delete a place of worship."""
   queryset = PlaceOfWorship.objects.all()
   serializer_class = PlaceOfWorshipSerializer
   permission_classes = [IsAuthenticated]


# STOP - PLACE OF WORSHIP


# START - SAVED PLACES
class SavedPlaceListCreate(generics.ListCreateAPIView):
   """List or create saved places associated with the authenticated user."""
   serializer_class = SavedPlaceSerializer
   permission_classes = [IsAuthenticated]
   
   def get_queryset(self):
      return SavedPlace.objects.filter(user=self.request.user)
   
   def perform_create(self, serializer):
      serializer.save(user=self.request.user)


class SavedPlaceDetail(generics.RetrieveDestroyAPIView):
   """Retrieve or delete a saved place."""
   queryset = SavedPlace.objects.all()
   serializer_class = SavedPlaceSerializer
   permission_classes = [IsAuthenticated]
   
   def get_queryset(self):
      return SavedPlace.objects.filter(user=self.request.user)


# STOP - SAVED PLACES


# START - REVIEW
class ReviewListCreate(generics.ListCreateAPIView):
   """List and create reviews. Can filter by place."""
   serializer_class = ReviewSerializer
   permission_classes = [IsAuthenticated]
   
   def get_queryset(self):
      queryset = Review.objects.all()
      place_id = self.request.query_params.get('place_id')
      return queryset.filter(place_id=place_id) if place_id else queryset
   
   def perform_create(self, serializer):
      serializer.save(reviewer=self.request.user)


class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
   """Retrieve, update, or delete a review."""
   queryset = Review.objects.all()
   serializer_class = ReviewSerializer
   permission_classes = [IsAuthenticated]
   
   def perform_update(self, serializer):
      if self.request.user != serializer.instance.reviewer:
         return Response({"error": "You can only update your own reviews."}, status=status.HTTP_403_FORBIDDEN)
      serializer.save()
   
   def perform_destroy(self, instance):
      if self.request.user != instance.reviewer:
         return Response({"error": "You can only delete your own reviews."}, status=status.HTTP_403_FORBIDDEN)
      instance.delete()
# STOP - REVIEW
