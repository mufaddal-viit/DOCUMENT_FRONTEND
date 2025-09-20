import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, allowedRole }) {
  //   const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;
  const decoded = jwtDecode(token);
  if (decoded.role !== allowedRole) {
    return (
      <Navigate
        to={
          decoded.role === "UPLOADER"
            ? "/dashboard/uploader"
            : "/dashboard/signer"
        }
      />
    );
  }
  return children;
}
export default ProtectedRoute;
