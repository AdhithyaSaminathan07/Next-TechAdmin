import React, { useState } from "react";
import axios from "axios";

// Define props type
interface SendFormBoxProps {
  defaultLink?: string; // optional string
}

const SendFormBox: React.FC<SendFormBoxProps> = ({ defaultLink }) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendLink = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      alert("Please enter an email address");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        email: trimmedEmail,
        link: defaultLink?.trim() || "https://in-house-admission-form.vercel.app/",
      };

      const res = await axios.post(
        "http://localhost:5001/api/send-form-link",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data?.success) {
        alert("✅ Link sent successfully!");
        setEmail("");
      } else {
        alert("⚠ Something went wrong: " + (res.data?.error || "Unknown error"));
      }
    } catch (err: unknown) {
      // Use type guard for unknown error
      if (axios.isAxiosError(err)) {
        console.error("❌ Send Link Axios Error:", err.response?.data || err.message);
      } else if (err instanceof Error) {
        console.error("❌ Send Link Error:", err.message);
      } else {
        console.error("❌ Unknown error:", err);
      }

      alert("Failed to send link. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f0fff4] shadow-md rounded-xl p-6 w-full max-w-md">
      <label className="block text-sm font-semibold text-green-700 mb-2">
        Enter Email
      </label>
      <input
        type="email"
        className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
        value={email}
        placeholder="user@example.com"
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <button
        onClick={sendLink}
        className={`mt-4 w-full py-2 rounded-lg text-white font-semibold transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
        }`}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Link"}
      </button>
    </div>
  );
};

export default SendFormBox;
