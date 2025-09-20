import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploaderDashboard from "./pages/UploaderDashboard";
import SignerDashboard from "./pages/SignerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard/uploader"
        element={
          <ProtectedRoute allowedRole="UPLOADER">
            <UploaderDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/signer"
        element={
          <ProtectedRoute allowedRole="SIGNER">
            <SignerDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
