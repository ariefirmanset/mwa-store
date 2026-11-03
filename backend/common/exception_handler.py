from django.core.exceptions import PermissionDenied as DjangoPermissionDenied
from django.http import Http404
from rest_framework import status
from rest_framework.exceptions import (
    APIException,
    AuthenticationFailed,
    NotAuthenticated,
    NotFound,
    PermissionDenied,
    ValidationError,
)
from rest_framework.views import exception_handler

from .exceptions import BaseCustomException

AUTH_CODE_MAP = {
    "no_active_account": ("INVALID_CREDENTIALS", "Email atau password salah"),
    "authentication_failed": ("INVALID_CREDENTIALS", "Email atau password salah"),
    "not_authenticated": ("NOT_AUTHENTICATED", "Silakan login terlebih dahulu"),
    "token_not_valid": ("TOKEN_INVALID", "Token tidak valid / expired"),
}


def _flatten_error(error):
    if isinstance(error, (list, tuple)):
        messages = [_flatten_error(e) for e in error]
        return messages[0] if len(messages) == 1 else messages
    if isinstance(error, dict):
        return {k: _flatten_error(v) for k, v in error.items()}
    return str(error)


def _error(message, code):
    return {"status": "error", "message": message, "code": code}


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is None:
        return None  # biarkan Django yang nangani 500

    # 1. Custom exception bisnis
    if isinstance(exc, BaseCustomException):
        response.data = _error(str(exc.detail), exc.code)
        return response

    # 2. Validasi serializer (400)
    if isinstance(exc, ValidationError):
        if isinstance(response.data, dict):
            errors = {f: _flatten_error(e) for f, e in response.data.items()}
        else:
            errors = {"detail": _flatten_error(response.data)}
        response.data = {
            **_error("Validasi gagal", "VALIDATION_ERROR"),
            "errors": errors,
        }
        return response

    # 3. Auth (401)
    if isinstance(exc, (NotAuthenticated, AuthenticationFailed)):
        err_code = exc.get_codes()
        if not isinstance(err_code, str):
            err_code = None
        code, message = AUTH_CODE_MAP.get(
            err_code, ("TOKEN_INVALID", "Token tidak valid / expired")
        )
        response.data = _error(message, code)
        return response

    # 4. Hak akses (403), termasuk PermissionDenied bawaan Django
    if isinstance(exc, (PermissionDenied, DjangoPermissionDenied)):
        response.data = _error("User tidak punya akses", "FORBIDDEN")
        return response

    # 5. 404, termasuk Http404 dari get_object_or_404
    if isinstance(exc, (NotFound, Http404)):
        response.data = _error("Data tidak ditemukan", "NOT_FOUND")
        return response

    # 6. Fallback generik (MethodNotAllowed, Throttled, ParseError, dll.)
    if isinstance(exc, APIException):
        response.data = _error(str(exc.detail), exc.default_code.upper())

    return response
