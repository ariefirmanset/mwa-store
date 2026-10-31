from models import User
from rest_framework import viewsets
from serializers.login import LoginSerializer


# Create your views here.
# ViewSets define the view behavior.
class LoginViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = LoginSerializer

