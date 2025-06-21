from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import ActivityLog, LoginAttempt
from .serializers import ActivityLogSerializer, LoginAttemptSerializer
from accounts.views import HasPermission


class ActivityLogListView(generics.ListAPIView):
    queryset = ActivityLog.objects.select_related('user', 'content_type').all()
    serializer_class = ActivityLogSerializer
    permission_classes = [permissions.IsAuthenticated, HasPermission('view_logs')]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['action', 'user', 'content_type']
    search_fields = ['user__username', 'user__email', 'object_repr', 'ip_address']
    ordering_fields = ['timestamp', 'action', 'user__username']
    ordering = ['-timestamp']


class LoginAttemptListView(generics.ListAPIView):
    queryset = LoginAttempt.objects.all()
    serializer_class = LoginAttemptSerializer
    permission_classes = [permissions.IsAuthenticated, HasPermission('view_logs')]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['success', 'username']
    search_fields = ['username', 'ip_address']
    ordering_fields = ['timestamp', 'username', 'success']
    ordering = ['-timestamp']