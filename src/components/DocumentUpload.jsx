import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { uploadDocument } from "../lib/api";
import { ROLES } from "../lib/constants";

export default function DocumentUpload() {
  const [file, setFile] = useState(null);
  const [signatureFields, setSignatureFields] = useState([
    { type: "signature", x: 100, y: 100, page: 1 },
  ]);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user?.role !== ROLES.UPLOADER) {
      setError("Only Uploaders can upload documents");
      return;
    }
    if (!file) {
      setError("Please select a PDF file");
      return;
    }
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("signatureFields", JSON.stringify(signatureFields));

    try {
      const response = await uploadDocument(formData);
      console.log("Uploaded:", response.data);
      setFile(null);
      setSignatureFields([{ type: "signature", x: 100, y: 100, page: 1 }]);
    } catch (err) {
      setError(
        err.response?.data?.message || "Upload failed. Please try again."
      );
    }
  };
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [error]);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload PDF</h2>
      {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}
      {error && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-6 py-3 rounded-md shadow-lg animate-fade-in-out">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700"
          >
            Select PDF
          </label>
          <input
            id="file"
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer"
          />
        </div>
        <div>
          <label
            htmlFor="signatureFields"
            className="block text-sm font-medium text-gray-700"
          >
            Signature Fields (JSON)
          </label>
          <textarea
            id="signatureFields"
            value={JSON.stringify(signatureFields, null, 2)}
            onChange={(e) => {
              try {
                setSignatureFields(JSON.parse(e.target.value));
                setError("");
              } catch {
                setError("Invalid JSON format for signature fields");
              }
            }}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-600 transition duration-200"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
