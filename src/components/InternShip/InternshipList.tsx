import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InternshipList = () => {
  const [internships, setInternships] = useState([]);

const handleConfirm = async (student) => {
  try {
    await axios.post("http://localhost:5001/api/internships/confirm-student", student);
    alert("Student confirmed");
  } catch (error) {
    alert("Error confirming student");
  }
};

const handleReject = (student) => {
  alert(`Rejected ${student.name}`);
  // You can add logic to store or handle rejected students if needed
};


  useEffect(() => {
    axios.get('http://localhost:5001/api/internships/students') // Correct endpoint
      .then((res) => {
        setInternships(res.data);
      })
      .catch((err) => {
        console.error("Error fetching internships:", err);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Internship Submissions</h2>
      <table className="table-auto w-full border border-gray-300">
        <thead className="bg-black-100">
          <tr>
            <th className='border p-2'>TimeStamp</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">College</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Time Period</th>
            <th className="border p-2">From</th>
            <th className="border p-2">To</th>
            
            <th className="border p-2">Internship Status</th>
          </tr>
        </thead>
        <tbody>
          {internships.map((data, idx) => (
            <tr key={idx}>
              <td className='border p-2'>{new Date(data.timestamp).toLocaleString()}</td>
              <td className="border p-2">{data.name}</td>
              <td className="border p-2">{data.email}</td>
              <td className="border p-2">{data.phone}</td>
              <td className="border p-2">{data.college}</td>
              <td className="border p-2">{data.department}</td>
              <td className="border p-2">{data.internshipType}</td>
              <td className="border p-2">{data.TimePeriod}</td> 
              <td className="border p-2">{data.fromDate}</td> 
              <td className="border p-2">{data.toDate}</td>
              {/* ✅ Internship Status Column */}
      <td className="border p-2 flex gap-2">
        <button
          className="bg-green-500 text-white px-2 py-1 rounded"
          onClick={() => handleConfirm(data)}
        >
          Confirm
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => handleReject(data)}
        >
          Reject
        </button>
      </td>   
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InternshipList;
