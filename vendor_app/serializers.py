from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Product

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        username = validated_data['username']
        password = validated_data['password']

        user = User.objects.create_user(username=username, password=password)
        return user

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'