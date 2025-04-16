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
   print("[+] Populating database...", end="\n\n")
   
   # Create User Roles
   print("[+] Creating User Roles...")
   root_user_role = UserRole.objects.create(
      role_name = 'root',
      role_description = "Root users have access to everything. They are super users.",
      permissions = {"permission" : "root"}
   )
   admin_user_role = UserRole.objects.create(
      role_name = 'Admin',
      role_description = "Admin users have access to everything. They are super users.",
      permissions = {"permission" : "Admin"}
   ) 
   user_user_role = UserRole.objects.create(
      role_name = 'User',
      role_description = "Normal users have access to only the bare necessities required for their usage of this application.",
      permissions = {"permission" : "User"}
   )
   user_roles_list = [root_user_role, admin_user_role, user_user_role] # List to contain all user roles
   print(f"[+] User Roles Created: {user_roles_list}", end="\n\n")
   
   # Create Users
   print("[+] Creating Users...")
      # Noah's user
   noah_user = User.objects.create(
      username="czalpha",
      role=root_user_role,
      email="nbklaus21@students.desu.edu",
      first_name="Noah",
      last_name="Klaus",
   )
   noah_user.set_password("D10686712")
   noah_user.save()
      # Default User
   default_user = User.objects.create(
      username="default",
      role=user_user_role,
      email="default@gmail.com",
      first_name="John",
      last_name="Doe",
   )
   default_user.set_password("password1234!")
   default_user.save() 
   users_list = [noah_user, default_user]
   print(f"[+] Created Users: {users_list}", end="\n\n")
   
   # Create Religions
   print("[+] Creating Religions...")
   christianity_religion = Religion.objects.create(
      religion_name = "Christianity",
      religion_description = "Christ's religion."
   )
   islam_religion = Religion.objects.create(
      religion_name = "Islam",
      religion_description = "Muhammed's religion."
   )
   hindu_religion = Religion.objects.create(
      religion_name = "Hinduism",
      religion_description = "Ghandi's religion."
   )
   religions = [christianity_religion, islam_religion, hindu_religion]
   print(f"[+] Created Religions: {religions}", end="\n\n")
   
   # Create Denominations
   print("[+] Creating Denominations...")
   protestant_denomination = Denomination.objects.create(
      religion = christianity_religion,
      denomination_name = "Protestant",
      denomination_description = "Christians who protest the Catholic Church and denomination of Christianity."
   )
   catholic_denomination = Denomination.objects.create(
      religion = christianity_religion,
      denomination_name = "Catholic",
      denomination_description = "Christians who follow the Catholic Church and respect the Pope's religious authority within the Christian religion."
   )
   sunni_denomination = Denomination.objects.create(
      religion = islam_religion,
      denomination_name = "Sunni",
      denomination_description = "Sunni Islam emphasizes the Prophet's traditions (Sunnah) and community consensus for leadership, recognizing the first four caliphs."
   )
   shiite_denomination = Denomination.objects.create(
      religion = islam_religion,
      denomination_name = "Shiite",
      denomination_description = "Shiite Islam believes leadership should have remained within the Prophet's family, with divinely appointed Imams, particularly Ali and his descendants."
   )
   vaishnavism_denomination = Denomination.objects.create(
      religion = hindu_religion,
      denomination_name = "Vaishnavism",
      denomination_description = "This denomination centers on the worship of Vishnu, or his various incarnations, such as Krishna and Rama. It emphasizes devotion (bhakti) as the path to salvation."
   )
   shaivism_denomination = Denomination.objects.create(
      religion = hindu_religion,
      denomination_name = "Shaivism",
      denomination_description = "Followers of Shaivism worship Shiva as the supreme deity. This tradition often emphasizes asceticism, meditation, and the understanding of Shiva as both the destroyer and transformer."
   )
   denominations = [
      protestant_denomination, catholic_denomination, 
      sunni_denomination, shiite_denomination,
      vaishnavism_denomination, shaivism_denomination
   ]
   print(f"[+] Created Denominations: {denominations}", end="\n\n")
   
   # Create Places of Worship
   print("[+] Creating Places of Worship...")
   
   # Protestant Places of Worship
   protestant_place1 = PlaceOfWorship.objects.create(
      denomination=protestant_denomination,
      place_name="First Protestant Church",
      place_description="A historic Protestant church with a large congregation.",
      size_of_congregation=500,
      address="123 Main St",
      postal_code=12345,
      city="Anytown",
      state="CA",
      country="USA",
      phone_number="+15551234567",
      website="https://firstprotestant.com/"
   )
   protestant_place2 = PlaceOfWorship.objects.create(
      denomination=protestant_denomination,
      place_name="Community Protestant Chapel",
      place_description="A smaller, community-focused Protestant chapel.",
      size_of_congregation=150,
      address="456 Elm St",
      postal_code=67890,
      city="Smallville",
      state="NY",
      country="USA",
      phone_number="+15559876543",
      website="https://www.facebook.com/mtviewchurch1916/"
   )
   protestant_place3 = PlaceOfWorship.objects.create(
      denomination=protestant_denomination,
      place_name="Grace Protestant Cathedral",
      place_description="A large, cathedral-style Protestant church.",
      size_of_congregation=1000,
      address="789 Oak Ave",
      postal_code=13579,
      city="Bigcity",
      state="TX",
      country="USA",
      phone_number="+15551122334",
      website="https://gracecathedral.org/"
   )
   
   # Catholic Places of Worship
   catholic_place1 = PlaceOfWorship.objects.create(
      denomination=catholic_denomination,
      place_name="St. Mary's Catholic Church",
      place_description="A traditional Catholic church with a long history.",
      size_of_congregation=800,
      address="101 Pine Ln",
      postal_code=24680,
      city="Romeville",
      state="IL",
      country="USA",
      phone_number="+15554455667",
      website="https://www.stmarycatholic.org/"
   )
   catholic_place2 = PlaceOfWorship.objects.create(
      denomination=catholic_denomination,
      place_name="Holy Family Catholic Chapel",
      place_description="A smaller, family-oriented Catholic chapel.",
      size_of_congregation=200,
      address="202 Cedar Rd",
      postal_code=98765,
      city="Faithtown",
      state="FL",
      country="USA",
      phone_number="+15557788990",
      website="https://www.holyfamilynewark.org/"
   )
   catholic_place3 = PlaceOfWorship.objects.create(
      denomination=catholic_denomination,
      place_name="Cathedral of St. Peter",
      place_description="A grand, cathedral-style Catholic church.",
      size_of_congregation=1500,
      address="303 Birch Dr",
      postal_code=54321,
      city="Holycity",
      state="OH",
      country="USA",
      phone_number="+15552233445",
      website="https://cathedralphila.org/"
   )
   
   # Sunni Places of Worship
   sunni_place1 = PlaceOfWorship.objects.create(
      denomination=sunni_denomination,
      place_name="Masjid Al-Noor",
      place_description="A large Sunni mosque with a vibrant community.",
      size_of_congregation=1000,
      address="404 Maple Ave",
      postal_code=11223,
      city="Farmville",
      state="MI",
      country="USA",
      phone_number="+15556677889",
      website="https://masjidal-noor.org/"
   )
   sunni_place2 = PlaceOfWorship.objects.create(
      denomination=sunni_denomination,
      place_name="Sunni Community Center",
      place_description="A community center and prayer space for Sunni Muslims.",
      size_of_congregation=300,
      address="505 Willow St",
      postal_code=44556,
      city="Peaceville",
      state="NJ",
      country="USA",
      phone_number="+15553344556",
      website="http://www.isocde.org/"
   )
   sunni_place3 = PlaceOfWorship.objects.create(
      denomination=sunni_denomination,
      place_name="Grand Sunni Mosque",
      place_description="A grand mosque serving a large Sunni population.",
      size_of_congregation=2000,
      address="606 Pinecrest Rd",
      postal_code=77889,
      city="Faithcity",
      state="VA",
      country="USA",
      phone_number="+15558899001",
      website="http://amana.link/"
   )
   
   # Shiite Places of Worship
   shiite_place1 = PlaceOfWorship.objects.create(
      denomination=shiite_denomination,
      place_name="Imam Ali Mosque",
      place_description="A Shiite mosque dedicated to Imam Ali.",
      size_of_congregation=700,
      address="707 Oakwood Ln",
      postal_code=99001,
      city="Shiaville",
      state="MA",
      country="USA",
      phone_number="+15555566778",
      website="https://imamalimasjid.com/iam/"
   )
   shiite_place2 = PlaceOfWorship.objects.create(
      denomination=shiite_denomination,
      place_name="Shiite Islamic Center",
      place_description="A center for Shiite religious and community activities.",
      size_of_congregation=250,
      address="808 Redwood Ave",
      postal_code=22334,
      city="Unityville",
      state="CT",
      country="USA",
      phone_number="+15559900112",
      website="https://www.sijpa.org/"
   )
   shiite_place3 = PlaceOfWorship.objects.create(
      denomination=shiite_denomination,
      place_name="Grand Shiite Masjid",
      place_description="A grand masjid serving a large Shiite community.",
      size_of_congregation=1200,
      address="909 Silver St",
      postal_code=55667,
      city="Holyplace",
      state="PA",
      country="USA",
      phone_number="+15551122335",
      website="https://www.masjid-e-ali.org/"
   )
   
   # Vaishnavism Places of Worship
   vaishnavism_place1 = PlaceOfWorship.objects.create(
      denomination=vaishnavism_denomination,
      place_name="Sri Krishna Temple",
      place_description="A temple dedicated to Lord Krishna.",
      size_of_congregation=600,
      address="1010 Golden Rd",
      postal_code=88990,
      city="Krishnaville",
      state="IN",
      country="USA",
      phone_number="+15554455668",
      website="https://krishnatemple.org/"
   )
   vaishnavism_place2 = PlaceOfWorship.objects.create(
      denomination=vaishnavism_denomination,
      place_name="Rama Mandir",
      place_description="A temple dedicated to Lord Rama.",
      size_of_congregation=350,
      address="1111 Diamond Ave",
      postal_code=33445,
      city="Ramaville",
      state="GA",
      country="USA",
      phone_number="+15557788991",
      website="https://www.shreerammandir.org/"
   )
   vaishnavism_place3 = PlaceOfWorship.objects.create(
      denomination=vaishnavism_denomination,
      place_name="Vishnu Bhavan",
      place_description="A large congregation of Vaishnavists.",
      size_of_congregation=1500,
      address="910 Gold St",
      postal_code=55667,
      city="Dover",
      state="DE",
      country="USA",
      phone_number="+15531122335",
      website="https://www.instagram.com/vishnubhavanfoods/"
   )
   
   places_of_worship_list = [
      protestant_place1, protestant_place2, protestant_place3,
      catholic_place1, catholic_place2, catholic_place3,
      sunni_place1, sunni_place2, sunni_place3,
      shiite_place1, shiite_place2, shiite_place3,
      vaishnavism_place1, vaishnavism_place2, vaishnavism_place3 
   ]
   print(f"[+] Created Places Of Worship: {places_of_worship_list}", end="\n\n")
   
   # Create Saved Places
   print("[+] Creating Random Saved Places for All Users...")
   saved_places = []
   for _ in range(10):
      user = random.choice(users_list)
      place = random.choice(places_of_worship_list)
      
      # Check for duplicates for the specific user and place combination
      if not SavedPlace.objects.filter(place=place, user=user).exists():
         saved_place = SavedPlace.objects.create(place=place, user=user)
         saved_places.append(saved_place)
      else:
         # If duplicate, try again with a different place
         while SavedPlace.objects.filter(place=place, user=user).exists():
               place = random.choice(places_of_worship_list)
         saved_place = SavedPlace.objects.create(place=place, user=user)
         saved_places.append(saved_place)
   print(f"[+] Created Saved Places: {saved_places}", end="\n\n")
   
   # Create Reviews
   print("[+] Creating Random Reviews...")
   reviews = [Review.objects.create(
      place=random.choice(places_of_worship_list),
      reviewer=random.choice(users_list),
      rating=random.randint(1, 5),
      comment=fake.text(),
      date_added=timezone.now()
   ) for _ in range(10)]
   print(f"[+] Created Reviews: {reviews}", end="\n\n")
   
   print("Database populated successfully!")

def wipe_database():
   print("Wiping database...", end="\n\n")
   Review.objects.all().delete()
   SavedPlace.objects.all().delete()
   PlaceOfWorship.objects.all().delete()
   Denomination.objects.all().delete()
   Religion.objects.all().delete()
   User.objects.all().delete()
   UserRole.objects.all().delete()
   print("Database wiped successfully!")

def visualize_database():
   print("Visualizing database...", end="\n\n")
   print("User Roles:")
   for role in UserRole.objects.all():
      print(f" - {role.id} {role.role_name}: {role.role_description}")
   
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