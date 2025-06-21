"""
WSGI config for superadmin project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'superadmin.settings')

application = get_wsgi_application()