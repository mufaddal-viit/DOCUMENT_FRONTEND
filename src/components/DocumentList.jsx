//DIRECTLY USED IN DASHBOARD

// import { useState, useEffect } from "react";
// import { getDocuments } from "../lib/api";

// export default function DocumentList() {
//   const [documents, setDocuments] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchDocuments = async () => {
//       try {
//         const response = await getDocuments();
//         setDocuments(response.data);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch documents");
//       }
//     };
//     fetchDocuments();
//   }, []);

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Documents</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {documents.length === 0 ? (
//         <p className="text-gray-600">No documents found.</p>
//       ) : (
//         <div className="space-y-4">
//           {documents.map((doc) => (
//             <div key={doc._id} className="border p-4 rounded-md">
//               <p className="font-medium">Document ID: {doc._id}</p>
//               <p>Status: {doc.status}</p>
//               <p>
//                 URL:{" "}
//                 <a
//                   href={doc.originalUrl}
//                   className="text-blue-600 hover:underline"
//                 >
//                   View PDF
//                 </a>
//               </p>
//               {doc.signatureFields && (
//                 <p>Signature Fields: {JSON.stringify(doc.signatureFields)}</p>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
