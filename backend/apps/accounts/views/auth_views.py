from ..serializers.login import LoginSerializer
from ..serializers.register import CreateUserSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


# Create your views here.
# ViewSets define the view behavior.
class RegisterView(generics.CreateAPIView):
    serializer_class = CreateUserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        response_data = {
            "status": "success",
            "message": "User berhasil dibuat",
            "data": {"id": user.id, "username": user.username, "email": user.email},
        }

        return Response(response_data, status=status.HTTP_201_CREATED)


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        response_data = {
            "status": "success",
            "message": "Login Berhasil",
            "data": {
                "access_token": str(access),
                "refresh_token": str(refresh),
                "token_type": "Bearer",
                "expires_in": int(access.lifetime.total_seconds()),
            },
        }
        return Response(response_data, status=status.HTTP_200_OK)
