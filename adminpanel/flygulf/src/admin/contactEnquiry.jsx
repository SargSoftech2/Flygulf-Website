

// import { useState, useEffect, useRef } from "react";
// import { getEnquiries } from "../apiIntegration/Contactenquiry.api";

// const STATUS_OPTIONS = [
//   { value: "ALL",         label: "All Status",  dot: "#94a3b8", bg: "#f8fafc",  text: "#64748b",  border: "#e2e8f0" },
//   { value: "NEW",         label: "New",         dot: "#3b82f6", bg: "#eff6ff",  text: "#2563eb",  border: "#bfdbfe" },
//   { value: "IN_PROGRESS", label: "In Progress", dot: "#f59e0b", bg: "#fffbeb",  text: "#d97706",  border: "#fde68a" },
//   { value: "CONFIRMED",   label: "Confirmed",   dot: "#8b5cf6", bg: "#f5f3ff",  text: "#7c3aed",  border: "#ddd6fe" },
//   { value: "COMPLETED",   label: "Completed",   dot: "#10b981", bg: "#ecfdf5",  text: "#059669",  border: "#a7f3d0" },
//   { value: "CANCELLED",   label: "Cancelled",   dot: "#ef4444", bg: "#fef2f2",  text: "#dc2626",  border: "#fecaca" },
// ];

// const getStatus = (val) => STATUS_OPTIONS.find(s => s.value === val) || STATUS_OPTIONS[0];

// const MOCK_DATA = [
//   { id: 1, name: "Ahmed Al Rashid", email: "ahmed@example.com",   subject: "Web Development",     message: "I would like to enroll in the web development bootcamp.", status: "NEW",         createdAt: "2024-02-20" },
//   { id: 2, name: "Sarah Mitchell",  email: "sarah.m@gmail.com",   subject: "Data Science & AI",   message: "Interested in the Data Science program.",                status: "IN_PROGRESS", createdAt: "2024-02-19" },
//   { id: 3, name: "James Porter",    email: "jporter@corp.com",    subject: "UI/UX Design",        message: "Our company wants to enroll 10 employees.",              status: "CONFIRMED",   createdAt: "2024-02-18" },
//   { id: 4, name: "Fatima Hassan",   email: "fatima.h@mail.com",   subject: "Cybersecurity",       message: "I want to know more about the advanced track.",          status: "COMPLETED",   createdAt: "2024-02-17" },
//   { id: 5, name: "Robert Chen",     email: "rchen@tech.io",       subject: "Cloud Computing",     message: "Please send info about the cloud certification.",        status: "CANCELLED",   createdAt: "2024-02-16" },
//   { id: 6, name: "Priya Sharma",    email: "priya.s@outlook.com", subject: "Mobile Development",  message: "Looking to learn Flutter for mobile development.",       status: "NEW",         createdAt: "2024-02-15" },
// ];

// const AVATAR_COLORS = [
//   ["#dbeafe", "#2563eb"], ["#ede9fe", "#7c3aed"], ["#dcfce7", "#16a34a"],
//   ["#fce7f3", "#db2777"], ["#ffedd5", "#ea580c"], ["#e0f2fe", "#0284c7"],
// ];

// function Avatar({ name, index }) {
//   const [bg, text] = AVATAR_COLORS[index % AVATAR_COLORS.length];
//   return (
//     <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold flex-shrink-0"
//       style={{ background: bg, color: text }}>
//       {name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
//     </div>
//   );
// }

// function StatusBadge({ status }) {
//   const s = getStatus(status);
//   return (
//     <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
//       style={{ background: s.bg, color: s.text, border: `1.5px solid ${s.border}` }}>
//       <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
//       {s.label}
//     </span>
//   );
// }

