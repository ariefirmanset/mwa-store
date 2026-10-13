from django.contrib import admin
from .models import Product, ProductVariant , ProductAttribute, ProductImage

# Register your models here.
admin.site.register([Product,ProductVariant,ProductAttribute,ProductImage])