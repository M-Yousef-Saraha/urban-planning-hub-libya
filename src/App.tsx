import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import LibrarySimple from "./pages/LibrarySimple";
import ErrorBoundary from "@/components/ErrorBoundary";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import DashboardOverview from "./pages/admin/DashboardOverview";
import DocumentsAdmin from "./pages/admin/DocumentsAdmin";
import MediaAdmin from "./pages/admin/MediaAdmin";
import NewsAdmin from "./pages/admin/NewsAdmin";
import RequestsManagement from "./pages/admin/RequestsManagement";
import DownloadsView from "./pages/admin/DownloadsView";
import UserManagement from "./pages/admin/UserManagement";
import SystemSettings from "./pages/admin/SystemSettings";
import MediaManagement from "./pages/admin/MediaManagement";
import AnalyticsDashboard from "./pages/admin/AnalyticsDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <ErrorBoundary>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/library" element={<LibrarySimple />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardOverview />} />
                <Route path="requests" element={<RequestsManagement />} />
                <Route path="documents" element={<DocumentsAdmin />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="downloads" element={<DownloadsView />} />
                <Route path="media" element={<MediaManagement />} />
                <Route path="news" element={<NewsAdmin />} />
                <Route path="settings" element={<SystemSettings />} />
                <Route path="analytics" element={<AnalyticsDashboard />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
