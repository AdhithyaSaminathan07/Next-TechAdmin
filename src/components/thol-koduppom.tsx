"use client";

import React, { useState, useEffect } from "react";

interface TktmSubmission {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "Pending" | "Confirmed" | "Declined";
  createdAt: string;
}

const TholKoduppomPage = () => {
  const [submissions, setSubmissions] = useState<TktmSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(
          "/api/tktm/submissions"
        );
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
        const data: TktmSubmission[] = await response.json();
        setSubmissions(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const handleUpdateStatus = async (
    id: string,
    newStatus: "Confirmed" | "Declined"
  ) => {
    try {
      const response = await fetch(
        `/api/tktm/submissions/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) throw new Error("Failed to update status");

      setSubmissions(
        submissions.map((sub) =>
          sub._id === id ? { ...sub, status: newStatus } : sub
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading submissions...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
        <span className="text-yellow-500 mr-3">🤝</span>
        "தோள் கொடுப்போம்" Submissions
      </h1>

      {error && (
        <p className="text-center mb-4 text-red-500 font-semibold">{error}</p>
      )}

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-[700px] w-full divide-y divide-gray-200 text-sm md:text-base">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase">
                Phone
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase">
                Message
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-center font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {submissions.length > 0 ? (
              submissions.map((submission) => (
                <tr key={submission._id}>
                  <td className="px-4 py-2 max-w-xs truncate">{submission.name}</td>
                  <td className="px-4 py-2 max-w-xs break-words">{submission.email}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{submission.phone}</td>
                  <td className="px-4 py-2 max-w-sm break-words">{submission.message}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        submission.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : submission.status === "Declined"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {submission.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-center text-sm font-medium">
                    {submission.status === "Pending" && (
                      <div className="flex flex-col sm:flex-row justify-center gap-2">
                        <button
                          onClick={() =>
                            handleUpdateStatus(submission._id, "Confirmed")
                          }
                          className="text-white bg-green-500 hover:bg-green-600 font-bold py-1 px-3 rounded"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateStatus(submission._id, "Declined")
                          }
                          className="text-white bg-red-500 hover:bg-red-600 font-bold py-1 px-3 rounded"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {submissions.length > 0 ? (
          submissions.map((sub) => (
            <div
              key={sub._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">{sub.name}</h2>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    sub.status === "Confirmed"
                      ? "bg-green-100 text-green-800"
                      : sub.status === "Declined"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {sub.status}
                </span>
              </div>
              <p className="text-sm break-words">
                <strong>Email:</strong> {sub.email}
              </p>
              <p className="text-sm">
                <strong>Phone:</strong> {sub.phone}
              </p>
              <p className="text-sm break-words">
                <strong>Message:</strong> {sub.message}
              </p>
              {sub.status === "Pending" && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  <button
                    onClick={() => handleUpdateStatus(sub._id, "Confirmed")}
                    className="flex-1 text-white bg-green-500 hover:bg-green-600 font-bold py-1 px-3 rounded"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(sub._id, "Declined")}
                    className="flex-1 text-white bg-red-500 hover:bg-red-600 font-bold py-1 px-3 rounded"
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No submissions found.</p>
        )}
      </div>
    </div>
  );
};

export default TholKoduppomPage;
