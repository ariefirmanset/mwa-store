from django.db  import models
from django.core.validators  import MinValueValidator
from apps.core.models  import TimeStampedModel
from apps.categories.models  import Category
from decimal import Decimal


# Create your models here.
class Product(TimeStampedModel):
    thumbnail_url = models.CharField(max_length=255, blank=True)
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    description = models.TextField(blank=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

class ProductVariant(TimeStampedModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    sku = models.CharField(max_length=255, unique=True)
    price = models.DecimalField(
        max_digits=15, decimal_places=2,validators=[MinValueValidator(Decimal('0.01'))]
    )
    qty = models.PositiveIntegerField()
    deleted_at = models.DateTimeField(null=True, blank=True)

class ProductAttribute(models.Model):
    product_variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
    attributes_name = models.CharField(max_length=255)
    attributes_value = models.CharField(max_length=255)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['product_variant','attributes_name'], name='unique_product_attribute_product_variant_attributes_name')
        ]

class ProductImage(models.Model):
    product_variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
    image_url = models.CharField(max_length=255)
    sort_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)