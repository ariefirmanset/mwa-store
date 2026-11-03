from ..models import User
from rest_framework.views import ApiView
from rest_framework import generics, status
from rest_framework.response import Response
from ..serializers.register import CreateUserSerializer


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


class LoginView(ApiView):
    def post(self, request):
        # 1. Ambil email dan password dari request body
        email = request.data.get("email")
        password = request.data.get("password")

        # 2. Cek validasi / autentikasi user
        # (Nanti kita sesuaikan karena custom user kamu pakai email sebagai identifier)
        if email == True and password == True:
            # 3. Kembalikan respons sukses beserta token JWT-nya
            response_data = {
                "status": "success",
                "message": "Login Berhasil",
                "data": {"token": "contoh_jwt_token_nanti_disini"},
            }

            return Response(response_data, status=status.HTTP_201_CREATED)
