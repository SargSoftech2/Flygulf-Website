// import { useState, useEffect } from "react";
// import { getCenters, createCenter, updateCenter, deleteCenter } from "../apiIntegration/centerAddress.api";

// const EMPTY_FORM = { city: "", address: "", description: "", headOffice: false };

// // ── Toast Notification ──
// function Toast({ toast }) {
//   if (!toast) return null;
//   const isSuccess = toast.type === "success";
//   return (
//     <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-semibold"
//       style={{
//         background: isSuccess ? "#ecfdf5" : "#fef2f2",
//         color: isSuccess ? "#059669" : "#dc2626",
//         border: `1.5px solid ${isSuccess ? "#a7f3d0" : "#fecaca"}`,
//         animation: "slideInRight 0.25s ease"
//       }}>
//       {isSuccess
//         ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
//         : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
//       }
//       {toast.msg}
//     </div>
//   );
// }

// // ── Delete Confirm Modal ──
// function ConfirmModal({ cityName, onConfirm, onCancel }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onCancel}>
//       <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" />
//       <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-7 text-center"
//         style={{ animation: "popIn 0.2s cubic-bezier(0.34,1.56,0.64,1)" }}
//         onClick={e => e.stopPropagation()}>
//         <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
//           <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//           </svg>
//         </div>
//         <h3 className="text-lg font-bold text-slate-800 mb-1">Delete Center</h3>
//         <p className="text-sm text-slate-400 mb-6">
//           Are you sure you want to delete <span className="font-semibold text-slate-600">{cityName}</span>? This cannot be undone.
//         </p>
//         <div className="flex gap-3">
//           <button onClick={onCancel}
//             className="flex-1 py-2.5 rounded-2xl border-2 border-slate-100 text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-colors">
//             Cancel
//           </button>
//           <button onClick={onConfirm}
//             className="flex-1 py-2.5 rounded-2xl bg-red-500 hover:bg-red-600 text-sm font-semibold text-white transition-colors shadow-sm">
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Add / Edit Form Modal ──
// function FormModal({ form, setForm, editId, errors, saving, onSubmit, onClose }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
//       <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" />
//       <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
//         style={{ animation: "popIn 0.2s cubic-bezier(0.34,1.56,0.64,1)" }}
//         onClick={e => e.stopPropagation()}>

//         {/* Accent bar */}
//         <div className="h-1.5" style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }} />

//         <div className="p-7">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h2 className="text-xl font-bold text-slate-800">{editId ? "Edit Center" : "Add New Center"}</h2>
//               <p className="text-xs text-slate-400 mt-0.5">{editId ? "Update the center details below" : "Fill in the details to add a new center"}</p>
//             </div>
//             <button onClick={onClose}
//               className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 transition-all">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           <div className="flex flex-col gap-4">
//             {/* City */}
//             <div>
//               <label className="block text-xs font-semibold text-slate-600 mb-1.5">City Name <span className="text-red-400">*</span></label>
//               <input
//                 type="text"
//                 placeholder="e.g. Pune, Mumbai, Nashik"
//                 value={form.city}
//                 onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
//                 className="w-full px-4 py-3 text-sm bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all text-slate-700"
//                 style={{ borderColor: errors.city ? "#fca5a5" : "#e2e8f0" }}
//               />
//               {errors.city && <p className="text-xs text-red-400 mt-1">{errors.city}</p>}
//             </div>

//             {/* Address */}
//             <div>
//               <label className="block text-xs font-semibold text-slate-600 mb-1.5">Address <span className="text-red-400">*</span></label>
//               <input
//                 type="text"
//                 placeholder="e.g. Shivraj Capital, Near ICICI Bank, Narhe"
//                 value={form.address}
//                 onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
//                 className="w-full px-4 py-3 text-sm bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all text-slate-700"
//                 style={{ borderColor: errors.address ? "#fca5a5" : "#e2e8f0" }}
//               />
//               {errors.address && <p className="text-xs text-red-400 mt-1">{errors.address}</p>}
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-xs font-semibold text-slate-600 mb-1.5">Description <span className="text-red-400">*</span></label>
//               <textarea
//                 rows={3}
//                 placeholder="Brief description about this center..."
//                 value={form.description}
//                 onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
//                 className="w-full px-4 py-3 text-sm bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all text-slate-700 resize-none"
//                 style={{ borderColor: errors.description ? "#fca5a5" : "#e2e8f0" }}
//               />
//               {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description}</p>}
//             </div>

