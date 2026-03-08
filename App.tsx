import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import MethodologyBuilder from "./pages/MethodologyBuilder";
import LiteratureAnalysis from "./pages/LiteratureAnalysis";
import GapDetection from "./pages/GapDetection";
import GrantGenerator from "./pages/GrantGenerator";
import TrendAnalysis from "./pages/TrendAnalysis";


import NoveltyCheck from "./pages/NoveltyCheck";

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/literature"
            element={
              <ProtectedRoute>
                <LiteratureAnalysis />
              </ProtectedRoute>
            }
          />

          <Route
            path="/gap-detection"
            element={
              <ProtectedRoute>
                <GapDetection />
              </ProtectedRoute>
            }
          />

          <Route
            path="/novelty"
            element={
              <ProtectedRoute>
                <NoveltyCheck />
              </ProtectedRoute>
            }
          />

          <Route
            path="/methodology"
            element={
              <ProtectedRoute>
                <MethodologyBuilder />
              </ProtectedRoute>
            }
          />

          <Route
            path="/grant-generator"
            element={
              <ProtectedRoute>
                <GrantGenerator />
              </ProtectedRoute>
            }
          />

          <Route
            path="/trends"
            element={
              <ProtectedRoute>
                <TrendAnalysis />
              </ProtectedRoute>
            }
          />


          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;