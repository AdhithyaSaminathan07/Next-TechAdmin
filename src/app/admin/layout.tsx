import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {/* You can put your admin navigation bar or sidebar here */}
      {children} {/* This line makes sure your page content shows up */}
    </section>
  );
}