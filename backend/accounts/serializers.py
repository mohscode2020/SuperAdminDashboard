from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import Permission
from .models import User, Role


class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ['id', 'name', 'codename', 'content_type']


class RoleSerializer(serializers.ModelSerializer):
    permissions = PermissionSerializer(many=True, read_only=True)
    permission_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Role
        fields = ['id', 'name', 'description', 'permissions', 'permission_ids', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

    def create(self, validated_data):
        permission_ids = validated_data.pop('permission_ids', [])
        role = Role.objects.create(**validated_data)
        if permission_ids:
            permissions = Permission.objects.filter(id__in=permission_ids)
            role.permissions.set(permissions)
        return role

    def update(self, instance, validated_data):
        permission_ids = validated_data.pop('permission_ids', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if permission_ids is not None:
            permissions = Permission.objects.filter(id__in=permission_ids)
            instance.permissions.set(permissions)
        
        return instance


class UserSerializer(serializers.ModelSerializer):
    role = RoleSerializer(read_only=True)
    role_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    permissions = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'is_active', 'is_staff', 'is_superuser', 'role', 'role_id',
            'permissions', 'date_joined', 'last_login', 'password'
        ]
        read_only_fields = ['date_joined', 'last_login']

    def get_permissions(self, obj):
        """Get all user permissions including role permissions"""
        permissions = set()
        
        # Add user permissions
        user_permissions = obj.user_permissions.values_list('codename', flat=True)
        permissions.update(user_permissions)
        
        # Add role permissions
        if obj.role:
            role_permissions = obj.role.permissions.values_list('codename', flat=True)
            permissions.update(role_permissions)
        
        # Add superuser permissions
        if obj.is_superuser:
            permissions.update(['manage_users', 'manage_roles', 'view_logs', 'manage_permissions'])
        
        return list(permissions)

    def create(self, validated_data):
        role_id = validated_data.pop('role_id', None)
        password = validated_data.pop('password')
        
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        
        if role_id:
            try:
                role = Role.objects.get(id=role_id)
                user.role = role
            except Role.DoesNotExist:
                pass
        
        user.save()
        return user

    def update(self, instance, validated_data):
        role_id = validated_data.pop('role_id', None)
        password = validated_data.pop('password', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        if password:
            instance.set_password(password)
        
        if role_id is not None:
            if role_id:
                try:
                    role = Role.objects.get(id=role_id)
                    instance.role = role
                except Role.DoesNotExist:
                    pass
            else:
                instance.role = None
        
        instance.save()
        return instance


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError('Invalid credentials')
            if not user.is_active:
                raise serializers.ValidationError('User account is disabled')
            attrs['user'] = user
            return attrs
        else:
            raise serializers.ValidationError('Must include username and password')


class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField()
    new_password = serializers.CharField()

    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('Current password is incorrect')
        return value

    def validate_new_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError('Password must be at least 8 characters long')
        return value