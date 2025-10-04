// "use client";

// import React, { useState } from "react";

// // Define an interface for all the fields in your form.
// interface IFormData {
//   [key: string]: any;
//   departments?: string[];
// }

// const HomeComingForm = () => {
//   const [formValues, setFormValues] = useState<IFormData>({});
//   const [resumeFile, setResumeFile] = useState<File | null>(null);
//   const [nocFile, setNocFile] = useState<File | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormValues((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     if (e.target.name === "resume") setResumeFile(e.target.files[0]);
//     if (e.target.name === "noc") setNocFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const formData = new FormData();
//     Object.keys(formValues).forEach((key) => {
//       if (key === 'departments' && Array.isArray(formValues[key])) {
//         formValues[key].forEach((value: string) => {
//           formData.append(key, value);
//         });
//       } else {
//         formData.append(key, formValues[key]);
//       }
//     });

//     if (resumeFile) formData.append("resume", resumeFile);
//     if (nocFile) formData.append("noc", nocFile);

//     try {
//       const res = await fetch("http://localhost:5001/api/applications", {
//         method: "POST",
//         body: formData,
//       });

//       if (res.ok) {
//         alert("✅ Application submitted successfully!");
//         setFormValues({});
//         setResumeFile(null);
//         setNocFile(null);
//         (e.target as HTMLFormElement).reset();
//       } else {
//         const error = await res.json();
//         alert("❌ Error: " + error.error);
//       }
//     } catch (err) {
//       if (err instanceof Error) {
//         alert("❌ Network error: " + err.message);
//       } else {
//         alert("❌ An unknown network error occurred.");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-gray-100 py-6 px-3 sm:px-6 flex justify-center items-start">
//       {/* Background Image - Hidden on mobile, smaller on tablets */}
//       <img
//         src="/tech-v.gif"
//         alt="Tech Vaseegrah Logo"
//         className="hidden md:block absolute opacity-10 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] object-contain"
//         style={{
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           filter: "blur(2px)",
//         }}
//       />

//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-6xl bg-white shadow-xl rounded-xl p-4 sm:p-6 md:p-10 space-y-8 md:space-y-12 relative z-10"
//       >
//         {/* Header */}
//         <div className="text-center">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 mb-2">
//             Welcome TechVaseegrah
//           </h1>
//           <p className="text-base sm:text-lg font-bold text-gray-600">
//             INTERNSHIP ADMISSION APPLICATION FORM
//           </p>
//         </div>

