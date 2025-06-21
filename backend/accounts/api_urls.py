from django.urls import path
from .views import (
    UserListCreateView, UserDetailView, RoleListCreateView, 
    RoleDetailView, PermissionListView, toggle_user_status
)

urlpatterns = [
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('users/<int:pk>/toggle-status/', toggle_user_status, name='toggle-user-status'),
    path('roles/', RoleListCreateView.as_view(), name='role-list-create'),
    path('roles/<int:pk>/', RoleDetailView.as_view(), name='role-detail'),
    path('permissions/', PermissionListView.as_view(), name='permission-list'),
]