// function Modal({ message, index, onClose }) {
//   if (!message) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
//       <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" />
//       <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
//         style={{ animation: "popIn 0.2s cubic-bezier(0.34,1.56,0.64,1)" }}
//         onClick={e => e.stopPropagation()}>
//         <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${getStatus(message.status).dot}, ${getStatus(message.status).border})` }} />
//         <div className="p-7">
//           <div className="flex items-start justify-between mb-6">
//             <div className="flex items-center gap-3.5">
//               <Avatar name={message.name} index={index} />
//               <div>
//                 <p className="font-bold text-slate-800">{message.name}</p>
//                 <p className="text-xs text-slate-400 mt-0.5">{message.email}</p>
//               </div>
//             </div>
//             <button onClick={onClose}
//               className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 transition-all">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//           {message.subject && (
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#eff6ff" }}>
//                 <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                 </svg>
//               </div>
//               <span className="text-sm font-semibold text-slate-700">{message.subject}</span>
//             </div>
//           )}
//           <div className="rounded-2xl p-4 mb-5 bg-slate-50 border border-slate-100">
//             <p className="text-sm text-slate-600 leading-relaxed">{message.message}</p>
//           </div>
//           <div className="flex items-center justify-between">
//             <StatusBadge status={message.status} />
//             <span className="text-xs text-slate-400 flex items-center gap-1.5">
//               <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//               {message.createdAt}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function ContactEnquiries() {
//   const [enquiries, setEnquiries]         = useState([]);
//   const [loading, setLoading]             = useState(true);
//   const [search, setSearch]               = useState("");
//   const [selected, setSelected]           = useState(null);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [newEnquiries, setNewEnquiries]   = useState([]);

//   // "home" | "total" | "new"
//   const [view, setView] = useState("home");

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [view]);

//   useEffect(() => {
//     const loadEnquiries = async () => {
//       try {
//         const response = await getEnquiries();
//         if (response.success) {
//           const all = response.data;
//           setEnquiries(all);
//           const seenIds = JSON.parse(localStorage.getItem("seenEnquiryIds") || "[]");
//           const unseen = all.filter(e => !seenIds.includes(e.id));
//           setNewEnquiries([...unseen].reverse().slice(0, 5));
//         } else {
//           setEnquiries(MOCK_DATA);
//           setNewEnquiries([...MOCK_DATA].reverse().slice(0, 5));
//         }
//       } catch {
//         setEnquiries(MOCK_DATA);
//         setNewEnquiries([...MOCK_DATA].reverse().slice(0, 5));
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadEnquiries();
//   }, []);

//   const markAllSeen = () => {
//     const allIds = newEnquiries.map(e => e.id);
//     const existing = JSON.parse(localStorage.getItem("seenEnquiryIds") || "[]");
//     localStorage.setItem("seenEnquiryIds", JSON.stringify([...new Set([...existing, ...allIds])]));
//     setNewEnquiries([]);
//     setView("home");
//   };

//   // Search-only filter — no status dropdown on total page
//   const filtered = enquiries.filter(e => {
//     const q = search.toLowerCase();
//     return (
//       !search ||
//       e.name?.toLowerCase().includes(q) ||
//       e.email?.toLowerCase().includes(q) ||
//       e.subject?.toLowerCase().includes(q)
//     );
//   });

//   const total    = enquiries.length;
//   const newCount = newEnquiries.length;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
//         * { font-family: 'Plus Jakarta Sans', sans-serif !important; box-sizing: border-box; }

//         @keyframes popIn   { from { opacity:0; transform:scale(0.94) translateY(8px); } to { opacity:1; transform:scale(1) translateY(0); } }
//         @keyframes fadeRow { from { opacity:0; transform:translateY(6px); }             to { opacity:1; transform:translateY(0); }           }
//         @keyframes fadeIn  { from { opacity:0; }                                         to { opacity:1; }                                   }

//         .fade-row { animation: fadeRow 0.18s ease both; }
//         .fade-in  { animation: fadeIn  0.2s  ease both; }
//         ::placeholder { color: #cbd5e1; }

