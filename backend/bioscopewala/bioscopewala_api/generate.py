import random
from django.utils import timezone
import pytz  # Add this import for timezone conversion
from .models import *
from .serializers import *

# Define Indian timezone
INDIAN_TIMEZONE = pytz.timezone("Asia/Kolkata")


def generate_seats(screening):
    seats = []
    for row_num in range(7):
        row = chr(ord("A") + row_num)
        is_premium = row_num == 0
        cost = 500 if is_premium else 300
        for number in range(1, 11):
            seats.append(
                Seat(
                    row=row,
                    number=number,
                    is_premium=is_premium,
                    is_booked=False,
                    cost=cost,
                    screening=screening,
                )
            )
    Seat.objects.bulk_create(seats)


def generate_random_screening_times():
    # Set the start and end time for screenings in IST timezone
    start_time = (
        timezone.now()
        .astimezone(INDIAN_TIMEZONE)
        .replace(hour=9, minute=0, second=0, microsecond=0)
    )
    end_time = (
        timezone.now()
        .astimezone(INDIAN_TIMEZONE)
        .replace(hour=18, minute=0, second=0, microsecond=0)
    )

    # Calculate the total available time range in minutes
    available_minutes = (end_time - start_time).seconds // 60

    # Randomly pick the first screening time (only multiples of 5)
    first_screening_time = start_time + timezone.timedelta(
        minutes=5 * random.randint(0, available_minutes // 5)
    )

    # Set the second screening to be exactly 4 hours later
    second_screening_time = first_screening_time + timezone.timedelta(hours=4)

    return [first_screening_time, second_screening_time]


def generate_screening(movie, theatre):
    for i in range(1, 6):  # Create screenings for the next 5 days
        # Get random screening times for the day
        screening_times = generate_random_screening_times()

        for screening_time in screening_times:
            screening_time = screening_time + timezone.timedelta(days=i)
            obj = {
                "movie": movie.id,  # Use movie ID
                "theatre": theatre.id,  # Use theatre ID
                "city": theatre.city,
                "date_time": screening_time,  # Set the screening time
            }
            serialized = ScreeningSerializer(data=obj)

            if serialized.is_valid():  # Check if the data is valid
                screening = serialized.save()  # Save the validated data
                generate_seats(screening)  # Generate seats for the created screening
            else:
                print(f"Error creating screening: {serialized.errors}")


def create_dummy_data(apps, schema_editor):
    for movie in Movie.objects.all():
        for theatre in Theatre.objects.all():
            # Don't generate screenings for some movies
            regional = movie.id != 12 or theatre.city == "Hyderabad"
            if random.randint(0, 5) % 5 != 0 and regional:
                generate_screening(movie, theatre)
