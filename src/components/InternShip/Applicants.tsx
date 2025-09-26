// src/components/Applicants.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// The interface is still correct.
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
  status?: 'Pending' | 'Confirmed';
}

const InternshipList = () => {
  const [internships, setInternships] = useState<InternshipStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async (studentId: string) => {
    try {
      // 1. === CHANGED === Use the correct URL from your server.js
      await axios.post(
        `http://localhost:5001/api/internships/${studentId}/confirm`
      );

      setInternships(currentInternships =>
        currentInternships.filter(intern => intern._id !== studentId)
      );
      alert('Student has been confirmed and moved to the Confirmed Interns list.');
    } catch (err) {
      console.error("Error confirming student:", err);
      setError('Failed to confirm student. Please try again.');
    }
  };

  const handleReject = async (studentId: string, studentName: string) => {
    if (!window.confirm(`Are you sure you want to reject and delete ${studentName}?`)) {
      return;
    }
    try {
      // 2. === CHANGED === Use the correct URL from your server.js
      await axios.delete(`http://localhost:5001/api/internships/${studentId}`);
      
      setInternships(currentInternships =>
        currentInternships.filter(intern => intern._id !== studentId)
      );
      alert(`${studentName} has been rejected and removed.`);
    } catch (err) {
      console.error("Error rejecting student:", err);
      setError('Failed to reject student.');
    }
  };

  useEffect(() => {
    // 3. === CHANGED === Use the correct URL from your server.js
    axios.get<InternshipStudent[]>('http://localhost:5001/api/internships')
      .then((res) => {
        setInternships(res.data.filter(student => student.status !== 'Confirmed'));
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
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Internship Applicants</h2>
      <table className="table-auto w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className='border p-2'>Submission Date</th>
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
              <td className='border p-2'>{new Date(data.timestamp).toLocaleString()}</td>
              <td className="border p-2">{data.name}</td>
              <td className="border p-2">{data.email}</td>
              <td className="border p-2">{data.phone}</td>
              <td className="border p-2">{data.college}</td>
              <td className="border p-2">{data.department}</td>
              <td className="border p-2">{data.internshipType}</td>
              <td className="border p-2">{data.fromDate}</td>
              <td className="border p-2">{data.toDate}</td>
              <td className="border p-2">
                <div className="flex gap-2">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                    onClick={() => handleConfirm(data._id)}
                  >
                    Confirm
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
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
  );
};

export default InternshipList;