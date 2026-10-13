from django.db import models
from apps.core.models import TimeStampedModel
from django.conf import settings
from django.core.validators import MinValueValidator
from decimal import Decimal
from apps.products.models import ProductVariant

# Create your models here.
class OrderStatus(models.TextChoices):
        pending = 'pending', 'Pending'
        processing = 'processing', 'Processing'
        shipped = 'shipped', 'Shipped'
        delivered = 'delivered', 'Delivered'
        cancelled = 'cancelled', 'Cancelled'

class Order(TimeStampedModel): 
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT) 
    invoice = models.CharField(max_length=255, unique=True)
    status = models.CharField(max_length=100, choices=OrderStatus,default=OrderStatus.pending)
    total_amount = models.DecimalField(max_digits=15, decimal_places=2, validators=[MinValueValidator(Decimal('0.01'))])
    shipping_address = models.TextField(null=False)
    
    def __str__(self):
        return self.invoice

class OrderDetail(TimeStampedModel):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product_variant = models.ForeignKey(ProductVariant, on_delete=models.PROTECT)
    product_name = models.CharField(max_length=255)
    sku = models.CharField(max_length=255)
    variant_attributes = models.JSONField()
    status = models.CharField(max_length=100, choices=OrderStatus ,default=OrderStatus.pending)
    qty = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    price_per_unit = models.DecimalField(max_digits=15, decimal_places=2, validators=[MinValueValidator(Decimal('0.01'))])
    
    def __str__(self):
        return f"{self.order.invoice} - {self.sku} - {self.status}"
