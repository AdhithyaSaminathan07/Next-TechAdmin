// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ConfirmedInterns = () => {
//   const [interns, setInterns] = useState([]);

//   // Fetch confirmed students on load
//   useEffect(() => {
//     axios.get("http://localhost:5001/api/internships/confirmed")
//       .then((res) => {
//         console.log("Fetched Confirmed Students:", res.data);
//         setInterns(res.data);
//       })
//       .catch((err) => console.error("Error:", err));
//   }, []);

//   // Handle Entry click
//   const handleEntry = async (email: string |null) => {
//     try {
//       const res = await axios.post("http://localhost:5001/api/internships/entry", { email });
//       alert(res.data.message);

//       // Update UI instantly
//       setInterns((prev) =>
//         prev.map((student) =>
//           student.email === email ? { ...student, inHouseStatus: "Entry" } : student
//         )
//       );
//     } catch (err) {
//       alert(err.response?.data?.message || "Error moving student");
//     }
//   };

//   // Handle Exit click
//   const handleExit = async (email) => {
//     try {
//       const res = await axios.post("http://localhost:5001/api/internships/exit", { email }); // Make sure this route exists
//       alert(res.data.message);

//       // Update UI instantly
//       setInterns((prev) =>
//         prev.map((student) =>
//           student.email === email ? { ...student, inHouseStatus: "Exit" } : student
//         )
//       );
//     } catch (err) {
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
//           {interns.map((student, idx) => (
//             <tr key={idx}>
//               <td className="border p-2">{student.name}</td>
//               <td className="border p-2">{student.email}</td>
//               <td className="border p-2">{student.phone}</td>
//               <td className="border p-2">{student.college}</td>
//               <td className="border p-2">{student.department}</td>
//               <td className="border p-2">{student.fromDate}</td>
//               <td className="border p-2">{student.toDate}</td>
//               <td className="border p-2 text-green-600 font-semibold">{student.status}</td>
//               <td className="border p-2 text-center">
//                 {student.inHouseStatus ? (
//                   <span
//                     className={`font-bold ${
//                       student.inHouseStatus === "Entry"
//                         ? "text-green-600"
//                         : "text-red-600"
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



import React, { useEffect, useState } from "react";
import axios from "axios";

// 1. Define the shape of Intern
interface Intern {
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  fromDate: string;
  toDate: string;
  status: string;
  inHouseStatus?: "Entry" | "Exit"; // optional + restricted to these two
}

const ConfirmedInterns: React.FC = () => {
  // 2. Use Intern[] as state type
  const [interns, setInterns] = useState<Intern[]>([]);

  // Fetch confirmed students on load
  useEffect(() => {
    axios
      .get<Intern[]>("http://localhost:5001/api/internships/confirmed")
      .then((res) => {
        console.log("Fetched Confirmed Students:", res.data);
        setInterns(res.data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  // Handle Entry click
  const handleEntry = async (email: string) => {
    try {
      const res = await axios.post<{ message: string }>(
        "http://localhost:5001/api/internships/entry",
        { email }
      );
      alert(res.data.message);

      // Update UI instantly
      setInterns((prev) =>
        prev.map((student) =>
          student.email === email ? { ...student, inHouseStatus: "Entry" } : student
        )
      );
    } catch (err: any) {
      alert(err.response?.data?.message || "Error moving student");
    }
  };

  // Handle Exit click
  const handleExit = async (email: string) => {
    try {
      const res = await axios.post<{ message: string }>(
        "http://localhost:5001/api/internships/exit",
        { email }
      );
      alert(res.data.message);

      // Update UI instantly
      setInterns((prev) =>
        prev.map((student) =>
          student.email === email ? { ...student, inHouseStatus: "Exit" } : student
        )
      );
    } catch (err: any) {
      alert(err.response?.data?.message || "Error marking exit");
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
          {interns.map((student, idx) => (
            <tr key={idx}>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.email}</td>
              <td className="border p-2">{student.phone}</td>
              <td className="border p-2">{student.college}</td>
              <td className="border p-2">{student.department}</td>
              <td className="border p-2">{student.fromDate}</td>
              <td className="border p-2">{student.toDate}</td>
              <td className="border p-2 text-green-600 font-semibold">
                {student.status}
              </td>
              <td className="border p-2 text-center">
                {student.inHouseStatus ? (
                  <span
                    className={`font-bold ${
                      student.inHouseStatus === "Entry"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {student.inHouseStatus}
                  </span>
                ) : (
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleEntry(student.email)}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-md"
                    >
                      Entry
                    </button>
                    <button
                      onClick={() => handleExit(student.email)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-md"
                    >
                      Exit
                    </button>
                  </div>
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