//         /* Slim custom scrollbar */
//         .custom-scroll::-webkit-scrollbar              { width: 5px; }
//         .custom-scroll::-webkit-scrollbar-track        { background: #f1f5f9; border-radius: 99px; }
//         .custom-scroll::-webkit-scrollbar-thumb        { background: #cbd5e1; border-radius: 99px; }
//         .custom-scroll::-webkit-scrollbar-thumb:hover  { background: #94a3b8; }
//       `}</style>

//       <div className="min-h-screen bg-slate-50 p-6 lg:p-10">

//         {/* ── Header ── */}
//         <div className="mb-8 flex items-center gap-3">
//           {view !== "home" && (
//             <button
//               onClick={() => { setView("home"); setSearch(""); }}
//               className="w-8 h-8 flex items-center justify-center rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
//               <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>
//           )}
//           <div>
//             <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
//               {view === "home"  && "Contact Enquiries"}
//               {view === "total" && "Total Enquiries"}
//               {view === "new"   && "New Enquiries"}
//             </h1>
//             <p className="text-sm text-slate-400 mt-1">
//               {view === "home"  && "Manage all student enquiries from one place"}
//               {view === "total" && "All submitted enquiries"}
//               {view === "new"   && "Latest unread enquiries"}
//             </p>
//           </div>
//         </div>

//         {/* ════════ HOME VIEW ════════ */}
//         {view === "home" && (
//           <div className="fade-in grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl">

//             {/* Total card */}
//             <div
//               onClick={() => setView("total")}
//               className="bg-white rounded-3xl p-7 shadow-sm border border-slate-100 flex items-center gap-5 cursor-pointer hover:shadow-md hover:border-blue-100 transition-all">
//               <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
//                 style={{ background: "linear-gradient(135deg, #eff6ff, #dbeafe)" }}>
//                 <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//               </div>
//               <div className="flex-1">
//                 <p className="text-4xl font-extrabold text-slate-800">{total}</p>
//                 <p className="text-sm font-medium text-slate-400 mt-1">Total Enquiries</p>
//               </div>
//               <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </div>

//             {/* New card */}
//             <div
//               onClick={() => setView("new")}
//               className="bg-white rounded-3xl p-7 shadow-sm border border-slate-100 flex items-center gap-5 cursor-pointer hover:shadow-md hover:border-emerald-100 transition-all">
//               <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
//                 style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7)" }}>
//                 <svg className="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
//                 </svg>
//               </div>
//               <div className="flex-1">
//                 <p className="text-4xl font-extrabold text-slate-800">{newCount}</p>
//                 <p className="text-sm font-medium text-slate-400 mt-1">New Enquiries</p>
//               </div>
//               <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </div>
//           </div>
//         )}

//         {/* ════════ TOTAL ENQUIRIES VIEW — search only, NO status dropdown ════════ */}
//         {view === "total" && (
//           <div className="fade-in">

//             {/* Search bar only */}
//             <div className="relative mb-6">
//               <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//               <input
//                 type="text"
//                 placeholder="Search by name, email or course..."
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//                 className="w-full pl-11 pr-4 py-3 text-sm bg-white border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-blue-300 transition-all text-slate-700 shadow-sm"
//               />
//             </div>

//             {loading ? (
//               <div className="flex items-center justify-center py-24 gap-3">
//                 <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-blue-500 animate-spin" />
//                 <span className="text-sm text-slate-400">Loading...</span>
//               </div>
//             ) : filtered.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-24 gap-3">
//                 <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center">
//                   <svg className="w-7 h-7 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//                 <p className="text-base font-semibold text-slate-400">No enquiries found</p>
//                 <p className="text-sm text-slate-300">Try changing your search</p>
//               </div>
//             ) : (
//               <div className="flex flex-col gap-3">
//                 <p className="text-xs font-semibold text-slate-400 px-1">
//                   Showing <span className="text-slate-600">{filtered.length}</span> of {total} enquiries
//                 </p>

