  //   "use client";
  // import React, { useState } from "react";


  // const InternshipForm = () => {
  //   const [formValues, setFormValues] = useState({});
  //   const [resumeFile, setResumeFile] = useState(null);
  //   const [nocFile, setNocFile] = useState(null);

  //   // Handle all input/textarea changes
  //   const handleChange = (e) => {
  //     const { name, value, type, checked } = e.target;
  //     const fieldValue = type === "checkbox" ? checked : value;

  //     setFormValues((prev) => ({
  //       ...prev,
  //       [name]: fieldValue,
  //     }));
  //   };

  //   // Handle file changes
  //   const handleFileChange = (e) => {
  //     if (!e.target.files) return;
  //     if (e.target.name === "resume") setResumeFile(e.target.files[0]);
  //     if (e.target.name === "noc") setNocFile(e.target.files[0]);
  //   };

  //   // Submit form
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     const formData = new FormData();
  //     Object.keys(formValues).forEach((key) => {
  //       formData.append(key, formValues[key]);
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
  //       } else {
  //         const error = await res.json();
  //         alert("❌ Error: " + error.error);
  //       }
  //     } catch (err) {
  //       alert("❌ Network error: " + err.message);
  //     }
  //   };

  //   return (
  //     <div className="min-h-screen w-full bg-gray-100 py-12 px-4 md:px-10 flex justify-center items-start">
  //       <img
  //         src="/tech-v.gif"
  //         alt="Tech Vaseegrah Logo"
  //         className="absolute opacity-10 w-[500px] h-[500px] object-contain"
  //         style={{
  //           top: "50%",
  //           left: "50%",
  //           transform: "translate(-50%, -50%)",
  //           filter: "blur(2px)",
  //         }}
  //       />

  //       <form
  //         onSubmit={handleSubmit}
  //         className="w-full max-w-6xl bg-white shadow-xl rounded-xl p-10 space-y-12"
  //       >
  //         {/* Header */}
  //         <div className="text-center">
  //           <h1 className="text-4xl font-bold text-green-700 mb-2">
  //             Welcome TechVaseegrah
  //           </h1>
  //           <p className="text-lg font-bold text-gray-600">
  //             INTERNSHIP ADMISSION APPLICATION FORM
  //           </p>
  //         </div>

  //         {/* --- SECTION A: PERSONAL INFO --- */}
  //         <section className="border-t pt-8 mt-8">
  //           <h2 className="text-xl font-semibold mb-6 text-gray-800">
  //             SECTION A: PERSONAL INFORMATION
  //           </h2>
  //           <div className="flex flex-col md:flex-row gap-8">
  //             <div className="flex-grow">
  //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //                 <div>
  //                   <label className="block text-gray-700 font-medium mb-2">
  //                     Full Name (as per academic records)
  //                   </label>
  //                   <input
  //                     type="text"
  //                     name="Full Name (as per academic records)"
  //                     value={formValues["Full Name (as per academic records)"] || ""}
  //                     onChange={handleChange}
  //                     required
  //                     placeholder="Enter your full name"
  //                     className="w-full border rounded-lg p-3"
  //                   />
  //                 </div>

  //                 <div>
  //                   <label className="block text-gray-700 font-medium mb-2">
  //                     Date of Birth
  //                   </label>
  //                   <input
  //                     type="date"
  //                     name="Date of Birth"
  //                     value={formValues["Date of Birth"] || ""}
  //                     onChange={handleChange}
  //                     required
  //                     className="w-full border rounded-lg p-3"
  //                   />
  //                 </div>

  //                 <div className="md:col-span-2">
  //                   <label className="block text-gray-700 font-medium mb-2">
  //                     Gender
  //                   </label>
  //                   <div className="flex gap-6">
  //                     {["Male", "Female", "Other", "Prefer not to say"].map((g) => (
  //                       <label key={g} className="flex items-center gap-2 text-gray-700">
  //                         <input
  //                           type="radio"
  //                           name="Gender"
  //                           value={g}
  //                           checked={formValues["Gender"] === g}
  //                           onChange={handleChange}
  //                         />
  //                         {g}
  //                       </label>
  //                     ))}
  //                   </div>
  //                 </div>

  //                 <div>
  //                   <label className="block text-gray-700 font-medium mb-2">
  //                     Contact Number (with WhatsApp)
  //                   </label>
  //                   <input
  //                     type="text"
  //                     name="Contact Number (with WhatsApp)"
  //                     value={formValues["Contact Number (with WhatsApp)"] || ""}
  //                     onChange={handleChange}
  //                     required
  //                     placeholder="Enter your WhatsApp number"
  //                     className="w-full border rounded-lg p-3"
  //                   />
  //                 </div>

  //                 <div>
  //                   <label className="block text-gray-700 font-medium mb-2">
  //                     Email Address
  //                   </label>
  //                   <input
  //                     type="email"
  //                     name="Email Address"
  //                     value={formValues["Email Address"] || ""}
  //                     onChange={handleChange}
  //                     required
  //                     placeholder="Enter your email address"
  //                     className="w-full border rounded-lg p-3"
  //                   />
  //                 </div>

  //                 <div className="md:col-span-2">
  //                   <label className="block text-gray-700 font-medium mb-2">
  //                     Residential Address
  //                   </label>
  //                   <textarea
  //                     name="Residential Address"
  //                     value={formValues["Residential Address"] || ""}
  //                     onChange={handleChange}
  //                     required
  //                     rows={3}
  //                     placeholder="Enter your complete residential address"
  //                     className="w-full border rounded-lg p-3"
  //                   />
  //                 </div>

  //                 <div>
  //                   <label className="block text-gray-700 font-medium mb-2">
  //                     City
  //                   </label>
  //                   <input
  //                     type="text"
  //                     name="City"
  //                     value={formValues["City"] || ""}
  //                     onChange={handleChange}
  //                     required
  //                     className="w-full border rounded-lg p-3"
  //                   />
  //                 </div>

  //                 <div>
  //                   <label className="block text-gray-700 font-medium mb-2">
  //                     Pincode
  //                   </label>
  //                   <input
  //                     type="text"
  //                     name="Pincode"
  //                     value={formValues["Pincode"] || ""}
  //                     onChange={handleChange}
  //                     required
  //                     className="w-full border rounded-lg p-3"
  //                   />
  //                 </div>
  //               </div>
  //             </div>

  //             {/* Photo box */}
  //             <div className="w-full md:w-56 flex-shrink-0">
  //               <div className="w-full h-64 border-2 border-gray-400 rounded-lg flex items-center justify-center text-gray-500 bg-gray-50">
  //                 <p className="text-center">Paste Photo Here</p>
  //               </div>
  //             </div>
  //           </div>
  //         </section>

  // {/* --- SECTION B: EDUCATIONAL DETAILS --- */}
  //         <section className="border-t pt-8 mt-8">
  //           <h2 className="text-xl font-semibold mb-6 text-gray-800">
  //             SECTION B: EDUCATIONAL DETAILS
  //           </h2>
  //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //             {/* Level */}
  //             <div>
  //               <label className="block text-gray-700 font-medium mb-2">
  //                 Current Level of Study
  //               </label>
  //               <div className="flex gap-6">
  //                 {["Bachelor’s Degree", "Master’s Degree"].map((lvl) => (
  //                   <label
  //                     key={lvl}
  //                     className="flex items-center gap-2 text-gray-700"
  //                   >
  //                     <input
  //                       type="radio"
  //                       name="level"
  //                       value={lvl}
  //                       checked={formValues.level === lvl}
  //                       onChange={handleChange}
  //                       required
  //                     />
  //                     {lvl}
  //                   </label>
  //                 ))}
  //               </div>
  //             </div>

  //             {/* Course */}
  //             <div>
  //               <label className="block text-gray-700 font-medium mb-2">
  //                 Course Name
  //               </label>
  //               <input
  //                 type="text"
  //                 name="course"
  //                 value={formValues.course || ""}
  //                 onChange={handleChange}
  //                 required
  //                 placeholder="e.g., B.Tech, B.Sc, M.Tech"
  //                 className="w-full border p-3 rounded-lg"
  //               />
  //             </div>

  //             {/* Specialization */}
  //             <div>
  //               <label className="block text-gray-700 font-medium mb-2">
  //                 Major / Specialization
  //               </label>
  //               <input
  //                 type="text"
  //                 name="specialization"
  //                 value={formValues.specialization || ""}
  //                 onChange={handleChange}
  //                 required
  //                 placeholder="e.g., Computer Science"
  //                 className="w-full border p-3 rounded-lg"
  //               />
  //             </div>

  //             {/* College */}
  //             <div>
  //               <label className="block text-gray-700 font-medium mb-2">
  //                 Name of College / University
  //               </label>
  //               <input
  //                 type="text"
  //                 name="college"
  //                 value={formValues.college || ""}
  //                 onChange={handleChange}
  //                 required
  //                 placeholder="e.g., Anna University"
  //                 className="w-full border p-3 rounded-lg"
  //               />
  //             </div>

  //             {/* Year */}
  //             <div className="md:col-span-2">
  //               <label className="block text-gray-700 font-medium mb-2">
  //                 Current Year of Study
  //               </label>
  //               <div className="flex flex-wrap gap-6">
  //                 {["1st Year", "2nd Year", "3rd Year", "Final Year", "Others"].map(
  //                   (yr) => (
  //                     <label
  //                       key={yr}
  //                       className="flex items-center gap-2 text-gray-700"
  //                     >
  //                       <input
  //                         type="radio"
  //                         name="year"
  //                         value={yr}
  //                         checked={formValues.year === yr}
  //                         onChange={handleChange}
  //                         required
  //                       />
  //                       {yr}
  //                     </label>
  //                   )
  //                 )}
  //               </div>
  //             </div>

  //             {/* Roll No */}
  //             <div>
  //               <label className="block text-gray-700 font-medium mb-2">
  //                 College ID / Register Number
  //               </label>
  //               <input
  //                 type="text"
  //                 name="rollNo"
  //                 value={formValues.rollNo || ""}
  //                 onChange={handleChange}
  //                 required
  //                 placeholder="Your college ID or roll number"
  //                 className="w-full border p-3 rounded-lg"
  //               />
  //             </div>

  //             {/* Academic Requirement */}
  //             <div className="md:col-span-2">
  //               <label className="block text-gray-700 font-medium mb-2">
  //                 Is this internship part of your academic requirement?
  //               </label>
  //               <div className="flex gap-6">
  //                 <label className="flex items-center gap-2 text-gray-700">
  //                   <input
  //                     type="radio"
  //                     name="academicRequirement"
  //                     value="Yes"
  //                     checked={formValues.academicRequirement === "Yes"}
  //                     onChange={handleChange}
  //                     required
  //                   />
  //                   Yes
  //                 </label>
  //                 <label className="flex items-center gap-2 text-gray-700">
  //                   <input
  //                     type="radio"
  //                     name="academicRequirement"
  //                     value="No"
  //                     checked={formValues.academicRequirement === "No"}
  //                     onChange={handleChange}
  //                   />
  //                   No
  //                 </label>
  //               </div>
  //             </div>
  //           </div>
  //         </section>

  //         {/* --- SECTION C: INTERNSHIP PREFERENCES --- */}
  //         <section className="border-t pt-8 mt-8">
  //           <h2 className="text-xl font-semibold mb-6 text-gray-800">
  //             SECTION C: INTERNSHIP PREFERENCES
  //           </h2>
  //           <div className="space-y-6">
  //             {/* Departments */}
  //             <div>
  //               <label className="block text-gray-700 font-medium mb-2">
  //                 Preferred Departments / Functional Areas
  //               </label>
  //               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  //                 {[
  //                   "Finance",
  //                   "Marketing",
  //                   "Human Resources (HR)",
  //                   "Business Analytics",
  //                   "Operations",
  //                   "Content Writing / Media",
  //                   "Research & Development",
  //                   "Design / Creative",
  //                   "Technology & Software Development",
  //                   "Computer Science & IT",
  //                   "Artificial Intelligence (AI) & Machine Learning",
  //                   "Data Science / Data Analysis",
  //                   "Agriculture & Agribusiness",
  //                   "Food Science & Technology",
  //                   "Web Development",
  //                   "WebApp Development",
  //                   "UI/UX Designer",
  //                 ].map((area) => (
  //                   <label
  //                     key={area}
  //                     className="flex items-center gap-2 text-gray-700"
  //                   >
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
  //                     />
  //                     {area}
  //                   </label>
  //                 ))}
  //               </div>
  //               <input
  //                 type="text"
  //                 name="otherDepartment"
  //                 value={formValues.otherDepartment || ""}
  //                 onChange={handleChange}
  //                 placeholder="Other (please specify)"
  //                 className="w-full mt-4 border p-3 rounded-lg"
  //               />
  //             </div>

  //             {/* Mode */}
  //             <div>
  //               <label className="block text-gray-700 font-medium mb-2">
  //                 Preferred Mode of Internship
  //               </label>
  //               <div className="flex flex-wrap gap-6">
  //                 {["Remote / Online", "In-Office", "Hybrid"].map((mode) => (
  //                   <label
  //                     key={mode}
  //                     className="flex items-center gap-2 text-gray-700"
  //                   >
  //                     <input
  //                       type="radio"
  //                       name="mode"
  //                       value={mode}
  //                       checked={formValues.mode === mode}
  //                       onChange={handleChange}
  //                       required
  //                     />
  //                     {mode}
  //                   </label>
  //                 ))}
  //               </div>
  //             </div>

  //             {/* Duration */}
  //             <div>
  //               <label className="block text-gray-700 font-medium mb-2">
  //                 Preferred Internship Duration
  //               </label>
  //               <div className="flex flex-wrap gap-6">
  //                 {["1 Week", "2 Weeks", "1 Month"].map((dur) => (
  //                   <label
  //                     key={dur}
  //                     className="flex items-center gap-2 text-gray-700"
  //                   >
  //                     <input
  //                       type="radio"
  //                       name="duration"
  //                       value={dur}
  //                       checked={formValues.duration === dur}
  //                       onChange={handleChange}
  //                       required
  //                     />
  //                     {dur}
  //                   </label>
  //                 ))}
  //                 <input
  //                   type="text"
  //                   name="durationOther"
  //                   value={formValues.durationOther || ""}
  //                   onChange={handleChange}
  //                   placeholder="Other (please specify)"
  //                   className="w-64 border p-3 rounded-lg"
  //                 />
  //               </div>
  //             </div>

  //             {/* Dates */}
  //             <div>
  //               <label className="block text-gray-700 font-medium mb-2">
  //                 From Date
  //               </label>
  //               <input
  //                 type="date"
  //                 name="fromDate"
  //                 value={formValues.fromDate || ""}
  //                 onChange={handleChange}
  //                 required
  //                 className="w-full border p-3 rounded-lg"
  //               />
  //             </div>

  //             <div>
  //               <label className="block text-gray-700 font-medium mb-2">
  //                 To Date
  //               </label>
  //               <input
  //                 type="date"
  //                 name="toDate"
  //                 value={formValues.toDate || ""}
  //                 onChange={handleChange}
  //                 required
  //                 className="w-full border p-3 rounded-lg"
  //               />
  //             </div>
  //           </div>
  //         </section>
              
  //       {/* SECTION D */}
  // <section className="border-t pt-8 mt-8">
  //   <h2 className="text-xl font-semibold mb-6 text-gray-800">
  //     SECTION D: SUPPORTING DOCUMENTS
  //   </h2>
  //   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //     {/* Resume */}
  //     <div>
  //       <label className="block text-gray-700 font-medium mb-2">
  //         Upload Resume / CV (PDF or DOC)
  //       </label>
  //       <input
  //         type="file"
  //         name="resume"
  //         accept=".pdf,.doc,.docx"
  //         onChange={handleFileChange}
  //         className="w-full border border-gray-300 rounded-lg p-2"
  //         required
  //       />
  //     </div>

  //     {/* Bonafide/NOC */}
  //     <div>
  //       <label className="block text-gray-700 font-medium mb-2">
  //         Upload Bonafide Certificate / NOC (optional)
  //       </label>
  //       <input
  //         type="file"
  //         name="noc"
  //         accept=".pdf,.doc,.docx"
  //         onChange={handleFileChange}
  //         className="w-full border border-gray-300 rounded-lg p-2"
  //       />
  //     </div>

  //     {/* LinkedIn */}
  //     <div className="md:col-span-2">
  //       <label className="block text-gray-700 font-medium mb-2">
  //         LinkedIn Profile / Online Portfolio (optional)
  //       </label>
  //       <input
  //         type="url"
  //         name="linkedin"
  //         value={formValues["linkedin"] || ""}
  //         onChange={handleChange}
  //         placeholder="e.g., https://linkedin.com/in/yourprofile"
  //         className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
  //       />
  //     </div>
  //   </div>
  // </section>



  //   {/* --- SECTION E: DECLARATION --- */}
  //         <section className="border-t pt-8 mt-8">
  //           <h2 className="text-xl font-semibold mb-6 text-gray-800">
  //             SECTION E: DECLARATION
  //           </h2>
  //           <p className="text-gray-700 mb-4">
  //             I hereby declare that the information provided above is accurate and
  //             complete to the best of my knowledge.
  //           </p>
  //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //             <div>
  //               <label className="block text-gray-700 font-medium mb-2">
  //                 Applicant Signature
  //               </label>
  //               <div className="border-b border-gray-400 h-10"></div>
  //             </div>
  //             <div>
  //               <label className="block text-gray-700 font-medium mb-2">Date</label>
  //               <input
  //                 type="date"
  //                 name="signedOn"
  //                 value={formValues.signedOn || ""}
  //                 onChange={handleChange}
  //                 required
  //                 className="w-full border p-3 rounded-lg"
  //               />
  //             </div>
  //           </div>
  //         </section>

  //         <div className="text-center pt-6">
  //           <button type="submit" className="bg-black text-white px-8 py-3 rounded-lg font-semibold text-lg transition">
  //             Submit Application
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   );
  // };

  // export default InternshipForm;


  "use client";

