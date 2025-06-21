from django.urls import path
from .views import ActivityLogListView, LoginAttemptListView

urlpatterns = [
    path('activity-logs/', ActivityLogListView.as_view(), name='activity-log-list'),
    path('login-attempts/', LoginAttemptListView.as_view(), name='login-attempt-list'),
]