// src/components/Applicants.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface InternshipStudent {
  _id: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  internshipType: string;
  fromDate: string;
  toDate: string;
  status?: "Pending" | "Confirmed";
}

const InternshipList = () => {
  const [internships, setInternships] = useState<InternshipStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async (studentId: string) => {
    try {
      await axios.post(
        `http://localhost:5001/api/internships/${studentId}/confirm`
      );

      setInternships((currentInternships) =>
        currentInternships.filter((intern) => intern._id !== studentId)
      );
      alert("Student has been confirmed and moved to the Confirmed Interns list.");
    } catch (err) {
      console.error("Error confirming student:", err);
      setError("Failed to confirm student. Please try again.");
    }
  };

  const handleReject = async (studentId: string, studentName: string) => {
    if (
      !window.confirm(
        `Are you sure you want to reject and delete ${studentName}?`
      )
    ) {
      return;
    }
    try {
      await axios.delete(`http://localhost:5001/api/internships/${studentId}`);

      setInternships((currentInternships) =>
        currentInternships.filter((intern) => intern._id !== studentId)
      );
      alert(`${studentName} has been rejected and removed.`);
    } catch (err) {
      console.error("Error rejecting student:", err);
      setError("Failed to reject student.");
    }
  };

  useEffect(() => {
    axios
      .get<InternshipStudent[]>("http://localhost:5001/api/internships")
      .then((res) => {
        setInternships(
          res.data.filter((student) => student.status !== "Confirmed")
        );
      })
      .catch((err) => {
        console.error("Error fetching internships:", err);
        setError("Failed to load internship applicants.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading applicants...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-2xl font-bold mb-4">
        Internship Applicants
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table-auto min-w-[800px] w-full border border-gray-300 text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Submission Date</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">College</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">From</th>
              <th className="border p-2">To</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {internships.map((data) => (
              <tr key={data._id}>
                <td className="border p-2">
                  {new Date(data.timestamp).toLocaleString()}
                </td>
                <td className="border p-2">{data.name}</td>
                <td className="border p-2">{data.email}</td>
                <td className="border p-2">{data.phone}</td>
                <td className="border p-2">{data.college}</td>
                <td className="border p-2">{data.department}</td>
                <td className="border p-2">{data.internshipType}</td>
                <td className="border p-2">{data.fromDate}</td>
                <td className="border p-2">{data.toDate}</td>
                <td className="border p-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm"
                      onClick={() => handleConfirm(data._id)}
                    >
                      Confirm
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                      onClick={() => handleReject(data._id, data.name)}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-4">
        {internships.length > 0 ? (
          internships.map((data) => (
            <div
              key={data._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{data.name}</h3>
                <span className="text-gray-500 text-xs">
                  {new Date(data.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-sm break-words">
                <strong>Email:</strong> {data.email}
              </p>
              <p className="text-sm">
                <strong>Phone:</strong> {data.phone}
              </p>
              <p className="text-sm break-words">
                <strong>College:</strong> {data.college}
              </p>
              <p className="text-sm">
                <strong>Department:</strong> {data.department}
              </p>
              <p className="text-sm">
                <strong>Type:</strong> {data.internshipType}
              </p>
              <p className="text-sm">
                <strong>From:</strong> {data.fromDate}
              </p>
              <p className="text-sm">
                <strong>To:</strong> {data.toDate}
              </p>
              <div className="flex gap-2 mt-2 flex-wrap">
                <button
                  className="flex-1 text-white bg-green-500 hover:bg-green-600 font-bold py-1 px-3 rounded"
                  onClick={() => handleConfirm(data._id)}
                >
                  Confirm
                </button>
                <button
                  className="flex-1 text-white bg-red-500 hover:bg-red-600 font-bold py-1 px-3 rounded"
                  onClick={() => handleReject(data._id, data.name)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No applicants found.</p>
        )}
      </div>
    </div>
  );
};

export default InternshipList;
