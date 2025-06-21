"""
ASGI config for superadmin project.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'superadmin.settings')

application = get_asgi_application()