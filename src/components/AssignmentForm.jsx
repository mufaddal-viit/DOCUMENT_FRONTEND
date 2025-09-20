//DIRECTLY USED IN DASHBOARD
// import { useState } from "react";
// import { createAssignment } from "../lib/api";

// export default function AssignmentForm({ documentId, onAssign }) {
//   const [signerEmail, setSignerEmail] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!signerEmail) {
//       setError("Please enter a Signer email");
//       return;
//     }
//     try {
//       await createAssignment({ documentId, signerEmail });
//       setSignerEmail("");
//       setError("");
//       if (onAssign) onAssign();
//     } catch (err) {
//       setError(err.response?.data?.message || "Assignment failed");
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Assign Document</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label
//             htmlFor="signerEmail"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Signer Email
//           </label>
//           <input
//             id="signerEmail"
//             type="email"
//             value={signerEmail}
//             onChange={(e) => setSignerEmail(e.target.value)}
//             className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
//             placeholder="Enter Signer email"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
//         >
//           Assign
//         </button>
//       </form>
//     </div>
//   );
// }