import React, { useState } from "react";

// Define an interface for all the fields in your form.
interface IFormData {
  [key: string]: any; // Allows for dynamic string keys
  departments?: string[];
}

const HomeComingForm = () => {
  const [formValues, setFormValues] = useState<IFormData>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [nocFile, setNocFile] = useState<File | null>(null);

  // CORRECTED: This function now correctly handles changes for text, radio, and textarea inputs.
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
    <div className="min-h-screen w-full bg-gray-100 py-12 px-4 md:px-10 flex justify-center items-start">
      <img
        src="/tech-v.gif"
        alt="Tech Vaseegrah Logo"
        className="absolute opacity-10 w-[500px] h-[500px] object-contain"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(2px)",
        }}
      />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl bg-white shadow-xl rounded-xl p-10 space-y-12"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-700 mb-2">
            Welcome TechVaseegrah
          </h1>
          <p className="text-lg font-bold text-gray-600">
            INTERNSHIP ADMISSION APPLICATION FORM
          </p>
        </div>

        {/* --- SECTION A: PERSONAL INFO --- */}
        <section className="border-t pt-8 mt-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            SECTION A: PERSONAL INFORMATION
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Full Name (as per academic records)
                  </label>
                  <input
                    type="text"
                    name="Full Name (as per academic records)"
                    value={formValues["Full Name (as per academic records)"] || ""}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full border rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="Date of Birth"
                    value={formValues["Date of Birth"] || ""}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg p-3"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    Gender
                  </label>
                  <div className="flex gap-6">
                    {["Male", "Female", "Other", "Prefer not to say"].map((g) => (
                      <label key={g} className="flex items-center gap-2 text-gray-700">
                        <input
                          type="radio"
                          name="Gender"
                          value={g}
                          checked={formValues["Gender"] === g}
                          onChange={handleChange}
                        />
                        {g}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Contact Number (with WhatsApp)
                  </label>
                  <input
                    type="text"
                    name="Contact Number (with WhatsApp)"
                    value={formValues["Contact Number (with WhatsApp)"] || ""}
                    onChange={handleChange}
                    required
                    placeholder="Enter your WhatsApp number"
                    className="w-full border rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="Email Address"
                    value={formValues["Email Address"] || ""}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                    className="w-full border rounded-lg p-3"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    Residential Address
                  </label>
                  <textarea
                    name="Residential Address"
                    value={formValues["Residential Address"] || ""}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Enter your complete residential address"
                    className="w-full border rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="City"
                    value={formValues["City"] || ""}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="Pincode"
                    value={formValues["Pincode"] || ""}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg p-3"
                  />
                </div>
              </div>
            </div>

            {/* Photo box */}
            <div className="w-full md:w-56 flex-shrink-0">
              <div className="w-full h-64 border-2 border-gray-400 rounded-lg flex items-center justify-center text-gray-500 bg-gray-50">
                <p className="text-center">Paste Photo Here</p>
              </div>
            </div>
          </div>
        </section>

{/* --- SECTION B: EDUCATIONAL DETAILS --- */}
        <section className="border-t pt-8 mt-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            SECTION B: EDUCATIONAL DETAILS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Level */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Current Level of Study
              </label>
              <div className="flex gap-6">
                {["Bachelor’s Degree", "Master’s Degree"].map((lvl) => (
                  <label
                    key={lvl}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <input
                      type="radio"
                      name="level"
                      value={lvl}
                      checked={formValues.level === lvl}
                      onChange={handleChange}
                      required
                    />
                    {lvl}
                  </label>
                ))}
              </div>
            </div>

            {/* Course */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Course Name
              </label>
              <input
                type="text"
                name="course"
                value={formValues.course || ""}
                onChange={handleChange}
                required
                placeholder="e.g., B.Tech, B.Sc, M.Tech"
                className="w-full border p-3 rounded-lg"
              />
            </div>

            {/* Specialization */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Major / Specialization
              </label>
              <input
                type="text"
                name="specialization"
                value={formValues.specialization || ""}
                onChange={handleChange}
                required
                placeholder="e.g., Computer Science"
                className="w-full border p-3 rounded-lg"
              />
            </div>

            {/* College */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name of College / University
              </label>
              <input
                type="text"
                name="college"
                value={formValues.college || ""}
                onChange={handleChange}
                required
                placeholder="e.g., Anna University"
                className="w-full border p-3 rounded-lg"
              />
            </div>

            {/* Year */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">
                Current Year of Study
              </label>
              <div className="flex flex-wrap gap-6">
                {["1st Year", "2nd Year", "3rd Year", "Final Year", "Others"].map(
                  (yr) => (
                    <label
                      key={yr}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <input
                        type="radio"
                        name="year"
                        value={yr}
                        checked={formValues.year === yr}
                        onChange={handleChange}
                        required
                      />
                      {yr}
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Roll No */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                College ID / Register Number
              </label>
              <input
                type="text"
                name="rollNo"
                value={formValues.rollNo || ""}
                onChange={handleChange}
                required
                placeholder="Your college ID or roll number"
                className="w-full border p-3 rounded-lg"
              />
            </div>

            {/* Academic Requirement */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">
                Is this internship part of your academic requirement?
              </label>
              {/* THIS IS THE LINE WITH THE FIX */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="radio"
                    name="academicRequirement"
                    value="Yes"
                    checked={formValues.academicRequirement === "Yes"}
                    onChange={handleChange}
                    required
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="radio"
                    name="academicRequirement"
                    value="No"
                    checked={formValues.academicRequirement === "No"}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION C: INTERNSHIP PREFERENCES --- */}
        <section className="border-t pt-8 mt-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            SECTION C: INTERNSHIP PREFERENCES
          </h2>
          <div className="space-y-6">
            {/* Departments */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Preferred Departments / Functional Areas
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Finance", "Marketing", "Human Resources (HR)", "Business Analytics",
                  "Operations", "Content Writing / Media", "Research & Development",
                  "Design / Creative", "Technology & Software Development", "Computer Science & IT",
                  "Artificial Intelligence (AI) & Machine Learning", "Data Science / Data Analysis",
                  "Agriculture & Agribusiness", "Food Science & Technology", "Web Development",
                  "WebApp Development", "UI/UX Designer",
                ].map((area) => (
                  <label key={area} className="flex items-center gap-2 text-gray-700">
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
                    />
                    {area}
                  </label>
                ))}
              </div>
              <input
                type="text"
                name="otherDepartment"
                value={formValues.otherDepartment || ""}
                onChange={handleChange}
                placeholder="Other (please specify)"
                className="w-full mt-4 border p-3 rounded-lg"
              />
            </div>

            {/* Mode */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Preferred Mode of Internship
              </label>
              <div className="flex flex-wrap gap-6">
                {["Remote / Online", "In-Office", "Hybrid"].map((mode) => (
                  <label key={mode} className="flex items-center gap-2 text-gray-700">
                    <input
                      type="radio"
                      name="mode"
                      value={mode}
                      checked={formValues.mode === mode}
                      onChange={handleChange}
                      required
                    />
                    {mode}
                  </label>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Preferred Internship Duration
              </label>
              <div className="flex flex-wrap gap-6">
                {["1 Week", "2 Weeks", "1 Month"].map((dur) => (
                  <label key={dur} className="flex items-center gap-2 text-gray-700">
                    <input
                      type="radio"
                      name="duration"
                      value={dur}
                      checked={formValues.duration === dur}
                      onChange={handleChange}
                      required
                    />
                    {dur}
                  </label>
                ))}
                <input
                  type="text"
                  name="durationOther"
                  value={formValues.durationOther || ""}
                  onChange={handleChange}
                  placeholder="Other (please specify)"
                  className="w-64 border p-3 rounded-lg"
                />
              </div>
            </div>

            {/* Dates */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                From Date
              </label>
              <input
                type="date"
                name="fromDate"
                value={formValues.fromDate || ""}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                To Date
              </label>
              <input
                type="date"
                name="toDate"
                value={formValues.toDate || ""}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded-lg"
              />
            </div>
          </div>
        </section>

      {/* SECTION D */}
      <section className="border-t pt-8 mt-8">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          SECTION D: SUPPORTING DOCUMENTS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Resume */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Resume / CV (PDF or DOC)
            </label>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          {/* Bonafide/NOC */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Bonafide Certificate / NOC (optional)
            </label>
            <input
              type="file"
              name="noc"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* LinkedIn */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              LinkedIn Profile / Online Portfolio (optional)
            </label>
            <input
              type="url"
              name="linkedin"
              value={formValues["linkedin"] || ""}
              onChange={handleChange}
              placeholder="e.g., https://linkedin.com/in/yourprofile"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
      </section>

        {/* --- SECTION E: DECLARATION --- */}
        <section className="border-t pt-8 mt-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            SECTION E: DECLARATION
          </h2>
          <p className="text-gray-700 mb-4">
            I hereby declare that the information provided above is accurate and
            complete to the best of my knowledge.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Applicant Signature
              </label>
              <div className="border-b border-gray-400 h-10"></div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Date</label>
              <input
                type="date"
                name="signedOn"
                value={formValues.signedOn || ""}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded-lg"
              />
            </div>
          </div>
        </section>

        <div className="text-center pt-6">
          <button type="submit" className="bg-black text-white px-8 py-3 rounded-lg font-semibold text-lg transition">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomeComingForm;
