import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthLayout from "./components/AuthLayout";
import "./styles/flow.css";
import Dashboard from "./pages/Dashboard";
import Templates from "./pages/Templates";
import {
  Builder,
  DomainSetup,
  GeneratedDraft,
  GuestSite,
  Intake,
  Landing,
  Published,
} from "./pages/WeddingFlow";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/signup" element={<AuthLayout />} />
          <Route path="/login" element={<AuthLayout />} />
          <Route path="/sites/:slug" element={<GuestSite />} />
          <Route path="/intake" element={<Intake />} />
          <Route path="/generating" element={<GeneratedDraft />} />
          <Route path="/builder" element={<Builder />} />1
          <Route
            path="/domain"
            element={
              <ProtectedRoute>
                <DomainSetup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/published"
            element={
              <ProtectedRoute>
                <Published />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;