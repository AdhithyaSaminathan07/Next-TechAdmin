"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-[#001f2e] text-white shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-[#001f2e] text-white p-6 flex flex-col shadow-lg z-20 transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Profile */}
        <div className="flex flex-col items-center mb-6 shrink-0">
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-2xl font-bold text-white shadow-md">
            TV
          </div>
          <h2 className="mt-3 text-lg font-semibold text-center">Techvaseegrah</h2>
          <p className="text-sm text-gray-300 text-center">Admin</p>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto pr-2">
          <nav className="space-y-3">
            <Link
              href="/admin/dashboard"
              className="block px-3 py-2 rounded hover:bg-[#17414f] transition"
              onClick={() => setSidebarOpen(false)}
            >
              🏠 Dashboard
            </Link>
            <Link
              href="/admin/applicants"
              className="block px-3 py-2 rounded hover:bg-[#17414f] transition"
              onClick={() => setSidebarOpen(false)}
            >
              🎓 Applicants
            </Link>
            <Link
              href="/admin/interns"
              className="block px-3 py-2 rounded hover:bg-[#17414f] transition"
              onClick={() => setSidebarOpen(false)}
            >
              🎓 Confirmed Internships
            </Link>
            <Link
              href="/admin/inhouse"
              className="block px-3 py-2 rounded hover:bg-[#17414f] transition"
              onClick={() => setSidebarOpen(false)}
            >
              🏢 Inhouse Application
            </Link>
            <Link
              href="/admin/mba-internship"
              className="block px-3 py-2 rounded hover:bg-[#17414f] transition"
              onClick={() => setSidebarOpen(false)}
            >
              🎓 MBA Internship
            </Link>
            <Link
              href="/admin/tktm"
              className="block px-3 py-2 rounded hover:bg-[#17414f] transition"
              onClick={() => setSidebarOpen(false)}
            >
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
      <main
        className={`flex-1 p-6 bg-white text-black min-h-screen overflow-y-auto transition-all duration-300
          ${sidebarOpen ? "lg:ml-64" : "ml-0 lg:ml-64"}`}
      >
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

