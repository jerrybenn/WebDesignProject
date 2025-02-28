from django.db import models
from django.conf import settings  # Use this to refer to the custom User model
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone # For verifying time validity
from django.core.exceptions import ValidationError # For throwing validation errors
from django.contrib.auth.password_validation import validate_password # For validating passwords
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator


# NOTE: This is where API-compatible database tables are defined
# Each class in this file dictates the creation of a Django 'Model', 
# this is just a fancy way to call a table, or an object within
# a relational database. The name of the class dictates the name of
# the table within the database. Each internal variable dictates a 
# column within the table. The thing you set the variables equal to
# dictates the datatype of that column. You can also override 
# functions to meet your needs like in the Note table's usage of
# overriding the Python equivalent of Java's toString method.


phone_validator = RegexValidator(
   regex=r'^\+?1?\d{9,15}$',
   message="Phone number must be in the format: '+999999999'. Up to 15 digits allowed."
)


# User Role
class UserRole(models.Model):
   ROLE_CHOICES = [ # These role choices are in order of power, admins can read and write anything, users can only read and write to certian fields and clients are READ ONLY for most things
      ('root', 'root'), # Root users
      ('Admin', 'Admin'), # Administrative users
      ('User', 'User'), # For general users
   ]
   role_name = models.CharField(max_length=20, unique=True, choices=ROLE_CHOICES)
   role_description = models.TextField(null=True, blank=True)
   permissions = models.JSONField(max_length=1000, null=True, blank=True) # Optional JSON object containing 'list' of permissions
   
   def __str__(self):
      return self.role_name


# User Manager (Django quirk but required)
class UserManager(BaseUserManager):
   # Purpose: The user manager is used to manage the creation of users
   # Q: Why not just use a user view to do this, like all other models??
   # A: Django expects a manager if you override the User model, plus it keeps some logic out of the views file, which can simplify things in some regards
   def create_user(self, d_number, email, password=None, **extra_fields): # This creates a normal user
      if not email:
         raise ValueError("The Email field must be set")
      if not d_number or len(d_number) != 9:
         raise ValueError("D_Number must be exactly 9 characters long")
      
      email = self.normalize_email(email) # Normalize the email
      extra_fields.setdefault("is_active", True) # Set the is_active attr. to true
      
      # Validate password before setting
      if password:
         try:
               validate_password(password)
         except ValidationError as e:
               raise ValueError(f"Invalid password: {', '.join(e.messages)}")
      
      user = self.model(d_number=d_number, email=email, **extra_fields) # Creates a new user object
      user.set_password(password) # Hashes AND sets the user's password
      user.save(using=self._db) # Saves the user object to the database
      return user

   def create_superuser(self, d_number, email, password=None, **extra_fields):
      extra_fields.setdefault("is_staff", True) # Sets admin to true
      extra_fields.setdefault("is_superuser", True) # Sets root to true
      return self.create_user(d_number, email, password, **extra_fields) # Calls normal constructor


# User
class User(AbstractBaseUser, PermissionsMixin):
   user_id = models.BigAutoField(primary_key=True)  # Auto-handled primary key
   username = models.CharField(max_length=9, unique=True)  # Username as D_Number
   role = models.ForeignKey("UserRole", on_delete=models.SET_NULL, null=True, blank=True)
   email = models.EmailField(unique=True)
   password = models.CharField(max_length=128)  # Handled by Django's hashing system
   first_name = models.CharField(max_length=20)
   last_name = models.CharField(max_length=40)
   date_created = models.DateTimeField(auto_now_add=True)
   
   # Permissions fields
   is_active = models.BooleanField(default=True)
   is_staff = models.BooleanField(default=False)
   
   objects = UserManager()
   
   USERNAME_FIELD = "username" 
   REQUIRED_FIELDS = ["email"]
   
   def __str__(self):
      return self.username


# Religion
class Religion(models.Model):
   religion_name = models.CharField(max_length=100, unique=True)
   religion_description = models.CharField(max_length=1000, null=True, blank=True) # Optional


# Denomination
class Denomination(models.Model):
   # FK to religion model
   religion = models.ForeignKey("Religion", on_delete=models.CASCADE, null=True, blank=True) # When the parent religion is deleted, so is its denominations!
   
   denomination_name = models.CharField(max_length=100, unique=True)
   denomination_description = models.CharField(max_length=1000, null=True, blank=True) # Optional


# PlaceOfWorship
class PlaceOfWorship(models.Model):
   # FK to denomination model
   denomination = models.ForeignKey("Denomination", on_delete=models.CASCADE, null=True, blank=True) # When the parent denomination is deleted, so is its places of worships!

   place_name = models.CharField(max_length=100, unique=True)
   place_description = models.CharField(max_length=1000, null=True, blank=True) # Optional
   size_of_congregation = models.PositiveIntegerField()
   address = models.CharField(max_length=100)
   postal_code = models.PositiveIntegerField()
   city = models.CharField(max_length=100)
   state = models.CharField(max_length=100)
   country = models.CharField(max_length=100)
   phone_number = models.CharField(validators=[phone_validator], max_length=17, null=True, blank=True) # Uses regex to validate it, optional
   website = models.CharField(max_length=500, null=True, blank=True) # Optional
   date_added = models.DateTimeField(auto_now_add=True)


# SavedPlace
class SavedPlace(models.Model):
   saved_place_id = models.BigAutoField(primary_key=True)  # Explicitly state the ID as PK, then use a constraint to act as a pseudo PK   
   place = models.ForeignKey(PlaceOfWorship, on_delete=models.CASCADE)
   user = models.ForeignKey(User, on_delete=models.CASCADE)
   
   class Meta:  # Allows for a pseudo-composite primary key to be used
      constraints = [
         models.UniqueConstraint(fields=['place', 'user'], name='unique_saved_place')
      ]
   
   def __str__(self):
      return f"ID: {self.saved_place_id} | User: {self.user} | Place: {self.place}"


# Review
class Review(models.Model):
   # FK to PlaceOfWorship
   place = models.ForeignKey("PlaceOfWorship", on_delete=models.CASCADE, null=True, blank=True) # When the parent PlaceOfWorship is deleted, so is its reviews!
   
   reviewer = models.ForeignKey("User", on_delete=models.CASCADE, null=True, blank=True) # When the parent User is deleted, so is its reviews!
   rating = models.IntegerField( # Rating is between 1-5
      validators=[MinValueValidator(1), MaxValueValidator(5)],
      help_text="Rating must be between 1 and 5"
   )
   comment = models.CharField(max_length=1000, null=True, blank=True) # Optional
   date_added = models.DateTimeField(auto_now_add=True)