import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { PermissionProvider } from './contexts/PermissionContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import RoleManagement from './pages/RoleManagement';
import Analytics from './pages/Analytics';
import ContentManagement from './pages/ContentManagement';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import Security from './pages/Security';
import APIManagement from './pages/APIManagement';
import ActivityLogs from './pages/ActivityLogs';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Dynamic pages
import ProductsList from './pages/dynamic/ProductsList';
import MarketingList from './pages/dynamic/MarketingList';
import OrderList from './pages/dynamic/OrderList';
import MediaPlans from './pages/dynamic/MediaPlans';
import CustomerSupport from './pages/dynamic/CustomerSupport';
import InventoryManagement from './pages/dynamic/InventoryManagement';
import SalesReports from './pages/dynamic/SalesReports';
import ContentLibrary from './pages/dynamic/ContentLibrary';
import TeamCollaboration from './pages/dynamic/TeamCollaboration';
import ProjectManagement from './pages/dynamic/ProjectManagement';

function App() {
  return (
    <AuthProvider>
      <PermissionProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Routes>
                        <Route path="/dashboard" element={
                          <ProtectedRoute requiredPage="dashboard">
                            <Dashboard />
                          </ProtectedRoute>
                        } />
                        <Route path="/users" element={
                          <ProtectedRoute requiredPage="users">
                            <UserManagement />
                          </ProtectedRoute>
                        } />
                        <Route path="/roles" element={
                          <ProtectedRoute requiredPage="roles">
                            <RoleManagement />
                          </ProtectedRoute>
                        } />
                        <Route path="/analytics" element={
                          <ProtectedRoute requiredPage="analytics">
                            <Analytics />
                          </ProtectedRoute>
                        } />
                        <Route path="/content" element={
                          <ProtectedRoute requiredPage="content">
                            <ContentManagement />
                          </ProtectedRoute>
                        } />
                        <Route path="/reports" element={
                          <ProtectedRoute requiredPage="reports">
                            <Reports />
                          </ProtectedRoute>
                        } />
                        <Route path="/notifications" element={
                          <ProtectedRoute requiredPage="notifications">
                            <Notifications />
                          </ProtectedRoute>
                        } />
                        <Route path="/security" element={
                          <ProtectedRoute requiredPage="security">
                            <Security />
                          </ProtectedRoute>
                        } />
                        <Route path="/api" element={
                          <ProtectedRoute requiredPage="api">
                            <APIManagement />
                          </ProtectedRoute>
                        } />
                        <Route path="/activity" element={
                          <ProtectedRoute requiredPage="activity">
                            <ActivityLogs />
                          </ProtectedRoute>
                        } />
                        <Route path="/settings" element={
                          <ProtectedRoute requiredPage="settings">
                            <Settings />
                          </ProtectedRoute>
                        } />
                        
                        {/* Dynamic Pages */}
                        <Route path="/products" element={
                          <ProtectedRoute requiredPage="products">
                            <ProductsList />
                          </ProtectedRoute>
                        } />
                        <Route path="/marketing" element={
                          <ProtectedRoute requiredPage="marketing">
                            <MarketingList />
                          </ProtectedRoute>
                        } />
                        <Route path="/orders" element={
                          <ProtectedRoute requiredPage="orders">
                            <OrderList />
                          </ProtectedRoute>
                        } />
                        <Route path="/media-plans" element={
                          <ProtectedRoute requiredPage="media-plans">
                            <MediaPlans />
                          </ProtectedRoute>
                        } />
                        <Route path="/support" element={
                          <ProtectedRoute requiredPage="support">
                            <CustomerSupport />
                          </ProtectedRoute>
                        } />
                        <Route path="/inventory" element={
                          <ProtectedRoute requiredPage="inventory">
                            <InventoryManagement />
                          </ProtectedRoute>
                        } />
                        <Route path="/sales-reports" element={
                          <ProtectedRoute requiredPage="sales-reports">
                            <SalesReports />
                          </ProtectedRoute>
                        } />
                        <Route path="/content-library" element={
                          <ProtectedRoute requiredPage="content-library">
                            <ContentLibrary />
                          </ProtectedRoute>
                        } />
                        <Route path="/team" element={
                          <ProtectedRoute requiredPage="team">
                            <TeamCollaboration />
                          </ProtectedRoute>
                        } />
                        <Route path="/projects" element={
                          <ProtectedRoute requiredPage="projects">
                            <ProjectManagement />
                          </ProtectedRoute>
                        } />
                      </Routes>
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Toaster position="top-right" />
          </div>
        </Router>
      </PermissionProvider>
    </AuthProvider>
  );
}

export default App;