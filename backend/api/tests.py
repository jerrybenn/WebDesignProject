import random
import os
import django
import sys
from django.utils import timezone
from faker import Faker

# Add the project directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Initialize Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

# Import models now that we have init. the Django env
from api.models import *


fake = Faker() # Initialize faker instance


def populate_database():
   print("Populating database...")
   
   # Create User Roles
   roles = [UserRole.objects.get_or_create(role_name=role)[0] for role, _ in UserRole.ROLE_CHOICES]
   
   # Create Users
   users = []
   for _ in range(10):
      user = User.objects.create(
         username=fake.unique.bothify(text='D#######'),
         role=random.choice(roles),
         email=fake.unique.email(),
         first_name=fake.first_name(),
         last_name=fake.last_name(),
         date_created=timezone.now(),
      )
      user.set_password("SecurePass123!")
      user.save()
      users.append(user)
   
   # Create Religions
   religions = [Religion.objects.create(religion_name=fake.unique.word(), religion_description=fake.sentence()) for _ in range(5)]
   
   # Create Denominations
   denominations = []
   for religion in religions:
      for _ in range(random.randint(1, 3)):
         denominations.append(Denomination.objects.create(religion=religion, denomination_name=fake.unique.word(), denomination_description=fake.sentence()))
   
   # Create Places of Worship
   places = []
   for denomination in denominations:
      for _ in range(random.randint(1, 3)):
         place = PlaceOfWorship.objects.create(
               denomination=denomination,
               place_name=fake.unique.company(),
               place_description=fake.text(),
               size_of_congregation=random.randint(50, 5000),
               address=fake.address(),
               postal_code=random.randint(10000, 99999),
               city=fake.city(),
               state=fake.state(),
               country=fake.country(),
               phone_number=fake.phone_number(),
               website=fake.url(),
               date_added=timezone.now()
         )
         places.append(place)
   
   # Create Saved Places
   saved_places = [SavedPlace.objects.create(place=random.choice(places), user=random.choice(users)) for _ in range(10)]
   
   # Create Reviews
   reviews = [Review.objects.create(
      place=random.choice(places),
      reviewer=random.choice(users),
      rating=random.randint(1, 5),
      comment=fake.text(),
      date_added=timezone.now()
   ) for _ in range(10)]
   
   print("Database populated successfully!")

def wipe_database():
   print("Wiping database...")
   Review.objects.all().delete()
   SavedPlace.objects.all().delete()
   PlaceOfWorship.objects.all().delete()
   Denomination.objects.all().delete()
   Religion.objects.all().delete()
   User.objects.all().delete()
   UserRole.objects.all().delete()
   print("Database wiped successfully!")

def visualize_database():
   print("Visualizing database...")
   print("User Roles:")
   for role in UserRole.objects.all():
      print(f" - {role.role_name}: {role.role_description}")
   
   print("\nUsers:")
   for user in User.objects.all():
      print(f" - {user.username} ({user.email}) - Role: {user.role}")
   
   print("\nReligions:")
   for religion in Religion.objects.all():
      print(f" - {religion.religion_name}: {religion.religion_description}")
   
   print("\nDenominations:")
   for denomination in Denomination.objects.all():
      print(f" - {denomination.denomination_name} (Religion: {denomination.religion})")
   
   print("\nPlaces of Worship:")
   for place in PlaceOfWorship.objects.all():
      print(f" - {place.place_name} (Denomination: {place.denomination})")
   
   print("\nSaved Places:")
   for saved in SavedPlace.objects.all():
      print(f" - {saved.user} saved {saved.place}")
   
   print("\nReviews:")
   for review in Review.objects.all():
      print(f" - {review.reviewer} rated {review.place} {review.rating}/5: {review.comment}")
   
   print("Database visualization complete!")

if __name__ == "__main__":
   wipe_database()
   populate_database()
   visualize_database()
