import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAssignments } from "../lib/api";

function Box({ label, icon, value }) {
  return (
    <div className="flex flex-col justify-between bg-white rounded-xl shadow-sm p-5 w-full sm:w-[48%] lg:w-[30%] border border-gray-200 transition-transform hover:border-amber-400 hover:scale-[1.02]">
      <div className="flex items-center justify-between">
        <p className="text-gray-600 text-sm font-medium">{label}</p>
        <div className="text-blue-600 text-xl">{icon}</div>
      </div>
      <p className="text-3xl font-bold text-gray-900 mt-4">{value}</p>
    </div>
  );
}

export default function SectionsSigner() {
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [pendingSignatures, setPendingSignatures] = useState(0);
  const [completedDocuments, setCompletedDocuments] = useState(0);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  // console.log(user);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!user || user.role !== "SIGNER") return;
      try {
        // console.log(user);
        const response = await getAssignments();

        const documents = response.data.assignments;
        // console.log(documents);

        setTotalDocuments(documents.length);

        setPendingSignatures(
          documents.filter(
            (assignment) => assignment.documentId?.status === "PENDING"
          ).length
        );
        setCompletedDocuments(
          documents.filter(
            (assignment) => assignment.documentId?.status === "SIGNED"
          ).length
        );
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch documents");
      }
    };
    fetchDocuments();
  }, [user]);

  return (
    <section className="flex flex-wrap gap-6 justify-between mt-6 mb-6">
      {error && <p className="text-red-500 w-full text-center">{error}</p>}
      <Box label="Total Assigned" icon="📄" value={totalDocuments} />
      <Box label="Pending Signature" icon="⏳" value={pendingSignatures} />
      <Box label="Completed Documents" icon="✅" value={completedDocuments} />
    </section>
  );
}
