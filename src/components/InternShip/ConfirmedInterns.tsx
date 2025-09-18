
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// // Define the shape of an Intern, including _id
// interface Intern {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   college: string;
//   department: string;
//   fromDate: string;
//   toDate: string;
//   status: string;
//   inHouseStatus?: "Entry" | "Exit";
// }

// const ConfirmedInterns: React.FC = () => {
//   const [interns, setInterns] = useState<Intern[]>([]);

//   // Fetch confirmed students on load
//   useEffect(() => {
//     // Correct URL to fetch confirmed interns
//     axios
//       .get<Intern[]>("http://localhost:5001/api/confirmed-interns")
//       .then((res) => {
//         console.log("Fetched Confirmed Students:", res.data);
//         setInterns(res.data);
//       })
//       .catch((err) => console.error("Error fetching confirmed interns:", err));
//   }, []);

//   // Handle Entry click
//   const handleEntry = async (email: string) => {
//     try {
//       // Correct URL for the entry action
//       const res = await axios.post<{ message: string }>(
//         "http://localhost:5001/api/confirmed-interns/entry",
//         { email }
//       );
//       alert(res.data.message);

//       // Update UI instantly
//       setInterns((prev) =>
//         prev.map((student) =>
//           student.email === email ? { ...student, inHouseStatus: "Entry" } : student
//         )
//       );
//     } catch (err: any) {
//       alert(err.response?.data?.message || "Error moving student");
//     }
//   };

//   // Handle Exit click
//   const handleExit = async (email: string) => {
//     try {
//       // Correct URL for the exit action
//       const res = await axios.post<{ message: string }>(
//         "http://localhost:5001/api/confirmed-interns/exit",
//         { email }
//       );
//       alert(res.data.message);

//       // Update UI instantly
//       setInterns((prev) =>
//         prev.map((student) =>
//           student.email === email ? { ...student, inHouseStatus: "Exit" } : student
//         )
//       );
//     } catch (err: any) {
//       alert(err.response?.data?.message || "Error marking exit");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">✅ Confirmed Interns</h2>
//       <table className="table-auto w-full border border-gray-300">
//         <thead className="bg-black-100">
//           <tr>
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Phone</th>
//             <th className="border p-2">College</th>
//             <th className="border p-2">Department</th>
//             <th className="border p-2">From</th>
//             <th className="border p-2">To</th>
//             <th className="border p-2">Status</th>
//             <th className="border p-2">In-House Entry</th>
//           </tr>
//         </thead>
//         <tbody>
//           {interns.map((student) => (
//             <tr key={student._id}>
//               <td className="border p-2">{student.name}</td>
//               <td className="border p-2">{student.email}</td>
//               <td className="border p-2">{student.phone}</td>
//               <td className="border p-2">{student.college}</td>
//               <td className="border p-2">{student.department}</td>
//               <td className="border p-2">{student.fromDate}</td>
//               <td className="border p-2">{student.toDate}</td>
//               <td className="border p-2 text-green-600 font-semibold">
//                 {student.status}
//               </td>
//               <td className="border p-2 text-center">
//                 {student.inHouseStatus ? (
//                   <span
//                     className={`font-bold ${
//                       student.inHouseStatus === "Entry"
//                         ? "text-green-600"
//                         : "text-red-600" // The typo was here
//                     }`}
//                   >
//                     {student.inHouseStatus}
//                   </span>
//                 ) : (
//                   <div className="flex justify-center gap-2">
//                     <button
//                       onClick={() => handleEntry(student.email)}
//                       className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-md"
//                     >
//                       Entry
//                     </button>
//                     <button
//                       onClick={() => handleExit(student.email)}
//                       className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-md"
//                     >
//                       Exit
//                     </button>
//                   </div>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ConfirmedInterns;

// src/components/internship/Confirmedinterns.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";

// This interface now correctly reflects your database schema, including the _id
interface Intern {
  _id: string; // We will use MongoDB's unique _id
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  fromDate: string;
  toDate: string;
  status: "Confirmed" | "Exited" | "Pending"; // The status comes directly from the database
}

const ConfirmedInterns: React.FC = () => {
  const [interns, setInterns] = useState<Intern[]>([]);

  // We create a reusable function to get the latest data from the server
  const fetchConfirmedInterns = () => {
    axios
      .get<Intern[]>("http://localhost:5001/api/confirmed-interns")
      .then((res) => {
        setInterns(res.data);
      })
      .catch((err) => console.error("Error fetching confirmed interns:", err));
  };

  // Fetch data when the component first loads
  useEffect(() => {
    fetchConfirmedInterns();
  }, []);

  // --- UPDATED "ENTRY" HANDLER ---
  // It now sends the unique _id to the backend
  const handleEntry = async (id: string) => {
    try {
      const res = await axios.post<{ message: string }>(
        "http://localhost:5001/api/confirmed-interns/entry",
        { id } // Send the unique ID in the request body
      );
      alert(res.data.message); // Show the success message from the server
      fetchConfirmedInterns(); // IMPORTANT: Refresh the list to show the student has been moved
    } catch (err: any) {
      alert(err.response?.data?.message || "An error occurred while moving the student.");
    }
  };

  // --- UPDATED "EXIT" HANDLER ---
  // It now sends the unique _id to the backend
  const handleExit = async (id: string) => {
    try {
      const res = await axios.post<{ message: string }>(
        "http://localhost:5001/api/confirmed-interns/exit",
        { id } // Send the unique ID
      );
      alert(res.data.message);
      fetchConfirmedInterns(); // IMPORTANT: Refresh the list to show the updated "Exited" status
    } catch (err: any) {
      alert(err.response?.data?.message || "An error occurred while marking as exit.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">✅ Confirmed Interns</h2>
      <table className="table-auto w-full border border-gray-300">
        <thead className="bg-black-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">College</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">From</th>
            <th className="border p-2">To</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">In-House Entry</th>
          </tr>
        </thead>
        <tbody>
          {interns.map((student) => (
            <tr key={student._id}> {/* Use the unique _id as the key */}
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.email}</td>
              <td className="border p-2">{student.phone}</td>
              <td className="border p-2">{student.college}</td>
              <td className="border p-2">{student.department}</td>
              <td className="border p-2">{student.fromDate}</td>
              <td className="border p-2">{student.toDate}</td>
              <td
                className={`border p-2 font-semibold ${
                  student.status === "Confirmed" ? "text-green-600" : "text-red-600"
                }`}
              >
                {student.status}
              </td>
              <td className="border p-2 text-center">
                {/* The UI now depends on the actual status from the database */}
                {student.status === "Confirmed" ? (
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleEntry(student._id)} // Pass the student's _id
                      className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-md"
                    >
                      Entry
                    </button>
                    <button
                      onClick={() => handleExit(student._id)} // Pass the student's _id
                      className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-md"
                    >
                      Exit
                    </button>
                  </div>
                ) : (
                  // If the status is "Exited", we show that instead of buttons
                  <span className="font-bold text-red-600">Exited</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConfirmedInterns;