// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const InhouseApplication = () => {
//   const [inhouseList, setInhouseList] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5001/api/inhouse")
//       .then(res => setInhouseList(res.data))
//       .catch(err => console.error("Error fetching inhouse students:", err));
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">🏠 Inhouse Application</h2>
//       <table className="table-auto w-full border border-gray-300">
//         <thead className="bg-black-200">
//           <tr>
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Phone</th>
//             <th className="border p-2">College</th>
//             <th className="border p-2">Department</th>
//             <th className="border p-2">PDF</th>
//             <th className="border p-2">From</th>
//             <th className="border p-2">To</th>
//           </tr>
//         </thead>
//         <tbody>
//           {inhouseList.map((student, idx) => (
//             <tr key={idx}>
//               <td className="border p-2">{student.name}</td>
//               <td className="border p-2">{student.email}</td>
//               <td className="border p-2">{student.phone}</td>
//               <td className="border p-2">{student.college}</td>
//               <td className="border p-2">{student.department}</td>
//               <td className="border p-2">{student.pdfPath ? (<a className="text-blue-600 underline" href={`http://localhost:5001/${student.pdfPath}`} target="_blank" rel="noreferrer">Download PDF</a>) : "-"}</td>
//               <td className="border p-2">{student.fromDate}</td>
//               <td className="border p-2">{student.toDate}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default InhouseApplication;



// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const InhouseApplication = () => {
//   const [inhouseList, setInhouseList] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5001/api/inhouse")
//       .then((res) => setInhouseList(res.data))
//       .catch((err) =>
//         console.error("Error fetching inhouse students:", err)
//       );
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">🏠 Inhouse Application</h2>
//       <table className="table-auto w-full border border-gray-300">
//         <thead className="bg-black-200">
//           <tr>
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Phone</th>
//             <th className="border p-2">College</th>
//             <th className="border p-2">Department</th>
//             <th className="border p-2 w-32">PDF</th>
//             <th className="border p-2">From</th>
//             <th className="border p-2">To</th>
//           </tr>
//         </thead>
//         <tbody>
//           {inhouseList.map((student, idx) => (
//             <tr key={idx}>
//               <td className="border p-2">{student.name}</td>
//               <td className="border p-2">{student.email}</td>
//               <td className="border p-2">{student.phone}</td>
//               <td className="border p-2">{student.college}</td>
//               <td className="border p-2">{student.department}</td>

//               {/* ✅ PDF button */}
//               <td className="border p-2 text-center w-32">
//                 {student._id ? (
//                   <button
//                     className="bg-green-600 text-white px-3 py-1 rounded w-full"
//                     onClick={() =>
//                       window.open(
//                         `http://localhost:5002/api/applications/${student._id}/pdf`,
//                         "_blank"
//                       )
//                     }
//                   >
//                     View PDF
//                   </button>
//                 ) : (
//                   "-"
//                 )}
//               </td>

//               <td className="border p-2">{student.fromDate}</td>
//               <td className="border p-2">{student.toDate}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default InhouseApplication;



import React, { useEffect, useState } from "react";
import axios from "axios";

const InhouseApplication = () => {
  const [inhouseList, setInhouseList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/applications") // ✅ FIXED
      .then((res) => setInhouseList(res.data))
      .catch((err) => console.error("Error fetching inhouse students:", err));
  }, []);

  // ✅ Open generated PDF by email
  const openPdf = (email) => {
    window.open(
      `http://localhost:5001/api/applications/email/${email}/pdf`, // ✅ FIXED
      "_blank",
      "noopener,noreferrer"
    );
  };

  // ✅ Open uploaded documents by email
  const openDoc = (email) => {
    window.open(
      `http://localhost:5001/api/applications/email/${email}/doc`, // ✅ FIXED (if you have doc route)
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
        🏠 Inhouse Application
      </h2>

      <table className="table-auto w-full border-collapse border border-slate-700">
        <thead>
          <tr className="text-black">
            <th className="border border-slate-700 p-2 text-left">Name</th>
            <th className="border border-slate-700 p-2 text-left">Email</th>
            <th className="border border-slate-700 p-2 text-left">Phone</th>
            <th className="border border-slate-700 p-2 text-left">College</th>
            <th className="border border-slate-700 p-2 text-left">Department</th>
            <th className="border border-slate-700 p-2 w-56 text-center">
              PDF / Docs
            </th>
            <th className="border border-slate-700 p-2 text-left">From</th>
            <th className="border border-slate-700 p-2 text-left">To</th>
          </tr>
        </thead>

        <tbody>
          {inhouseList.map((student, idx) => (
            <tr key={idx} className="text-black">
              <td className="border border-slate-700 p-2">{student.fullName}</td>
              <td className="border border-slate-700 p-2">{student.email}</td>
              <td className="border border-slate-700 p-2">{student.whatsapp}</td>
              <td className="border border-slate-700 p-2">{student.college}</td>
              <td className="border border-slate-700 p-2">{student.specialization}</td>

              <td className="border border-slate-700 p-2 w-56">
                <div className="flex items-center justify-center gap-2">
                  <button
                    className="px-3 py-1 rounded text-sm bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => openPdf(student.email)}
                  >
                    View PDF
                  </button>
                  <button
                    className="px-3 py-1 rounded text-sm bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => openDoc(student.email)}
                  >
                    Docs
                  </button>
                </div>
              </td>

              <td className="border border-slate-700 p-2">{student.fromDate}</td>
              <td className="border border-slate-700 p-2">{student.toDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InhouseApplication;
