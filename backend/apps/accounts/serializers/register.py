import uuid
from ..models import User, Role
from rest_framework import serializers

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {'read_only': True},
        }

    def create(self, validated_data):
        email=validated_data['email']
        
        # 1. Buat base username dari bagian depan email (sebelum tanda @)
        base_username = email.split('@')[0]

        # 2. Tambahkan string unik pendek di belakangnya agar tidak pernah bentrok
        unique_suffix = uuid.uuid4().hex[:6]

        # 3. Simpan user dengan username hasil generate otomatis
        generate_username = f"{base_username}_{unique_suffix}"
        
        customer_role, _ = Role.objects.get_or_create(name='customer')

        user = User.objects.create_user(
            email=email,
            username=generate_username,
            password=validated_data['password'],
            role=customer_role
        )   
        return user