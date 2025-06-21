from rest_framework import serializers
from .models import ActivityLog, LoginAttempt


class ActivityLogSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    object_type = serializers.SerializerMethodField()
    
    class Meta:
        model = ActivityLog
        fields = [
            'id', 'user', 'action', 'object_type', 'object_id', 
            'object_repr', 'changes', 'timestamp', 'ip_address', 'user_agent'
        ]
    
    def get_user(self, obj):
        return {
            'id': obj.user.id,
            'username': obj.user.username,
            'email': obj.user.email,
            'full_name': obj.user.get_full_name(),
        }
    
    def get_object_type(self, obj):
        if obj.content_type:
            return obj.content_type.model
        return None


class LoginAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginAttempt
        fields = [
            'id', 'username', 'ip_address', 'user_agent', 
            'success', 'timestamp', 'failure_reason'
        ]