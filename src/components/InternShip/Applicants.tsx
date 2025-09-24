// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// // 1️⃣ UPDATE: This interface now matches your MongoDB document structure
// interface InternshipStudent {
//   _id: string;
//   timestamp: string; // Changed from createdAt
//   name: string;      // Changed from fullName
//   email: string;
//   phone: string;     // Changed from whatsapp
//   college: string;
//   department: string; // Changed from course
//   internshipType: string;
//   fromDate: string;
//   toDate: string;
// }

// const InternshipList = () => {
//   const [internships, setInternships] = useState<InternshipStudent[]>([]);

//   const handleConfirm = async (student: InternshipStudent) => {
//     // This logic may need to be updated based on your backend routes
//     alert(`Confirmed ${student.name}`);
//   };

//   const handleReject = (student: InternshipStudent) => {
//     alert(`Rejected ${student.name}`);
//   };

//   useEffect(() => {
//     // The endpoint is correct from our last fix
//     axios.get<InternshipStudent[]>('http://localhost:5001/api/internships')
//       .then((res) => {
//         setInternships(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching internships:", err);
//       });
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Internship Submissions</h2>
//       <table className="table-auto w-full border border-gray-300">
//         <thead className="bg-gray-100">
//           <tr>
//             {/* 2️⃣ UPDATE: Changed headers for clarity */}
//             <th className='border p-2'>Submission Date</th>
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Phone</th>
//             <th className="border p-2">College</th>
//             <th className="border p-2">Department</th>
//             <th className="border p-2">Type</th>
//             <th className="border p-2">From</th>
//             <th className="border p-2">To</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* 3️⃣ UPDATE: Changed data fields to match the database */}
//           {internships.map((data) => (
//             <tr key={data._id}>
//               {/* Use `timestamp` for the date */}
//               <td className='border p-2'>{new Date(data.timestamp).toLocaleString()}</td>
//               {/* Use `name` for the full name */}
//               <td className="border p-2">{data.name}</td>
//               <td className="border p-2">{data.email}</td>
//               {/* Use `phone` for WhatsApp */}
//               <td className="border p-2">{data.phone}</td>
//               <td className="border p-2">{data.college}</td>
//               {/* Use `department` for the course */}
//               <td className="border p-2">{data.department}</td>
//               <td className="border p-2">{data.internshipType}</td>
//               <td className="border p-2">{data.fromDate}</td>
//               <td className="border p-2">{data.toDate}</td>
//               <td className="border p-2 flex gap-2">
//                 <button
//                   className="bg-green-500 text-white px-2 py-1 rounded"
//                   onClick={() => handleConfirm(data)}
//                 >
//                   Confirm
//                 </button>
//                 <button
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                   onClick={() => handleReject(data)}
//                 >
//                   Reject
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default InternshipList;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// // 1. UPDATE: Add the 'status' field to your interface.
// // This allows the frontend to know if a student is 'Pending' or 'Confirmed'.
// interface InternshipStudent {
//   _id: string;
//   timestamp: string;
//   name: string;
//   email: string;
//   phone: string;
//   college: string;
//   department: string;
//   internshipType: string;
//   fromDate: string;
//   toDate: string;
//   status?: 'Pending' | 'Confirmed'; // This field is new
// }

// const InternshipList = () => {
//   const [internships, setInternships] = useState<InternshipStudent[]>([]);

//   // 2. UPDATE: The handleConfirm function now calls your backend API.
//   const handleConfirm = async (studentId: string) => {
//     try {
//       const response = await axios.patch<InternshipStudent>(
//         `http://localhost:5001/api/internships/${studentId}/status`,
//         { status: 'Confirmed' }
//       );
//       // Update the component's state to show the change instantly
//       setInternships(currentInternships =>
//         currentInternships.map(intern =>
//           intern._id === studentId ? { ...intern, status: response.data.status } : intern
//         )
//       );
//       alert('Student has been confirmed.');
//     } catch (error) {
//       console.error("Error confirming student:", error);
//       alert('Failed to confirm student.');
//     }
//   };

//   // 3. UPDATE: The handleReject function now deletes the student from the database.
//   const handleReject = async (studentId: string, studentName: string) => {
//     // Add a confirmation dialog to prevent accidents
//     if (!window.confirm(`Are you sure you want to reject and delete ${studentName}?`)) {
//       return;
//     }

//     try {
//       // Calls the DELETE endpoint on your backend
//       await axios.delete(`http://localhost:5001/api/internships/${studentId}`);
      
//       // Update the component's state by removing the student, which makes the row disappear
//       setInternships(currentInternships =>
//         currentInternships.filter(intern => intern._id !== studentId)
//       );
//       alert(`${studentName} has been rejected and removed.`);
//     } catch (error) {
//       console.error("Error rejecting student:", error);
//       alert('Failed to reject student.');
//     }
//   };

//   useEffect(() => {
//     axios.get<InternshipStudent[]>('http://localhost:5001/api/internships')
//       .then((res) => {
//         setInternships(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching internships:", err);
//       });
//   }, []);
  
//   // 4. NEW: A helper function to decide what to show in the "Actions" column.
//   const renderActions = (student: InternshipStudent) => {
//     if (student.status === 'Confirmed') {
//       return <span className="font-bold text-green-600">Confirmed</span>;
//     }
//     return (
//       <div className="flex gap-2">
//         <button
//           className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
//           onClick={() => handleConfirm(student._id)}
//         >
//           Confirm
//         </button>
//         <button
//           className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
//           onClick={() => handleReject(student._id, student.name)}
//         >
//           Reject
//         </button>
//       </div>
//     );
//   };