//                 {/* ✅ Scrollable list */}
//                 <div
//                   className="custom-scroll flex flex-col gap-3"
//                   style={{ maxHeight: "60vh", overflowY: "auto", paddingRight: "4px" }}>
//                   {filtered.map((e, i) => (
//                     <div
//                       key={e.id}
//                       className="fade-row bg-white rounded-3xl px-6 py-5 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group"
//                       style={{ animationDelay: `${i * 0.05}s` }}
//                       onClick={() => { setSelected(e); setSelectedIndex(i); }}>

//                       <Avatar name={e.name} index={i} />

//                       <div className="flex-1 min-w-0">
//                         <p className="font-bold text-slate-800 text-sm mb-0.5">{e.name}</p>
//                         <p className="text-xs text-slate-400 truncate">{e.email}</p>
//                       </div>

//                       <div className="hidden sm:flex items-center gap-1.5 min-w-0 max-w-[160px]">
//                         <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-50">
//                           <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                           </svg>
//                         </div>
//                         <span className="text-xs font-medium text-slate-500 truncate">{e.subject || "—"}</span>
//                       </div>

//                       <div className="flex-shrink-0">
//                         <StatusBadge status={e.status} />
//                       </div>

//                       <p className="hidden md:block text-xs text-slate-300 flex-shrink-0">{e.createdAt}</p>

//                       <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-slate-50 group-hover:bg-blue-50 transition-colors">
//                         <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* ════════ NEW ENQUIRIES VIEW ════════ */}
//         {view === "new" && (
//           <div className="fade-in">
//             <div className="flex items-center justify-between mb-6">
//               <p className="text-xs font-semibold text-slate-400">
//                 Showing latest <span className="text-slate-600">{newCount}</span> new enquiries
//               </p>
//               {newEnquiries.length > 0 && (
//                 <button
//                   onClick={markAllSeen}
//                   className="text-xs font-semibold text-emerald-500 hover:text-emerald-700 transition-colors">
//                   ✓ Mark all as seen
//                 </button>
//               )}
//             </div>

//             {loading ? (
//               <div className="flex items-center justify-center py-24 gap-3">
//                 <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-blue-500 animate-spin" />
//                 <span className="text-sm text-slate-400">Loading...</span>
//               </div>
//             ) : newEnquiries.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-24 gap-3">
//                 <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center">
//                   <svg className="w-7 h-7 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
//                   </svg>
//                 </div>
//                 <p className="text-base font-semibold text-slate-400">No new enquiries</p>
//                 <p className="text-sm text-slate-300">All caught up!</p>
//               </div>
//             ) : (
//               /* ✅ Scrollable list */
//               <div
//                 className="custom-scroll flex flex-col gap-4"
//                 style={{ maxHeight: "60vh", overflowY: "auto", paddingRight: "4px" }}>
//                 {newEnquiries.map((e, i) => (
//                   <div
//                     key={e.id}
//                     className="fade-row bg-white rounded-2xl px-5 py-5 shadow-sm border border-blue-100 flex flex-col gap-3 cursor-pointer hover:shadow-md transition-all"
//                     style={{ borderLeft: "4px solid #3b82f6", animationDelay: `${i * 0.05}s` }}
//                     onClick={() => { setSelected(e); setSelectedIndex(i); }}>

//                     {/* Name + email + badge */}
//                     <div className="flex items-center gap-3">
//                       <Avatar name={e.name} index={i} />
//                       <div className="flex-1 min-w-0">
//                         <p className="font-bold text-slate-800 text-sm">{e.name || "—"}</p>
//                         <p className="text-xs text-slate-400 truncate">{e.email || "—"}</p>
//                       </div>
//                       <span
//                         className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0"
//                         style={{ background: "#eff6ff", color: "#2563eb", border: "1.5px solid #bfdbfe" }}>
//                         <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
//                         New
//                       </span>
//                     </div>

