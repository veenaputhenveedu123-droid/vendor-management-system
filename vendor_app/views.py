from django.contrib.auth import authenticate
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics
from .models import Vendor, Product
from .serializers import RegisterSerializer, ProductSerializer


# Register API



class RegisterView(generics.CreateAPIView):
    queryset = Vendor.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


# Login API
@api_view(['POST'])
def vendor_loginview(request):

    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user:
        token = RefreshToken.for_user(user)

        return Response({
            "access": str(token.access_token),
            "refresh": str(token)
        })

    return Response(
        {"message": "Invalid username or password"},
        status=status.HTTP_401_UNAUTHORIZED
    )

class VendorProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Product.objects.filter(vendor=self.request.user)


class ProductCreateView(generics.CreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(vendor=self.request.user)


class ProductUpdateView(generics.UpdateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Product.objects.filter(vendor=self.request.user)


class ProductDeleteView(generics.DestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Product.objects.filter(vendor=self.request.user)

