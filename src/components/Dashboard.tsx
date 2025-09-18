import React from "react";
import SendFormBox from "./InternShip/SendFormBox";
import StatsCard from "./InternShip/StatsCards";

const InternshipPage = () => {
  return (
    <div className="p-6 h-screen text-black bg-white">
      <h1 className="text-2xl font-bold mb-4 text-green-700">Admin Dashboard</h1>
      <div className="grid grid-cols-1 gap-4">
        <SendFormBox defaultLink="https://in-house-admission-form.vercel.app/" />
        <StatsCard />
      </div>
    </div>
  );
};

export default InternshipPage;
