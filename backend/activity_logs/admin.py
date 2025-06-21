from django.contrib import admin
from .models import ActivityLog, LoginAttempt


@admin.register(ActivityLog)
class ActivityLogAdmin(admin.ModelAdmin):
    list_display = ['user', 'action', 'object_repr', 'timestamp', 'ip_address']
    list_filter = ['action', 'timestamp', 'content_type']
    search_fields = ['user__username', 'user__email', 'object_repr', 'ip_address']
    readonly_fields = ['user', 'action', 'content_type', 'object_id', 'object_repr', 
                      'changes', 'timestamp', 'ip_address', 'user_agent']
    date_hierarchy = 'timestamp'
    
    def has_add_permission(self, request):
        return False
    
    def has_change_permission(self, request, obj=None):
        return False


@admin.register(LoginAttempt)
class LoginAttemptAdmin(admin.ModelAdmin):
    list_display = ['username', 'success', 'ip_address', 'timestamp']
    list_filter = ['success', 'timestamp']
    search_fields = ['username', 'ip_address']
    readonly_fields = ['username', 'ip_address', 'user_agent', 'success', 
                      'timestamp', 'failure_reason']
    date_hierarchy = 'timestamp'
    
    def has_add_permission(self, request):
        return False
    
    def has_change_permission(self, request, obj=None):
        return False