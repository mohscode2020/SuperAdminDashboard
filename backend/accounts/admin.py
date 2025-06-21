from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Permission
from .models import User, Role


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'created_at']
    list_filter = ['created_at', 'updated_at']
    search_fields = ['name', 'description']
    filter_horizontal = ['permissions']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'email', 'first_name', 'last_name', 'role', 'is_active', 'is_staff', 'created_at']
    list_filter = ['is_active', 'is_staff', 'is_superuser', 'role', 'created_at']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    ordering = ['-created_at']
    readonly_fields = ['created_at', 'updated_at', 'last_login', 'date_joined']
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Additional Info', {
            'fields': ('role', 'created_at', 'updated_at')
        }),
    )
    
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Additional Info', {
            'fields': ('email', 'first_name', 'last_name', 'role')
        }),
    )


# Register Permission model for easier management
@admin.register(Permission)
class PermissionAdmin(admin.ModelAdmin):
    list_display = ['name', 'codename', 'content_type']
    list_filter = ['content_type']
    search_fields = ['name', 'codename']