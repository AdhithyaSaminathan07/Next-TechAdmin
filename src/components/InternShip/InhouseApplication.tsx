// InhouseApplication.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";

interface InhouseStudent {
  _id: string;
  fullName: string;
  email: string;
  whatsapp: string;
  college: string;
  departments: string[];
  fromDate: string;
  toDate: string;
}

const InhouseApplication = () => {
  const [inhouseList, setInhouseList] = useState<InhouseStudent[]>([]);

  useEffect(() => {
    axios
      .get("/api/homecoming/applications")
      .then((res) => setInhouseList(res.data))
      .catch((err) => console.error("Error fetching inhouse students:", err));
  }, []);

  const openPdf = (whatsapp: string) => {
    window.open(
      `/api/applications/mobile/${encodeURIComponent(
        whatsapp
      )}/pdf`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const openDoc = (email: string) => {
    window.open(
      `/api/inhouse/email/${email}/doc`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-2xl font-bold text-black mb-4 flex items-center gap-2">
        🏠 Inhouse Application
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-slate-700 text-sm md:text-base">
          <thead>
            <tr className="text-black">
              <th className="border border-slate-700 p-2 text-left">Name</th>
              <th className="border border-slate-700 p-2 text-left">Email</th>
              <th className="border border-slate-700 p-2 text-left">WhatsApp</th>
              <th className="border border-slate-700 p-2 text-left">College</th>
              <th className="border border-slate-700 p-2 text-left">Departments</th>
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
                <td className="border border-slate-700 p-2">{student.whatsapp}</td>
                <td className="border border-slate-700 p-2">{student.college}</td>
                <td className="border border-slate-700 p-2">{student.departments ? student.departments.join(", ") : ""}</td>
                <td className="border border-slate-700 p-2 w-56 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="px-3 py-1 rounded text-sm bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => openPdf(student.whatsapp)}
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

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-4">
        {inhouseList.length > 0 ? (
          inhouseList.map((student) => (
            <div
              key={student._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{student.fullName}</h3>
              </div>
              <p className="text-sm break-words">
                <strong>Email:</strong> {student.email}
              </p>
              <p className="text-sm">
                <strong>WhatsApp:</strong> {student.whatsapp}
              </p>
              <p className="text-sm break-words">
                <strong>College:</strong> {student.college}
              </p>
              <p className="text-sm">
                <strong>Departments:</strong> {student.departments ? student.departments.join(", ") : ""}
              </p>
              <p className="text-sm">
                <strong>From:</strong> {student.fromDate}
              </p>
              <p className="text-sm">
                <strong>To:</strong> {student.toDate}
              </p>
              <div className="flex gap-2 mt-2 flex-wrap">
                <button
                  onClick={() => openPdf(student.whatsapp)}
                  className="flex-1 text-white bg-blue-600 hover:bg-blue-700 font-bold py-1 px-3 rounded"
                >
                  View PDF
                </button>
                <button
                  onClick={() => openDoc(student.email)}
                  className="flex-1 text-white bg-green-600 hover:bg-green-700 font-bold py-1 px-3 rounded"
                >
                  Docs
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No inhouse applications found.</p>
        )}
      </div>
    </div>
  );
};

export default InhouseApplication;