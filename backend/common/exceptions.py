from rest_framework import status
from rest_framework.exceptions import APIException

class BaseCustomException(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_message = 'Terjadi Kesalahan'
    default_code = 'BAD_REQUEST'
    
    def __init__(self, message=None,code=None,status_code=None):
        self.message = message if message is not None else self.default_message
        self.code = code if code is not None else self.default_code
        if status_code is not None:
            self.status_code = status_code
        super().__init__(detail=self.message, code=self.code) 


# 404 Not Found Scenarios
class ProductNotFoundException(BaseCustomException):
    status_code = status.HTTP_404_NOT_FOUND
    default_message = 'Produk tidak ditemukan'
    default_code = 'PRODUCT_NOT_FOUND'

class ProductVariantNotFoundException(BaseCustomException):
    status_code = status.HTTP_404_NOT_FOUND
    default_message = 'Varian produk tidak ditemukan'
    default_code = 'PRODUCT_VARIANT_NOT_FOUND'

class ImageNotFoundException(BaseCustomException):
    status_code = status.HTTP_404_NOT_FOUND
    default_message = 'Gambar produk tidak ditemukan'
    default_code = 'IMAGE_NOT_FOUND'

class OrderNotFoundException(BaseCustomException):
    status_code = status.HTTP_404_NOT_FOUND
    default_message = 'Order tidak ditemukan'
    default_code = 'ORDER_NOT_FOUND'


# 404 Bad Request Scenarios
class OutOfStockException(BaseCustomException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_message = 'Stok tidak cukup saat checkout'
    default_code = 'OUT_OF_STOCK'

class OrderCannotBeCancelledException(BaseCustomException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_message = 'Order tidak bisa dibatalkan (status bukan pending)'
    default_code = 'ORDER_CANNOT_BE_CANCELLED'

class InvalidStatusTransitionException(BaseCustomException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_message = 'Perubahan status item tidak valid'
    default_code = 'INVALID_STATUS_TRANSITION'

# 401 & 422 Scenarios
class InvalidCredentialsException(BaseCustomException):
    status_code = status.HTTP_401_UNAUTHORIZED
    default_message = "Password salah"
    default_code = "INVALID_CREDENTIALS"

class EmailAlreadyExistsException(BaseCustomException):
    status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
    default_message = "Email sudah terdaftar"
    default_code = "EMAIL_ALREADY_EXISTS"

