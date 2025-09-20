import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getDocuments, createAssignment } from "../lib/api";
import DocumentUpload from "../components/DocumentUpload";
import Sections from "../components/Sections";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export default function UploaderDashboard() {
  const [documents, setDocuments] = useState([]);
  const [signerEmail, setSignerEmail] = useState("");
  const [error, setError] = useState("");
  const { user, logout } = useContext(AuthContext);
  // const navigate = useNavigate();
  // console.log(user.name);

  //fetch documents for this user.
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await getDocuments();
        const documentsArray = response.data.documents;
        // console.log(documentsArray);
        setDocuments(documentsArray);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch documents");
      }
    };
    fetchDocuments();
  }, []);

  //remove Error notification after 3 sec
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [error]);

  // document assign method
  const handleAssign = async (documentId) => {
    if (!signerEmail) {
      setError("Please enter a Signer email");
      return;
    }
    try {
      //("/api/assignments")  ..lib/api file
      await createAssignment({ documentId, signerEmail });
      setSignerEmail("");
      setError("");
      //fetch remaining documents for displaying on dashboard
      const response = await getDocuments();
      setDocuments(response.data.documents);
    } catch (err) {
      setError(err.response?.data?.message || "Assignment failed");
    }
  };

  return (
    <div className="min-h-screen  p-2 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-400">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-6 border-b rounded-2xl px-4 p-2">
          <h1 className="text-2xl font-bold text-gray-800">
            Uploader Dashboard
          </h1>

          <div className="flex items-center space-x-4 text-gray-700 font-medium">
            <div className="relative  group  flex items-center space-x-2 cursor-pointer">
              <FaUserCircle className="text-3xl text-gray-800 group-hover:text-yellow-400" />
              <p className="text-xl text-gray-800">{user?.name || "User"}</p>
              {/* <p title={user?.email || "No email"}>{user?.name || "User"}</p> */}
              <div className="absolute top-8 p-0.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 text-white text-sm px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                {user?.email || "No email"}
              </div>
            </div>

            <button
              onClick={logout}
              className="hover:bg-yellow-400 relative group cursor-pointer text-red-600 hover:text-red-700 p-2 rounded-2xl transition-all hover:scale-110"
            >
              <FiLogOut className="text-2xl" />

              {/* Tooltip */}
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 whitespace-nowrap pointer-events-none">
                Logout
              </div>
            </button>
          </div>
        </header>

        <Sections />
        {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}
        {error && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-6 py-3 rounded-md shadow-lg animate-fade-in-out">
            {error}
          </div>
        )}
        {/* //COMPONENT FOR UPLOADING THE DOCUMENT */}
        <DocumentUpload />
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Your Documents
          </h2>

          {documents.length === 0 ? (
            <p className="text-gray-500 italic">No documents uploaded yet.</p>
          ) : (
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc._id}
                  className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">Document ID</p>
                    <p className="text-md font-medium text-gray-800">
                      {doc._id}
                    </p>
                  </div>

                  <div className="mb-2">
                    <p className="text-sm text-gray-500">Status</p>
                    <span
                      className={`inline-block px-3 mt-1 py-1 text-sm rounded-full font-semibold ${
                        doc.status === "PENDING"
                          ? "bg-yellow-400 text-gray-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>

                  <div className="mb-2">
                    <span className="text-sm text-gray-500">Document URL</span>
                    <a
                      href={doc.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-3 text-sm text-blue-600 relative inline-block after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      View PDF
                    </a>
                  </div>

                  <div className=" flex flex-col sm:flex-row items-start sm:items-center sm:space-x-3 space-y-3 sm:space-y-0">
                    <input
                      type="email"
                      placeholder="Enter signer email"
                      value={signerEmail}
                      onChange={(e) => setSignerEmail(e.target.value)}
                      className="w-full sm:w-auto flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                      onClick={() => handleAssign(doc._id)}
                      className="bg-gray-800 text-white px-5 py-2 rounded-md hover:bg-gray-600 transition duration-200"
                    >
                      Assign
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
