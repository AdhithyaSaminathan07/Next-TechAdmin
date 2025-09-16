// src/app/admin/layout.tsx
"use client"; // since AdminLayout uses hooks

import React from "react";
import AdminLayout from "@/components/Layout/AdminLayout";

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
