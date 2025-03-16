import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { getUser } from "../services/auth";
import GovernmentDashboard from "../pages/GovernmentDashboard";
import NGODashboard from "../pages/NGODashboard";
import MedicalDashboard from "../pages/MedicalDashboard";
import LogisticsDashboard from "../pages/LogisticsDashboard";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";

const ProtectedRoute = ({ element, role }) => {
  const user = getUser();
  if (!user || user.role !== role) {
    return <Navigate to="/" replace />;
  }
  return element;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/government"
          element={
            <ProtectedRoute
              element={<GovernmentDashboard />}
              role="government"
            />
          }
        />
        <Route
          path="/ngo"
          element={<ProtectedRoute element={<NGODashboard />} role="ngo" />}
        />
        <Route
          path="/medical"
          element={
            <ProtectedRoute element={<MedicalDashboard />} role="medical" />
          }
        />
        <Route
          path="/logistics"
          element={
            <ProtectedRoute element={<LogisticsDashboard />} role="logistics" />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
