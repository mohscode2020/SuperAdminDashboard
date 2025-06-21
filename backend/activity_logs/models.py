from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
import json

User = get_user_model()


class ActivityLog(models.Model):
    """Model to track all user activities"""
    
    ACTION_CHOICES = [
        ('create', 'Create'),
        ('update', 'Update'),
        ('delete', 'Delete'),
        ('login', 'Login'),
        ('logout', 'Logout'),
        ('view', 'View'),
        ('export', 'Export'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activity_logs')
    action = models.CharField(max_length=20, choices=ACTION_CHOICES)
    
    # Generic foreign key to track any model
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True, blank=True)
    object_id = models.PositiveIntegerField(null=True, blank=True)
    content_object = GenericForeignKey('content_type', 'object_id')
    
    object_repr = models.CharField(max_length=200, blank=True)
    changes = models.JSONField(default=dict, blank=True)
    
    timestamp = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    
    class Meta:
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['user', '-timestamp']),
            models.Index(fields=['action', '-timestamp']),
            models.Index(fields=['content_type', '-timestamp']),
        ]
    
    def __str__(self):
        return f"{self.user.username} {self.action} {self.object_repr} at {self.timestamp}"
    
    @classmethod
    def log_activity(cls, user, action, obj=None, changes=None, request=None):
        """Helper method to create activity logs"""
        log_data = {
            'user': user,
            'action': action,
        }
        
        if obj:
            log_data.update({
                'content_object': obj,
                'object_repr': str(obj)[:200],
            })
        
        if changes:
            log_data['changes'] = changes
        
        if request:
            log_data.update({
                'ip_address': cls.get_client_ip(request),
                'user_agent': request.META.get('HTTP_USER_AGENT', '')[:500],
            })
        
        return cls.objects.create(**log_data)
    
    @staticmethod
    def get_client_ip(request):
        """Get client IP address from request"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip


class LoginAttempt(models.Model):
    """Model to track login attempts"""
    
    username = models.CharField(max_length=150)
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True)
    success = models.BooleanField()
    timestamp = models.DateTimeField(auto_now_add=True)
    failure_reason = models.CharField(max_length=200, blank=True)
    
    class Meta:
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['username', '-timestamp']),
            models.Index(fields=['ip_address', '-timestamp']),
            models.Index(fields=['success', '-timestamp']),
        ]
    
    def __str__(self):
        status = "Success" if self.success else "Failed"
        return f"{self.username} - {status} at {self.timestamp}"