//         {/* --- SECTION A: PERSONAL INFO --- */}
//         <section className="border-t pt-6 md:pt-8 mt-6 md:mt-8">
//           <h2 className="text-lg sm:text-xl font-semibold mb-4 md:mb-6 text-gray-800">
//             SECTION A: PERSONAL INFORMATION
//           </h2>
//           <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
//             <div className="flex-grow">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//                 <div className="md:col-span-2">
//                   <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
//                     Full Name (as per academic records)
//                   </label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formValues.fullName || ""}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter your full name"
//                     className="w-full border rounded-lg p-3 text-sm sm:text-base"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
//                     Date of Birth
//                   </label>
//                   <input
//                     type="date"
//                     name="dob"
//                     value={formValues.dob || ""}
//                     onChange={handleChange}
//                     required
//                     className="w-full border rounded-lg p-3 text-sm sm:text-base"
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
//                     Gender
//                   </label>
//                   <div className="flex flex-wrap gap-3 sm:gap-6">
//                     {["Male", "Female", "Other", "Prefer not to say"].map((g) => (
//                       <label key={g} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
//                         <input
//                           type="radio"
//                           name="gender"
//                           value={g}
//                           checked={formValues.gender === g}
//                           onChange={handleChange}
//                           className="w-4 h-4"
//                         />
//                         {g}
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
//                     Contact Number (with WhatsApp)
//                   </label>
//                   <input
//                     type="text"
//                     name="whatsApp"
//                     value={formValues.whatsapp || ""}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter your WhatsApp number"
//                     className="w-full border rounded-lg p-3 text-sm sm:text-base"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formValues.email || ""}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter your email address"
//                     className="w-full border rounded-lg p-3 text-sm sm:text-base"
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
//                     Residential Address
//                   </label>
//                   <textarea
//                     name="address"
//                     value={formValues.address || ""}
//                     onChange={handleChange}
//                     required
//                     rows={3}
//                     placeholder="Enter your complete residential address"
//                     className="w-full border rounded-lg p-3 text-sm sm:text-base"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
//                     City
//                   </label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={formValues.city || ""}
//                     onChange={handleChange}
//                     required
//                     className="w-full border rounded-lg p-3 text-sm sm:text-base"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
//                     Pincode
//                   </label>
//                   <input
//                     type="text"
//                     name="pincode"
//                     value={formValues.pincode || ""}
//                     onChange={handleChange}
//                     required
//                     className="w-full border rounded-lg p-3 text-sm sm:text-base"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Photo box */}
//             <div className="w-full lg:w-48 xl:w-56 flex-shrink-0 flex justify-center lg:justify-start">
//               <div className="w-48 h-48 lg:w-full lg:h-64 border-2 border-gray-400 rounded-lg flex items-center justify-center text-gray-500 bg-gray-50">
//                 <p className="text-center text-sm sm:text-base">Paste Photo Here</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* --- SECTION B: EDUCATIONAL DETAILS --- */}
//         <section className="border-t pt-6 md:pt-8 mt-6 md:mt-8">
//           <h2 className="text-lg sm:text-xl font-semibold mb-4 md:mb-6 text-gray-800">
//             SECTION B: EDUCATIONAL DETAILS
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//             {/* Level */}
//             <div className="md:col-span-2">
//               <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
//                 Current Level of Study
//               </label>
//               <div className="flex flex-wrap gap-3 sm:gap-6">
//                 {["Bachelor's Degree", "Master's Degree"].map((lvl) => (
//                   <label
//                     key={lvl}
//                     className="flex items-center gap-2 text-gray-700 text-sm sm:text-base"
//                   >
//                     <input
//                       type="radio"
//                       name="level"
//                       value={lvl}
//                       checked={formValues.level === lvl}
//                       onChange={handleChange}
//                       required
//                       className="w-4 h-4"
//                     />
//                     {lvl}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Course */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
//                 Course Name
//               </label>
//               <input
//                 type="text"
//                 name="course"
//                 value={formValues.course || ""}
//                 onChange={handleChange}
//                 required
//                 placeholder="e.g., B.Tech, B.Sc, M.Tech"
//                 className="w-full border p-3 rounded-lg text-sm sm:text-base"
//               />
//             </div>

//             {/* Specialization */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
//                 Major / Specialization
//               </label>
//               <input
//                 type="text"
//                 name="specialization"
//                 value={formValues.specialization || ""}
//                 onChange={handleChange}
//                 required
//                 placeholder="e.g., Computer Science"
//                 className="w-full border p-3 rounded-lg text-sm sm:text-base"
//               />
//             </div>

//             {/* College */}
//             <div className="md:col-span-2">
//               <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
//                 Name of College / University
//               </label>
//               <input
//                 type="text"
//                 name="college"
//                 value={formValues.college || ""}
//                 onChange={handleChange}
//                 required
//                 placeholder="e.g., Anna University"
//                 className="w-full border p-3 rounded-lg text-sm sm:text-base"
//               />
//             </div>

