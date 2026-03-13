from django.urls import path
from .views import *

urlpatterns = [
path('api/register/', RegisterView.as_view(), name='register'),
path('api/login/', vendor_loginview, name='login'),
path('api/products/', VendorProductListView.as_view()),
path('api/products/add/', ProductCreateView.as_view()),
path('api/products/<int:pk>/', ProductUpdateView.as_view()),
path('api/products/<int:pk>/', ProductDeleteView.as_view()),
]