//             {/* Head Office toggle */}
//             <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-3 border-2 border-slate-100">
//               <button
//                 type="button"
//                 onClick={() => setForm(f => ({ ...f, headOffice: !f.headOffice }))}
//                 className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
//                 style={{ background: form.headOffice ? "#6366f1" : "#e2e8f0" }}>
//                 <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
//                   style={{ transform: form.headOffice ? "translateX(20px)" : "translateX(0)" }} />
//               </button>
//               <div>
//                 <p className="text-sm font-semibold text-slate-700">Mark as Head Office</p>
//                 <p className="text-xs text-slate-400">This will be displayed as the primary office</p>
//               </div>
//             </div>

//             {/* Submit */}
//             <button onClick={onSubmit} disabled={saving}
//               className="w-full py-3 rounded-2xl text-sm font-bold text-white transition-all shadow-md flex items-center justify-center gap-2"
//               style={{ background: saving ? "#a5b4fc" : "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
//               {saving
//                 ? <><div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> Saving...</>
//                 : <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{editId ? "Update Center" : "Add Center"}</>
//               }
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Main Component ──
// export default function CenterAddressAdmin() {
//   const [centers, setCenters]           = useState([]);
//   const [loading, setLoading]           = useState(true);
//   const [form, setForm]                 = useState(EMPTY_FORM);
//   const [editId, setEditId]             = useState(null);
//   const [showForm, setShowForm]         = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [saving, setSaving]             = useState(false);
//   const [toast, setToast]               = useState(null);
//   const [errors, setErrors]             = useState({});

//   useEffect(() => { load(); }, []);

//   const load = async () => {
//     setLoading(true);
//     const res = await getCenters();
//     if (res.success) setCenters(res.data);
//     setLoading(false);
//   };

//   const showToast = (msg, type = "success") => {
//     setToast({ msg, type });
//     setTimeout(() => setToast(null), 3000);
//   };

//   const validate = () => {
//     const e = {};
//     if (!form.city.trim())        e.city        = "City name is required";
//     if (!form.address.trim())     e.address     = "Address is required";
//     if (!form.description.trim()) e.description = "Description is required";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const openAdd = () => {
//     setForm(EMPTY_FORM);
//     setEditId(null);
//     setErrors({});
//     setShowForm(true);
//   };

//   const openEdit = (center) => {
//     setForm({
//       city: center.city,
//       address: center.address,
//       description: center.description || "",
//     headOffice: center.headOffice || false,
//     });
//     setEditId(center.id);
//     setErrors({});
//     setShowForm(true);
//   };

//   const closeForm = () => {
//     setShowForm(false);
//     setEditId(null);
//     setForm(EMPTY_FORM);
//     setErrors({});
//   };

//   const handleSubmit = async () => {
//     if (!validate()) return;
//     setSaving(true);
//     const res = editId
//       ? await updateCenter(editId, form)
//       : await createCenter(form);
//     setSaving(false);
//     if (res.success) {
//       showToast(editId ? "Center updated successfully!" : "Center added successfully!");
//       closeForm();
//       load();
//     } else {
//       showToast(res.message || "Something went wrong", "error");
//     }
//   };

//   const handleDelete = async () => {
//     if (!deleteTarget) return;
//     const res = await deleteCenter(deleteTarget.id);
//     setDeleteTarget(null);
//     if (res.success) {
//       showToast("Center deleted successfully!");
//       load();
//     } else {
//       showToast("Failed to delete center", "error");
//     }
//   };

// const headOffice = centers.find(c => c.headOffice);
// const others     = centers.filter(c => !c.headOffice);
//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
//         * { font-family: 'Plus Jakarta Sans', sans-serif !important; box-sizing: border-box; }
//         @keyframes popIn       { from { opacity:0; transform:scale(0.94) translateY(8px); } to { opacity:1; transform:scale(1) translateY(0); } }
//         @keyframes fadeRow     { from { opacity:0; transform:translateY(6px); }             to { opacity:1; transform:translateY(0); } }
//         @keyframes slideInRight{ from { opacity:0; transform:translateX(20px); }            to { opacity:1; transform:translateX(0); } }
//         .fade-row { animation: fadeRow 0.18s ease both; }
//         ::placeholder { color: #cbd5e1; }
//       `}</style>

//       <Toast toast={toast} />

//       <div className="min-h-screen bg-slate-50 p-6 lg:p-10">

