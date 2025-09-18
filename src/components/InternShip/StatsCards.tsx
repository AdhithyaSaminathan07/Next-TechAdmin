"use client";

import React, { useEffect, useState } from "react";

interface Stats {
  applicants: number;
  internships: number;
  inhouse: number;
}

const StatsCard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/stats");
      if (!res.ok) throw new Error("Failed to fetch stats");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("❌ Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    // Optional: auto-refresh every 30s
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#f0fff4] shadow-md rounded-xl p-6 w-full max-w-md">
      <h2 className="text-lg font-semibold text-green-700 mb-4">
        📊 Live Stats
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : stats ? (
        <div className="space-y-2 text-black">
          <p>
            <span className="font-semibold">Applicants:</span>{" "}
            {stats.applicants}
          </p>
          <p>
            <span className="font-semibold">Internships:</span>{" "}
            {stats.internships}
          </p>
          <p>
            <span className="font-semibold">Inhouse Projects:</span>{" "}
            {stats.inhouse}
          </p>
        </div>
      ) : (
        <p className="text-red-500">Failed to load stats.</p>
      )}
    </div>
  );
};

export default StatsCard;
