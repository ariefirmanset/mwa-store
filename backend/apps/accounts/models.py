from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from apps.roles.models import Role
from apps.core.models import TimeStampedModel


# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None, role=None, **extrafield):
        if not email:
            raise ValueError("Email wajib diisi")
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            role=role,
            **extrafield,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extrafield):
        admin_role = Role.objects.get(name="admin")
        extrafield.setdefault("is_staff", True)
        extrafield.setdefault("is_superuser", True)
        return self.create_user(
            email, username, password=password, role=admin_role, **extrafield
        )


class User(AbstractUser, TimeStampedModel):
    email = models.EmailField(max_length=255, unique=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    role = models.ForeignKey(Role, on_delete=models.PROTECT)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = UserManager()
