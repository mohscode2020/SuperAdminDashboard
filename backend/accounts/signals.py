from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from .models import User, Role


@receiver(post_migrate)
def create_custom_permissions(sender, **kwargs):
    """Create custom permissions after migration"""
    if sender.name == 'accounts':
        # Get or create content type for custom permissions
        content_type, created = ContentType.objects.get_or_create(
            app_label='accounts',
            model='user',
        )
        
        # Define custom permissions
        custom_permissions = [
            ('manage_users', 'Can manage users'),
            ('manage_roles', 'Can manage roles'),
            ('view_logs', 'Can view activity logs'),
            ('manage_permissions', 'Can manage permissions'),
        ]
        
        # Create permissions if they don't exist
        for codename, name in custom_permissions:
            Permission.objects.get_or_create(
                codename=codename,
                name=name,
                content_type=content_type,
            )
        
        # Create default roles if they don't exist
        if not Role.objects.exists():
            # Super Admin role
            super_admin_role, created = Role.objects.get_or_create(
                name='Super Admin',
                defaults={
                    'description': 'Full access to all system features'
                }
            )
            if created:
                all_permissions = Permission.objects.filter(
                    codename__in=['manage_users', 'manage_roles', 'view_logs', 'manage_permissions']
                )
                super_admin_role.permissions.set(all_permissions)
            
            # Admin role
            admin_role, created = Role.objects.get_or_create(
                name='Admin',
                defaults={
                    'description': 'Can manage users and view logs'
                }
            )
            if created:
                admin_permissions = Permission.objects.filter(
                    codename__in=['manage_users', 'view_logs']
                )
                admin_role.permissions.set(admin_permissions)
            
            # Manager role
            manager_role, created = Role.objects.get_or_create(
                name='Manager',
                defaults={
                    'description': 'Can view logs and limited user management'
                }
            )
            if created:
                manager_permissions = Permission.objects.filter(
                    codename__in=['view_logs']
                )
                manager_role.permissions.set(manager_permissions)