from django.utils import timezone

from django.contrib.auth.models import User
from django.db import models

class Vendor(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Product(models.Model):
    vendor = models.ForeignKey(User, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=200, default="Product")
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField(default=0)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.product_name