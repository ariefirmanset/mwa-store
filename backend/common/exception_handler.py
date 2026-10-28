from rest_framework.views import exception_handler 
from rest_framework import status
from rest_framework.exceptions import (
    ValidationError,
    AuthenticationFailed,
    NotAuthenticated,
    PermissionDenied,
    NotFound,
)
from .exceptions import BaseCustomException


def _flatten_error(detail):
    """Helper untuk mengambil pesan error string pertama secara rekursif."""
    if isinstance(detail, list) and detail:
        return _flatten_error(detail[0])
    if isinstance(detail, dict):
        return {k: _flatten_error(v) for k, v in detail.items()}
    return str(detail)


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        # 1. Custom Exception Bisnis (Produk, Order, Stok, dll.)
        if isinstance(exc, BaseCustomException):
            response.data = {
                "status": "error",
                "message": exc.detail,
                "code": exc.code,
            }
            return response

        # 2. Error Validasi Serializer (HTTP 400)
        if isinstance(exc, ValidationError):
            formatted_errors = {}
            if isinstance(response.data, dict):
                for field, error_list in response.data.items():
                    formatted_errors[field] = _flatten_error(error_list)
            elif isinstance(response.data, list):
                formatted_errors["detail"] = _flatten_error(response.data[0])

            response.status_code = status.HTTP_400_BAD_REQUEST
            response.data = {
                "status": "error",
                "message": "Validasi gagal",
                "code": "VALIDATION_ERROR",
                "errors": formatted_errors,
            }
            return response

        # 3. Auth & Kredensial (HTTP 401)
        if isinstance(exc, (NotAuthenticated, AuthenticationFailed)):
            # Cek apakah pemicunya adalah kredensial login yang salah
            err_code = getattr(exc, "code", None) or getattr(exc, "default_code", None)
            
            if err_code == "invalid_credentials" or "password" in str(exc.detail).lower():
                code = "INVALID_CREDENTIALS"
                message = "Password salah"
            else:
                code = "TOKEN_EXPIRED"
                message = "Token tidak valid / expired"

            response.status_code = status.HTTP_401_UNAUTHORIZED
            response.data = {
                "status": "error",
                "message": message,
                "code": code,
            }
            return response

        # 4. Hak Akses (HTTP 403)
        if isinstance(exc, PermissionDenied):
            response.data = {
                "status": "error",
                "message": "User tidak punya akses",
                "code": "FORBIDDEN",
            }
            return response

        # 5. Generic 404 (NotFound bawaan DRF / Http404)
        if isinstance(exc, NotFound):
            response.data = {
                "status": "error",
                "message": str(exc.detail) if exc.detail else "Data tidak ditemukan",
                "code": getattr(exc, "default_code", "not_found").upper(),
            }
            return response

    return response