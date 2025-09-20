import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function SignatureCanvas({ onSave }) {
  const sigCanvas = useRef(null);
  const [error, setError] = useState("");

  const clearSignature = () => {
    sigCanvas.current.clear();
    setError("");
  };

  const saveSignature = () => {
    if (sigCanvas.current.isEmpty()) {
      setError("Please provide a signature");
      return;
    }
    const signature = sigCanvas.current.toDataURL("image/png");
    if (onSave) onSave(signature);
    setError("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Capture Signature</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="border border-gray-300 rounded-md">
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{ className: "w-full h-40" }}
        />
      </div>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={clearSignature}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Clear
        </button>
        <button
          onClick={saveSignature}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Save Signature
        </button>
      </div>
    </div>
  );
}
