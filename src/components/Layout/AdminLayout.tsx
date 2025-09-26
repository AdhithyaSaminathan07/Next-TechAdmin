"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      {/* Sidebar */}
      <aside className="w-52 bg-[#001f2e] text-white p-6 flex flex-col fixed inset-y-0 left-0 shadow-lg z-20">
        {/* Profile */}
        <div className="flex flex-col items-center mb-6 shrink-0">
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-2xl font-bold text-white shadow-md">
            TV
          </div>
          <h2 className="mt-3 text-lg font-semibold">Techvaseegrah</h2>
          <p className="text-sm text-gray-300">Admin</p>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto pr-2">
          <nav className="space-y-3">
            <Link href="/admin/dashboard" className="block px-3 py-2 rounded hover:bg-[#17414f] transition">
              🏠 Dashboard
            </Link>
            <Link href="/admin/applicants" className="block px-3 py-2 rounded hover:bg-[#17414f] transition">
              🎓 Applicants
            </Link>
            <Link href="/admin/interns" className="block px-3 py-2 rounded hover:bg-[#17414f] transition">
              🎓 Confirmed Internships
            </Link>
            <Link href="/admin/inhouse" className="block px-3 py-2 rounded hover:bg-[#17414f] transition">
              🏢 Inhouse Application
            </Link>
            <Link href="/admin/mba-internship" className="block px-3 py-2 rounded hover:bg-[#17414f] transition">
              🎓 MBA Internship
            </Link>
            <Link href="/admin/tktm" className="block px-3 py-2 rounded hover:bg-[#17414f] transition">
              🤝 தோள் கொடுப்போம் தொழில் முனைந்திட
            </Link>
          </nav>
        </div>

        {/* Fixed Logout */}
        <div className="shrink-0 pt-4">
          <button
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition"
            onClick={() => router.push("/")}
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-52 p-8 bg-white text-black overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