//             {/* Year */}
//             <div className="md:col-span-2">
//               <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
//                 Current Year of Study
//               </label>
//               <div className="flex flex-wrap gap-3 sm:gap-6">
//                 {["1st Year", "2nd Year", "3rd Year", "Final Year", "Others"].map(
//                   (yr) => (
//                     <label
//                       key={yr}
//                       className="flex items-center gap-2 text-gray-700 text-sm sm:text-base"
//                     >
//                       <input
//                         type="radio"
//                         name="year"
//                         value={yr}
//                         checked={formValues.year === yr}
//                         onChange={handleChange}
//                         required
//                         className="w-4 h-4"
//                       />
//                       {yr}
//                     </label>
//                   )
//                 )}
//               </div>
//             </div>

//             {/* Roll No */}
//             <div className="md:col-span-2">
//               <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
//                 College ID / Register Number
//               </label>
//               <input
//                 type="text"
//                 name="rollNo"
//                 value={formValues.rollNo || ""}
//                 onChange={handleChange}
//                 required
//                 placeholder="Your college ID or roll number"
//                 className="w-full border p-3 rounded-lg text-sm sm:text-base"
//               />
//             </div>

//             {/* Academic Requirement */}
//             <div className="md:col-span-2">
//               <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
//                 Is this internship part of your academic requirement?
//               </label>
//               <div className="flex flex-wrap gap-3 sm:gap-6">
//                 <label className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
//                   <input
//                     type="radio"
//                     name="academicRequirement"
//                     value="Yes"
//                     checked={formValues.academicRequirement === "Yes"}
//                     onChange={handleChange}
//                     required
//                     className="w-4 h-4"
//                   />
//                   Yes
//                 </label>
//                 <label className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
//                   <input
//                     type="radio"
//                     name="academicRequirement"
//                     value="No"
//                     checked={formValues.academicRequirement === "No"}
//                     onChange={handleChange}
//                     className="w-4 h-4"
//                   />
//                   No
//                 </label>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* --- SECTION C: INTERNSHIP PREFERENCES --- */}
//         <section className="border-t pt-6 md:pt-8 mt-6 md:mt-8">
//           <h2 className="text-lg sm:text-xl font-semibold mb-4 md:mb-6 text-gray-800">
//             SECTION C: INTERNSHIP PREFERENCES
//           </h2>
//           <div className="space-y-4 md:space-y-6">
//             {/* Departments */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
//                 Preferred Departments / Functional Areas
//               </label>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
//                 {[
//                   "Finance", "Marketing", "Human Resources (HR)", "Business Analytics",
//                   "Operations", "Content Writing / Media", "Research & Development",
//                   "Design / Creative", "Technology & Software Development", "Computer Science & IT",
//                   "Artificial Intelligence (AI) & Machine Learning", "Data Science / Data Analysis",
//                   "Agriculture & Agribusiness", "Food Science & Technology", "Web Development",
//                   "WebApp Development", "UI/UX Designer",
//                 ].map((area) => (
//                   <label key={area} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
//                     <input
//                       type="checkbox"
//                       name="departments"
//                       value={area}
//                       checked={(formValues.departments || []).includes(area)}
//                       onChange={(e) => {
//                         const { checked, value } = e.target;
//                         setFormValues((prev) => {
//                           const updated = new Set(prev.departments || []);
//                           if (checked) updated.add(value);
//                           else updated.delete(value);
//                           return { ...prev, departments: Array.from(updated) };
//                         });
//                       }}
//                       className="w-4 h-4"
//                     />
//                     <span className="break-words">{area}</span>
//                   </label>
//                 ))}
//               </div>
//               <input
//                 type="text"
//                 name="otherDepartment"
//                 value={formValues.otherDepartment || ""}
//                 onChange={handleChange}
//                 placeholder="Other (please specify)"
//                 className="w-full mt-4 border p-3 rounded-lg text-sm sm:text-base"
//               />
//             </div>

