import React from "react";
import SendFormBox from "./InternShip/SendFormBox";
import StatsCard from "./InternShip/StatsCards";

const InternshipPage = () => {
  return (
    <div className="p-4 md:p-6 min-h-screen text-black bg-white">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-green-700 text-center md:text-left">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Box */}
        <SendFormBox defaultLink="https://in-house-admission-form.vercel.app/" />

        {/* Stats Card */}
        <StatsCard />
      </div>
    </div>
  );
};

export default InternshipPage;
