from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.utils.translation import gettext_lazy as _


class Role(models.Model):
    """Custom role model for better role management"""
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    permissions = models.ManyToManyField(Permission, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class User(AbstractUser):
    """Extended user model with additional fields"""
    email = models.EmailField(_('email address'), unique=True)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.username} ({self.email})"

    def get_all_permissions(self, obj=None):
        """Get all permissions including role permissions"""
        permissions = set(super().get_all_permissions(obj))
        
        if self.role:
            role_permissions = self.role.permissions.all()
            permissions.update(perm.codename for perm in role_permissions)
        
        return permissions

    def has_perm(self, perm, obj=None):
        """Check if user has permission including role permissions"""
        if super().has_perm(perm, obj):
            return True
        
        if self.role:
            role_permissions = self.role.permissions.values_list('codename', flat=True)
            return perm in role_permissions
        
        return False

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()