//             {/* Mode */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
//                 Preferred Mode of Internship
//               </label>
//               <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6">
//                 {["Remote / Online", "In-Office", "Hybrid"].map((mode) => (
//                   <label key={mode} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
//                     <input
//                       type="radio"
//                       name="mode"
//                       value={mode}
//                       checked={formValues.mode === mode}
//                       onChange={handleChange}
//                       required
//                       className="w-4 h-4"
//                     />
//                     {mode}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Duration */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
//                 Preferred Internship Duration
//               </label>
//               <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 items-start">
//                 {["1 Week", "2 Weeks", "1 Month"].map((dur) => (
//                   <label key={dur} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
//                     <input
//                       type="radio"
//                       name="duration"
//                       value={dur}
//                       checked={formValues.duration === dur}
//                       onChange={handleChange}
//                       required
//                       className="w-4 h-4"
//                     />
//                     {dur}
//                   </label>
//                 ))}
//                 <div className="w-full sm:w-64 mt-2 sm:mt-0">
//                   <input
//                     type="text"
//                     name="durationOther"
//                     value={formValues.durationOther || ""}
//                     onChange={handleChange}
//                     placeholder="Other (please specify)"
//                     className="w-full border p-3 rounded-lg text-sm sm:text-base"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Dates */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
//                   From Date
//                 </label>
//                 <input
//                   type="date"
//                   name="fromDate"
//                   value={formValues.fromDate || ""}
//                   onChange={handleChange}
//                   required
//                   className="w-full border p-3 rounded-lg text-sm sm:text-base"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
//                   To Date
//                 </label>
//                 <input
//                   type="date"
//                   name="toDate"
//                   value={formValues.toDate || ""}
//                   onChange={handleChange}
//                   required
//                   className="w-full border p-3 rounded-lg text-sm sm:text-base"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* SECTION D */}
//         <section className="border-t pt-6 md:pt-8 mt-6 md:mt-8">
//           <h2 className="text-lg sm:text-xl font-semibold mb-4 md:mb-6 text-gray-800">
//             SECTION D: SUPPORTING DOCUMENTS
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//             {/* Resume */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
//                 Upload Resume / CV (PDF or DOC)
//               </label>
//               <input
//                 type="file"
//                 name="resume"
//                 accept=".pdf,.doc,.docx"
//                 onChange={handleFileChange}
//                 className="w-full border border-gray-300 rounded-lg p-2 text-sm sm:text-base"
//                 required
//               />
//             </div>

//             {/* Bonafide/NOC */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
//                 Upload Bonafide Certificate / NOC (optional)
//               </label>
//               <input
//                 type="file"
//                 name="noc"
//                 accept=".pdf,.doc,.docx"
//                 onChange={handleFileChange}
//                 className="w-full border border-gray-300 rounded-lg p-2 text-sm sm:text-base"
//               />
//             </div>

//             {/* LinkedIn */}
//             <div className="md:col-span-2">
//               <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
//                 LinkedIn Profile / Online Portfolio (optional)
//               </label>
//               <input
//                 type="url"
//                 name="linkedin"
//                 value={formValues["linkedin"] || ""}
//                 onChange={handleChange}
//                 placeholder="e.g., https://linkedin.com/in/yourprofile"
//                 className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
//               />
//             </div>
//           </div>
//         </section>

//         {/* --- SECTION E: DECLARATION --- */}
//         <section className="border-t pt-6 md:pt-8 mt-6 md:mt-8">
//           <h2 className="text-lg sm:text-xl font-semibold mb-4 md:mb-6 text-gray-800">
//             SECTION E: DECLARATION
//           </h2>
//           <p className="text-gray-700 mb-4 text-sm sm:text-base">
//             I hereby declare that the information provided above is accurate and
//             complete to the best of my knowledge.
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//             <div>
//               <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
//                 Applicant Signature
//               </label>
//               <div className="border-b border-gray-400 h-10"></div>
//             </div>
//             <div>
//               <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Date</label>
//               <input
//                 type="date"
//                 name="signedOn"
//                 value={formValues.signedOn || ""}
//                 onChange={handleChange}
//                 required
//                 className="w-full border p-3 rounded-lg text-sm sm:text-base"
//               />
//             </div>
//           </div>
//         </section>

