from django.contrib.auth.models import AbstractUser,BaseUserManager
from django.db import models
from apps.roles.models import Role
from apps.core.models import TimeStampedModel

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, role=None, **extrafield):
        user = self.model(
            username =  username,
            email = self.normalize_email(email),
            role =  role,
            **extrafield,
        )
        
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email=None, password=None, **extrafield):
        admin_role = Role.objects.get(name='admin')
        extrafield.setdefault('is_staff', True)
        extrafield.setdefault('is_superuser', True)
        return self.create_user(
                username,
                email,
                password=password,
                role=admin_role,
                **extrafield,
            )

class User(AbstractUser,TimeStampedModel):
    phone_number = models.CharField(max_length=20,blank=True,null=True)
    role = models.ForeignKey(Role, on_delete=models.PROTECT)

    objects = UserManager()