//         {/* ── Header ── */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Regional Offices</h1>
//             <p className="text-sm text-slate-400 mt-1">Manage all center addresses from one place</p>
//           </div>
//           <button onClick={openAdd}
//             className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white shadow-md hover:shadow-lg transition-all"
//             style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//             </svg>
//             Add Center
//           </button>
//         </div>

//         {/* ── Stats ── */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-2xl">
//           {[
//             { label: "Total Centers", value: centers.length, color: "#6366f1", bg: "#ede9fe" },
//             { label: "Head Office",   value: headOffice ? 1 : 0, color: "#f59e0b", bg: "#fffbeb" },
//             { label: "Branch Offices",value: others.length,   color: "#10b981", bg: "#ecfdf5" },
//           ].map(s => (
//             <div key={s.label} className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-slate-100 flex items-center gap-4">
//               <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
//                 style={{ background: s.bg }}>
//                 <svg className="w-5 h-5" fill="none" stroke={s.color} viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-2xl font-extrabold text-slate-800">{s.value}</p>
//                 <p className="text-xs font-medium text-slate-400">{s.label}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ── Centers List ── */}
//         {loading ? (
//           <div className="flex items-center justify-center py-24 gap-3">
//             <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-indigo-500 animate-spin" />
//             <span className="text-sm text-slate-400">Loading centers...</span>
//           </div>
//         ) : centers.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-24 gap-4">
//             <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center">
//               <svg className="w-9 h-9 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//               </svg>
//             </div>
//             <p className="text-base font-semibold text-slate-400">No centers added yet</p>
//             <button onClick={openAdd}
//               className="px-5 py-2.5 rounded-2xl text-sm font-bold text-white"
//               style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
//               Add First Center
//             </button>
//           </div>
//         ) : (
//           <div className="flex flex-col gap-4">
//             {/* Head Office first */}
//             {headOffice && (
//               <div className="fade-row bg-white rounded-3xl px-6 py-5 shadow-sm border-2 flex items-start gap-4"
//                 style={{ borderColor: "#6366f1" }}>
//                 <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
//                   style={{ background: "linear-gradient(135deg, #ede9fe, #ddd6fe)" }}>
//                   <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-2 mb-0.5">
//                     <p className="font-bold text-slate-800">{headOffice.city}</p>
//                     <span className="text-xs font-bold px-2 py-0.5 rounded-full"
//                       style={{ background: "#ede9fe", color: "#6366f1" }}>HEAD OFFICE</span>
//                   </div>
//                   <p className="text-sm text-slate-500">{headOffice.address}</p>
//                   {headOffice.description && (
//                     <p className="text-xs text-slate-400 mt-1">{headOffice.description}</p>
//                   )}
//                 </div>
//                 <div className="flex items-center gap-2 flex-shrink-0">
//                   <button onClick={() => openEdit(headOffice)}
//                     className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-indigo-50 transition-colors group">
//                     <svg className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                     </svg>
//                   </button>
//                   <button onClick={() => setDeleteTarget(headOffice)}
//                     className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-red-50 transition-colors group">
//                     <svg className="w-4 h-4 text-slate-400 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Branch offices */}
//             {others.map((c, i) => (
//               <div key={c.id}
//                 className="fade-row bg-white rounded-3xl px-6 py-5 shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md hover:border-indigo-100 transition-all"
//                 style={{ animationDelay: `${i * 0.04}s` }}>
//                 <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
//                   style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7)" }}>
//                   <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="font-bold text-slate-800 mb-0.5">{c.city}</p>
//                   <p className="text-sm text-slate-500">{c.address}</p>
//                   {c.description && (
//                     <p className="text-xs text-slate-400 mt-1">{c.description}</p>
//                   )}
//                 </div>
//                 <div className="flex items-center gap-2 flex-shrink-0">
//                   <button onClick={() => openEdit(c)}
//                     className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-indigo-50 transition-colors group">
//                     <svg className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                     </svg>
//                   </button>
//                   <button onClick={() => setDeleteTarget(c)}
//                     className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-red-50 transition-colors group">
//                     <svg className="w-4 h-4 text-slate-400 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ── Form Modal ── */}
//       {showForm && (
//         <FormModal
//           form={form}
//           setForm={setForm}
//           editId={editId}
//           errors={errors}
//           saving={saving}
//           onSubmit={handleSubmit}
//           onClose={closeForm}
//         />
//       )}

