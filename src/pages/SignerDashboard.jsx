import { useState, useEffect, useContext, useRef } from "react";

import { AuthContext } from "../context/AuthContext";
import { getAssignments, signDocument } from "../lib/api";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import SectionsSigner from "../components/SectionsSigner";
import SignatureCanvas from "react-signature-canvas";
import Notification from "./Notification";

export default function SignerDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [signature, setSignature] = useState("");
  const [loadingDoc, setLoadingDoc] = useState(null); // <-- track loading doc
  const [error, setError] = useState("");
  const { user, logout } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  // const [notifMsg, setNotifMsg] = useState("");
  const sigCanvasRefs = useRef({});

  // Set username on user load
  useEffect(() => {
    if (user?.name) {
      setUsername(user.name);
    }
  }, [user]);
  // console.log(username);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        //fetch all assigned documents
        const response = await getAssignments();
        // console.log(response.data.assignments[0]);
        setAssignments(response.data.assignments);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch assignments");
      }
    };
    fetchAssignments();
  }, []);
  //remove Error notification after 3 sec
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 2000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [error]);

  // console.log(assignments[0]);
  // const handleSign = async (documentId) => {
  //   // console.log(documentId._id);
  //   const sigPad = sigCanvasRefs.current[documentId._id];
  //   if (!sigPad || sigPad.isEmpty()) {
  //     setError("Please provide a signature");
  //     return;
  //   }

  //   try {
  //     const signature = sigPad.toDataURL("image/png"); // Base64 PNG
  //     const Zresponse = await signDocument(documentId._id, {
  //       //sending this data into body. signature will be taken out and pasted on the 1st page of pdf
  //       signature,
  //       name: user?.name || "Signer",
  //       email: user?.email || "",
  //       date: new Date().toISOString().split("T")[0],
  //     });
  //     // console.log(Zresponse);
  //     alert(Zresponse.data.message);

  //     sigPad.clear();
  //     setError("");
  //     const response = await getAssignments();
  //     setAssignments(response.data.assignments);
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Signing failed");
  //   }
  // };
  const handleSign = async (documentId) => {
    const sigPad = sigCanvasRefs.current[documentId._id];
    if (!sigPad || sigPad.isEmpty()) {
      setError("Please provide a signature");
      return;
    }

    try {
      setLoadingDoc(documentId._id); // <-- start loading

      const signature = sigPad.toDataURL("image/png");
      const Zresponse = await signDocument(documentId._id, {
        signature,
        name: user?.name || "Signer",
        email: user?.email || "",
        date: new Date().toISOString().split("T")[0],
      });

      alert(Zresponse.data.message);
      //  instantly update local state for smoother UX
      setAssignments((prev) =>
        prev.map((a) =>
          a.documentId._id === documentId._id
            ? { ...a, documentId: { ...a.documentId, status: "SIGNED" } }
            : a
        )
      );

      sigPad.clear();
      setError("");
      const response = await getAssignments();
      setAssignments(response.data.assignments);
    } catch (err) {
      setError(err.response?.data?.message || "Signing failed");
    } finally {
      setLoadingDoc(null); // <-- stop loading
    }
  };
  if (!user) {
    return <div className="text-center mt-10">Loading user...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-400 p-4 sm:p-6">
      <Notification
        message="The original and Signed document will be saved locally . Rotue for Connection with S3 is commented!"
        type="msg"
        duration={4000}
      />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6 border-b rounded-2xl px-4 py-2">
          <h1 className="text-2xl font-bold text-gray-800">Signer Dashboard</h1>

          <div className="flex items-center space-x-4 text-gray-700 font-medium">
            <div className="relative  group  flex items-center space-x-2 cursor-pointer">
              <FaUserCircle className="text-3xl text-gray-800 group-hover:text-yellow-400" />
              <p className="text-xl text-gray-800">
                {user?.name
                  ? user.name.charAt(0).toUpperCase() +
                    user.name.slice(1).toLowerCase()
                  : null}
              </p>
              {/* <p title={user?.email || "No email"}>{user?.name || "User"}</p> */}
{/*               <div className="absolute top-8 p-0.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 text-white text-sm px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                {user?.email || "No email"}
              </div> */}
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
        <SectionsSigner />

        {/* Error Popup */}
        {error && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-6 py-3 rounded-md shadow-lg animate-fade-in-out">
            {error}
          </div>
        )}

        {/* Assignments */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Your Assignments
          </h2>

          {assignments.length === 0 ? (
            <p className="text-gray-500 italic">No assignments found.</p>
          ) : (
            <div className="space-y-4">
              {assignments.map((assignment) => {
                const document = assignment.documentId;

                return (
                  <div
                    key={assignment._id}
                    className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Document ID */}
                    <div className="mb-2">
                      <p className="text-sm text-gray-500">Document ID</p>
                      <p className="text-md font-medium text-gray-800">
                        {document?._id}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="mb-2">
                      <p className="text-sm text-gray-500">Status</p>
                      <span
                        className={`inline-block px-3 mt-1 py-1 text-sm rounded-full font-semibold ${
                          document?.status === "PENDING"
                            ? "bg-yellow-400 text-gray-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {document?.status || "Unknown"}
                      </span>
                    </div>

                    {/* Document Link */}
                    <div className="mb-2">
                      <span className="text-sm text-gray-500">
                        Document URL
                      </span>
                      <a
                        href={document?.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-3 text-sm text-blue-600 relative inline-block after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                      >
                        View PDF
                      </a>
                    </div>

                    {document?.status !== "SIGNED" && (
                      <div className="mt-2">
                        <SignatureCanvas
                          ref={(ref) =>
                            (sigCanvasRefs.current[document._id] = ref)
                          }
                          penColor="black"
                          canvasProps={{
                            className:
                              "border border-gray-300 rounded-md w-full h-32",
                          }}
                        />
                        <button
                          onClick={() => handleSign(assignment.documentId)}
                          disabled={loadingDoc === document._id} // disable while loading
                          className={`mt-2 px-4 py-2 mx-4 tracking-wider font-semibold rounded-md cursor-pointer ${
                            loadingDoc === document._id
                              ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                              : "bg-gray-800 text-white hover:bg-gray-600"
                          }`}
                          // disabled={}
                        >
                          {loadingDoc === document._id
                            ? "Submitting…"
                            : "Sign Now"}
                        </button>
                        <button
                          onClick={() =>
                            sigCanvasRefs.current[document._id]?.clear()
                          }
                          className="mt-2 ml-2 bg-gray-800 tracking-wider font-semibold text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                          Reset
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
