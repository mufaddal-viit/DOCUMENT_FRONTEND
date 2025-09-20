import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import { login as apiLogin } from "../lib/api";
// import { setToken } from "../lib/auth";
import { ROLES } from "../lib/constants";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const { login: setUser } = useContext(AuthContext);
  const { login } = useContext(AuthContext);
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // const response = await apiLogin({ email, password });
      // const { user, token } = response.data;
      // alert(token);
      await login(email, password); //call from AuthContext
      // setToken(token);
      // setUser({ id: user.id, role: user.role });
      // alert("success");
      // navigate(
      //   user.role === ROLES.UPLOADER
      //     ? "/dashboard/uploader"
      //     : "/dashboard/signer"
      // );
      alert("SUCCESS :)");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">LOGIN PAGE</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-800"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 font-bold text-white py-2 rounded-md hover:bg-gray-600 transition duration-200"
          >
            LOGIN
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600 font-bold">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
export default Login;