//       {/* ── Delete Confirm Modal ── */}
//       {deleteTarget && (
//         <ConfirmModal
//           cityName={deleteTarget.city}
//           onConfirm={handleDelete}
//           onCancel={() => setDeleteTarget(null)}
//         />
//       )}
//     </>
//   );
// }



/**************************** */
import { useState, useEffect } from "react";
import { getCenters, createCenter, updateCenter, deleteCenter } from "../apiIntegration/centerAddress.api";

const EMPTY_FORM = { city: "", address: "", description: "", headOffice: false };

// ── Toast Notification ──
function Toast({ toast }) {
  if (!toast) return null;
  const isSuccess = toast.type === "success";
  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-semibold"
      style={{
        background: isSuccess ? "#ecfdf5" : "#fef2f2",
        color: isSuccess ? "#059669" : "#dc2626",
        border: `1.5px solid ${isSuccess ? "#a7f3d0" : "#fecaca"}`,
        animation: "slideInRight 0.25s ease"
      }}>
      {isSuccess
        ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      }
      {toast.msg}
    </div>
  );
}

// ── Delete Confirm Modal ──
function ConfirmModal({ cityName, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-7 text-center"
        style={{ animation: "popIn 0.2s cubic-bezier(0.34,1.56,0.64,1)" }}
        onClick={e => e.stopPropagation()}>
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">Delete Center</h3>
        <p className="text-sm text-slate-400 mb-6">
          Are you sure you want to delete <span className="font-semibold text-slate-600">{cityName}</span>? This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 py-2.5 rounded-2xl border-2 border-slate-100 text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm}
            className="flex-1 py-2.5 rounded-2xl bg-red-500 hover:bg-red-600 text-sm font-semibold text-white transition-colors shadow-sm">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Add / Edit Form Modal ──
function FormModal({ form, setForm, editId, errors, saving, onSubmit, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
        style={{ animation: "popIn 0.2s cubic-bezier(0.34,1.56,0.64,1)" }}
        onClick={e => e.stopPropagation()}>
        <div className="h-1.5" style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }} />
        <div className="p-7">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">{editId ? "Edit Center" : "Add New Center"}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{editId ? "Update the center details below" : "Fill in the details to add a new center"}</p>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">City Name <span className="text-red-400">*</span></label>
              <input type="text" placeholder="e.g. Pune, Mumbai, Nashik"
                value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                className="w-full px-4 py-3 text-sm bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all text-slate-700"
                style={{ borderColor: errors.city ? "#fca5a5" : "#e2e8f0" }} />
              {errors.city && <p className="text-xs text-red-400 mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Address <span className="text-red-400">*</span></label>
              <input type="text" placeholder="e.g. Shivraj Capital, Near ICICI Bank, Narhe"
                value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                className="w-full px-4 py-3 text-sm bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all text-slate-700"
                style={{ borderColor: errors.address ? "#fca5a5" : "#e2e8f0" }} />
              {errors.address && <p className="text-xs text-red-400 mt-1">{errors.address}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Description <span className="text-red-400">*</span></label>
              <textarea rows={3} placeholder="Brief description about this center..."
                value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="w-full px-4 py-3 text-sm bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all text-slate-700 resize-none"
                style={{ borderColor: errors.description ? "#fca5a5" : "#e2e8f0" }} />
              {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description}</p>}
            </div>
            <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-3 border-2 border-slate-100">
              <button type="button" onClick={() => setForm(f => ({ ...f, headOffice: !f.headOffice }))}
                className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
                style={{ background: form.headOffice ? "#6366f1" : "#e2e8f0" }}>
                <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
                  style={{ transform: form.headOffice ? "translateX(20px)" : "translateX(0)" }} />
              </button>
              <div>
                <p className="text-sm font-semibold text-slate-700">Mark as Head Office</p>
                <p className="text-xs text-slate-400">This will be displayed as the primary office</p>
              </div>
            </div>
            <button onClick={onSubmit} disabled={saving}
              className="w-full py-3 rounded-2xl text-sm font-bold text-white transition-all shadow-md flex items-center justify-center gap-2"
              style={{ background: saving ? "#a5b4fc" : "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              {saving
                ? <><div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> Saving...</>
                : <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{editId ? "Update Center" : "Add Center"}</>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Detail View for a single center ──
function CenterDetailView({ center, onBack, onEdit, onDelete }) {
  const isHead = center.headOffice;
  const accentColor = isHead ? "#6366f1" : "#10b981";
  const accentBg    = isHead ? "linear-gradient(135deg, #ede9fe, #ddd6fe)" : "linear-gradient(135deg, #f0fdf4, #dcfce7)";

  return (
    <div className="fade-in">
      {/* Info card */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-5"
        style={{ border: `2px solid ${isHead ? "#6366f1" : "#e2e8f0"}` }}>
        {/* Color bar */}
        <div className="h-2" style={{ background: `linear-gradient(90deg, ${accentColor}, ${isHead ? "#8b5cf6" : "#34d399"})` }} />

        <div className="p-7">
          {/* Icon + title */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: accentBg }}>
              <svg className="w-7 h-7" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-2xl font-extrabold text-slate-800">{center.city}</h2>
                {isHead && (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                    style={{ background: "#ede9fe", color: "#6366f1" }}>HEAD OFFICE</span>
                )}
              </div>
              <p className="text-sm text-slate-400 mt-0.5">{isHead ? "Primary Office" : "Branch Office"}</p>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <p className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wide">Address</p>
              <p className="text-sm font-semibold text-slate-700">{center.address}</p>
            </div>

            {center.description && (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <p className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wide">Description</p>
                <p className="text-sm text-slate-600 leading-relaxed">{center.description}</p>
              </div>
            )}

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <p className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wide">Office Type</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: accentColor }}>
                <span className="w-2 h-2 rounded-full" style={{ background: accentColor }} />
                {isHead ? "Head Office" : "Branch Office"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button onClick={() => onEdit(center)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold border-2 border-indigo-100 text-indigo-600 hover:bg-indigo-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit
            </button>
            <button onClick={() => onDelete(center)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold border-2 border-red-100 text-red-500 hover:bg-red-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ──
export default function CenterAddressAdmin() {
  const [centers, setCenters]           = useState([]);
  const [loading, setLoading]           = useState(true);
  const [form, setForm]                 = useState(EMPTY_FORM);
  const [editId, setEditId]             = useState(null);
  const [showForm, setShowForm]         = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving]             = useState(false);
  const [toast, setToast]               = useState(null);
  const [errors, setErrors]             = useState({});

  // "home" | "head" | "branch" | "detail"
  const [view, setView]             = useState("home");
  const [selectedCenter, setSelectedCenter] = useState(null);

  useEffect(() => { load(); }, []);
  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  const load = async () => {
    setLoading(true);
    const res = await getCenters();
    if (res.success) setCenters(res.data);
    setLoading(false);
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const validate = () => {
    const e = {};
    if (!form.city.trim())        e.city        = "City name is required";
    if (!form.address.trim())     e.address     = "Address is required";
    if (!form.description.trim()) e.description = "Description is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setErrors({});
    setShowForm(true);
  };

  const openEdit = (center) => {
    setForm({
      city: center.city,
      address: center.address,
      description: center.description || "",
      headOffice: center.headOffice || false,
    });
    setEditId(center.id);
    setErrors({});
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditId(null);
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSaving(true);
    const res = editId
      ? await updateCenter(editId, form)
      : await createCenter(form);
    setSaving(false);
    if (res.success) {
      showToast(editId ? "Center updated successfully!" : "Center added successfully!");
      closeForm();
      load();
      // refresh selectedCenter if we edited the one being viewed
      if (editId && selectedCenter?.id === editId) {
        setSelectedCenter({ ...selectedCenter, ...form });
      }
    } else {
      showToast(res.message || "Something went wrong", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const res = await deleteCenter(deleteTarget.id);
    setDeleteTarget(null);
    if (res.success) {
      showToast("Center deleted successfully!");
      load();
      // go back if we deleted the currently viewed center
      if (selectedCenter?.id === deleteTarget.id) {
        setView("home");
        setSelectedCenter(null);
      }
    } else {
      showToast("Failed to delete center", "error");
    }
  };

  const headOffice = centers.find(c => c.headOffice);
  const others     = centers.filter(c => !c.headOffice);

  // Dynamic header title
  const headerTitle = view === "home"   ? "Regional Offices"
                    : view === "head"   ? "Head Office"
                    : view === "branch" ? "Branch Offices"
                    : selectedCenter?.city || "Center Detail";

  const headerSub = view === "home"   ? "Manage all center addresses from one place"
                  : view === "head"   ? "Primary office details"
                  : view === "branch" ? "All branch offices"
                  : selectedCenter?.headOffice ? "Head Office" : "Branch Office";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif !important; box-sizing: border-box; }
        @keyframes popIn        { from { opacity:0; transform:scale(0.94) translateY(8px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes fadeRow      { from { opacity:0; transform:translateY(6px); }             to { opacity:1; transform:translateY(0); }           }
        @keyframes slideInRight { from { opacity:0; transform:translateX(20px); }            to { opacity:1; transform:translateX(0); }           }
        @keyframes fadeIn       { from { opacity:0; }                                         to { opacity:1; }                                   }
        .fade-row { animation: fadeRow 0.18s ease both; }
        .fade-in  { animation: fadeIn  0.2s  ease both; }
        ::placeholder { color: #cbd5e1; }

        /* Slim scrollbar */
        .custom-scroll::-webkit-scrollbar              { width: 5px; }
        .custom-scroll::-webkit-scrollbar-track        { background: #f1f5f9; border-radius: 99px; }
        .custom-scroll::-webkit-scrollbar-thumb        { background: #cbd5e1; border-radius: 99px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover  { background: #94a3b8; }
      `}</style>

      <Toast toast={toast} />

      <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
        <div className="max-w-7xl mx-auto space-y-8">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            {view !== "home" && (
              <button
                onClick={() => {
                  if (view === "detail") {
                    // go back to the list we came from
                    setView(selectedCenter?.headOffice ? "head" : "branch");
                    setSelectedCenter(null);
                  } else {
                    setView("home");
                    setSelectedCenter(null);
                  }
                }}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">{headerTitle}</h1>
              <p className="text-sm text-slate-400 mt-1">{headerSub}</p>
            </div>
          </div>
          {view === "home" && (
            <button onClick={openAdd}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white shadow-md hover:shadow-lg transition-all"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Center
            </button>
          )}
        </div>

        {/* ════════ HOME VIEW — 3 clickable stat cards ════════ */}
        {view === "home" && (
          <div className="fade-in">
            {loading ? (
              <div className="flex items-center justify-center py-24 gap-3">
                <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-indigo-500 animate-spin" />
                <span className="text-sm text-slate-400">Loading centers...</span>
              </div>
            ) : centers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center">
                  <svg className="w-9 h-9 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <p className="text-base font-semibold text-slate-400">No centers added yet</p>
                <button onClick={openAdd}
                  className="px-5 py-2.5 rounded-2xl text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                  Add First Center
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                {/* Total Centers — not clickable, just info */}
                <div className="bg-white rounded-3xl px-7 py-6 shadow-sm border border-slate-100 flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "#ede9fe" }}>
                    <svg className="w-7 h-7" fill="none" stroke="#6366f1" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-4xl font-extrabold text-slate-800">{centers.length}</p>
                    <p className="text-sm font-medium text-slate-400 mt-1">Total Centers</p>
                  </div>
                </div>

                {/* Head Office card — clickable */}
                <div
                  onClick={() => headOffice ? setView("head") : null}
                  className={`bg-white rounded-3xl px-7 py-6 shadow-sm border border-slate-100 flex items-center gap-5 transition-all ${headOffice ? "cursor-pointer hover:shadow-md hover:border-amber-200" : "opacity-60"}`}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "#fffbeb" }}>
                    <svg className="w-7 h-7" fill="none" stroke="#f59e0b" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-4xl font-extrabold text-slate-800">{headOffice ? 1 : 0}</p>
                    <p className="text-sm font-medium text-slate-400 mt-1">Head Office</p>
                  </div>
                  {headOffice && (
                    <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>

                {/* Branch Offices card — clickable */}
                <div
                  onClick={() => others.length > 0 ? setView("branch") : null}
                  className={`bg-white rounded-3xl px-7 py-6 shadow-sm border border-slate-100 flex items-center gap-5 transition-all ${others.length > 0 ? "cursor-pointer hover:shadow-md hover:border-emerald-200" : "opacity-60"}`}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "#ecfdf5" }}>
                    <svg className="w-7 h-7" fill="none" stroke="#10b981" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-4xl font-extrabold text-slate-800">{others.length}</p>
                    <p className="text-sm font-medium text-slate-400 mt-1">Branch Offices</p>
                  </div>
                  {others.length > 0 && (
                    <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              </div>
            )}

            {/* ✅ All centers scrollable list below the 3 cards */}
            {!loading && centers.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-semibold text-slate-400 px-1 mb-3">
                  All Centers — <span className="text-slate-600">{centers.length}</span> total
                </p>
                <div
                  className="custom-scroll flex flex-col gap-3"
                  style={{ maxHeight: "55vh", overflowY: "auto", paddingRight: "4px" }}>

                  {/* Head office first */}
                  {headOffice && (
                    <div
                      className="fade-row bg-white rounded-3xl px-6 py-5 shadow-sm border-2 flex items-start gap-4 hover:shadow-md transition-all cursor-pointer group"
                      style={{ borderColor: "#6366f1" }}
                      onClick={() => setView("head")}>
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #ede9fe, #ddd6fe)" }}>
                        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-bold text-slate-800">{headOffice.city}</p>
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                            style={{ background: "#ede9fe", color: "#6366f1" }}>HEAD OFFICE</span>
                        </div>
                        <p className="text-sm text-slate-500 truncate">{headOffice.address}</p>
                        {headOffice.description && (
                          <p className="text-xs text-slate-400 mt-1 truncate">{headOffice.description}</p>
                        )}
                      </div>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-slate-50 group-hover:bg-indigo-50 transition-colors">
                        <svg className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Branch offices */}
                  {others.map((c, i) => (
                    <div
                      key={c.id}
                      className="fade-row bg-white rounded-3xl px-6 py-5 shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md hover:border-emerald-100 transition-all cursor-pointer group"
                      style={{ animationDelay: `${i * 0.04}s` }}
                      onClick={() => { setSelectedCenter(c); setView("detail"); }}>
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7)" }}>
                        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-800 mb-0.5">{c.city}</p>
                        <p className="text-sm text-slate-500 truncate">{c.address}</p>
                        {c.description && (
                          <p className="text-xs text-slate-400 mt-1 truncate">{c.description}</p>
                        )}
                      </div>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-slate-50 group-hover:bg-emerald-50 transition-colors">
                        <svg className="w-4 h-4 text-slate-300 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* ════════ HEAD OFFICE VIEW ════════ */}
        {view === "head" && (
          <div className="fade-in">
            {headOffice ? (
              <CenterDetailView
                center={headOffice}
                onBack={() => setView("home")}
                onEdit={openEdit}
                onDelete={(c) => setDeleteTarget(c)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <p className="text-base font-semibold text-slate-400">No head office set</p>
              </div>
            )}
          </div>
        )}

        {/* ════════ BRANCH OFFICES VIEW — list with scrollbar ════════ */}
        {view === "branch" && (
          <div className="fade-in">
            <p className="text-xs font-semibold text-slate-400 px-1 mb-4">
              Showing <span className="text-slate-600">{others.length}</span> branch office{others.length !== 1 ? "s" : ""}
            </p>

            {/* ✅ Scrollable list */}
            <div
              className="custom-scroll flex flex-col gap-3"
              style={{ maxHeight: "60vh", overflowY: "auto", paddingRight: "4px" }}>
              {others.map((c, i) => (
                <div
                  key={c.id}
                  className="fade-row bg-white rounded-3xl px-6 py-5 shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md hover:border-emerald-100 transition-all cursor-pointer group"
                  style={{ animationDelay: `${i * 0.04}s` }}
                  onClick={() => { setSelectedCenter(c); setView("detail"); }}>
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7)" }}>
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 mb-0.5">{c.city}</p>
                    <p className="text-sm text-slate-500 truncate">{c.address}</p>
                    {c.description && (
                      <p className="text-xs text-slate-400 mt-1 truncate">{c.description}</p>
                    )}
                  </div>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-slate-50 group-hover:bg-emerald-50 transition-colors">
                    <svg className="w-4 h-4 text-slate-300 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════ SINGLE CENTER DETAIL VIEW ════════ */}
        {view === "detail" && selectedCenter && (
          <CenterDetailView
            center={selectedCenter}
            onBack={() => { setView("branch"); setSelectedCenter(null); }}
            onEdit={openEdit}
            onDelete={(c) => setDeleteTarget(c)}
          />
        )}

        </div>
      </div>

      {/* ── Form Modal ── */}
      {showForm && (
        <FormModal
          form={form}
          setForm={setForm}
          editId={editId}
          errors={errors}
          saving={saving}
          onSubmit={handleSubmit}
          onClose={closeForm}
        />
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteTarget && (
        <ConfirmModal
          cityName={deleteTarget.city}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}