//         <div className="text-center pt-6">
//           <button 
//             type="submit" 
//             className="bg-black text-white px-6 sm:px-8 py-3 rounded-lg font-semibold text-base sm:text-lg transition hover:bg-gray-800 w-full sm:w-auto"
//           >
//             Submit Application
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default HomeComingForm;


"use client";

import React, { useState } from "react";

// Define an interface for all the fields in your form.
interface IFormData {
  [key: string]: any;
  departments?: string[];
}

const HomeComingForm = () => {
  const [formValues, setFormValues] = useState<IFormData>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [nocFile, setNocFile] = useState<File | null>(null);
  const [showOtherDuration, setShowOtherDuration] = useState(false);
  const [otherDurationValue, setOtherDurationValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.name === "resume") setResumeFile(e.target.files[0]);
    if (e.target.name === "noc") setNocFile(e.target.files[0]);
  };

  // Calculate end date based on duration
  const calculateEndDate = (startDate: string, duration: string) => {
    if (!startDate) return "";
    
    const start = new Date(startDate);
    
    switch (duration) {
      case "1 Week":
        start.setDate(start.getDate() + 7);
        break;
      case "2 Weeks":
        start.setDate(start.getDate() + 14);
        break;
      case "1 Month":
        start.setMonth(start.getMonth() + 1);
        break;
      case "Other":
        // Parse custom duration (e.g., "2 months", "45 days")
        if (otherDurationValue) {
          const match = otherDurationValue.match(/^(\d+)\s*(day|week|month|year)s?$/i);
          if (match) {
            const amount = parseInt(match[1]);
            const unit = match[2].toLowerCase();
            
            switch (unit) {
              case 'day':
                start.setDate(start.getDate() + amount);
                break;
              case 'week':
                start.setDate(start.getDate() + (amount * 7));
                break;
              case 'month':
                start.setMonth(start.getMonth() + amount);
                break;
              case 'year':
                start.setFullYear(start.getFullYear() + amount);
                break;
              default:
                return "";
            }
          }
        }
        break;
      default:
        return "";
    }
    
    return start.toISOString().split('T')[0];
  };

  // Handle duration radio button change
  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      duration: value,
    }));
    
    setShowOtherDuration(value === "Other");
    
    // If not "Other", clear the other duration value
    if (value !== "Other") {
      setOtherDurationValue("");
    }
    
    // Calculate end date if fromDate exists
    if (formValues.fromDate) {
      const endDate = calculateEndDate(formValues.fromDate, value);
      setFormValues((prev) => ({
        ...prev,
        toDate: endDate,
      }));
    }
  };

  // Handle from date change and calculate to date
  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fromDate = e.target.value;
    setFormValues((prev) => ({
      ...prev,
      fromDate: fromDate,
    }));

    // Calculate end date if duration is selected
    if (formValues.duration) {
      const endDate = calculateEndDate(fromDate, formValues.duration);
      setFormValues((prev) => ({
        ...prev,
        toDate: endDate,
      }));
    }
  };

  // Handle other duration input change
  const handleOtherDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOtherDurationValue(value);
    
    // Recalculate end date if fromDate exists
    if (formValues.fromDate && formValues.duration === "Other") {
      const endDate = calculateEndDate(formValues.fromDate, "Other");
      setFormValues((prev) => ({
        ...prev,
        toDate: endDate,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(formValues).forEach((key) => {
      if (key === 'departments' && Array.isArray(formValues[key])) {
        formValues[key].forEach((value: string) => {
          formData.append(key, value);
        });
      } else {
        formData.append(key, formValues[key]);
      }
    });

    if (resumeFile) formData.append("resume", resumeFile);
    if (nocFile) formData.append("noc", nocFile);

    try {
      const res = await fetch("http://localhost:5001/api/applications", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("✅ Application submitted successfully!");
        setFormValues({});
        setResumeFile(null);
        setNocFile(null);
        setShowOtherDuration(false);
        setOtherDurationValue("");
        (e.target as HTMLFormElement).reset();
      } else {
        const error = await res.json();
        alert("❌ Error: " + error.error);
      }
    } catch (err) {
      if (err instanceof Error) {
        alert("❌ Network error: " + err.message);
      } else {
        alert("❌ An unknown network error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 py-6 px-3 sm:px-6 flex justify-center items-start">
      {/* Background Image - Hidden on mobile, smaller on tablets */}
      <img
        src="/tech-v.gif"
        alt="Tech Vaseegrah Logo"
        className="hidden md:block absolute opacity-10 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] object-contain"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(2px)",
        }}
      />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl bg-white shadow-xl rounded-xl p-4 sm:p-6 md:p-10 space-y-8 md:space-y-12 relative z-10"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 mb-2">
            Welcome TechVaseegrah
          </h1>
          <p className="text-base sm:text-lg font-bold text-gray-600">
            INTERNSHIP ADMISSION APPLICATION FORM
          </p>
        </div>

        {/* --- SECTION A: PERSONAL INFO --- */}
        <section className="border-t pt-6 md:pt-8 mt-6 md:mt-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 md:mb-6 text-gray-800">
            SECTION A: PERSONAL INFORMATION
          </h2>
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            <div className="flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Full Name (as per academic records)
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formValues.fullName || ""}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full border rounded-lg p-3 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formValues.dob || ""}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg p-3 text-sm sm:text-base"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Gender
                  </label>
                  <div className="flex flex-wrap gap-3 sm:gap-6">
                    {["Male", "Female", "Other", "Prefer not to say"].map((g) => (
                      <label key={g} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={formValues.gender === g}
                          onChange={handleChange}
                          className="w-4 h-4"
                        />
                        {g}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Contact Number (with WhatsApp)
                  </label>
                  <input
                    type="text"
                    name="whatsApp"
                    value={formValues.whatsapp || ""}
                    onChange={handleChange}
                    required
                    placeholder="Enter your WhatsApp number"
                    className="w-full border rounded-lg p-3 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formValues.email || ""}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                    className="w-full border rounded-lg p-3 text-sm sm:text-base"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Residential Address
                  </label>
                  <textarea
                    name="address"
                    value={formValues.address || ""}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Enter your complete residential address"
                    className="w-full border rounded-lg p-3 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formValues.city || ""}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg p-3 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formValues.pincode || ""}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg p-3 text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>

            {/* Photo box */}
            <div className="w-full lg:w-48 xl:w-56 flex-shrink-0 flex justify-center lg:justify-start">
              <div className="w-48 h-48 lg:w-full lg:h-64 border-2 border-gray-400 rounded-lg flex items-center justify-center text-gray-500 bg-gray-50">
                <p className="text-center text-sm sm:text-base">Paste Photo Here</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION B: EDUCATIONAL DETAILS --- */}
        <section className="border-t pt-6 md:pt-8 mt-6 md:mt-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 md:mb-6 text-gray-800">
            SECTION B: EDUCATIONAL DETAILS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Level */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                Current Level of Study
              </label>
              <div className="flex flex-wrap gap-3 sm:gap-6">
                {["Bachelor's Degree", "Master's Degree"].map((lvl) => (
                  <label
                    key={lvl}
                    className="flex items-center gap-2 text-gray-700 text-sm sm:text-base"
                  >
                    <input
                      type="radio"
                      name="level"
                      value={lvl}
                      checked={formValues.level === lvl}
                      onChange={handleChange}
                      required
                      className="w-4 h-4"
                    />
                    {lvl}
                  </label>
                ))}
              </div>
            </div>

            {/* Course */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                Course Name
              </label>
              <input
                type="text"
                name="course"
                value={formValues.course || ""}
                onChange={handleChange}
                required
                placeholder="e.g., B.Tech, B.Sc, M.Tech"
                className="w-full border p-3 rounded-lg text-sm sm:text-base"
              />
            </div>

            {/* Specialization */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                Major / Specialization
              </label>
              <input
                type="text"
                name="specialization"
                value={formValues.specialization || ""}
                onChange={handleChange}
                required
                placeholder="e.g., Computer Science"
                className="w-full border p-3 rounded-lg text-sm sm:text-base"
              />
            </div>

            {/* College */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                Name of College / University
              </label>
              <input
                type="text"
                name="college"
                value={formValues.college || ""}
                onChange={handleChange}
                required
                placeholder="e.g., Anna University"
                className="w-full border p-3 rounded-lg text-sm sm:text-base"
              />
            </div>

            {/* Year */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                Current Year of Study
              </label>
              <div className="flex flex-wrap gap-3 sm:gap-6">
                {["1st Year", "2nd Year", "3rd Year", "Final Year", "Others"].map(
                  (yr) => (
                    <label
                      key={yr}
                      className="flex items-center gap-2 text-gray-700 text-sm sm:text-base"
                    >
                      <input
                        type="radio"
                        name="year"
                        value={yr}
                        checked={formValues.year === yr}
                        onChange={handleChange}
                        required
                        className="w-4 h-4"
                      />
                      {yr}
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Roll No */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                College ID / Register Number
              </label>
              <input
                type="text"
                name="rollNo"
                value={formValues.rollNo || ""}
                onChange={handleChange}
                required
                placeholder="Your college ID or roll number"
                className="w-full border p-3 rounded-lg text-sm sm:text-base"
              />
            </div>

            {/* Academic Requirement */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                Is this internship part of your academic requirement?
              </label>
              <div className="flex flex-wrap gap-3 sm:gap-6">
                <label className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                  <input
                    type="radio"
                    name="academicRequirement"
                    value="Yes"
                    checked={formValues.academicRequirement === "Yes"}
                    onChange={handleChange}
                    required
                    className="w-4 h-4"
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                  <input
                    type="radio"
                    name="academicRequirement"
                    value="No"
                    checked={formValues.academicRequirement === "No"}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  No
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION C: INTERNSHIP PREFERENCES --- */}
        <section className="border-t pt-6 md:pt-8 mt-6 md:mt-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 md:mb-6 text-gray-800">
            SECTION C: INTERNSHIP PREFERENCES
          </h2>
          <div className="space-y-4 md:space-y-6">
            {/* Departments */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                Preferred Departments / Functional Areas
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {[
                  "Finance", "Marketing", "Human Resources (HR)", "Business Analytics",
                  "Operations", "Content Writing / Media", "Research & Development",
                  "Design / Creative", "Technology & Software Development", "Computer Science & IT",
                  "Artificial Intelligence (AI) & Machine Learning", "Data Science / Data Analysis",
                  "Agriculture & Agribusiness", "Food Science & Technology", "Web Development",
                  "WebApp Development", "UI/UX Designer",
                ].map((area) => (
                  <label key={area} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                    <input
                      type="checkbox"
                      name="departments"
                      value={area}
                      checked={(formValues.departments || []).includes(area)}
                      onChange={(e) => {
                        const { checked, value } = e.target;
                        setFormValues((prev) => {
                          const updated = new Set(prev.departments || []);
                          if (checked) updated.add(value);
                          else updated.delete(value);
                          return { ...prev, departments: Array.from(updated) };
                        });
                      }}
                      className="w-4 h-4"
                    />
                    <span className="break-words">{area}</span>
                  </label>
                ))}
              </div>
              <input
                type="text"
                name="otherDepartment"
                value={formValues.otherDepartment || ""}
                onChange={handleChange}
                placeholder="Other (please specify)"
                className="w-full mt-4 border p-3 rounded-lg text-sm sm:text-base"
              />
            </div>

            {/* Mode */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                Preferred Mode of Internship
              </label>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6">
                {["Remote / Online", "In-Office", "Hybrid"].map((mode) => (
                  <label key={mode} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                    <input
                      type="radio"
                      name="mode"
                      value={mode}
                      checked={formValues.mode === mode}
                      onChange={handleChange}
                      required
                      className="w-4 h-4"
                    />
                    {mode}
                  </label>
                ))}
              </div>
            </div>

            {/* Duration - UPDATED SECTION */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                Preferred Internship Duration
              </label>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 items-start mb-4">
                {["1 Week", "2 Weeks", "1 Month", "Other"].map((dur) => (
                  <label key={dur} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                    <input
                      type="radio"
                      name="duration"
                      value={dur}
                      checked={formValues.duration === dur}
                      onChange={handleDurationChange}
                      required
                      className="w-4 h-4"
                    />
                    {dur}
                  </label>
                ))}
              </div>
              
              {/* Other Duration Input - Only shown when "Other" is selected */}
              {showOtherDuration && (
                <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Enter Custom Duration
                  </label>
                  <input
                    type="text"
                    value={otherDurationValue}
                    onChange={handleOtherDurationChange}
                    placeholder="e.g., 2 months, 45 days, 3 weeks"
                    className="w-full border p-3 rounded-lg text-sm sm:text-base mb-2"
                  />
                  <p className="text-xs text-gray-600">
                    Examples: "2 months", "45 days", "3 weeks", "1 year"
                  </p>
                </div>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                  From Date
                </label>
                <input
                  type="date"
                  name="fromDate"
                  value={formValues.fromDate || ""}
                  onChange={handleFromDateChange}
                  required
                  className="w-full border p-3 rounded-lg text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                  To Date (Auto-calculated)
                </label>
                <input
                  type="date"
                  name="toDate"
                  value={formValues.toDate || ""}
                  onChange={handleChange}
                  required
                  className="w-full border p-3 rounded-lg text-sm sm:text-base bg-gray-50"
                  readOnly
                />
                {formValues.toDate && (
                  <p className="text-xs text-green-600 mt-1">
                    ✅ End date calculated automatically based on duration
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION D */}
        <section className="border-t pt-6 md:pt-8 mt-6 md:mt-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 md:mb-6 text-gray-800">
            SECTION D: SUPPORTING DOCUMENTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Resume */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                Upload Resume / CV (PDF or DOC)
              </label>
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm sm:text-base"
                required
              />
            </div>

            {/* Bonafide/NOC */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                Upload Bonafide Certificate / NOC (optional)
              </label>
              <input
                type="file"
                name="noc"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm sm:text-base"
              />
            </div>

            {/* LinkedIn */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                LinkedIn Profile / Online Portfolio (optional)
              </label>
              <input
                type="url"
                name="linkedin"
                value={formValues["linkedin"] || ""}
                onChange={handleChange}
                placeholder="e.g., https://linkedin.com/in/yourprofile"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
              />
            </div>
          </div>
        </section>

        {/* --- SECTION E: DECLARATION --- */}
        <section className="border-t pt-6 md:pt-8 mt-6 md:mt-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 md:mb-6 text-gray-800">
            SECTION E: DECLARATION
          </h2>
          <p className="text-gray-700 mb-4 text-sm sm:text-base">
            I hereby declare that the information provided above is accurate and
            complete to the best of my knowledge.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                Applicant Signature
              </label>
              <div className="border-b border-gray-400 h-10"></div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Date</label>
              <input
                type="date"
                name="signedOn"
                value={formValues.signedOn || ""}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded-lg text-sm sm:text-base"
              />
            </div>
          </div>
        </section>

        <div className="text-center pt-6">
          <button 
            type="submit" 
            className="bg-black text-white px-6 sm:px-8 py-3 rounded-lg font-semibold text-base sm:text-lg transition hover:bg-gray-800 w-full sm:w-auto"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomeComingForm;