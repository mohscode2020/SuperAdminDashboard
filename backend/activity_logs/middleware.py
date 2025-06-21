import json
from django.utils.deprecation import MiddlewareMixin
from django.contrib.auth import get_user_model
from .models import ActivityLog

User = get_user_model()


class ActivityLogMiddleware(MiddlewareMixin):
    """Middleware to automatically log user activities"""
    
    def __init__(self, get_response):
        self.get_response = get_response
        super().__init__(get_response)
    
    def process_view(self, request, view_func, view_args, view_kwargs):
        # Store original request data for comparison
        if hasattr(request, 'user') and request.user.is_authenticated:
            if request.method in ['POST', 'PUT', 'PATCH', 'DELETE']:
                request._original_data = getattr(request, 'data', {})
        return None
    
    def process_response(self, request, response):
        # Log activity after successful requests
        if (hasattr(request, 'user') and 
            request.user.is_authenticated and 
            200 <= response.status_code < 300):
            
            self._log_activity(request, response)
        
        return response
    
    def _log_activity(self, request, response):
        """Log user activity based on request"""
        user = request.user
        path = request.path
        method = request.method
        
        # Skip logging for certain paths
        skip_paths = [
            '/api/auth/profile/',
            '/api/activity-logs/',
            '/admin/jsi18n/',
        ]
        
        if any(skip_path in path for skip_path in skip_paths):
            return
        
        # Determine action based on method and path
        action = self._determine_action(method, path)
        if not action:
            return
        
        # Get object information if available
        obj = None
        changes = {}
        
        if hasattr(request, 'resolver_match') and request.resolver_match:
            view_kwargs = request.resolver_match.kwargs
            if 'pk' in view_kwargs:
                obj = self._get_object_from_path(path, view_kwargs['pk'])
        
        # Get changes for update operations
        if method in ['PUT', 'PATCH'] and hasattr(request, '_original_data'):
            changes = self._get_changes(request._original_data, response)
        
        # Create activity log
        ActivityLog.log_activity(
            user=user,
            action=action,
            obj=obj,
            changes=changes,
            request=request
        )
    
    def _determine_action(self, method, path):
        """Determine action based on HTTP method and path"""
        if method == 'POST':
            if 'login' in path:
                return 'login'
            return 'create'
        elif method in ['PUT', 'PATCH']:
            return 'update'
        elif method == 'DELETE':
            return 'delete'
        elif method == 'GET' and any(endpoint in path for endpoint in ['/users/', '/roles/']):
            return 'view'
        return None
    
    def _get_object_from_path(self, path, pk):
        """Get object based on path and primary key"""
        try:
            if '/users/' in path:
                return User.objects.get(pk=pk)
            # Add other model lookups as needed
        except:
             # noqa
            pass
        return None
    
    def _get_changes(self, original_data, response):
        """Extract changes from request and response"""
        changes = {}
        try:
            if hasattr(response, 'data') and isinstance(response.data, dict):
                # Compare original data with response data
                for key, value in original_data.items():
                    if key in response.data and response.data[key] != value:
                        changes[key] = {
                            'old': value,
                            'new': response.data[key]
                        }
        except: # noqa
            pass
        return changes