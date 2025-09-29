// src/components/internship/ConfirmedInterns.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Intern {
  _id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  fromDate: string;
  toDate: string;
  status: "Confirmed" | "Exited" | "Pending";
}

const ConfirmedInterns: React.FC = () => {
  const [interns, setInterns] = useState<Intern[]>([]);

  const fetchConfirmedInterns = () => {
    axios
      .get<Intern[]>("http://localhost:5001/api/confirmed-interns")
      .then((res) => setInterns(res.data))
      .catch((err) => console.error("Error fetching confirmed interns:", err));
  };

  useEffect(() => {
    fetchConfirmedInterns();
  }, []);

  const handleEntry = async (id: string) => {
    try {
      const res = await axios.post<{ message: string }>(
        "http://localhost:5001/api/confirmed-interns/entry",
        { id }
      );
      alert(res.data.message);
      fetchConfirmedInterns();
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "An error occurred while moving the student."
      );
    }
  };

  const handleExit = async (id: string) => {
    try {
      const res = await axios.post<{ message: string }>(
        "http://localhost:5001/api/confirmed-interns/exit",
        { id }
      );
      alert(res.data.message);
      fetchConfirmedInterns();
    } catch (err: any) {
      alert(
        err.response?.data?.message || "An error occurred while marking as exit."
      );
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-2xl font-bold mb-4">✅ Confirmed Interns</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 text-sm md:text-base">
          <thead className="bg-gray-100">
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
              <tr key={student._id}>
                <td className="border p-2">{student.name}</td>
                <td className="border p-2">{student.email}</td>
                <td className="border p-2">{student.phone}</td>
                <td className="border p-2">{student.college}</td>
                <td className="border p-2">{student.department}</td>
                <td className="border p-2">{student.fromDate}</td>
                <td className="border p-2">{student.toDate}</td>
                <td
                  className={`border p-2 font-semibold ${
                    student.status === "Confirmed"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {student.status}
                </td>
                <td className="border p-2 text-center">
                  {student.status === "Confirmed" ? (
                    <div className="flex justify-center gap-2 flex-wrap">
                      <button
                        onClick={() => handleEntry(student._id)}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-md"
                      >
                        Entry
                      </button>
                      <button
                        onClick={() => handleExit(student._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-md"
                      >
                        Exit
                      </button>
                    </div>
                  ) : (
                    <span className="font-bold text-red-600">Exited</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-4">
        {interns.length > 0 ? (
          interns.map((student) => (
            <div
              key={student._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{student.name}</h3>
                <span
                  className={`font-semibold ${
                    student.status === "Confirmed"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {student.status}
                </span>
              </div>
              <p className="text-sm break-words">
                <strong>Email:</strong> {student.email}
              </p>
              <p className="text-sm">
                <strong>Phone:</strong> {student.phone}
              </p>
              <p className="text-sm break-words">
                <strong>College:</strong> {student.college}
              </p>
              <p className="text-sm">
                <strong>Department:</strong> {student.department}
              </p>
              <p className="text-sm">
                <strong>From:</strong> {student.fromDate}
              </p>
              <p className="text-sm">
                <strong>To:</strong> {student.toDate}
              </p>
              {student.status === "Confirmed" && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  <button
                    onClick={() => handleEntry(student._id)}
                    className="flex-1 text-white bg-green-500 hover:bg-green-600 font-bold py-1 px-3 rounded"
                  >
                    Entry
                  </button>
                  <button
                    onClick={() => handleExit(student._id)}
                    className="flex-1 text-white bg-red-500 hover:bg-red-600 font-bold py-1 px-3 rounded"
                  >
                    Exit
                  </button>
                </div>
              )}
              {student.status === "Exited" && (
                <p className="text-red-600 font-bold mt-2 text-center">Exited</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No confirmed interns found.</p>
        )}
      </div>
    </div>
  );
};

export default ConfirmedInterns;
