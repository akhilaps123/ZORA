from django.db import models
from django.conf import settings
from django.core.validators import validate_email


class Concert(models.Model):
    name = models.CharField(max_length=200)
    venue = models.CharField(max_length=200)
    date_time = models.DateTimeField()
    ticket_price = models.DecimalField(max_digits=8, decimal_places=2)
    available_tickets = models.IntegerField()
    image = models.ImageField(upload_to='concert_images/',null=True)
    description = models.TextField(blank=True)
   
    def __str__(self):
        return self.name


class User(models.Model):
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200,validators=[validate_email])
    password = models.CharField(max_length=200)

class Booking(models.Model):
    STATUS_CHOICES = (
        ("PENDING", "Pending"),
        ("PAID", "Paid"),
        ("FAILED", "Failed"),
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE)
    concert = models.ForeignKey(Concert, on_delete=models.CASCADE)
    tickets = models.IntegerField()
    total_price = models.DecimalField(max_digits=8, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="PENDING")
    booked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.concert.name}"
    

# class Payment(models.Model):
#     booking = models.OneToOneField(Booking, on_delete=models.CASCADE)
#     amount = models.DecimalField(max_digits=8, decimal_places=2)
#     status = models.CharField(max_length=20, default="PENDING")
#     payment_date = models.DateTimeField(auto_now_add=True)

