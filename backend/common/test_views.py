from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from .exceptions import (
    ProductNotFoundException,
    ProductVariantNotFoundException,
    ImageNotFoundException,
    OrderNotFoundException,
    OutOfStockException,
    OrderCannotBeCancelledException,
    InvalidStatusTransitionException,
    InvalidCredentialsException,
    EmailAlreadyExistsException,
)

# Serializer tiruan untuk menguji validasi form/body request
class DummyValidationSerializer(serializers.Serializer):
    email = serializers.EmailField(error_messages={"invalid": "Format email tidak valid"})
    password = serializers.CharField(min_length=8, error_messages={"min_length": "Password minimal 8 karakter"})

class ErrorTestingView(APIView):
    # Biarkan kosong agar bisa diakses tanpa token (kecuali saat menguji token)
    permission_classes = []

    def get(self, request):
        error_type = request.query_params.get('type')

        # 404 Scenarios
        if error_type == 'product_not_found':
            raise ProductNotFoundException()
        elif error_type == 'variant_not_found':
            raise ProductVariantNotFoundException()
        elif error_type == 'image_not_found':
            raise ImageNotFoundException()
        elif error_type == 'order_not_found':
            raise OrderNotFoundException()

        # 400 Scenarios
        elif error_type == 'out_of_stock':
            raise OutOfStockException()
        elif error_type == 'order_cannot_cancel':
            raise OrderCannotBeCancelledException()
        elif error_type == 'invalid_transition':
            raise InvalidStatusTransitionException()

        # 401 & 422 Scenarios
        elif error_type == 'invalid_credentials':
            raise InvalidCredentialsException()
        elif error_type == 'email_exists':
            raise EmailAlreadyExistsException()

        # 403 Forbidden Scenario
        elif error_type == 'forbidden':
            raise PermissionDenied()

        return Response({"status": "success", "message": "Berikan parameter ?type=... untuk menguji"})

    def post(self, request):
        # Menguji skenario 400 VALIDATION_ERROR multi-field
        serializer = DummyValidationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"status": "success", "data": serializer.data})