//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Internship Submissions</h2>
//       <table className="table-auto w-full border border-gray-300">
//         <thead className="bg-gray-100">
//           {/* ...Headers are unchanged... */}
//           <tr>
//             <th className='border p-2'>Submission Date</th>
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Phone</th>
//             <th className="border p-2">College</th>
//             <th className="border p-2">Department</th>
//             <th className="border p-2">Type</th>
//             <th className="border p-2">From</th>
//             <th className="border p-2">To</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {internships.map((data) => (
//             <tr key={data._id}>
//               {/* ...Other data cells are unchanged... */}
//               <td className='border p-2'>{new Date(data.timestamp).toLocaleString()}</td>
//               <td className="border p-2">{data.name}</td>
//               <td className="border p-2">{data.email}</td>
//               <td className="border p-2">{data.phone}</td>
//               <td className="border p-2">{data.college}</td>
//               <td className="border p-2">{data.department}</td>
//               <td className="border p-2">{data.internshipType}</td>
//               <td className="border p-2">{data.fromDate}</td>
//               <td className="border p-2">{data.toDate}</td>
//               {/* 5. UPDATE: The actions cell now uses the new renderActions function. */}
//               <td className="border p-2">
//                 {renderActions(data)}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default InternshipList;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// // The interface is still correct.
// interface InternshipStudent {
//   _id: string;
//   timestamp: string;
//   name: string;
//   email: string;
//   phone: string;
//   college: string;
//   department: string;
//   internshipType: string;
//   fromDate: string;
//   toDate: string;
//   status?: 'Pending' | 'Confirmed';
// }

// const InternshipList = () => {
//   const [internships, setInternships] = useState<InternshipStudent[]>([]);
//   // Let's add loading and error states for a better user experience
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // --- CHANGED: handleConfirm is now updated to move the student ---
//   const handleConfirm = async (studentId: string) => {
//     try {
//       // 1. Use a POST request to the new '/confirm' endpoint. No request body is needed.
//       await axios.post(
//         `http://localhost:5001/api/students/${studentId}/confirm`
//       );

//       // 2. The student was moved, so we REMOVE them from the applicants list.
//       //    The '.filter' method is perfect for this.
//       setInternships(currentInternships =>
//         currentInternships.filter(intern => intern._id !== studentId)
//       );

//       alert('Student has been confirmed and moved to the Confirmed Interns list.');

//     } catch (err) {
//       console.error("Error confirming student:", err);
//       setError('Failed to confirm student. Please try again.');
//     }
//   };

//   // --- CHANGED: handleReject now points to the correct '/api/students' endpoint ---
//   const handleReject = async (studentId: string, studentName: string) => {
//     if (!window.confirm(`Are you sure you want to reject and delete ${studentName}?`)) {
//       return;
//     }

//     try {
//       // 3. Make sure the delete URL is correct.
//       await axios.delete(`http://localhost:5001/api/students/${studentId}`);
      
//       setInternships(currentInternships =>
//         currentInternships.filter(intern => intern._id !== studentId)
//       );
//       alert(`${studentName} has been rejected and removed.`);
//     } catch (err) {
//       console.error("Error rejecting student:", err);
//       setError('Failed to reject student.');
//     }
//   };

//   useEffect(() => {
//     // --- CHANGED: Fetch from '/api/students' which lists the applicants ---
//     // 4. This is the endpoint that returns all unconfirmed applicants.
//     axios.get<InternshipStudent[]>('http://localhost:5001/api/students')
//       .then((res) => {
//         // Optional: You can ensure you only show pending students
//         setInternships(res.data.filter(student => student.status !== 'Confirmed'));
//       })
//       .catch((err) => {
//         console.error("Error fetching internships:", err);
//         setError("Failed to load internship applicants.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);
  
//   // This page is for applicants, so we don't need the renderActions function.
//   // We will always show the "Confirm" and "Reject" buttons.

//   if (loading) return <p>Loading applicants...</p>;
//   if (error) return <p style={{ color: 'red' }}>{error}</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Internship Applicants</h2>
//       <table className="table-auto w-full border border-gray-300">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className='border p-2'>Submission Date</th>
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Phone</th>
//             <th className="border p-2">College</th>
//             <th className="border p-2">Department</th>
//             <th className="border p-2">Type</th>
//             <th className="border p-2">From</th>
//             <th className="border p-2">To</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {internships.map((data) => (
//             <tr key={data._id}>
//               <td className='border p-2'>{new Date(data.timestamp).toLocaleString()}</td>
//               <td className="border p-2">{data.name}</td>
//               <td className="border p-2">{data.email}</td>
//               <td className="border p-2">{data.phone}</td>
//               <td className="border p-2">{data.college}</td>
//               <td className="border p-2">{data.department}</td>
//               <td className="border p-2">{data.internshipType}</td>
//               <td className="border p-2">{data.fromDate}</td>
//               <td className="border p-2">{data.toDate}</td>
//               <td className="border p-2">
//                 {/* --- CHANGED: Simplified the actions --- */}
//                 {/* 5. Since applicants are removed on confirm, we no longer need the conditional logic. */}
//                 <div className="flex gap-2">
//                   <button
//                     className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
//                     onClick={() => handleConfirm(data._id)}
//                   >
//                     Confirm
//                   </button>
//                   <button
//                     className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
//                     onClick={() => handleReject(data._id, data.name)}
//                   >
//                     Reject
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default InternshipList;

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