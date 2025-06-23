# SuperAdminDashboard

A comprehensive Super Admin Dashboard with User Access Control using React for the frontend and Django for the backend. The system allows a super admin to create user accounts, assign page access permissions, and track modification history.

## 🚀 Features

### Frontend (React)
- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Authentication**: JWT-based authentication with automatic token refresh
- **User Management**: Create, edit, delete, and manage user accounts
- **Role Management**: Create and assign roles with specific permissions
- **Activity Tracking**: Real-time activity logs and user behavior tracking
- **Permission-Based Access**: Route protection based on user permissions
- **Responsive Design**: Mobile-friendly interface
- **Toast Notifications**: User feedback for all actions

### Backend (Django)
- **Django REST Framework**: RESTful API architecture
- **JWT Authentication**: Secure token-based authentication
- **Custom User Model**: Extended user model with role support
- **Role-Based Access Control**: Flexible permission system
- **Activity Logging**: Comprehensive activity tracking middleware
- **Admin Interface**: Django admin for backend management
- **Database Agnostic**: Works with SQLite (default) or PostgreSQL

## 🛠️ Technology Stack

### Frontend
- React 18 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- React Hook Form for form handling
- React Hot Toast for notifications
- Lucide React for icons

### Backend
- Django 4.2
- Django REST Framework
- Django REST Framework SimpleJWT
- Django CORS Headers
- Python Decouple for environment variables
- SQLite (default) / PostgreSQL support

## 📋 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- pip (Python package manager)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment configuration**
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

5. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start development server**
   ```bash
   python manage.py runserver
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## 🔐 Default Permissions

The system creates the following default permissions:
- `manage_users`: Can create, edit, and delete users
- `manage_roles`: Can create, edit, and delete roles
- `view_logs`: Can view activity logs
- `manage_permissions`: Can manage system permissions

## 👥 Default Roles

Three default roles are created:
1. **Super Admin**: Full access to all features
2. **Admin**: Can manage users and view logs
3. **Manager**: Can view logs only

## 🔍 API Endpoints

### Authentication
- `POST /api/auth/login/` - User login
- `POST /api/auth/token/refresh/` - Refresh JWT token
- `GET /api/auth/profile/` - Get user profile
- `POST /api/auth/change-password/` - Change password

### User Management
- `GET /api/users/` - List users
- `POST /api/users/` - Create user
- `GET /api/users/{id}/` - Get user details
- `PATCH /api/users/{id}/` - Update user
- `DELETE /api/users/{id}/` - Delete user
- `POST /api/users/{id}/toggle-status/` - Toggle user status

### Role Management
- `GET /api/roles/` - List roles
- `POST /api/roles/` - Create role
- `GET /api/roles/{id}/` - Get role details
- `PATCH /api/roles/{id}/` - Update role
- `DELETE /api/roles/{id}/` - Delete role

### Activity Logs
- `GET /api/activity-logs/` - List activity logs
- `GET /api/login-attempts/` - List login attempts

### Permissions
- `GET /api/permissions/` - List all permissions

## 🎯 Key Features Breakdown

### User Access Control
- **Role-based permissions**: Users are assigned roles with specific permissions
- **Route protection**: Frontend routes are protected based on user permissions
- **Dynamic navigation**: Menu items appear based on user permissions
- **Permission inheritance**: Users inherit permissions from their assigned roles

### Activity Tracking
- **Automatic logging**: All user actions are automatically logged
- **Detailed information**: Logs include user, action, timestamp, IP address, and changes
- **Filterable logs**: Activity logs can be filtered by user, action, and date
- **Login attempts**: Failed and successful login attempts are tracked

### User Management
- **CRUD operations**: Full create, read, update, delete functionality
- **User status**: Users can be activated/deactivated
- **Profile management**: Users can update their own profiles
- **Password management**: Secure password change functionality

## 🚧 Challenges Faced and Solutions

### 1. **JWT Token Management**
**Challenge**: Handling token expiration and refresh seamlessly
**Solution**: Implemented automatic token refresh using Axios interceptors

### 2. **Permission System Design**
**Challenge**: Creating a flexible permission system that works with both Django and React
**Solution**: Custom permission classes in Django and context-based permission checking in React

### 3. **Activity Logging**
**Challenge**: Automatically tracking all user activities without manual intervention
**Solution**: Custom Django middleware that intercepts requests and logs activities

### 4. **Real-time UI Updates**
**Challenge**: Keeping the UI in sync with backend changes
**Solution**: Optimistic updates with proper error handling and data refetching

### 5. **Form Validation**
**Challenge**: Consistent validation between frontend and backend
**Solution**: React Hook Form with custom validation rules matching Django serializers

### 6. **Responsive Design**
**Challenge**: Creating a dashboard that works well on all devices
**Solution**: Mobile-first approach with Tailwind CSS responsive utilities

## 🔧 Development Commands

### Backend
```bash
# Run tests
python manage.py test

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic

# Create superuser
python manage.py createsuperuser
```

### Frontend
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📝 Environment Variables

### Backend (.env)
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173,http://127.0.0.1:5173
```

## 🚀 Production Deployment

### Backend
1. Set `DEBUG=False` in environment variables
2. Configure proper database (PostgreSQL recommended)
3. Set up static file serving
4. Configure CORS for production domain
5. Use environment variables for sensitive data

### Frontend
1. Build the application: `npm run build`
2. Serve the `dist` folder using a web server
3. Configure API base URL for production

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository.