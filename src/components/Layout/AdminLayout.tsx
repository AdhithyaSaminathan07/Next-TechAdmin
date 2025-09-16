
  // import React from "react";
  // import { useNavigate, Outlet } from "react-router-dom";

  // const AdminLayout = () => {
  //   const navigate = useNavigate();

  //   return (
  //     <div className="flex min-h-screen bg-[#001f2e] text-white">
  //       {/* Sidebar */}
  //       <aside className="w-52 bg-green-400 p-6 flex flex-col justify-between fixed inset-y-0 left-0 shadow-lg z-20">
  //         <div>
  //           {/* Admin Profile */}
  //           <div className="flex flex-col items-center mb-10">
  //             <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-2xl font-bold text-white shadow-md">
  //               TV
  //             </div>
  //             <h2 className="mt-3 text-lg font-semibold">Techvaseegrah</h2>
  //             <p className="text-sm text-gray-200">Admin</p>
  //           </div>

  //           {/* Navigation */}
  //           <nav className="space-y-3">
  //             <button
  //               className="w-full text-left px-3 py-2 rounded hover:bg-[#17414f] transition"
  //               onClick={() => navigate("/dashboard")}
  //             >
  //               🏠 Dashboard
  //             </button>
  //             <button
  //               className="w-full text-left px-3 py-2 rounded hover:bg-[#17414f] transition"
  //               onClick={() => navigate("/internship")}
  //             >
  //               🎓 Applicants
  //             </button>
  //             <button
  //               className="w-full text-left px-3 py-2 rounded hover:bg-[#17414f] transition"
  //               onClick={() => navigate("/interns")}
  //             >
  //               🎓 InternShip
  //             </button>
  //             <button
  //               className="w-full text-left px-3 py-2 rounded hover:bg-[#17414f] transition"
  //               onClick={() => navigate("/inhouse")}
  //             >
  //               🏢 Inhouse Application
  //             </button>
  //           </nav>
  //         </div>

  //         <button
  //           className="mt-8 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
  //           onClick={() => navigate("/")}
  //         >
  //           🚪 Logout
  //         </button>
  //       </aside>

  //       {/* Main Content */}
  //       <main className="flex-1 ml-52 p-8 bg-white text-black overflow-y-auto">
  //         <Outlet />
  //       </main>
  //     </div>
  //   );
  // };

  // export default AdminLayout;



  "use client"; // This is required because we are using a hook (useRouter)

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define props to accept children (the page content)
type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  // The Next.js way to handle programmatic navigation
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      {/* Sidebar */}
      <aside className="w-52 bg-[#001f2e] text-white p-6 flex flex-col justify-between fixed inset-y-0 left-0 shadow-lg z-20">
        <div>
          {/* Admin Profile */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-2xl font-bold text-white shadow-md">
              TV
            </div>
            <h2 className="mt-3 text-lg font-semibold">Techvaseegrah</h2>
            <p className="text-sm text-gray-300">Admin</p>
          </div>

          {/* Navigation - Converted from buttons to Link components */}
          <nav className="space-y-3">
            <Link
              href="/admin/dashboard"
              className="block w-full text-left px-3 py-2 rounded hover:bg-[#17414f] transition"
            >
              🏠 Dashboard
            </Link>
            <Link
              href="/admin/internship"
              className="block w-full text-left px-3 py-2 rounded hover:bg-[#17414f] transition"
            >
              🎓 Applicants
            </Link>
            <Link
              href="/admin/interns"
              className="block w-full text-left px-3 py-2 rounded hover:bg-[#17414f] transition"
            >
              🎓 InternShip
            </Link>
            <Link
              href="/admin/inhouse"
              className="block w-full text-left px-3 py-2 rounded hover:bg-[#17414f] transition"
            >
              🏢 Inhouse Application
            </Link>
          </nav>
        </div>

        {/* The logout button now uses the Next.js router */}
        <button
          className="mt-8 px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition"
          onClick={() => router.push("/")}
        >
          🚪 Logout
        </button>
      </aside>

      {/* Main Content - Replaced <Outlet /> with {children} */}
      <main className="flex-1 ml-52 p-8 bg-white text-black overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;