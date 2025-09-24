import React, { useEffect, useState } from "react";
import axios from "axios";

// Step 1: I've updated the interface to match your database model (phone, department).
interface InhouseStudent {
  _id: string;
  fullName: string;
  email: string;
  phone: string;      // CORRECTED: Changed from 'whatsapp'
  college: string;
  department: string; // CORRECTED: Changed from 'specialization'
  fromDate: string;
  toDate: string;
}

const InhouseApplication = () => {
  const [inhouseList, setInhouseList] = useState<InhouseStudent[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/inhouse")
      .then((res) => setInhouseList(res.data))
      .catch((err) => console.error("Error fetching inhouse students:", err));
  }, []);

  const openPdf = (phone: string) => {
    window.open(
      `http://localhost:5001/api/applications/mobile/${encodeURIComponent(phone)}/pdf`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const openDoc = (email: string) => {
    window.open(
      `http://localhost:5001/api/inhouse/email/${email}/doc`,
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
          {inhouseList.map((student) => (
            <tr key={student._id} className="text-black">
              <td className="border border-slate-700 p-2">{student.fullName}</td>
              <td className="border border-slate-700 p-2">{student.email}</td>

              {/* ===== FIX #1: Changed student.whatsapp to student.phone ===== */}
              <td className="border border-slate-700 p-2">{student.phone}</td>

              <td className="border border-slate-700 p-2">{student.college}</td>

              {/* ===== FIX #2: Changed student.specialization to student.department ===== */}
              <td className="border border-slate-700 p-2">{student.department}</td>

              <td className="border border-slate-700 p-2 w-56">
                <div className="flex items-center justify-center gap-2">
                  <button
                    className="px-3 py-1 rounded text-sm bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => openPdf(student.phone)} 
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