//                     {/* Subject */}
//                     {e.subject && (
//                       <div className="flex items-center gap-2">
//                         <div className="w-5 h-5 rounded-md flex items-center justify-center bg-blue-50 flex-shrink-0">
//                           <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                           </svg>
//                         </div>
//                         <span className="text-xs font-semibold text-slate-600">{e.subject}</span>
//                       </div>
//                     )}

//                     {/* Message */}
//                     {e.message && (
//                       <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
//                         <p className="text-xs text-slate-500 leading-relaxed">{e.message}</p>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//       </div>

//       <Modal message={selected} index={selectedIndex} onClose={() => setSelected(null)} />
//     </>
//   );
// }


import { useState, useEffect, useRef } from "react";
import { getEnquiries } from "../apiIntegration/Contactenquiry.api";

const STATUS_OPTIONS = [
  { value: "ALL",         label: "All Status",  dot: "#94a3b8", bg: "#f8fafc",  text: "#64748b",  border: "#e2e8f0" },
  { value: "NEW",         label: "New",         dot: "#3b82f6", bg: "#eff6ff",  text: "#2563eb",  border: "#bfdbfe" },
  { value: "IN_PROGRESS", label: "In Progress", dot: "#f59e0b", bg: "#fffbeb",  text: "#d97706",  border: "#fde68a" },
  { value: "CONFIRMED",   label: "Confirmed",   dot: "#8b5cf6", bg: "#f5f3ff",  text: "#7c3aed",  border: "#ddd6fe" },
  { value: "COMPLETED",   label: "Completed",   dot: "#10b981", bg: "#ecfdf5",  text: "#059669",  border: "#a7f3d0" },
  { value: "CANCELLED",   label: "Cancelled",   dot: "#ef4444", bg: "#fef2f2",  text: "#dc2626",  border: "#fecaca" },
];

const getStatus = (val) => STATUS_OPTIONS.find(s => s.value === val) || STATUS_OPTIONS[0];

const MOCK_DATA = [
  { id: 1, name: "Ahmed Al Rashid", email: "ahmed@example.com",   subject: "Web Development",     message: "I would like to enroll in the web development bootcamp.", status: "NEW",         createdAt: "2024-02-20" },
  { id: 2, name: "Sarah Mitchell",  email: "sarah.m@gmail.com",   subject: "Data Science & AI",   message: "Interested in the Data Science program.",                status: "IN_PROGRESS", createdAt: "2024-02-19" },
  { id: 3, name: "James Porter",    email: "jporter@corp.com",    subject: "UI/UX Design",        message: "Our company wants to enroll 10 employees.",              status: "CONFIRMED",   createdAt: "2024-02-18" },
  { id: 4, name: "Fatima Hassan",   email: "fatima.h@mail.com",   subject: "Cybersecurity",       message: "I want to know more about the advanced track.",          status: "COMPLETED",   createdAt: "2024-02-17" },
  { id: 5, name: "Robert Chen",     email: "rchen@tech.io",       subject: "Cloud Computing",     message: "Please send info about the cloud certification.",        status: "CANCELLED",   createdAt: "2024-02-16" },
  { id: 6, name: "Priya Sharma",    email: "priya.s@outlook.com", subject: "Mobile Development",  message: "Looking to learn Flutter for mobile development.",       status: "NEW",         createdAt: "2024-02-15" },
];

const AVATAR_COLORS = [
  ["#dbeafe", "#2563eb"], ["#ede9fe", "#7c3aed"], ["#dcfce7", "#16a34a"],
  ["#fce7f3", "#db2777"], ["#ffedd5", "#ea580c"], ["#e0f2fe", "#0284c7"],
];

function Avatar({ name, index }) {
  const [bg, text] = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold flex-shrink-0"
      style={{ background: bg, color: text }}>
      {name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
    </div>
  );
}

