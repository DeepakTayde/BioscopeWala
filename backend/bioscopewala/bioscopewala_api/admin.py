from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Movie)
admin.site.register(Theatre)
admin.site.register(Screening)
# admin.site.register(UserManager)
admin.site.register(User)
admin.site.register(Booking)
admin.site.register(Seat)