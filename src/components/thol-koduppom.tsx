"use client";

import React, { useState, useEffect } from 'react';

// 1. UPDATED INTERFACE
interface TktmSubmission {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'Pending' | 'Confirmed' | 'Declined'; // Status field added
  createdAt: string;
}

const TholKoduppomPage = () => {
  const [submissions, setSubmissions] = useState<TktmSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/tktm-submissions');
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data: TktmSubmission[] = await response.json();
        setSubmissions(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError('An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  // 2. NEW FUNCTION TO HANDLE STATUS UPDATES
  const handleUpdateStatus = async (id: string, newStatus: 'Confirmed' | 'Declined') => {
    try {
      const response = await fetch(`http://localhost:5001/api/tktm-submissions/${id}/status`, {
        method: 'PATCH', // Use PATCH for partial updates
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Update the status in the local state to give instant feedback
      setSubmissions(submissions.map(sub => 
        sub._id === id ? { ...sub, status: newStatus } : sub
      ));

    } catch (err) {
      console.error("Error updating status:", err);
      // Optionally show an error message to the user
    }
  };

  if (loading) return <p className="text-center mt-8">Loading submissions...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <span className="text-yellow-500 mr-3">🤝</span>
        "தோள் கொடுப்போம்" Submissions
      </h1>
      {error && <p className="text-center mb-4 text-red-500 font-semibold">{error}</p>}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
              {/* 3. ADDED STATUS AND ACTIONS HEADERS */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {submissions.length > 0 ? (
              submissions.map((submission) => (
                <tr key={submission._id}>
                  <td className="px-6 py-4 max-w-sm">{submission.name}</td>
                  <td className="px-6 py-4 max-w-sm">{submission.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{submission.phone}</td>
                  <td className="px-6 py-4 max-w-md break-words">{submission.message}</td>
                  {/* 4. ADDED STATUS AND ACTIONS DATA CELLS */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      submission.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      submission.status === 'Declined' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {submission.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    {/* Only show buttons if the status is 'Pending' */}
                    {submission.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(submission._id, 'Confirmed')}
                          className="text-white bg-green-500 hover:bg-green-600 font-bold py-1 px-3 rounded mr-2"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(submission._id, 'Declined')}
                          className="text-white bg-red-500 hover:bg-red-600 font-bold py-1 px-3 rounded"
                        >
                          Decline
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TholKoduppomPage;