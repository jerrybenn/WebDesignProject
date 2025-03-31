from rest_framework import serializers
from .models import * # Import all models
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError


class UserRoleSerializer(serializers.ModelSerializer):
   class Meta:
      model = UserRole
      fields = ['id', 'role_name', 'role_description', 'permissions']


class ReligionSerializer(serializers.ModelSerializer):
   class Meta:
      model = Religion
      fields = ['id', 'religion_name', 'religion_description']


class DenominationSerializer(serializers.ModelSerializer):
   religion = ReligionSerializer(read_only=True)
   religion_id = serializers.PrimaryKeyRelatedField(
      queryset=Religion.objects.all(), source='religion', write_only=True
   )

   class Meta:
      model = Denomination
      fields = ['id', 'religion', 'religion_id', 'denomination_name', 'denomination_description']


class PlaceOfWorshipSerializer(serializers.ModelSerializer):
   denomination = DenominationSerializer(read_only=True)
   denomination_id = serializers.PrimaryKeyRelatedField(
      queryset=Denomination.objects.all(), source='denomination', write_only=True
   )

   class Meta:
      model = PlaceOfWorship
      fields = [
         'id', 'denomination', 'denomination_id', 'place_name', 'place_description',
         'size_of_congregation', 'address', 'postal_code', 'city', 'state', 'country',
         'phone_number', 'website', 'date_added'
      ]


class UserSerializer(serializers.ModelSerializer):
   role = UserRoleSerializer(read_only=True)
   role_id = 2
   '''serializers.PrimaryKeyRelatedField(
      #queryset=UserRole.objects.all(), source='role', write_only=True, allow_null=True
   )'''

   password = serializers.CharField(write_only=True, required=True)

   class Meta:
      model = User
      fields = [
         'user_id', 'username', 'role', 'role_id', 'email', 'password',
         'first_name', 'last_name', 'date_created', 'is_active', 'is_staff'
      ]
      read_only_fields = ['date_created']

   def validate_password(self, value):
      try:
         validate_password(value)
      except ValidationError as e:
         raise serializers.ValidationError(e.messages)
      return value

   def create(self, validated_data):
      password = validated_data.pop('password', None)
      user = User(**validated_data)
      if password:
         user.set_password(password)
      user.save()
      return user

   def update(self, instance, validated_data):
      password = validated_data.pop('password', None)
      for attr, value in validated_data.items():
         setattr(instance, attr, value)
      if password:
         instance.set_password(password)
      instance.save()
      return instance


class SavedPlaceSerializer(serializers.ModelSerializer):
   place = PlaceOfWorshipSerializer(read_only=True)
   place_id = serializers.PrimaryKeyRelatedField(
      queryset=PlaceOfWorship.objects.all(), source='place', write_only=True
   )
   user = UserSerializer(read_only=True)
   user_id = serializers.PrimaryKeyRelatedField(
      queryset=User.objects.all(), source='user', write_only=True
   )

   class Meta:
      model = SavedPlace
      fields = ['saved_place_id', 'place', 'place_id', 'user', 'user_id']
      validators = [
         serializers.UniqueTogetherValidator(
               queryset=SavedPlace.objects.all(),
               fields=['place', 'user'],
               message="This place has already been saved by this user."
         )
      ]


class ReviewSerializer(serializers.ModelSerializer):
   place = PlaceOfWorshipSerializer(read_only=True)
   place_id = serializers.PrimaryKeyRelatedField(
      queryset=PlaceOfWorship.objects.all(), source='place', write_only=True
   )
   reviewer = UserSerializer(read_only=True)
   reviewer_id = serializers.PrimaryKeyRelatedField(
      queryset=User.objects.all(), source='reviewer', write_only=True
   )

   class Meta:
      model = Review
      fields = ['id', 'place', 'place_id', 'reviewer', 'reviewer_id', 'rating', 'comment', 'date_added']

   def validate_rating(self, value):
      if not (1 <= value <= 5):
         raise serializers.ValidationError("Rating must be between 1 and 5.")
      return value
