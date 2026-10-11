from django.db import models
from apps.core.models import TimeStampedModel

# Create your models here.
class Category(TimeStampedModel):
    name = models.CharField(max_length=100, unique=True)
    description =  models.TextField()
