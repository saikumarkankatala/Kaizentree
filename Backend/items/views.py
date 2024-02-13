from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Item, Category
from .serializers import UserSerializer, ItemSerializer, CategorySerializer
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView


class UserLoginAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Allow access to unauthenticated users

    def post(self, request, *args, **kwargs):
        # Get username and password from request data
        username = request.data.get('username')
        password = request.data.get('password')

        # Check if username and password are provided
        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST, headers={'X-Error': 'Username and password are required'})

        # Check if user with provided username exists
        try:
            user = User.objects.get(username=username)
        except ObjectDoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND,headers={'X-Error': 'User not found'})

        # Check if password matches
        if not user.check_password(password):
            return Response({'error': 'Incorrect password'}, status=status.HTTP_400_BAD_REQUEST, headers={'X-Error': 'Incorrect password'})

        # Generate token for the user
        token, created = Token.objects.get_or_create(user=user)

        # Serialize user data
        serializer = self.get_serializer(user)

        data = serializer.data
        data.pop('password', None)

        # Add token to the response data
        data['token'] = token.key

        return Response(data, status=status.HTTP_200_OK, headers={'X-Token': token.key})


class UserItemListAPIView(generics.ListAPIView):
    serializer_class = ItemSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter items by the logged-in user
        return Item.objects.filter(user=self.request.user)


class AddCategoryAPIView(APIView):
    authentication_classes = [TokenAuthentication]  # Use TokenAuthentication for authentication
    permission_classes = [IsAuthenticated]  # Require authenticated user to access this endpoint

    def post(self, request, *args, **kwargs):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddItemAPIView(APIView):
    authentication_classes = [TokenAuthentication]  # Use TokenAuthentication for authentication
    permission_classes = [IsAuthenticated]  # Require authenticated user to access this endpoint

    def post(self, request, *args, **kwargs):
        # Get item and category data from the request
        item_data = request.data
        category_data = item_data.pop('category')

        # Serialize category data if available
        if category_data:
            try:
                category = Category.objects.get(name=category_data['name'])
            except Category.DoesNotExist:
                return Response({'error': 'Category does not exist'}, status=status.HTTP_400_BAD_REQUEST)

                # Update item data with category id
            item_data['category'] = category.id

        # Serialize item data
        serializer = ItemSerializer(data=item_data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # Associate the item with the authenticated user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
