from django.db import models
from django.conf import settings
from apps.products.models import ProductVariant 
from django.core.validators import MinValueValidator

# Create your models here.
class Cart(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.user)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product_variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
    qty = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['cart','product_variant'], name='unique_cart_cart_product_variant')
        ]
    
    def __str__(self):
        return f"{self.cart.user} - {self.product_variant.sku}"