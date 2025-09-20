import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to PDF Signing App
        </h1>
        <p className="text-gray-600 mb-6">
          Upload, assign, and sign PDF documents securely.
        </p>
        <div className="space-y-4">
          <Link
            to="/login"
            className="block w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition duration-200"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