function StatusBadge({ status }) {
  const s = getStatus(status);
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
      style={{ background: s.bg, color: s.text, border: `1.5px solid ${s.border}` }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
      {s.label}
    </span>
  );
}

function Modal({ message, index, onClose }) {
  if (!message) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
        style={{ animation: "popIn 0.2s cubic-bezier(0.34,1.56,0.64,1)" }}
        onClick={e => e.stopPropagation()}>
        <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${getStatus(message.status).dot}, ${getStatus(message.status).border})` }} />
        <div className="p-7">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3.5">
              <Avatar name={message.name} index={index} />
              <div>
                <p className="font-bold text-slate-800">{message.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{message.email}</p>
              </div>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {message.subject && (
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#eff6ff" }}>
                <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-slate-700">{message.subject}</span>
            </div>
          )}
          <div className="rounded-2xl p-4 mb-5 bg-slate-50 border border-slate-100">
            <p className="text-sm text-slate-600 leading-relaxed">{message.message}</p>
          </div>
          <div className="flex items-center justify-between">
            <StatusBadge status={message.status} />
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {message.createdAt}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactEnquiries() {
  const [enquiries, setEnquiries]         = useState([]);
  const [loading, setLoading]             = useState(true);
  const [search, setSearch]               = useState("");
  const [selected, setSelected]           = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [newEnquiries, setNewEnquiries]   = useState([]);

  // "home" | "total" | "new"
  const [view, setView] = useState("home");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    const loadEnquiries = async () => {
      try {
        const response = await getEnquiries();
        if (response.success) {
          const all = response.data;
          setEnquiries(all);
          const seenIds = JSON.parse(localStorage.getItem("seenEnquiryIds") || "[]");
          const unseen = all.filter(e => !seenIds.includes(e.id));
          setNewEnquiries([...unseen].reverse().slice(0, 5));
        } else {
          setEnquiries(MOCK_DATA);
          setNewEnquiries([...MOCK_DATA].reverse().slice(0, 5));
        }
      } catch {
        setEnquiries(MOCK_DATA);
        setNewEnquiries([...MOCK_DATA].reverse().slice(0, 5));
      } finally {
        setLoading(false);
      }
    };
    loadEnquiries();
  }, []);

  const markAllSeen = () => {
    const allIds = newEnquiries.map(e => e.id);
    const existing = JSON.parse(localStorage.getItem("seenEnquiryIds") || "[]");
    localStorage.setItem("seenEnquiryIds", JSON.stringify([...new Set([...existing, ...allIds])]));
    setNewEnquiries([]);
    setView("home");
  };

  // Search-only filter — no status dropdown on total page
  const filtered = enquiries.filter(e => {
    const q = search.toLowerCase();
    return (
      !search ||
      e.name?.toLowerCase().includes(q) ||
      e.email?.toLowerCase().includes(q) ||
      e.subject?.toLowerCase().includes(q)
    );
  });

  const total    = enquiries.length;
  const newCount = newEnquiries.length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif !important; box-sizing: border-box; }

        @keyframes popIn   { from { opacity:0; transform:scale(0.94) translateY(8px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes fadeRow { from { opacity:0; transform:translateY(6px); }             to { opacity:1; transform:translateY(0); }           }
        @keyframes fadeIn  { from { opacity:0; }                                         to { opacity:1; }                                   }

        .fade-row { animation: fadeRow 0.18s ease both; }
        .fade-in  { animation: fadeIn  0.2s  ease both; }
        ::placeholder { color: #cbd5e1; }

        /* Slim custom scrollbar */
        .custom-scroll::-webkit-scrollbar              { width: 5px; }
        .custom-scroll::-webkit-scrollbar-track        { background: #f1f5f9; border-radius: 99px; }
        .custom-scroll::-webkit-scrollbar-thumb        { background: #cbd5e1; border-radius: 99px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover  { background: #94a3b8; }
      `}</style>

      <div className="min-h-screen bg-slate-50 p-6 lg:p-10">

        {/* ── Header ── */}
        <div className="mb-8 flex items-center gap-3">
          {view !== "home" && (
            <button
              onClick={() => { setView("home"); setSearch(""); }}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div>
            
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              {view === "home"  && "Contact Enquiries"}
              {view === "total" && "Total Enquiries"}
              {view === "new"   && "New Enquiries"}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {view === "home"  && "Manage all student enquiries from one place"}
              {view === "total" && "All submitted enquiries"}
              {view === "new"   && "Latest unread enquiries"}
            </p>
          </div>
        </div>

        {/* ════════ HOME VIEW ════════ */}
        {view === "home" && (
          <div className="fade-in">

            {/* ── Two stat cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">

              {/* Total card */}
              <div
                onClick={() => setView("total")}
                className="bg-white rounded-3xl p-7 shadow-sm border border-slate-100 flex items-center gap-5 cursor-pointer hover:shadow-md hover:border-blue-100 transition-all">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #eff6ff, #dbeafe)" }}>
                  <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-4xl font-extrabold text-slate-800">{total}</p>
                  <p className="text-sm font-medium text-slate-400 mt-1">Total Enquiries</p>
                </div>
                <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* New card */}
              <div
                onClick={() => setView("new")}
                className="bg-white rounded-3xl p-7 shadow-sm border border-slate-100 flex items-center gap-5 cursor-pointer hover:shadow-md hover:border-emerald-100 transition-all">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7)" }}>
                  <svg className="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-4xl font-extrabold text-slate-800">{newCount}</p>
                  <p className="text-sm font-medium text-slate-400 mt-1">New Enquiries</p>
                </div>
                <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* ── All enquiries list below cards ── */}
            {loading ? (
              <div className="flex items-center justify-center py-16 gap-3">
                <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-blue-500 animate-spin" />
                <span className="text-sm text-slate-400">Loading...</span>
              </div>
            ) : enquiries.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-base font-semibold text-slate-400">No enquiries yet</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold text-slate-400 px-1">
                  All Enquiries — <span className="text-slate-600">{total}</span> total
                </p>
                {/* ✅ Scrollable list */}
                <div
                  className="custom-scroll flex flex-col gap-3"
                  style={{ maxHeight: "55vh", overflowY: "auto", paddingRight: "4px" }}>
                  {enquiries.map((e, i) => (
                    <div
                      key={e.id}
                      className="fade-row bg-white rounded-3xl px-6 py-5 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group"
                      style={{ animationDelay: `${i * 0.04}s` }}
                      onClick={() => { setSelected(e); setSelectedIndex(i); }}>

                      <Avatar name={e.name} index={i} />

                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-800 text-sm mb-0.5">{e.name}</p>
                        <p className="text-xs text-slate-400 truncate">{e.email}</p>
                      </div>

                      <div className="hidden sm:flex items-center gap-1.5 min-w-0 max-w-[160px]">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-50">
                          <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <span className="text-xs font-medium text-slate-500 truncate">{e.subject || "—"}</span>
                      </div>

                      <div className="flex-shrink-0">
                        <StatusBadge status={e.status} />
                      </div>

                      <p className="hidden md:block text-xs text-slate-300 flex-shrink-0">{e.createdAt}</p>

                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-slate-50 group-hover:bg-blue-50 transition-colors">
                        <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════════ TOTAL ENQUIRIES VIEW — search only, NO status dropdown ════════ */}
        {view === "total" && (
          <div className="fade-in">

            {/* Search bar only */}
            <div className="relative mb-6">
              <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name, email or course..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-sm bg-white border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-blue-300 transition-all text-slate-700 shadow-sm"
              />
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-24 gap-3">
                <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-blue-500 animate-spin" />
                <span className="text-sm text-slate-400">Loading...</span>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-base font-semibold text-slate-400">No enquiries found</p>
                <p className="text-sm text-slate-300">Try changing your search</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold text-slate-400 px-1">
                  Showing <span className="text-slate-600">{filtered.length}</span> of {total} enquiries
                </p>

                {/* ✅ Scrollable list */}
                <div
                  className="custom-scroll flex flex-col gap-3"
                  style={{ maxHeight: "60vh", overflowY: "auto", paddingRight: "4px" }}>
                  {filtered.map((e, i) => (
                    <div
                      key={e.id}
                      className="fade-row bg-white rounded-3xl px-6 py-5 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group"
                      style={{ animationDelay: `${i * 0.05}s` }}
                      onClick={() => { setSelected(e); setSelectedIndex(i); }}>

                      <Avatar name={e.name} index={i} />

                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-800 text-sm mb-0.5">{e.name}</p>
                        <p className="text-xs text-slate-400 truncate">{e.email}</p>
                      </div>

                      <div className="hidden sm:flex items-center gap-1.5 min-w-0 max-w-[160px]">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-50">
                          <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <span className="text-xs font-medium text-slate-500 truncate">{e.subject || "—"}</span>
                      </div>

                      <div className="flex-shrink-0">
                        <StatusBadge status={e.status} />
                      </div>

                      <p className="hidden md:block text-xs text-slate-300 flex-shrink-0">{e.createdAt}</p>

                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-slate-50 group-hover:bg-blue-50 transition-colors">
                        <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════════ NEW ENQUIRIES VIEW ════════ */}
        {view === "new" && (
          <div className="fade-in">
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs font-semibold text-slate-400">
                Showing latest <span className="text-slate-600">{newCount}</span> new enquiries
              </p>
              {newEnquiries.length > 0 && (
                <button
                  onClick={markAllSeen}
                  className="text-xs font-semibold text-emerald-500 hover:text-emerald-700 transition-colors">
                  ✓ Mark all as seen
                </button>
              )}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-24 gap-3">
                <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-blue-500 animate-spin" />
                <span className="text-sm text-slate-400">Loading...</span>
              </div>
            ) : newEnquiries.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <p className="text-base font-semibold text-slate-400">No new enquiries</p>
                <p className="text-sm text-slate-300">All caught up!</p>
              </div>
            ) : (
              /* ✅ Scrollable list */
              <div
                className="custom-scroll flex flex-col gap-4"
                style={{ maxHeight: "60vh", overflowY: "auto", paddingRight: "4px" }}>
                {newEnquiries.map((e, i) => (
                  <div
                    key={e.id}
                    className="fade-row bg-white rounded-2xl px-5 py-5 shadow-sm border border-blue-100 flex flex-col gap-3 cursor-pointer hover:shadow-md transition-all"
                    style={{ borderLeft: "4px solid #3b82f6", animationDelay: `${i * 0.05}s` }}
                    onClick={() => { setSelected(e); setSelectedIndex(i); }}>

                    {/* Name + email + badge */}
                    <div className="flex items-center gap-3">
                      <Avatar name={e.name} index={i} />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-800 text-sm">{e.name || "—"}</p>
                        <p className="text-xs text-slate-400 truncate">{e.email || "—"}</p>
                      </div>
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0"
                        style={{ background: "#eff6ff", color: "#2563eb", border: "1.5px solid #bfdbfe" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        New
                      </span>
                    </div>

                    {/* Subject */}
                    {e.subject && (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center bg-blue-50 flex-shrink-0">
                          <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <span className="text-xs font-semibold text-slate-600">{e.subject}</span>
                      </div>
                    )}

                    {/* Message */}
                    {e.message && (
                      <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                        <p className="text-xs text-slate-500 leading-relaxed">{e.message}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      <Modal message={selected} index={selectedIndex} onClose={() => setSelected(null)} />
    </>
  );
}