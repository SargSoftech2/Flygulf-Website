// import { useState, useEffect, useRef } from "react";
// import courseApi, { BASE_HOST, API_BASE } from "../apiIntegration/Courses.api";

// // ── Inject scrollbar CSS at module load time ──────────────────────────────────
// if (typeof document !== "undefined") {
//   const el = document.getElementById("fg-sb") || document.createElement("style");
//   el.id = "fg-sb";
//   el.textContent = `
//     html::-webkit-scrollbar{width:7px!important}
//     html::-webkit-scrollbar-track{background:#f1f5f9!important}
//     html::-webkit-scrollbar-thumb{background:#94a3b8!important;border-radius:10px!important}
//     html::-webkit-scrollbar-thumb:hover{background:#1a237e!important}
//     body::-webkit-scrollbar{width:7px!important}
//     body::-webkit-scrollbar-track{background:#f1f5f9!important}
//     body::-webkit-scrollbar-thumb{background:#94a3b8!important;border-radius:10px!important}
//     body::-webkit-scrollbar-thumb:hover{background:#1a237e!important}
//     *::-webkit-scrollbar{width:6px;height:6px}
//     *::-webkit-scrollbar-track{background:#f1f5f9}
//     *::-webkit-scrollbar-thumb{background:#94a3b8;border-radius:10px}
//     *::-webkit-scrollbar-thumb:hover{background:#1a237e}
//     html,body{scrollbar-width:thin!important;scrollbar-color:#94a3b8 #f1f5f9!important}
//     *{scrollbar-width:thin;scrollbar-color:#94a3b8 #f1f5f9}
//   `;
//   if (!document.getElementById("fg-sb")) document.head.appendChild(el);
// }

// // ── Toast ─────────────────────────────────────────────────────────────────────
// const toast = (msg, type = "success") => {
//   const colors = { success: "#10b981", error: "#ef4444", info: "#3b82f6" };
//   const el = document.createElement("div");
//   Object.assign(el.style, {
//     position:"fixed", top:"20px", right:"20px", zIndex:"9999",
//     padding:"12px 20px", borderRadius:"12px", color:"#fff",
//     background: colors[type]||colors.success, fontWeight:"600", fontSize:"13px",
//     boxShadow:"0 8px 24px rgba(0,0,0,.15)", fontFamily:"'Plus Jakarta Sans',sans-serif",
//     transition:"opacity .3s",
//   });
//   el.textContent = msg;
//   document.body.appendChild(el);
//   setTimeout(()=>{ el.style.opacity="0"; setTimeout(()=>el.remove(),300); }, 2800);
// };

// // ── Global CSS ────────────────────────────────────────────────────────────────
// const G = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
//     *,*::before,*::after{box-sizing:border-box;font-family:'Plus Jakarta Sans',sans-serif}
//     @keyframes spin{to{transform:rotate(360deg)}}
//     @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
//     @keyframes fadeInUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
//     @keyframes slideInRight{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
//     @keyframes slideInLeft{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
//     @keyframes heroShimmer{0%,100%{opacity:.7}50%{opacity:1}}
//     .spin{animation:spin .75s linear infinite}
//     .bounce{animation:bounce 1.4s ease-in-out infinite}
//     .fade-up{animation:fadeInUp .5s ease both}
//     .slide-right{animation:slideInRight .35s cubic-bezier(.22,1,.36,1) both}
//     .c2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
//     .hcard{transition:transform .18s,box-shadow .18s}
//     .hcard:hover{transform:translateY(-2px);box-shadow:0 12px 36px rgba(26,35,126,.10)}
//     .hero-shimmer{animation:heroShimmer 3s ease-in-out infinite}
//     *::-webkit-scrollbar{width:6px;height:6px}
//     *::-webkit-scrollbar-track{background:#f1f5f9}
//     *::-webkit-scrollbar-thumb{background:#94a3b8;border-radius:10px}
//     *::-webkit-scrollbar-thumb:hover{background:#1a237e}
//     *{scrollbar-width:thin;scrollbar-color:#94a3b8 #f1f5f9}
//   `}</style>
// );

// // ── Atom: Status Badge ────────────────────────────────────────────────────────
// const Badge = ({ s }) => (
//   <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold
//     ${s==="ACTIVE"?"bg-emerald-50 text-emerald-600":"bg-slate-100 text-slate-400"}`}>
//     <span className={`w-1.5 h-1.5 rounded-full ${s==="ACTIVE"?"bg-emerald-500":"bg-slate-300"}`}/>
//     {s}
//   </span>
// );

// // ── Atom: Confirm Dialog ──────────────────────────────────────────────────────
// const Confirm = ({ open, onOk, onCancel }) => {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel}/>
//       <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-xs text-center">
//         <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
//           <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
//           </svg>
//         </div>
//         <h3 className="font-bold text-slate-800 text-sm mb-1">Confirm Delete</h3>
//         <p className="text-xs text-slate-400 mb-5">This will soft-delete the item. It can be restored later.</p>
//         <div className="flex gap-2">
//           <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50 transition">Cancel</button>
//           <button onClick={onOk}     className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition">Delete</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ── Atom: Image Upload Box ────────────────────────────────────────────────────
// const ImgBox = ({ label, name, preview, onChange, hint, tall=false }) => {
//   const ref = useRef();
//   const h = tall ? 150 : 108;
//   return (
//     <div className="flex flex-col gap-1.5">
//       <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
//       <div onClick={()=>ref.current.click()}
//         className="relative group cursor-pointer rounded-xl overflow-hidden border-2 border-dashed border-slate-200 hover:border-[#1a237e] transition-all bg-slate-50"
//         style={{height:h}}>
//         {preview ? (
//           <>
//             <img src={preview} alt={label} className="w-full h-full object-cover"/>
//             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
//               <span className="text-white text-xs font-bold bg-black/50 px-3 py-1 rounded-lg">Change</span>
//             </div>
//           </>
//         ) : (
//           <div className="flex flex-col items-center justify-center gap-1.5 h-full text-slate-300 group-hover:text-[#1a237e]/50 transition">
//             <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
//             </svg>
//             <span className="text-xs font-semibold">{label}</span>
//             {hint && <span className="text-[10px] text-slate-300 text-center px-3">{hint}</span>}
//           </div>
//         )}
//         <input ref={ref} type="file" accept="image/*" name={name} onChange={onChange} className="hidden"/>
//       </div>
//     </div>
//   );
// };

// // ── Atom: Input Field ─────────────────────────────────────────────────────────
// const F = ({ label, name, value, onChange, type="text", placeholder, cls="" }) => (
//   <div className={`flex flex-col gap-1.5 ${cls}`}>
//     <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{label}</label>
//     <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
//       className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300
//         focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition"/>
//   </div>
// );
// const TA = ({ label, name, value, onChange, rows=3, placeholder, cls="" }) => (
//   <div className={`flex flex-col gap-1.5 ${cls}`}>
//     <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{label}</label>
//     <textarea name={name} value={value} onChange={onChange} rows={rows} placeholder={placeholder}
//       className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300
//         focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition resize-none"/>
//   </div>
// );

// // ── Atom: Section Block ───────────────────────────────────────────────────────
// const Sec = ({ emoji, title, sub, accent="#1a237e", children }) => (
//   <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
//     <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100"
//       style={{background:`linear-gradient(90deg,${accent}0b,transparent)`}}>
//       <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
//         style={{background:`${accent}14`}}>{emoji}</div>
//       <div>
//         <p className="font-bold text-slate-800 text-sm">{title}</p>
//         {sub && <p className="text-[11px] text-slate-400 mt-0.5">{sub}</p>}
//       </div>
//     </div>
//     <div className="p-6">{children}</div>
//   </div>
// );

// // ── Shared: small icon buttons ────────────────────────────────────────────────
// const EditBtn = ({ onClick }) => (
//   <button onClick={onClick} title="Edit"
//     className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-300 hover:text-blue-500 transition">
//     <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
//     </svg>
//   </button>
// );
// const DelBtn = ({ onClick }) => (
//   <button onClick={onClick} title="Delete"
//     className="p-1.5 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-400 transition">
//     <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
//     </svg>
//   </button>
// );
// const Empty = ({ msg }) => <p className="text-center text-sm text-slate-300 py-10">{msg}</p>;

// // ── Page-level scroll button ──────────────────────────────────────────────────
// const PageScrollBtn = ({ containerRef }) => {
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const el = containerRef?.current;
//     if (!el) return;
//     const check = () => {
//       const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 80;
//       setVisible(!atBottom && el.scrollHeight > el.clientHeight + 100);
//     };
//     el.addEventListener("scroll", check);
//     setTimeout(check, 400);
//     return () => el.removeEventListener("scroll", check);
//   }, [containerRef]);

//   if (!visible) return null;
//   return (
//     <button
//       onClick={() => containerRef?.current?.scrollBy({ top: 400, behavior:"smooth" })}
//       className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full text-white shadow-lg flex items-center justify-center bounce hover:opacity-90 transition"
//       style={{background:"linear-gradient(135deg,#1a237e,#2836b5)"}}
//       title="Scroll down">
//       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
//       </svg>
//     </button>
//   );
// };

// const ScrollDownBtn = ({ containerRef }) => {
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     const el = containerRef?.current;
//     if (!el) return;
//     const isWindow = el === document.documentElement || el === document.body;
//     const check = () => {
//       if (isWindow) {
//         const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 60;
//         setVisible(!atBottom && document.documentElement.scrollHeight > window.innerHeight + 100);
//       } else {
//         const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 40;
//         setVisible(!atBottom);
//       }
//     };
//     const target = isWindow ? window : el;
//     target.addEventListener("scroll", check);
//     check();
//     return () => target.removeEventListener("scroll", check);
//   }, [containerRef]);

//   const scrollDown = () => {
//     const el = containerRef?.current;
//     if (!el) return;
//     const isWindow = el === document.documentElement || el === document.body;
//     if (isWindow) window.scrollBy({ top: 400, behavior: "smooth" });
//     else el.scrollBy({ top: 300, behavior: "smooth" });
//   };

//   if (!visible) return null;
//   return (
//     <button
//       onClick={scrollDown}
//       className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full text-white shadow-lg flex items-center justify-center bounce hover:opacity-90 transition"
//       style={{background:"linear-gradient(135deg,#1a237e,#2836b5)"}}
//       title="Scroll down">
//       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
//       </svg>
//     </button>
//   );
// };

// // ══════════════════════════════════════════════════════════════════════════════
// //  COURSE FORM  (Add / Edit)
// // ══════════════════════════════════════════════════════════════════════════════
// const CourseForm = ({ course, onSave, onBack }) => {
//   const isEdit = !!course;
//   const scrollRef = useRef();

//   const [form, setForm] = useState({
//     courseName:           course?.courseName || "",
//     shortForm:            course?.shortForm  || "",
//     shortDesc:            course?.shortDesc  || "",
//     aboutTitle:           course?.aboutTitle || "",
//     aboutTotalExperience: course?.aboutTotalExperience || "",
//     aboutDescription:     course?.aboutDescription    || "",
//     features:             Array.isArray(course?.features) ? course.features.join(", ") : (course?.features||""),
//     courseDetailTitle:    course?.courseDetailTitle || "",
//     courseHours:          course?.courseHours       || "",
//     intensive:            course?.intensive         || "",
//   });
//   const [files, setFiles] = useState({});
//   const [prev,  setPrev]  = useState({
//     bannerImage: course ? courseApi.courseImageUrl(course.id, "banner") : null,
//     cardImage:   course ? courseApi.courseImageUrl(course.id, "card")   : null,
//     logo:        course ? courseApi.courseImageUrl(course.id, "logo")   : null,
//     aboutImage:  course ? courseApi.courseImageUrl(course.id, "about")  : null,
//   });
//   const [saving, setSaving] = useState(false);

//   const [benefits,        setBenefits]    = useState([]);
//   const [bLoading,        setBLoading]    = useState(false);
//   const [showBenefitForm, setShowBF]      = useState(false);
//   const [editBenefit,     setEditBenefit] = useState(null);
//   const [delBenefit,      setDelBenefit]  = useState(null);

//   const emptyBF = { title:"", description:"", sortOrder:"" };
//   const [bForm,   setBForm]   = useState(emptyBF);
//   const [bFile,   setBFile]   = useState(null);
//   const [bPrev,   setBPrev]   = useState(null);
//   const [bSaving, setBSaving] = useState(false);

//   const loadBenefits = async () => {
//     if (!isEdit) return;
//     setBLoading(true);
//     const res = await courseApi.getBenefits(course.id);
//     setBenefits(res?.data || []);
//     setBLoading(false);
//   };

//   useEffect(() => { if (isEdit) loadBenefits(); }, []);

//   const openAddBenefit = () => {
//     setBForm(emptyBF); setBFile(null); setBPrev(null);
//     setEditBenefit(null); setShowBF(true);
//   };
//   const openEditBenefit = (b) => {
//     setBForm({ title: b.title||"", description: b.description||"", sortOrder: b.sortOrder||"" });
//     setBFile(null);
//     setBPrev(courseApi.benefitImageUrl(b.id));
//     setEditBenefit(b); setShowBF(true);
//   };
//   const cancelBenefit = () => { setShowBF(false); setEditBenefit(null); };

//   const saveBenefit = async () => {
//     if (!bForm.title.trim()) { toast("Title is required","error"); return; }
//     setBSaving(true);
//     const res = editBenefit
//       ? await courseApi.updateBenefit(editBenefit.id, bForm, bFile)
//       : await courseApi.addBenefit(course.id, bForm, bFile);
//     setBSaving(false);
//     if (res?.success !== false) { toast(editBenefit?"Benefit updated!":"Benefit added!"); setShowBF(false); setEditBenefit(null); loadBenefits(); }
//     else toast(res?.message||"Error","error");
//   };

//   const confirmDeleteBenefit = async () => {
//     const res = await courseApi.softDeleteBenefit(delBenefit.id);
//     if (res?.success !== false) toast("Benefit deleted");
//     else toast(res?.message,"error");
//     setDelBenefit(null); loadBenefits();
//   };

//   const set     = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
//   const setFile = e => {
//     const { name, files: f } = e.target;
//     if (!f[0]) return;
//     setFiles(p => ({ ...p, [name]: f[0] }));
//     setPrev(p  => ({ ...p, [name]: URL.createObjectURL(f[0]) }));
//   };

//   const submit = async () => {
//     if (!form.courseName.trim() || !form.shortForm.trim()) {
//       toast("Course Name and Short Form are required","error"); return;
//     }
//     setSaving(true);
//     const res = isEdit
//       ? await courseApi.updateCourse(course.id, form, files)
//       : await courseApi.createCourse(form, files);
//     setSaving(false);
//     if (res?.success !== false) { toast(isEdit ? "Course updated!" : "Course created!"); onSave(); }
//     else toast(res?.message || "API error — check CORS / backend", "error");
//   };

//   const SaveBtn = ({ sm }) => (
//     <button onClick={submit} disabled={saving}
//       className={`flex items-center gap-2 ${sm?"px-4 py-2 text-xs":"px-6 py-2.5 text-sm"} rounded-xl text-white font-bold disabled:opacity-60 transition hover:opacity-90`}
//       style={{background:"linear-gradient(135deg,#1a237e,#2836b5)"}}>
//       {saving
//         ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spin"/>
//         : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
//       }
//       {saving ? "Saving…" : isEdit ? "Update" : "Create Course"}
//     </button>
//   );

//   return (
//     <div className="flex flex-col h-full overflow-hidden">
//       <G/>
//       <Confirm open={!!delBenefit} onOk={confirmDeleteBenefit} onCancel={()=>setDelBenefit(null)}/>

//       <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-white shrink-0">
//         <button onClick={onBack}
//           className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#1a237e] hover:border-[#1a237e]/30 transition">
//           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
//         </button>
//         <div className="flex-1">
//           <h2 className="font-extrabold text-[#1a237e] text-lg">{isEdit?"Edit Course":"Add New Course"}</h2>
//           {isEdit && <p className="text-xs text-slate-400">{course.courseName}</p>}
//         </div>
//         <SaveBtn sm/>
//       </div>

//       <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-5 space-y-5 bg-slate-50">

//         <Sec emoji="📋" title="Basic Information" sub="Course name, short form, and listing details">
//           <div className="grid grid-cols-2 gap-4">
//             <F label="Course Name *" name="courseName" value={form.courseName} onChange={set}
//                placeholder="e.g. Advanced Cardiovascular Life Support" cls="col-span-2"/>
//             <F label="Short Form *" name="shortForm" value={form.shortForm} onChange={set} placeholder="e.g. ACLS"/>
//             <F label="Features (comma-separated)" name="features" value={form.features} onChange={set} placeholder="AHA Certified, Simulation Lab"/>
//             <TA label="Short Description" name="shortDesc" value={form.shortDesc} onChange={set}
//                 placeholder="Brief overview shown on the courses listing…" rows={3} cls="col-span-2"/>
//           </div>
//           <div className="mt-5 pt-5 border-t border-slate-100">
//             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
//               Listing Images <span className="font-normal normal-case text-slate-300">(shown in courses grid)</span>
//             </p>
//             <div className="grid grid-cols-2 gap-4">
//               <ImgBox label="Card Image" name="cardImage" preview={prev.cardImage} onChange={setFile} hint="600 × 400 px"/>
//               <ImgBox label="Logo / Badge" name="logo" preview={prev.logo} onChange={setFile} hint="Square PNG"/>
//             </div>
//           </div>
//         </Sec>

//         <Sec emoji="🖼️" title="Hero Banner" sub="Full-width image at top of course page" accent="#7c3aed">
//           <ImgBox label="Banner Image" name="bannerImage" preview={prev.bannerImage} onChange={setFile} hint="1440 × 500 px" tall/>
//         </Sec>

//         <Sec emoji="ℹ️" title="About Section" sub="Content for the 'About this course' block" accent="#0891b2">
//           <div className="grid grid-cols-2 gap-4">
//             <F label="About Title" name="aboutTitle" value={form.aboutTitle} onChange={set}
//                placeholder="e.g. Department of Health Abu Dhabi" cls="col-span-2"/>
//             <F label="Years of Experience" name="aboutTotalExperience" value={form.aboutTotalExperience} onChange={set} placeholder="e.g. 3+"/>
//             <div/>
//             <TA label="About Description" name="aboutDescription" value={form.aboutDescription} onChange={set}
//                 rows={4} placeholder="In-depth description…" cls="col-span-2"/>
//             <div className="col-span-2">
//               <ImgBox label="About Section Image" name="aboutImage" preview={prev.aboutImage} onChange={setFile} hint="600 × 500 px — beside about text"/>
//             </div>
//           </div>
//         </Sec>

//         <Sec emoji="📚" title="Course Detail Section" sub="Overview details on course page" accent="#d97706">
//           <div className="grid grid-cols-2 gap-4">
//             <F label="Section Title" name="courseDetailTitle" value={form.courseDetailTitle} onChange={set}
//                placeholder="e.g. Course Overview & Design" cls="col-span-2"/>
//             <F label="Course Hours" name="courseHours" value={form.courseHours} onChange={set} type="number" placeholder="e.g. 16"/>
//             <F label="Duration / Intensive" name="intensive" value={form.intensive} onChange={set} placeholder="e.g. 2 Days Intensive"/>
//           </div>
//         </Sec>

//         {isEdit && (
//           <Sec emoji="⭐" title="Benefits" sub="Manage course benefits — icons, titles, descriptions" accent="#059669">
//             <div className="flex items-center justify-between mb-4">
//               <p className="text-xs text-slate-400 font-semibold">{benefits.length} benefit{benefits.length!==1?"s":""} added</p>
//               <button onClick={openAddBenefit}
//                 className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition"
//                 style={{borderColor:"#05966928",color:"#059669",background:"#05966908"}}
//                 onMouseEnter={e=>e.currentTarget.style.background="#05966918"}
//                 onMouseLeave={e=>e.currentTarget.style.background="#05966908"}>
//                 + Add Benefit
//               </button>
//             </div>

//             {showBenefitForm && (
//               <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-4 space-y-3 mb-4">
//                 <p className="text-xs font-bold text-emerald-700">{editBenefit?"✏️ Edit":"➕ Add"} Benefit</p>
//                 <div className="grid grid-cols-2 gap-3">
//                   <F label="Title *" name="title" value={bForm.title}
//                     onChange={e=>setBForm(p=>({...p,title:e.target.value}))} cls="col-span-2"/>
//                   <TA label="Description" name="description" value={bForm.description}
//                     onChange={e=>setBForm(p=>({...p,description:e.target.value}))} cls="col-span-2"/>
//                   <F label="Sort Order" name="sortOrder" value={bForm.sortOrder} type="number"
//                     onChange={e=>setBForm(p=>({...p,sortOrder:e.target.value}))}/>
//                   <div className="col-span-2">
//                     <ImgBox label="Icon / Logo" name="logo" preview={bPrev}
//                       onChange={e=>{ const f=e.target.files[0]; if(f){ setBFile(f); setBPrev(URL.createObjectURL(f)); }}}/>
//                   </div>
//                 </div>
//                 <div className="flex gap-2 pt-1">
//                   <button onClick={cancelBenefit} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500 text-xs font-semibold hover:bg-slate-50">Cancel</button>
//                   <button onClick={saveBenefit} disabled={bSaving}
//                     className="px-5 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold disabled:opacity-60">
//                     {bSaving?"Saving…":editBenefit?"Update":"Add"}
//                   </button>
//                 </div>
//               </div>
//             )}

//             {bLoading
//               ? <div className="flex justify-center py-8"><div className="w-6 h-6 border-2 border-slate-200 border-t-emerald-500 rounded-full spin"/></div>
//               : benefits.length===0
//                 ? <Empty msg="No benefits yet — click 'Add Benefit' above."/>
//                 : (
//                   <div className="space-y-2">
//                     {benefits.map(b => (
//                       <div key={b.id} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100 hover:border-slate-200 group transition">
//                         <div className="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center shrink-0">
//                           {b.id
//                             ? <img src={courseApi.benefitImageUrl(b.id)} alt="" className="w-6 h-6 object-contain"
//                                 onError={e=>{ e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }}/>
//                             : null
//                           }
//                           <span className="text-base hidden items-center justify-center">⭐</span>
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-sm font-semibold text-slate-800">{b.title}</p>
//                           <p className="text-xs text-slate-400 truncate">{b.description}</p>
//                         </div>
//                         <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
//                           <Badge s={b.status}/>
//                           <EditBtn onClick={()=>openEditBenefit(b)}/>
//                           <DelBtn onClick={()=>setDelBenefit(b)}/>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )
//             }
//           </Sec>
//         )}

//         <div className="h-2"/>
//       </div>

//       <ScrollDownBtn containerRef={scrollRef}/>

//       <div className="shrink-0 px-6 py-3 bg-white border-t border-slate-100 flex items-center justify-between gap-3">
//         <p className="text-xs text-slate-400 hidden sm:block">
//           {isEdit ? "Review your changes, then save." : "Fill all sections and create the course."}
//         </p>
//         <div className="flex gap-2 ml-auto">
//           <button onClick={onBack}
//             className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm font-semibold hover:bg-slate-50 transition">
//             Cancel
//           </button>
//           <SaveBtn/>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ══════════════════════════════════════════════════════════════════════════════
// //  MANAGE VIEW
// // ══════════════════════════════════════════════════════════════════════════════
// const ManageView = ({ course, onBack }) => {
//   const [tab, setTab]           = useState("overview");
//   const [data, setData]         = useState({ overview:null, cards:[], contents:[], benefits:[], subcourses:[] });
//   const [loading, setLoading]   = useState(true);
//   const [showAdd, setShowAdd]   = useState(false);
//   const [editItem, setEditItem] = useState(null);
//   const [delTarget, setDel]     = useState(null);
//   const scrollRef               = useRef();

//   const TABS = [
//     { key:"overview",   label:"Overview",     emoji:"📄" },
//     { key:"cards",      label:"Design Cards", emoji:"🎨" },
//     { key:"contents",   label:"Contents",     emoji:"📝" },
//     { key:"benefits",   label:"Benefits",     emoji:"⭐" },
//     { key:"subcourses", label:"Sub Courses",  emoji:"📦" },
//   ];

//   const load = async () => {
//     setLoading(true);
//     const [full, cards, contents, benefits, subs] = await Promise.all([
//       courseApi.getCourseById(course.id),
//       courseApi.getDesignCards(course.id),
//       courseApi.getContents(course.id),
//       courseApi.getBenefits(course.id),
//       courseApi.getSubCourses(course.id),
//     ]);
//     setData({
//       overview:   full?.data?.overview || null,
//       cards:      cards?.data      || [],
//       contents:   contents?.data   || [],
//       benefits:   benefits?.data   || [],
//       subcourses: subs?.data       || [],
//     });
//     setLoading(false);
//   };

//   useEffect(() => { load(); }, [course.id]);
//   const refresh = () => { load(); setShowAdd(false); setEditItem(null); };

//   const doDelete = async () => {
//     await fetch(delTarget.url + "?actor=admin", { method:"DELETE", mode:"cors" });
//     toast("Deleted"); setDel(null); load();
//   };

//   const OverviewForm = ({ ex }) => {
//     const [f, sf] = useState({
//       title:               ex?.title||"",
//       subTitle:            ex?.subTitle||"",
//       description:         ex?.description||"",
//       majorConceptHeading: ex?.majorConceptHeading||"",
//       majorConcepts:       ex?.majorConcepts?.join("|")||"",
//     });
//     const [s, ss] = useState(false);
//     const save = async () => {
//       if (!f.title.trim()) { toast("Title is required","error"); return; }
//       ss(true);
//       const res = ex
//         ? await courseApi.updateOverview(course.id, f)
//         : await courseApi.saveOverview(course.id, f);
//       ss(false);
//       if (res?.success !== false) { toast("Overview saved!"); refresh(); }
//       else toast(res?.message,"error");
//     };
//     return (
//       <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 space-y-3 mb-3">
//         <p className="text-xs font-bold text-[#1a237e]">{ex?"✏️ Edit":"➕ Add"} Overview</p>
//         <div className="grid grid-cols-2 gap-3">
//           <F label="Title *" name="title" value={f.title} onChange={e=>sf(p=>({...p,title:e.target.value}))}/>
//           <F label="Subtitle" name="subTitle" value={f.subTitle} onChange={e=>sf(p=>({...p,subTitle:e.target.value}))}/>
//           <TA label="Description" name="description" value={f.description} onChange={e=>sf(p=>({...p,description:e.target.value}))} cls="col-span-2"/>
//           <F label="Concept Heading" name="majorConceptHeading" value={f.majorConceptHeading} onChange={e=>sf(p=>({...p,majorConceptHeading:e.target.value}))}/>
//           <F label="Concepts (pipe-separated)" name="majorConcepts" value={f.majorConcepts} onChange={e=>sf(p=>({...p,majorConcepts:e.target.value}))} placeholder="C1|C2|C3"/>
//         </div>
//         <div className="flex gap-2 pt-1">
//           <button onClick={()=>{setShowAdd(false);setEditItem(null);}} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500 text-xs font-semibold hover:bg-slate-50">Cancel</button>
//           <button onClick={save} disabled={s} className="px-5 py-2 rounded-xl bg-[#1a237e] text-white text-xs font-bold disabled:opacity-60">{s?"Saving…":"Save"}</button>
//         </div>
//       </div>
//     );
//   };

//   const ItemForm = ({ cfg, ex, onDone }) => {
//     const buildInit = () => { const o={}; cfg.fields.forEach(fi => o[fi.name] = ex?.[fi.name]??""); return o; };
//     const buildPrev = () => {
//       const p={};
//       cfg.imgs?.forEach(fi=>{
//         p[fi.name] = ex
//           ? (fi.name==="logo"
//               ? (cfg.label==="Benefit" ? courseApi.benefitImageUrl(ex.id) : courseApi.designCardImageUrl(ex.id))
//               : fi.name==="cardImage" ? courseApi.subCourseImageUrl(ex.id) : null)
//           : null;
//       });
//       return p;
//     };

//     const [f, sf]      = useState(buildInit);
//     const [imgs, sImg] = useState({});
//     const [pv, spv]    = useState(buildPrev);
//     const [s, ss]      = useState(false);

//     useEffect(() => { sf(buildInit()); spv(buildPrev()); sImg({}); }, [ex?.id]);

//     const handleChange = e => sf(p => ({ ...p, [e.target.name]: e.target.value }));

//     const save = async () => {
//       ss(true);
//       let res;
//       if (cfg.hasFiles) {
//         const imgFile = imgs[cfg.imgs?.[0]?.name] || null;
//         res = ex ? await cfg.updateFn(ex.id, f, imgFile) : await cfg.addFn(f, imgFile);
//       } else {
//         res = ex ? await cfg.updateFn(ex.id, f) : await cfg.addFn(f);
//       }
//       ss(false);
//       if (res?.success !== false) { toast(ex?"Updated!":"Added!"); onDone(); }
//       else toast(res?.message,"error");
//     };

//     return (
//       <div className="bg-amber-50/70 border border-amber-100 rounded-xl p-4 space-y-3 mb-3">
//         <p className="text-xs font-bold text-amber-700">{ex?"✏️ Edit":"➕ Add"} {cfg.label}</p>
//         <div className="grid grid-cols-2 gap-3">
//           {cfg.fields.map(fi => fi.type==="textarea"
//             ? <TA key={fi.name} label={fi.label} name={fi.name} value={f[fi.name]??""} onChange={handleChange} cls={fi.full?"col-span-2":""}/>
//             : <F  key={fi.name} label={fi.label} name={fi.name} value={f[fi.name]??""} type={fi.type||"text"} onChange={handleChange} cls={fi.full?"col-span-2":""}/>
//           )}
//           {cfg.imgs?.map(fi => (
//             <div key={fi.name} className={fi.full?"col-span-2":""}>
//               <ImgBox label={fi.label} name={fi.name} preview={pv[fi.name]}
//                 onChange={e=>{ const file=e.target.files[0]; if(file){ sImg(p=>({...p,[fi.name]:file})); spv(p=>({...p,[fi.name]:URL.createObjectURL(file)})); }}}/>
//             </div>
//           ))}
//         </div>
//         <div className="flex gap-2 pt-1">
//           <button onClick={()=>{setShowAdd(false);setEditItem(null);}} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500 text-xs font-semibold hover:bg-slate-50">Cancel</button>
//           <button onClick={save} disabled={s} className="px-5 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold disabled:opacity-60">{s?"Saving…":ex?"Update":"Add"}</button>
//         </div>
//       </div>
//     );
//   };

//   const CFG = {
//     cards: {
//       label:"Design Card", hasFiles:true,
//       addFn:    (f,img) => courseApi.addDesignCard(course.id, f, img),
//       updateFn: (id,f,img) => courseApi.updateDesignCard(id, f, img),
//       deleteFn: id => courseApi.softDeleteDesignCard(id),
//       fields: [
//         {name:"title",       label:"Title *",     full:true},
//         {name:"description", label:"Description", type:"textarea", full:true},
//         {name:"sortOrder",   label:"Sort Order",  type:"number", full:true},
//       ],
//       imgs: [{name:"logo", label:"Icon / Logo", full:true}],
//     },
//     contents: {
//       label:"Content Item", hasFiles:false,
//       addFn:    f => courseApi.addContent(course.id, f),
//       updateFn: (id,f) => courseApi.updateContent(id, f),
//       deleteFn: id => courseApi.softDeleteContent(id),
//       fields: [
//         {name:"title",     label:"Title *",    full:true},
//         {name:"sortOrder", label:"Sort Order", type:"number"},
//       ],
//       imgs: [],
//     },
//     benefits: {
//       label:"Benefit", hasFiles:true,
//       addFn:    (f,img) => courseApi.addBenefit(course.id, f, img),
//       updateFn: (id,f,img) => courseApi.updateBenefit(id, f, img),
//       deleteFn: id => courseApi.softDeleteBenefit(id),
//       fields: [
//         {name:"title",       label:"Title *",    full:true},
//         {name:"description", label:"Description",type:"textarea",full:true},
//         {name:"sortOrder",   label:"Sort Order", type:"number"},
//       ],
//       imgs: [{name:"logo", label:"Icon / Logo"}],
//     },
//     subcourses: {
//       label:"Sub Course", hasFiles:true,
//       addFn:    (f,img) => courseApi.addSubCourse(course.id, f, img),
//       updateFn: (id,f,img) => courseApi.updateSubCourse(id, f, img),
//       deleteFn: id => courseApi.softDeleteSubCourse(id),
//       fields: [
//         {name:"title",       label:"Title *",    full:true},
//         {name:"description", label:"Description",type:"textarea",full:true},
//         {name:"sortOrder",   label:"Sort Order", type:"number"},
//       ],
//       imgs: [{name:"cardImage", label:"Card Image", full:true}],
//     },
//   };

//   const switchTab = key => { setTab(key); setShowAdd(false); setEditItem(null); };

//   return (
//     <div className="flex flex-col h-full overflow-hidden">
//       <G/>
//       <Confirm open={!!delTarget} onOk={doDelete} onCancel={()=>setDel(null)}/>

//       <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-white shrink-0">
//         <button onClick={onBack}
//           className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#1a237e] hover:border-[#1a237e]/30 transition">
//           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
//         </button>
//         <div className="flex-1 min-w-0">
//           <h2 className="font-extrabold text-[#1a237e] text-lg truncate">{course.courseName}</h2>
//           <p className="text-xs text-slate-400">{course.shortForm} · Sub-sections</p>
//         </div>
//         <Badge s={course.status}/>
//       </div>

//       <div className="px-6 py-3 bg-white border-b border-slate-100 flex items-center gap-4 shrink-0">
//         <div className="w-14 h-10 rounded-lg border border-slate-100 shrink-0 overflow-hidden bg-slate-50 flex items-center justify-center">
//           <img src={courseApi.courseImageUrl(course.id, "card")} alt=""
//             className="w-full h-full object-cover"
//             onError={e=>{ e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }}/>
//           <span className="text-xl hidden items-center justify-center">📚</span>
//         </div>
//         <p className="text-xs text-slate-500 flex-1 c2">{course.shortDesc}</p>
//         <div className="flex gap-2 shrink-0">
//           {course.courseHours && <span className="text-[11px] bg-blue-50 text-blue-500 px-2 py-0.5 rounded-full font-bold">⏱ {course.courseHours}h</span>}
//           {course.intensive   && <span className="text-[11px] bg-purple-50 text-purple-500 px-2 py-0.5 rounded-full font-bold">📅 {course.intensive}</span>}
//         </div>
//       </div>

//       <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 shrink-0">
//         <div className="flex gap-1 bg-slate-200/50 p-1 rounded-xl">
//           {TABS.map(t => (
//             <button key={t.key} onClick={()=>switchTab(t.key)}
//               className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-[11px] font-bold transition
//                 ${tab===t.key?"bg-white shadow-sm text-[#1a237e]":"text-slate-400 hover:text-slate-600"}`}>
//               {t.emoji} <span className="hidden sm:inline">{t.label}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 bg-slate-50">

//         <div className="flex items-center justify-between mb-4">
//           <p className="text-xs font-bold text-slate-500">
//             {TABS.find(t=>t.key===tab)?.emoji} {TABS.find(t=>t.key===tab)?.label}
//           </p>
//           <button onClick={()=>{setShowAdd(true);setEditItem(null);}}
//             className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition"
//             style={{borderColor:"#1a237e28",color:"#1a237e",background:"#1a237e08"}}
//             onMouseEnter={e=>e.currentTarget.style.background="#1a237e14"}
//             onMouseLeave={e=>e.currentTarget.style.background="#1a237e08"}>
//             + {tab==="overview"?"Set Overview":"Add"}
//           </button>
//         </div>

//         {loading && <div className="flex justify-center py-12"><div className="w-7 h-7 border-2 border-slate-200 border-t-[#1a237e] rounded-full spin"/></div>}

//         {!loading && showAdd && tab==="overview"  && <OverviewForm ex={data.overview}/>}
//         {!loading && showAdd && tab!=="overview"  && <ItemForm key={`add-${tab}`} cfg={CFG[tab]} ex={null} onDone={refresh}/>}
//         {!loading && editItem && tab!=="overview" && <ItemForm key={`edit-${editItem?.id}`} cfg={CFG[tab]} ex={editItem} onDone={refresh}/>}

//         {!loading && tab==="overview" && !showAdd && (
//           data.overview ? (
//             <div className="bg-white rounded-xl border border-slate-100 divide-y divide-slate-50 shadow-sm">
//               {[["Title",data.overview.title],["Subtitle",data.overview.subTitle],["Description",data.overview.description],["Concept Heading",data.overview.majorConceptHeading]]
//                 .filter(([,v])=>v)
//                 .map(([l,v])=>(
//                   <div key={l} className="flex gap-3 px-4 py-3">
//                     <span className="text-[11px] font-bold text-slate-400 uppercase w-32 shrink-0 mt-0.5">{l}</span>
//                     <span className="text-sm text-slate-700 flex-1">{v}</span>
//                   </div>
//                 ))}
//               {data.overview.majorConcepts?.length>0 && (
//                 <div className="flex gap-3 px-4 py-3">
//                   <span className="text-[11px] font-bold text-slate-400 uppercase w-32 shrink-0 mt-0.5">Concepts</span>
//                   <ul className="flex-1 space-y-1">
//                     {data.overview.majorConcepts.map((c,i)=>(
//                       <li key={i} className="text-sm text-slate-700 flex gap-1.5"><span className="text-[#00d4ff] font-black">›</span>{c}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//               <div className="px-4 py-3">
//                 <button onClick={()=>setShowAdd(true)} className="text-xs font-bold text-[#1a237e]/50 hover:text-[#1a237e] transition">✏️ Edit overview</button>
//               </div>
//             </div>
//           ) : <Empty msg="No overview yet — click 'Set Overview' above."/>
//         )}

//         {!loading && tab==="cards" && !showAdd && !editItem && (
//           data.cards.length===0 ? <Empty msg="No design cards yet."/> :
//           <div className="space-y-2">
//             {data.cards.map(c=>(
//               <div key={c.id} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100 hover:border-slate-200 group transition">
//                 <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0 overflow-hidden"
//                   style={{background:c.colorBackground||"#EEF2FF"}}>
//                   <img src={courseApi.designCardImageUrl(c.id)} alt="" className="w-6 h-6 object-contain"
//                     onError={e=>{ e.target.style.display="none"; e.target.nextSibling.style.display="inline"; }}/>
//                   <span className="hidden">🎨</span>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-semibold text-slate-800 truncate">{c.title}</p>
//                   <p className="text-xs text-slate-400 truncate">{c.description}</p>
//                 </div>
//                 <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
//                   <Badge s={c.status}/>
//                   <EditBtn onClick={()=>{setEditItem(c);setShowAdd(false);}}/>
//                   <DelBtn onClick={()=>setDel({url:`${API_BASE}/design-cards/${c.id}/soft`})}/>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {!loading && tab==="contents" && !showAdd && !editItem && (
//           data.contents.length===0 ? <Empty msg="No content items yet."/> :
//           <div className="space-y-2">
//             {data.contents.map((c,i)=>(
//               <div key={c.id} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100 hover:border-slate-200 group transition">
//                 <span className="w-7 h-7 rounded-lg text-[11px] font-black text-[#1a237e] flex items-center justify-center shrink-0"
//                   style={{background:"#1a237e0c"}}>{String(i+1).padStart(2,"0")}</span>
//                 <p className="flex-1 text-sm text-slate-700">{c.title}</p>
//                 <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
//                   <Badge s={c.status}/>
//                   <EditBtn onClick={()=>{setEditItem(c);setShowAdd(false);}}/>
//                   <DelBtn onClick={()=>setDel({url:`${API_BASE}/contents/${c.id}/soft`})}/>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {!loading && tab==="benefits" && !showAdd && !editItem && (
//           data.benefits.length===0 ? <Empty msg="No benefits yet."/> :
//           <div className="space-y-2">
//             {data.benefits.map(b=>(
//               <div key={b.id} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100 hover:border-slate-200 group transition">
//                 <div className="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center shrink-0 overflow-hidden">
//                   <img src={courseApi.benefitImageUrl(b.id)} alt="" className="w-6 h-6 object-contain"
//                     onError={e=>{ e.target.style.display="none"; e.target.nextSibling.style.display="inline"; }}/>
//                   <span className="hidden">⭐</span>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-semibold text-slate-800">{b.title}</p>
//                   <p className="text-xs text-slate-400 truncate">{b.description}</p>
//                 </div>
//                 <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
//                   <Badge s={b.status}/>
//                   <EditBtn onClick={()=>{setEditItem(b);setShowAdd(false);}}/>
//                   <DelBtn onClick={()=>setDel({url:`${API_BASE}/benefits/${b.id}/soft`})}/>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {!loading && tab==="subcourses" && !showAdd && !editItem && (
//           data.subcourses.length===0 ? <Empty msg="No sub courses yet."/> :
//           <div className="grid grid-cols-2 gap-3">
//             {data.subcourses.map(s=>(
//               <div key={s.id} className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:border-slate-200 group transition">
//                 <div className="h-24 bg-slate-50 overflow-hidden">
//                   <img src={courseApi.subCourseImageUrl(s.id)} alt={s.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                     onError={e=>{ e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }}/>
//                   <div className="w-full h-full hidden items-center justify-center text-3xl">📦</div>
//                 </div>
//                 <div className="p-3">
//                   <p className="text-sm font-bold text-slate-800 truncate">{s.title}</p>
//                   <p className="text-xs text-slate-400 mt-0.5 c2">{s.description}</p>
//                   <div className="flex gap-1.5 mt-2.5 opacity-0 group-hover:opacity-100 transition">
//                     <button onClick={()=>{setEditItem(s);setShowAdd(false);}}
//                       className="flex-1 py-1.5 rounded-lg text-[11px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition">Edit</button>
//                     <button onClick={()=>setDel({url:`${API_BASE}/subcourses/${s.id}/soft`})}
//                       className="flex-1 py-1.5 rounded-lg text-[11px] font-bold text-red-500 bg-red-50 hover:bg-red-100 transition">Delete</button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <ScrollDownBtn containerRef={scrollRef}/>
//     </div>
//   );
// };

// // ══════════════════════════════════════════════════════════════════════════════
// //  HERO SECTION FORM
// // ══════════════════════════════════════════════════════════════════════════════
// const HeroFormDrawer = ({ open, onClose, hero, onSaved }) => {
//   const STORAGE_KEY = "flygulf_hero_section";
//   const empty = { tag:"AHA CERTIFIED PROGRAMS", heading:"Explore Our", headingAccent:"Training Courses", subheading:"World-class clinical, licensing, and language programs designed to launch your Gulf healthcare career.", btnPrimary:"Enroll Now →", btnSecondary:"View All Courses", bgImage:"", sectionTag:"ALL PROGRAMS", sectionHeading:"Our", sectionHeadingAccent:"Certified Courses", sectionSubtext:"Choose from AHA-certified clinical programs, Gulf licensing exams, and language proficiency courses." };

//   const [form, setForm] = useState({ ...empty, ...hero });
//   const [bgFile, setBgFile] = useState(null);
//   const [bgPrev, setBgPrev] = useState(hero?.bgImage || "");
//   const [saving, setSaving] = useState(false);
//   const ref = useRef();

//   useEffect(() => { setForm({ ...empty, ...hero }); setBgPrev(hero?.bgImage || ""); }, [hero]);

//   const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

//   const save = async () => {
//     setSaving(true);
//     let finalImg = bgPrev;
//     if (bgFile) {
//       finalImg = await new Promise(res => {
//         const r = new FileReader();
//         r.onload = () => res(r.result);
//         r.readAsDataURL(bgFile);
//       });
//     }
//     const saved = { ...form, bgImage: finalImg };
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
//     setSaving(false);
//     toast("Hero section saved!");
//     onSaved(saved);
//     onClose();
//   };

//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-[90] flex">
//       <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}/>
//       <div className="relative ml-auto w-full max-w-lg bg-white h-full flex flex-col shadow-2xl slide-right">
//         <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 shrink-0"
//           style={{background:"linear-gradient(90deg,#1a237e0b,transparent)"}}>
//           <div className="w-9 h-9 rounded-xl bg-[#1a237e14] flex items-center justify-center text-lg shrink-0">🖼️</div>
//           <div className="flex-1">
//             <p className="font-extrabold text-[#1a237e] text-sm">Edit Hero Section</p>
//             <p className="text-[11px] text-slate-400">Banner shown at top of the courses page</p>
//           </div>
//           <button onClick={onClose} className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#1a237e] transition">
//             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
//           <div className="flex flex-col gap-1.5">
//             <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Background Image</span>
//             <div onClick={()=>ref.current.click()}
//               className="relative group cursor-pointer rounded-xl overflow-hidden border-2 border-dashed border-slate-200 hover:border-[#1a237e] transition-all bg-slate-50"
//               style={{height:140}}>
//               {bgPrev ? (
//                 <>
//                   <img src={bgPrev} alt="hero bg" className="w-full h-full object-cover"/>
//                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
//                     <span className="text-white text-xs font-bold bg-black/50 px-3 py-1 rounded-lg">Change Image</span>
//                   </div>
//                 </>
//               ) : (
//                 <div className="flex flex-col items-center justify-center gap-2 h-full text-slate-300 group-hover:text-[#1a237e]/50 transition">
//                   <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
//                   </svg>
//                   <span className="text-xs font-semibold">Click to upload hero background</span>
//                   <span className="text-[10px] text-slate-300">Recommended: 1440 × 500 px</span>
//                 </div>
//               )}
//               <input ref={ref} type="file" accept="image/*" className="hidden"
//                 onChange={e=>{ const f=e.target.files[0]; if(f){ setBgFile(f); setBgPrev(URL.createObjectURL(f)); }}}/>
//             </div>
//           </div>

//           <div className="flex flex-col gap-1.5">
//             <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Tag Line (small top text)</label>
//             <input name="tag" value={form.tag} onChange={set} placeholder="e.g. AHA CERTIFIED PROGRAMS"
//               className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition"/>
//           </div>

//           <div className="grid grid-cols-2 gap-3">
//             <div className="flex flex-col gap-1.5">
//               <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Heading (white)</label>
//               <input name="heading" value={form.heading} onChange={set} placeholder="Explore Our"
//                 className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition"/>
//             </div>
//             <div className="flex flex-col gap-1.5">
//               <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Heading Accent (cyan)</label>
//               <input name="headingAccent" value={form.headingAccent} onChange={set} placeholder="Training Courses"
//                 className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition"/>
//             </div>
//           </div>

//           <div className="flex flex-col gap-1.5">
//             <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Subheading</label>
//             <textarea name="subheading" value={form.subheading} onChange={set} rows={3}
//               placeholder="World-class clinical, licensing, and language programs…"
//               className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition resize-none"/>
//           </div>

//           <div className="grid grid-cols-2 gap-3">
//             <div className="flex flex-col gap-1.5">
//               <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Primary Button</label>
//               <input name="btnPrimary" value={form.btnPrimary} onChange={set} placeholder="Enroll Now →"
//                 className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition"/>
//             </div>
//             <div className="flex flex-col gap-1.5">
//               <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Secondary Button</label>
//               <input name="btnSecondary" value={form.btnSecondary} onChange={set} placeholder="View All Courses"
//                 className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition"/>
//             </div>
//           </div>

//           <div className="flex items-center gap-2 pt-1">
//             <div className="flex-1 h-px bg-slate-100"/>
//             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Courses Section Title</span>
//             <div className="flex-1 h-px bg-slate-100"/>
//           </div>

//           <div className="flex flex-col gap-1.5">
//             <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Section Tag (e.g. ALL PROGRAMS)</label>
//             <input name="sectionTag" value={form.sectionTag||""} onChange={set} placeholder="ALL PROGRAMS"
//               className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition"/>
//           </div>
//           <div className="grid grid-cols-2 gap-3">
//             <div className="flex flex-col gap-1.5">
//               <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Section Heading (dark)</label>
//               <input name="sectionHeading" value={form.sectionHeading||""} onChange={set} placeholder="Our"
//                 className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition"/>
//             </div>
//             <div className="flex flex-col gap-1.5">
//               <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Section Heading (cyan)</label>
//               <input name="sectionHeadingAccent" value={form.sectionHeadingAccent||""} onChange={set} placeholder="Certified Courses"
//                 className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition"/>
//             </div>
//           </div>
//           <div className="flex flex-col gap-1.5">
//             <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Section Subtext</label>
//             <textarea name="sectionSubtext" value={form.sectionSubtext||""} onChange={set} rows={2}
//               placeholder="Choose from AHA-certified clinical programs…"
//               className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition resize-none"/>
//           </div>

//           <div className="rounded-xl overflow-hidden border border-slate-100 shadow-sm">
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2 bg-slate-50 border-b border-slate-100">Live Preview</p>
//             <div className="relative h-32 flex flex-col items-center justify-center text-center px-6"
//               style={{ background: bgPrev ? `linear-gradient(rgba(0,0,0,.52),rgba(0,0,0,.52)), url('${bgPrev}') center/cover` : "linear-gradient(135deg,#1a237e,#0d47a1)" }}>
//               {form.tag && <p className="text-[9px] font-bold tracking-[.18em] text-slate-300 mb-1">{form.tag}</p>}
//               <p className="text-white font-extrabold text-base leading-tight">
//                 {form.heading} <span style={{color:"#00d4ff"}}>{form.headingAccent}</span>
//               </p>
//               {form.subheading && <p className="text-slate-300 text-[10px] mt-1 line-clamp-2">{form.subheading}</p>}
//               <div className="flex gap-2 mt-2">
//                 {form.btnPrimary   && <span className="px-3 py-1 rounded-full text-[9px] font-bold text-white" style={{background:"#00bcd4"}}>{form.btnPrimary}</span>}
//                 {form.btnSecondary && <span className="px-3 py-1 rounded-full text-[9px] font-bold text-white border border-white/40">{form.btnSecondary}</span>}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="shrink-0 px-6 py-4 bg-white border-t border-slate-100 flex gap-2 justify-end">
//           <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm font-semibold hover:bg-slate-50 transition">Cancel</button>
//           <button onClick={save} disabled={saving}
//             className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold disabled:opacity-60 transition hover:opacity-90"
//             style={{background:"linear-gradient(135deg,#1a237e,#2836b5)"}}>
//             {saving
//               ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spin"/>
//               : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
//             }
//             {saving ? "Saving…" : "Save Hero"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ── Hero Section Display ──────────────────────────────────────────────────────
// const HeroSection = ({ hero, onEdit }) => {
//   const bg = hero?.bgImage
//     ? `linear-gradient(rgba(0,0,0,.50),rgba(0,0,0,.50)), url('${hero.bgImage}') center/cover no-repeat`
//     : "linear-gradient(135deg,#0d1b6e 0%,#1a237e 40%,#0d47a1 100%)";

//   return (
//     <div className="relative overflow-hidden" style={{background:bg, minHeight:220}}>
//       <div className="absolute inset-0 hero-shimmer"
//         style={{background:"radial-gradient(ellipse at 70% 50%, rgba(0,212,255,.08) 0%, transparent 70%)"}}/>
//       <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-14 gap-3">
//         {hero?.tag && (
//           <p className="fade-up text-[11px] font-bold tracking-[.22em] text-slate-300 flex items-center gap-2" style={{animationDelay:".05s"}}>
//             <span className="w-8 h-px bg-slate-400/50 inline-block"/>
//             {hero.tag}
//             <span className="w-8 h-px bg-slate-400/50 inline-block"/>
//           </p>
//         )}
//         <h1 className="fade-up text-3xl sm:text-4xl font-extrabold text-white leading-tight" style={{animationDelay:".12s"}}>
//           {hero?.heading || "Explore Our"}{" "}
//           <span style={{color:"#00d4ff"}}>{hero?.headingAccent || "Training Courses"}</span>
//         </h1>
//         {hero?.subheading && (
//           <p className="fade-up text-sm text-slate-300 max-w-md leading-relaxed" style={{animationDelay:".2s"}}>
//             {hero.subheading}
//           </p>
//         )}
//         {(hero?.btnPrimary || hero?.btnSecondary) && (
//           <div className="fade-up flex items-center gap-3 mt-2" style={{animationDelay:".28s"}}>
//             {hero?.btnPrimary && (
//               <span className="px-5 py-2 rounded-full text-sm font-bold text-white cursor-default"
//                 style={{background:"#00bcd4", boxShadow:"0 4px 20px rgba(0,188,212,.35)"}}>
//                 {hero.btnPrimary}
//               </span>
//             )}
//             {hero?.btnSecondary && (
//               <span className="px-5 py-2 rounded-full text-sm font-bold text-white cursor-default border border-white/30 backdrop-blur-sm"
//                 style={{background:"rgba(255,255,255,.08)"}}>
//                 {hero.btnSecondary}
//               </span>
//             )}
//           </div>
//         )}
//       </div>
//       <button onClick={onEdit}
//         className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition"
//         style={{background:"rgba(255,255,255,.15)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,.22)"}}>
//         <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
//         </svg>
//         Edit Hero
//       </button>
//     </div>
//   );
// };

// // ══════════════════════════════════════════════════════════════════════════════
// //  MAIN — LIST VIEW
// // ══════════════════════════════════════════════════════════════════════════════
// export default function CoursesAdmin() {
//   const HERO_KEY = "flygulf_hero_section";
//   const defaultHero = { tag:"AHA CERTIFIED PROGRAMS", heading:"Explore Our", headingAccent:"Training Courses", subheading:"World-class clinical, licensing, and language programs designed to launch your Gulf healthcare career.", btnPrimary:"Enroll Now →", btnSecondary:"View All Courses", bgImage:"", sectionTag:"ALL PROGRAMS", sectionHeading:"Our", sectionHeadingAccent:"Certified Courses", sectionSubtext:"Choose from AHA-certified clinical programs, Gulf licensing exams, and language proficiency courses." };

//   const [screen,   setScreen]   = useState("list");
//   const [courses,  setCourses]  = useState([]);
//   const [loading,  setLoading]  = useState(true);
//   const [selected, setSelected] = useState(null);
//   const [search,   setSearch]   = useState("");
//   const [deleteId, setDeleteId] = useState(null);
//   const [apiErr,   setApiErr]   = useState("");
//   const [heroOpen, setHeroOpen] = useState(false);
//   const [hero,     setHero]     = useState(() => {
//     try { return JSON.parse(localStorage.getItem(HERO_KEY)) || defaultHero; } catch { return defaultHero; }
//   });
//   const listRef = useRef();

//   const load = async () => {
//     setLoading(true); setApiErr("");
//     const res = await courseApi.getAllCourses();
//     if (res?.success === false) {
//       setApiErr(res.message || "Cannot reach backend. Check server + CORS.");
//       setCourses([]);
//     } else {
//       setCourses((res?.data || []).filter(c => !c.deleted));
//     }
//     setLoading(false);
//   };

//   useEffect(() => { load(); }, []);

//   const filtered = courses.filter(c =>
//     c.courseName?.toLowerCase().includes(search.toLowerCase()) ||
//     c.shortForm?.toLowerCase().includes(search.toLowerCase())
//   );

//   const doDelete = async () => {
//     const res = await courseApi.softDeleteCourse(deleteId);
//     if (res?.success !== false) toast("Course deleted");
//     else toast(res?.message,"error");
//     setDeleteId(null); load();
//   };

//   // ── FIX: use BASE_HOST directly to avoid duplicate /courses/courses ──────
//   const toggleStatus = async (c) => {
//     const isActive = c.status === "ACTIVE";
//     try {
//       const url = `${BASE_HOST}/flygulf/api/flygulf/courses/${c.id}/${isActive ? "deactivate" : "activate"}`;
//       const res = await fetch(url, { method: "PUT", mode: "cors" });
//       const data = await res.json().catch(() => ({}));
//       if (res.ok || data?.success !== false) {
//         toast(isActive ? "Course deactivated" : "Course activated", isActive ? "info" : "success");
//         load();
//       } else {
//         toast(data?.message || "Failed to update status", "error");
//       }
//     } catch {
//       toast("Network error", "error");
//     }
//   };

//   const wrap = "fixed inset-0 z-50 bg-slate-50 flex flex-col";
//   if (screen==="add")
//     return <div className={wrap}><G/><CourseForm onSave={()=>{load();setScreen("list");}} onBack={()=>setScreen("list")}/></div>;
//   if (screen==="edit" && selected)
//     return <div className={wrap}><G/><CourseForm course={selected} onSave={()=>{load();setScreen("list");}} onBack={()=>setScreen("list")}/></div>;
//   if (screen==="manage" && selected)
//     return <div className={wrap}><G/><ManageView course={selected} onBack={()=>setScreen("list")}/></div>;

//   return (
//     <div style={{display:"flex", flexDirection:"column", height:"100vh", overflow:"hidden", background:"#f8fafc"}}>
//       <G/>
//       <Confirm open={!!deleteId} onOk={doDelete} onCancel={()=>setDeleteId(null)}/>
//       <HeroFormDrawer open={heroOpen} onClose={()=>setHeroOpen(false)} hero={hero} onSaved={setHero}/>

//       <div style={{flexShrink:0}} className="bg-white border-b border-slate-100 shadow-sm z-10">
//         <div className="w-full px-6 py-4 flex items-center justify-between gap-4">
//           <div>
//             <h1 className="text-xl font-extrabold text-slate-800">Courses Management</h1>
//             <p className="text-sm text-slate-400 mt-0.5">Manage your training courses and programs</p>
//           </div>
//           <button onClick={()=>setScreen("add")}
//             className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white shadow-md hover:opacity-90 active:scale-95 transition-all shrink-0"
//             style={{background:"linear-gradient(135deg,#1a237e,#2836b5)"}}>
//             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/></svg>
//             Add Course
//           </button>
//         </div>
//       </div>

//       <div
//         id="courses-main-scroll"
//         ref={listRef}
//         style={{
//           flex:1,
//           overflowY:"scroll",
//           overflowX:"hidden",
//           scrollbarWidth:"thin",
//           scrollbarColor:"#94a3b8 #f1f5f9",
//         }}
//       >
//         <style>{`
//           #courses-main-scroll::-webkit-scrollbar{width:7px}
//           #courses-main-scroll::-webkit-scrollbar-track{background:#f1f5f9}
//           #courses-main-scroll::-webkit-scrollbar-thumb{background:#94a3b8;border-radius:10px}
//           #courses-main-scroll::-webkit-scrollbar-thumb:hover{background:#1a237e}
//         `}</style>

//         <HeroSection hero={hero} onEdit={()=>setHeroOpen(true)}/>

//         {(hero?.sectionTag || hero?.sectionHeading || hero?.sectionHeadingAccent) && (
//           <div className="bg-slate-50 pt-8 pb-2 text-center">
//             {hero?.sectionTag && (
//               <p className="text-[10px] font-bold tracking-[.2em] text-[#00bcd4] uppercase mb-2 flex items-center justify-center gap-2">
//                 <span className="w-8 h-px bg-[#00bcd4]/40 inline-block"/>{hero.sectionTag}<span className="w-8 h-px bg-[#00bcd4]/40 inline-block"/>
//               </p>
//             )}
//             {(hero?.sectionHeading || hero?.sectionHeadingAccent) && (
//               <h2 className="text-2xl font-extrabold" style={{color:"#1a237e"}}>
//                 {hero.sectionHeading} <span style={{color:"#00bcd4"}}>{hero.sectionHeadingAccent}</span>
//               </h2>
//             )}
//             {hero?.sectionSubtext && (
//               <p className="text-sm text-slate-400 mt-1 max-w-lg mx-auto px-4">{hero.sectionSubtext}</p>
//             )}
//           </div>
//         )}

//         <div className="w-full px-6 pt-5 pb-4 flex items-center gap-3">
//           <div className="relative w-72">
//             <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
//             </svg>
//             <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search courses…"
//               className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 placeholder-slate-300 shadow-sm focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition"/>
//           </div>
//           <span className="text-xs text-slate-400 font-semibold">{filtered.length} course{filtered.length!==1?"s":""}</span>
//         </div>

//         {apiErr && (
//           <div className="mx-6 mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2">
//             <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
//             </svg>
//             <div className="flex-1">
//               <p className="text-sm font-bold text-red-600">API Error</p>
//               <p className="text-xs text-red-400 mt-0.5">{apiErr}</p>
//               <p className="text-xs text-red-400 mt-1">
//                 Make sure your Spring Boot server is running at <code className="bg-red-100 px-1 rounded">{BASE_HOST}</code> and CORS is enabled.
//               </p>
//             </div>
//             <button onClick={load} className="text-xs font-bold text-red-500 hover:underline shrink-0">Retry</button>
//           </div>
//         )}

//         <div className="w-full px-6 pb-16">
//           {loading ? (
//             <div className="flex flex-col items-center py-24 gap-3">
//               <div className="w-9 h-9 border-2 border-slate-200 border-t-[#1a237e] rounded-full spin"/>
//               <p className="text-sm text-slate-400 font-semibold">Loading courses…</p>
//             </div>
//           ) : filtered.length===0 ? (
//             <div className="flex flex-col items-center py-24 gap-3">
//               <div className="w-16 h-16 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center text-4xl">📚</div>
//               <p className="text-slate-400 font-semibold text-sm">{search?"No matching courses":"No courses yet"}</p>
//               {!search && (
//                 <button onClick={()=>setScreen("add")}
//                   className="mt-1 px-5 py-2.5 rounded-xl bg-[#1a237e] text-white text-sm font-bold hover:bg-[#1a237e]/90 transition">
//                   + Add First Course
//                 </button>
//               )}
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//               {filtered.map(c => (
//                 <div key={c.id} className="hcard bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group">
//                   <div className="relative h-40 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
//                     <img src={courseApi.courseImageUrl(c.id,"card")} alt={c.courseName}
//                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                       onError={e=>{ e.target.style.display="none"; }}/>
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"/>
//                     <div className="absolute top-3 left-3"><Badge s={c.status}/></div>
//                     <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-white text-[11px] font-black"
//                       style={{background:"rgba(0,212,255,.22)",backdropFilter:"blur(6px)",border:"1px solid rgba(0,212,255,.32)"}}>
//                       {c.shortForm}
//                     </div>
//                     <div className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-lg bg-white/90 shadow p-1 overflow-hidden">
//                       <img src={courseApi.courseImageUrl(c.id,"logo")} alt=""
//                         className="w-full h-full object-contain"
//                         onError={e=>{ e.target.parentElement.style.display="none"; }}/>
//                     </div>
//                   </div>
//                   <div className="p-4">
//                     <h3 className="font-bold text-[#1a237e] text-sm c2 leading-snug mb-1">{c.courseName}</h3>
//                     <p className="text-xs text-slate-400 c2 leading-relaxed">{c.shortDesc}</p>
//                     <div className="flex gap-3 text-[11px] text-slate-300 font-semibold mt-2 mb-3">
//                       {c.courseHours && <span>⏱ {c.courseHours}h</span>}
//                       {c.intensive   && <span>· {c.intensive}</span>}
//                     </div>
//                     <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-3">
//                       <div className="grid grid-cols-2 gap-1.5">
//                         <button onClick={()=>{setSelected(c);setScreen("manage");}}
//                           className="py-2 rounded-xl text-[11px] font-bold transition"
//                           style={{background:"#1a237e0d",color:"#1a237e"}}
//                           onMouseEnter={e=>e.currentTarget.style.background="#1a237e18"}
//                           onMouseLeave={e=>e.currentTarget.style.background="#1a237e0d"}>
//                           🗂 Manage
//                         </button>
//                         <button onClick={()=>{setSelected(c);setScreen("edit");}}
//                           className="py-2 rounded-xl bg-blue-50 text-blue-600 text-[11px] font-bold hover:bg-blue-100 transition">
//                           ✏️ Edit
//                         </button>
//                       </div>

//                       {/* ── Active / Inactive toggle — FIXED URL ── */}
//                       <button
//                         onClick={() => toggleStatus(c)}
//                         className="w-full py-2 rounded-full text-[11px] font-bold transition flex items-center justify-center gap-1.5"
//                         style={c.status === "ACTIVE"
//                           ? { background:"#fef3c7", color:"#d97706", border:"1px solid #fde68a" }
//                           : { background:"#ecfdf5", color:"#059669", border:"1px solid #a7f3d0" }}
//                         onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
//                         onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
//                         {c.status === "ACTIVE"
//                           ? <><span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"/>Deactivate</>
//                           : <><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"/>Activate</>
//                         }
//                       </button>
//                     </div>
//                     <button onClick={()=>setDeleteId(c.id)}
//                       className="w-full mt-1 py-1.5 rounded-xl text-[11px] font-semibold text-slate-300 hover:text-red-400 hover:bg-red-50 transition">
//                       🗑 Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <PageScrollBtn containerRef={listRef}/>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect, useRef } from "react";
import courseApi, { BASE_HOST, API_BASE } from "../apiIntegration/Courses.api";

// ── Inject scrollbar CSS at module load time ──────────────────────────────────
if (typeof document !== "undefined") {
  const el = document.getElementById("fg-sb") || document.createElement("style");
  el.id = "fg-sb";
  el.textContent = `
    html::-webkit-scrollbar{width:7px!important}
    html::-webkit-scrollbar-track{background:#f1f5f9!important}
    html::-webkit-scrollbar-thumb{background:#94a3b8!important;border-radius:10px!important}
    html::-webkit-scrollbar-thumb:hover{background:#1a237e!important}
    body::-webkit-scrollbar{width:7px!important}
    body::-webkit-scrollbar-track{background:#f1f5f9!important}
    body::-webkit-scrollbar-thumb{background:#94a3b8!important;border-radius:10px!important}
    body::-webkit-scrollbar-thumb:hover{background:#1a237e!important}
    *::-webkit-scrollbar{width:6px;height:6px}
    *::-webkit-scrollbar-track{background:#f1f5f9}
    *::-webkit-scrollbar-thumb{background:#94a3b8;border-radius:10px}
    *::-webkit-scrollbar-thumb:hover{background:#1a237e}
    html,body{scrollbar-width:thin!important;scrollbar-color:#94a3b8 #f1f5f9!important}
    *{scrollbar-width:thin;scrollbar-color:#94a3b8 #f1f5f9}
  `;
  if (!document.getElementById("fg-sb")) document.head.appendChild(el);
}

// ── Toast ─────────────────────────────────────────────────────────────────────
const toast = (msg, type = "success") => {
  const colors = { success: "#10b981", error: "#ef4444", info: "#3b82f6" };
  const el = document.createElement("div");
  Object.assign(el.style, {
    position:"fixed", top:"20px", right:"20px", zIndex:"9999",
    padding:"12px 20px", borderRadius:"12px", color:"#fff",
    background: colors[type]||colors.success, fontWeight:"600", fontSize:"13px",
    boxShadow:"0 8px 24px rgba(0,0,0,.15)", fontFamily:"'Plus Jakarta Sans',sans-serif",
    transition:"opacity .3s",
  });
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(()=>{ el.style.opacity="0"; setTimeout(()=>el.remove(),300); }, 2800);
};

// ── Global CSS ────────────────────────────────────────────────────────────────
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
    *,*::before,*::after{box-sizing:border-box;font-family:'Plus Jakarta Sans',sans-serif}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
    @keyframes fadeInUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
    @keyframes slideInRight{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
    @keyframes slideInLeft{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
    @keyframes heroShimmer{0%,100%{opacity:.7}50%{opacity:1}}
    .spin{animation:spin .75s linear infinite}
    .bounce{animation:bounce 1.4s ease-in-out infinite}
    .fade-up{animation:fadeInUp .5s ease both}
    .slide-right{animation:slideInRight .35s cubic-bezier(.22,1,.36,1) both}
    .c2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
    .hcard{transition:transform .18s,box-shadow .18s}
    .hcard:hover{transform:translateY(-2px);box-shadow:0 12px 36px rgba(26,35,126,.10)}
    .hero-shimmer{animation:heroShimmer 3s ease-in-out infinite}

    /* scrollbars */
    *::-webkit-scrollbar{width:6px;height:6px}
    *::-webkit-scrollbar-track{background:#f1f5f9}
    *::-webkit-scrollbar-thumb{background:#94a3b8;border-radius:10px}
    *::-webkit-scrollbar-thumb:hover{background:#1a237e}
    *{scrollbar-width:thin;scrollbar-color:#94a3b8 #f1f5f9}
  `}</style>
);

// ── Atom: Status Badge ────────────────────────────────────────────────────────
const Badge = ({ s }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold
    ${s==="ACTIVE"?"bg-emerald-50 text-emerald-600":"bg-slate-100 text-slate-400"}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${s==="ACTIVE"?"bg-emerald-500":"bg-slate-300"}`}/>
    {s}
  </span>
);

// ── Atom: Confirm Dialog ──────────────────────────────────────────────────────
const Confirm = ({ open, onOk, onCancel }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel}/>
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-xs text-center">
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </div>
        <h3 className="font-bold text-slate-800 text-sm mb-1">Confirm Delete</h3>
        <p className="text-xs text-slate-400 mb-5">This will soft-delete the item. It can be restored later.</p>
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50 transition">Cancel</button>
          <button onClick={onOk}     className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition">Delete</button>
        </div>
      </div>
    </div>
  );
};

// ── Atom: Image Upload Box ────────────────────────────────────────────────────
const ImgBox = ({ label, name, preview, onChange, hint, tall=false }) => {
  const ref = useRef();
  const h = tall ? 150 : 108;
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      <div onClick={()=>ref.current.click()}
        className="relative group cursor-pointer rounded-xl overflow-hidden border-2 border-dashed border-slate-200 hover:border-[#1a237e] transition-all bg-slate-50"
        style={{height:h}}>
        {preview ? (
          <>
            <img src={preview} alt={label} className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <span className="text-white text-xs font-bold bg-black/50 px-3 py-1 rounded-lg">Change</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1.5 h-full text-slate-300 group-hover:text-[#1a237e]/50 transition">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <span className="text-xs font-semibold">{label}</span>
            {hint && <span className="text-[10px] text-slate-300 text-center px-3">{hint}</span>}
          </div>
        )}
        <input ref={ref} type="file" accept="image/*" name={name} onChange={onChange} className="hidden"/>
      </div>
    </div>
  );
};

// ── Atom: Input Field ─────────────────────────────────────────────────────────
const F = ({ label, name, value, onChange, type="text", placeholder, cls="" }) => (
  <div className={`flex flex-col gap-1.5 ${cls}`}>
    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
      className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300
        focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition"/>
  </div>
);
const TA = ({ label, name, value, onChange, rows=3, placeholder, cls="" }) => (
  <div className={`flex flex-col gap-1.5 ${cls}`}>
    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{label}</label>
    <textarea name={name} value={value} onChange={onChange} rows={rows} placeholder={placeholder}
      className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300
        focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition resize-none"/>
  </div>
);

// ── Atom: Section Block ───────────────────────────────────────────────────────
const Sec = ({ emoji, title, sub, accent="#1a237e", children }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100"
      style={{background:`linear-gradient(90deg,${accent}0b,transparent)`}}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
        style={{background:`${accent}14`}}>{emoji}</div>
      <div>
        <p className="font-bold text-slate-800 text-sm">{title}</p>
        {sub && <p className="text-[11px] text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

// ── Shared: small icon buttons ────────────────────────────────────────────────
const EditBtn = ({ onClick }) => (
  <button onClick={onClick} title="Edit"
    className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-300 hover:text-blue-500 transition">
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
    </svg>
  </button>
);
const DelBtn = ({ onClick }) => (
  <button onClick={onClick} title="Delete"
    className="p-1.5 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-400 transition">
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
    </svg>
  </button>
);
const Empty = ({ msg }) => <p className="text-center text-sm text-slate-300 py-10">{msg}</p>;

// ── Page-level scroll button ──────────────────────────────────────────────────
const PageScrollBtn = ({ containerRef }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;
    const check = () => {
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 80;
      setVisible(!atBottom && el.scrollHeight > el.clientHeight + 100);
    };
    el.addEventListener("scroll", check);
    setTimeout(check, 400);
    return () => el.removeEventListener("scroll", check);
  }, [containerRef]);

  if (!visible) return null;
  return (
    <button
      onClick={() => containerRef?.current?.scrollBy({ top: 400, behavior:"smooth" })}
      className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full text-white shadow-lg flex items-center justify-center bounce hover:opacity-90 transition"
      style={{background:"linear-gradient(135deg,#1a237e,#2836b5)"}}
      title="Scroll down">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
  );
};
const ScrollDownBtn = ({ containerRef }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;

    const isWindow = el === document.documentElement || el === document.body;

    const check = () => {
      if (isWindow) {
        const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 60;
        setVisible(!atBottom && document.documentElement.scrollHeight > window.innerHeight + 100);
      } else {
        const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 40;
        setVisible(!atBottom);
      }
    };

    const target = isWindow ? window : el;
    target.addEventListener("scroll", check);
    check();
    return () => target.removeEventListener("scroll", check);
  }, [containerRef]);

  const scrollDown = () => {
    const el = containerRef?.current;
    if (!el) return;
    const isWindow = el === document.documentElement || el === document.body;
    if (isWindow) window.scrollBy({ top: 400, behavior: "smooth" });
    else el.scrollBy({ top: 300, behavior: "smooth" });
  };

  if (!visible) return null;
  return (
    <button
      onClick={scrollDown}
      className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full text-white shadow-lg flex items-center justify-center bounce hover:opacity-90 transition"
      style={{background:"linear-gradient(135deg,#1a237e,#2836b5)"}}
      title="Scroll down">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
//  COURSE FORM  (Add / Edit)  — now includes Benefits inline management
// ══════════════════════════════════════════════════════════════════════════════
const CourseForm = ({ course, onSave, onBack }) => {
  const isEdit = !!course;
  const scrollRef = useRef();

  const [form, setForm] = useState({
    courseName:           course?.courseName || "",
    shortForm:            course?.shortForm  || "",
    shortDesc:            course?.shortDesc  || "",
    aboutTitle:           course?.aboutTitle || "",
    aboutTotalExperience: course?.aboutTotalExperience || "",
    aboutDescription:     course?.aboutDescription    || "",
    features:             Array.isArray(course?.features) ? course.features.join(", ") : (course?.features||""),
    courseDetailTitle:    course?.courseDetailTitle || "",
    courseHours:          course?.courseHours       || "",
    intensive:            course?.intensive         || "",
    status:               course?.status || "ACTIVE",
  });
  const [files, setFiles] = useState({});
  const [prev,  setPrev]  = useState({
    bannerImage: course ? courseApi.courseImageUrl(course.id, "banner") : null,
    cardImage:   course ? courseApi.courseImageUrl(course.id, "card")   : null,
    logo:        course ? courseApi.courseImageUrl(course.id, "logo")   : null,
    aboutImage:  course ? courseApi.courseImageUrl(course.id, "about")  : null,
  });
  const [saving, setSaving] = useState(false);

  // ── Benefits inline state (only relevant in edit mode) ──────────────────
  const [benefits,      setBenefits]      = useState([]);
  const [bLoading,      setBLoading]      = useState(false);
  const [showBenefitForm, setShowBF]      = useState(false);
  const [editBenefit,   setEditBenefit]   = useState(null);
  const [delBenefit,    setDelBenefit]    = useState(null);

  // benefit form local state
  const emptyBF = { title:"", description:"", sortOrder:"" };
  const [bForm, setBForm]   = useState(emptyBF);
  const [bFile, setBFile]   = useState(null);
  const [bPrev, setBPrev]   = useState(null);
  const [bSaving, setBSaving] = useState(false);

  const loadBenefits = async () => {
    if (!isEdit) return;
    setBLoading(true);
    const res = await courseApi.getBenefits(course.id);
    setBenefits(res?.data || []);
    setBLoading(false);
  };

  useEffect(() => { if (isEdit) loadBenefits(); }, []);

  const openAddBenefit = () => {
    setBForm(emptyBF); setBFile(null); setBPrev(null);
    setEditBenefit(null); setShowBF(true);
  };
  const openEditBenefit = (b) => {
    setBForm({ title: b.title||"", description: b.description||"", sortOrder: b.sortOrder||"" });
    setBFile(null);
    setBPrev(courseApi.benefitImageUrl(b.id));
    setEditBenefit(b); setShowBF(true);
  };
  const cancelBenefit = () => { setShowBF(false); setEditBenefit(null); };

  const saveBenefit = async () => {
    if (!bForm.title.trim()) { toast("Title is required","error"); return; }
    setBSaving(true);
    const res = editBenefit
      ? await courseApi.updateBenefit(editBenefit.id, bForm, bFile)
      : await courseApi.addBenefit(course.id, bForm, bFile);
    setBSaving(false);
    if (res?.success !== false) { toast(editBenefit?"Benefit updated!":"Benefit added!"); setShowBF(false); setEditBenefit(null); loadBenefits(); }
    else toast(res?.message||"Error","error");
  };

  const confirmDeleteBenefit = async () => {
    const res = await courseApi.softDeleteBenefit(delBenefit.id);
    if (res?.success !== false) toast("Benefit deleted");
    else toast(res?.message,"error");
    setDelBenefit(null); loadBenefits();
  };

  const set     = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const setFile = e => {
    const { name, files: f } = e.target;
    if (!f[0]) return;
    setFiles(p => ({ ...p, [name]: f[0] }));
    setPrev(p  => ({ ...p, [name]: URL.createObjectURL(f[0]) }));
  };

  const submit = async () => {
    if (!form.courseName.trim() || !form.shortForm.trim()) {
      toast("Course Name and Short Form are required","error"); return;
    }
    setSaving(true);
    const res = isEdit
      ? await courseApi.updateCourse(course.id, form, files)
      : await courseApi.createCourse(form, files);
    setSaving(false);
    if (res?.success !== false) { toast(isEdit ? "Course updated!" : "Course created!"); onSave(); }
    else toast(res?.message || "API error — check CORS / backend", "error");
  };

  const SaveBtn = ({ sm }) => (
    <button onClick={submit} disabled={saving}
      className={`flex items-center gap-2 ${sm?"px-4 py-2 text-xs":"px-6 py-2.5 text-sm"} rounded-xl text-white font-bold disabled:opacity-60 transition hover:opacity-90`}
      style={{background:"linear-gradient(135deg,#1a237e,#2836b5)"}}>
      {saving
        ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spin"/>
        : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
      }
      {saving ? "Saving…" : isEdit ? "Update" : "Create Course"}
    </button>
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <G/>
      <Confirm open={!!delBenefit} onOk={confirmDeleteBenefit} onCancel={()=>setDelBenefit(null)}/>

      {/* sticky top bar */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-white shrink-0">
        <button onClick={onBack}
          className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#1a237e] hover:border-[#1a237e]/30 transition">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div className="flex-1">
          <h2 className="font-extrabold text-[#1a237e] text-lg">{isEdit?"Edit Course":"Add New Course"}</h2>
          {isEdit && <p className="text-xs text-slate-400">{course.courseName}</p>}
        </div>
        <SaveBtn sm/>
      </div>

      {/* scrollable body */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-5 space-y-5 bg-slate-50">

        {/* 1 — Basic Info */}
        <Sec emoji="📋" title="Basic Information" sub="Course name, short form, and listing details">
          <div className="grid grid-cols-2 gap-4">
            <F label="Course Name *" name="courseName" value={form.courseName} onChange={set}
               placeholder="e.g. Advanced Cardiovascular Life Support" cls="col-span-2"/>
            <F label="Short Form *" name="shortForm" value={form.shortForm} onChange={set} placeholder="e.g. ACLS"/>
            <F label="Features (comma-separated)" name="features" value={form.features} onChange={set} placeholder="AHA Certified, Simulation Lab"/>
            <TA label="Short Description" name="shortDesc" value={form.shortDesc} onChange={set}
                placeholder="Brief overview shown on the courses listing…" rows={3} cls="col-span-2"/>
          </div>

          {/* ── Status Toggle (edit only) ── */}
          {isEdit && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Course Status</p>
              <div className="flex items-center gap-4 p-4 rounded-xl border-2 transition-all"
                style={{
                  borderColor: form.status === "ACTIVE" ? "#10b98130" : "#f1f5f9",
                  background:  form.status === "ACTIVE" ? "#f0fdf4" : "#f8fafc",
                }}>
                {/* Toggle switch */}
                <button type="button"
                  onClick={() => setForm(p => ({ ...p, status: p.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }))}
                  className="relative shrink-0 transition-all"
                  style={{
                    width: 48, height: 26, borderRadius: 99,
                    background: form.status === "ACTIVE" ? "#10b981" : "#cbd5e1",
                  }}>
                  <span style={{
                    position:"absolute", top: 3, borderRadius:"50%",
                    width: 20, height: 20, background: "#fff",
                    boxShadow: "0 1px 4px rgba(0,0,0,.2)",
                    transition: "left .2s",
                    left: form.status === "ACTIVE" ? 25 : 3,
                  }}/>
                </button>
                <div>
                  <p className="text-sm font-bold" style={{ color: form.status === "ACTIVE" ? "#059669" : "#94a3b8" }}>
                    {form.status === "ACTIVE" ? "Active" : "Inactive"}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {form.status === "ACTIVE"
                      ? "Course is visible to students"
                      : "Course is hidden from students"}
                  </p>
                </div>
                <span className="ml-auto text-[11px] font-bold px-3 py-1 rounded-full"
                  style={{
                    background: form.status === "ACTIVE" ? "#dcfce7" : "#f1f5f9",
                    color:      form.status === "ACTIVE" ? "#059669"  : "#94a3b8",
                  }}>
                  {form.status}
                </span>
              </div>
            </div>
          )}

          <div className="mt-5 pt-5 border-t border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
              Listing Images <span className="font-normal normal-case text-slate-300">(shown in courses grid)</span>
            </p>
            <div className="grid grid-cols-2 gap-4">
              <ImgBox label="Card Image" name="cardImage" preview={prev.cardImage} onChange={setFile} hint="600 × 400 px"/>
              <ImgBox label="Logo / Badge" name="logo" preview={prev.logo} onChange={setFile} hint="Square PNG"/>
            </div>
          </div>
        </Sec>

        {/* 2 — Hero Banner */}
        <Sec emoji="🖼️" title="Hero Banner" sub="Full-width image at top of course page" accent="#7c3aed">
          <ImgBox label="Banner Image" name="bannerImage" preview={prev.bannerImage} onChange={setFile} hint="1440 × 500 px" tall/>
        </Sec>

        {/* 3 — About */}
        <Sec emoji="ℹ️" title="About Section" sub="Content for the 'About this course' block" accent="#0891b2">
          <div className="grid grid-cols-2 gap-4">
            <F label="About Title" name="aboutTitle" value={form.aboutTitle} onChange={set}
               placeholder="e.g. Department of Health Abu Dhabi" cls="col-span-2"/>
            <F label="Years of Experience" name="aboutTotalExperience" value={form.aboutTotalExperience} onChange={set} placeholder="e.g. 3+"/>
            <div/>
            <TA label="About Description" name="aboutDescription" value={form.aboutDescription} onChange={set}
                rows={4} placeholder="In-depth description…" cls="col-span-2"/>
            <div className="col-span-2">
              <ImgBox label="About Section Image" name="aboutImage" preview={prev.aboutImage} onChange={setFile} hint="600 × 500 px — beside about text"/>
            </div>
          </div>
        </Sec>

        {/* 4 — Course Detail */}
        <Sec emoji="📚" title="Course Detail Section" sub="Overview details on course page" accent="#d97706">
          <div className="grid grid-cols-2 gap-4">
            <F label="Section Title" name="courseDetailTitle" value={form.courseDetailTitle} onChange={set}
               placeholder="e.g. Course Overview & Design" cls="col-span-2"/>
            <F label="Course Hours" name="courseHours" value={form.courseHours} onChange={set} type="number" placeholder="e.g. 16"/>
            <F label="Duration / Intensive" name="intensive" value={form.intensive} onChange={set} placeholder="e.g. 2 Days Intensive"/>
          </div>
        </Sec>

        {/* 5 — Benefits (only shown in Edit mode) */}
        {isEdit && (
          <Sec emoji="⭐" title="Benefits" sub="Manage course benefits — icons, titles, descriptions" accent="#059669">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-slate-400 font-semibold">{benefits.length} benefit{benefits.length!==1?"s":""} added</p>
              <button onClick={openAddBenefit}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition"
                style={{borderColor:"#05966928",color:"#059669",background:"#05966908"}}
                onMouseEnter={e=>e.currentTarget.style.background="#05966918"}
                onMouseLeave={e=>e.currentTarget.style.background="#05966908"}>
                + Add Benefit
              </button>
            </div>

            {/* Inline Benefit Form */}
            {showBenefitForm && (
              <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-4 space-y-3 mb-4">
                <p className="text-xs font-bold text-emerald-700">{editBenefit?"✏️ Edit":"➕ Add"} Benefit</p>
                <div className="grid grid-cols-2 gap-3">
                  <F label="Title *" name="title" value={bForm.title}
                    onChange={e=>setBForm(p=>({...p,title:e.target.value}))} cls="col-span-2"/>
                  <TA label="Description" name="description" value={bForm.description}
                    onChange={e=>setBForm(p=>({...p,description:e.target.value}))} cls="col-span-2"/>
                  <F label="Sort Order" name="sortOrder" value={bForm.sortOrder} type="number"
                    onChange={e=>setBForm(p=>({...p,sortOrder:e.target.value}))}/>
                  <div className="col-span-2">
                    <ImgBox label="Icon / Logo" name="logo" preview={bPrev}
                      onChange={e=>{ const f=e.target.files[0]; if(f){ setBFile(f); setBPrev(URL.createObjectURL(f)); }}}/>
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <button onClick={cancelBenefit} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500 text-xs font-semibold hover:bg-slate-50">Cancel</button>
                  <button onClick={saveBenefit} disabled={bSaving}
                    className="px-5 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold disabled:opacity-60">
                    {bSaving?"Saving…":editBenefit?"Update":"Add"}
                  </button>
                </div>
              </div>
            )}

            {/* Benefits List */}
            {bLoading
              ? <div className="flex justify-center py-8"><div className="w-6 h-6 border-2 border-slate-200 border-t-emerald-500 rounded-full spin"/></div>
              : benefits.length===0
                ? <Empty msg="No benefits yet — click 'Add Benefit' above."/>
                : (
                  <div className="space-y-2">
                    {benefits.map(b => (
                      <div key={b.id} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100 hover:border-slate-200 group transition">
                        <div className="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center shrink-0">
                          {b.id
                            ? <img src={courseApi.benefitImageUrl(b.id)} alt="" className="w-6 h-6 object-contain"
                                onError={e=>{ e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }}/>
                            : null
                          }
                          <span className="text-base hidden items-center justify-center">⭐</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-800">{b.title}</p>
                          <p className="text-xs text-slate-400 truncate">{b.description}</p>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                          <Badge s={b.status}/>
                          <EditBtn onClick={()=>openEditBenefit(b)}/>
                          <DelBtn onClick={()=>setDelBenefit(b)}/>
                        </div>
                      </div>
                    ))}
                  </div>
                )
            }
          </Sec>
        )}

        <div className="h-2"/>
      </div>

      {/* Scroll down button */}
      <ScrollDownBtn containerRef={scrollRef}/>

      {/* sticky bottom bar */}
      <div className="shrink-0 px-6 py-3 bg-white border-t border-slate-100 flex items-center justify-between gap-3">
        <p className="text-xs text-slate-400 hidden sm:block">
          {isEdit ? "Review your changes, then save." : "Fill all sections and create the course."}
        </p>
        <div className="flex gap-2 ml-auto">
          <button onClick={onBack}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm font-semibold hover:bg-slate-50 transition">
            Cancel
          </button>
          <SaveBtn/>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
//  MANAGE VIEW  (Sub-sections per course)
// ══════════════════════════════════════════════════════════════════════════════
const ManageView = ({ course, onBack }) => {
  const [tab, setTab]           = useState("overview");
  const [data, setData]         = useState({ overview:null, cards:[], contents:[], benefits:[], subcourses:[] });
  const [loading, setLoading]   = useState(true);
  const [showAdd, setShowAdd]   = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [delTarget, setDel]     = useState(null);
  const scrollRef               = useRef();

  const TABS = [
    { key:"overview",   label:"Overview",     emoji:"📄" },
    { key:"cards",      label:"Design Cards", emoji:"🎨" },
    { key:"contents",   label:"Contents",     emoji:"📝" },
    { key:"benefits",   label:"Benefits",     emoji:"⭐" },
    { key:"subcourses", label:"Sub Courses",  emoji:"📦" },
  ];

  const load = async () => {
    setLoading(true);
    const [full, cards, contents, benefits, subs] = await Promise.all([
      courseApi.getCourseById(course.id),
      courseApi.getDesignCards(course.id),
      courseApi.getContents(course.id),
      courseApi.getBenefits(course.id),
      courseApi.getSubCourses(course.id),
    ]);
    setData({
      overview:   full?.data?.overview || null,
      cards:      cards?.data      || [],
      contents:   contents?.data   || [],
      benefits:   benefits?.data   || [],
      subcourses: subs?.data       || [],
    });
    setLoading(false);
  };

  useEffect(() => { load(); }, [course.id]);
  const refresh = () => { load(); setShowAdd(false); setEditItem(null); };

  const doDelete = async () => {
    await fetch(delTarget.url + "?actor=admin", { method:"DELETE", mode:"cors" });
    toast("Deleted"); setDel(null); load();
  };

  // ── Overview Form ──────────────────────────────────────────────────────────
  const OverviewForm = ({ ex }) => {
    const [f, sf] = useState({
      title:               ex?.title||"",
      subTitle:            ex?.subTitle||"",
      description:         ex?.description||"",
      majorConceptHeading: ex?.majorConceptHeading||"",
      majorConcepts:       ex?.majorConcepts?.join("|")||"",
    });
    const [s, ss] = useState(false);
    const save = async () => {
      if (!f.title.trim()) { toast("Title is required","error"); return; }
      ss(true);
      const res = ex
        ? await courseApi.updateOverview(course.id, f)
        : await courseApi.saveOverview(course.id, f);
      ss(false);
      if (res?.success !== false) { toast("Overview saved!"); refresh(); }
      else toast(res?.message,"error");
    };
    return (
      <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 space-y-3 mb-3">
        <p className="text-xs font-bold text-[#1a237e]">{ex?"✏️ Edit":"➕ Add"} Overview</p>
        <div className="grid grid-cols-2 gap-3">
          <F label="Title *" name="title" value={f.title} onChange={e=>sf(p=>({...p,title:e.target.value}))}/>
          <F label="Subtitle" name="subTitle" value={f.subTitle} onChange={e=>sf(p=>({...p,subTitle:e.target.value}))}/>
          <TA label="Description" name="description" value={f.description} onChange={e=>sf(p=>({...p,description:e.target.value}))} cls="col-span-2"/>
          <F label="Concept Heading" name="majorConceptHeading" value={f.majorConceptHeading} onChange={e=>sf(p=>({...p,majorConceptHeading:e.target.value}))}/>
          <F label="Concepts (pipe-separated)" name="majorConcepts" value={f.majorConcepts} onChange={e=>sf(p=>({...p,majorConcepts:e.target.value}))} placeholder="C1|C2|C3"/>
        </div>
        <div className="flex gap-2 pt-1">
          <button onClick={()=>{setShowAdd(false);setEditItem(null);}} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500 text-xs font-semibold hover:bg-slate-50">Cancel</button>
          <button onClick={save} disabled={s} className="px-5 py-2 rounded-xl bg-[#1a237e] text-white text-xs font-bold disabled:opacity-60">{s?"Saving…":"Save"}</button>
        </div>
      </div>
    );
  };

  // ── Generic Sub-Item Form ─────────────────────────────────────────────────
  const ItemForm = ({ cfg, ex, onDone }) => {
    const buildInit = () => { const o={}; cfg.fields.forEach(fi => o[fi.name] = ex?.[fi.name]??""); return o; };
    const buildPrev = () => {
      const p={};
      cfg.imgs?.forEach(fi=>{
        p[fi.name] = ex
          ? (fi.name==="logo"
              ? (cfg.label==="Benefit" ? courseApi.benefitImageUrl(ex.id) : courseApi.designCardImageUrl(ex.id))
              : fi.name==="cardImage" ? courseApi.subCourseImageUrl(ex.id) : null)
          : null;
      });
      return p;
    };

    const [f, sf]      = useState(buildInit);
    const [imgs, sImg] = useState({});
    const [pv, spv]    = useState(buildPrev);
    const [s, ss]      = useState(false);

    // Re-sync when ex changes (e.g. user clicks edit on a different item)
    useEffect(() => { sf(buildInit()); spv(buildPrev()); sImg({}); }, [ex?.id]);

    const handleChange = e => sf(p => ({ ...p, [e.target.name]: e.target.value }));

    const save = async () => {
      ss(true);
      let res;
      if (cfg.hasFiles) {
        const imgFile = imgs[cfg.imgs?.[0]?.name] || null;
        res = ex ? await cfg.updateFn(ex.id, f, imgFile) : await cfg.addFn(f, imgFile);
      } else {
        res = ex ? await cfg.updateFn(ex.id, f) : await cfg.addFn(f);
      }
      ss(false);
      if (res?.success !== false) { toast(ex?"Updated!":"Added!"); onDone(); }
      else toast(res?.message,"error");
    };

    return (
      <div className="bg-amber-50/70 border border-amber-100 rounded-xl p-4 space-y-3 mb-3">
        <p className="text-xs font-bold text-amber-700">{ex?"✏️ Edit":"➕ Add"} {cfg.label}</p>
        <div className="grid grid-cols-2 gap-3">
          {cfg.fields.map(fi => fi.type==="textarea"
            ? <TA key={fi.name} label={fi.label} name={fi.name} value={f[fi.name]??""} onChange={handleChange} cls={fi.full?"col-span-2":""}/>
            : <F  key={fi.name} label={fi.label} name={fi.name} value={f[fi.name]??""} type={fi.type||"text"} onChange={handleChange} cls={fi.full?"col-span-2":""}/>
          )}
          {cfg.imgs?.map(fi => (
            <div key={fi.name} className={fi.full?"col-span-2":""}>
              <ImgBox label={fi.label} name={fi.name} preview={pv[fi.name]}
                onChange={e=>{ const file=e.target.files[0]; if(file){ sImg(p=>({...p,[fi.name]:file})); spv(p=>({...p,[fi.name]:URL.createObjectURL(file)})); }}}/>
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-1">
          <button onClick={()=>{setShowAdd(false);setEditItem(null);}} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500 text-xs font-semibold hover:bg-slate-50">Cancel</button>
          <button onClick={save} disabled={s} className="px-5 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold disabled:opacity-60">{s?"Saving…":ex?"Update":"Add"}</button>
        </div>
      </div>
    );
  };

  const CFG = {
    cards: {
      label:"Design Card", hasFiles:true,
      addFn:    (f,img) => courseApi.addDesignCard(course.id, f, img),
      updateFn: (id,f,img) => courseApi.updateDesignCard(id, f, img),
      deleteFn: id => courseApi.softDeleteDesignCard(id),
      fields: [
        {name:"title",       label:"Title *",     full:true},
        {name:"description", label:"Description", type:"textarea", full:true},
        {name:"sortOrder",   label:"Sort Order",  type:"number", full:true},
      ],
      imgs: [{name:"logo", label:"Icon / Logo", full:true}],
    },
    contents: {
      label:"Content Item", hasFiles:false,
      addFn:    f => courseApi.addContent(course.id, f),
      updateFn: (id,f) => courseApi.updateContent(id, f),
      deleteFn: id => courseApi.softDeleteContent(id),
      fields: [
        {name:"title",     label:"Title *",    full:true},
        {name:"sortOrder", label:"Sort Order", type:"number"},
      ],
      imgs: [],
    },
    benefits: {
      label:"Benefit", hasFiles:true,
      addFn:    (f,img) => courseApi.addBenefit(course.id, f, img),
      updateFn: (id,f,img) => courseApi.updateBenefit(id, f, img),
      deleteFn: id => courseApi.softDeleteBenefit(id),
      fields: [
        {name:"title",       label:"Title *",    full:true},
        {name:"description", label:"Description",type:"textarea",full:true},
        {name:"sortOrder",   label:"Sort Order", type:"number"},
      ],
      imgs: [{name:"logo", label:"Icon / Logo"}],
    },
    subcourses: {
      label:"Sub Course", hasFiles:true,
      addFn:    (f,img) => courseApi.addSubCourse(course.id, f, img),
      updateFn: (id,f,img) => courseApi.updateSubCourse(id, f, img),
      deleteFn: id => courseApi.softDeleteSubCourse(id),
      fields: [
        {name:"title",       label:"Title *",    full:true},
        {name:"description", label:"Description",type:"textarea",full:true},
        {name:"sortOrder",   label:"Sort Order", type:"number"},
      ],
      imgs: [{name:"cardImage", label:"Card Image", full:true}],
    },
  };

  const switchTab = key => { setTab(key); setShowAdd(false); setEditItem(null); };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <G/>
      <Confirm open={!!delTarget} onOk={doDelete} onCancel={()=>setDel(null)}/>

      {/* top bar */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-white shrink-0">
        <button onClick={onBack}
          className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#1a237e] hover:border-[#1a237e]/30 transition">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="font-extrabold text-[#1a237e] text-lg truncate">{course.courseName}</h2>
          <p className="text-xs text-slate-400">{course.shortForm} · Sub-sections</p>
        </div>
        <Badge s={course.status}/>
      </div>

      {/* course summary strip */}
      <div className="px-6 py-3 bg-white border-b border-slate-100 flex items-center gap-4 shrink-0">
        <div className="w-14 h-10 rounded-lg border border-slate-100 shrink-0 overflow-hidden bg-slate-50 flex items-center justify-center">
          <img
            src={courseApi.courseImageUrl(course.id, "card")}
            alt=""
            className="w-full h-full object-cover"
            onError={e=>{ e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }}
          />
          <span className="text-xl hidden items-center justify-center">📚</span>
        </div>
        <p className="text-xs text-slate-500 flex-1 c2">{course.shortDesc}</p>
        <div className="flex gap-2 shrink-0">
          {course.courseHours && <span className="text-[11px] bg-blue-50 text-blue-500 px-2 py-0.5 rounded-full font-bold">⏱ {course.courseHours}h</span>}
          {course.intensive   && <span className="text-[11px] bg-purple-50 text-purple-500 px-2 py-0.5 rounded-full font-bold">📅 {course.intensive}</span>}
        </div>
      </div>

      {/* tab bar */}
      <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 shrink-0">
        <div className="flex gap-1 bg-slate-200/50 p-1 rounded-xl">
          {TABS.map(t => (
            <button key={t.key} onClick={()=>switchTab(t.key)}
              className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-[11px] font-bold transition
                ${tab===t.key?"bg-white shadow-sm text-[#1a237e]":"text-slate-400 hover:text-slate-600"}`}>
              {t.emoji} <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* scrollable body */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 bg-slate-50">

        {/* add button */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-slate-500">
            {TABS.find(t=>t.key===tab)?.emoji} {TABS.find(t=>t.key===tab)?.label}
          </p>
          <button onClick={()=>{setShowAdd(true);setEditItem(null);}}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition"
            style={{borderColor:"#1a237e28",color:"#1a237e",background:"#1a237e08"}}
            onMouseEnter={e=>e.currentTarget.style.background="#1a237e14"}
            onMouseLeave={e=>e.currentTarget.style.background="#1a237e08"}>
            + {tab==="overview"?"Set Overview":"Add"}
          </button>
        </div>

        {loading && <div className="flex justify-center py-12"><div className="w-7 h-7 border-2 border-slate-200 border-t-[#1a237e] rounded-full spin"/></div>}

        {/* inline forms */}
        {!loading && showAdd && tab==="overview"  && <OverviewForm ex={data.overview}/>}
        {!loading && showAdd && tab!=="overview"  && <ItemForm key={`add-${tab}`} cfg={CFG[tab]} ex={null}     onDone={refresh}/>}
        {!loading && editItem && tab!=="overview" && <ItemForm key={`edit-${editItem?.id}`} cfg={CFG[tab]} ex={editItem} onDone={refresh}/>}

        {/* ── Overview display ── */}
        {!loading && tab==="overview" && !showAdd && (
          data.overview ? (
            <div className="bg-white rounded-xl border border-slate-100 divide-y divide-slate-50 shadow-sm">
              {[["Title",data.overview.title],["Subtitle",data.overview.subTitle],["Description",data.overview.description],["Concept Heading",data.overview.majorConceptHeading]]
                .filter(([,v])=>v)
                .map(([l,v])=>(
                  <div key={l} className="flex gap-3 px-4 py-3">
                    <span className="text-[11px] font-bold text-slate-400 uppercase w-32 shrink-0 mt-0.5">{l}</span>
                    <span className="text-sm text-slate-700 flex-1">{v}</span>
                  </div>
                ))}
              {data.overview.majorConcepts?.length>0 && (
                <div className="flex gap-3 px-4 py-3">
                  <span className="text-[11px] font-bold text-slate-400 uppercase w-32 shrink-0 mt-0.5">Concepts</span>
                  <ul className="flex-1 space-y-1">
                    {data.overview.majorConcepts.map((c,i)=>(
                      <li key={i} className="text-sm text-slate-700 flex gap-1.5"><span className="text-[#00d4ff] font-black">›</span>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="px-4 py-3">
                <button onClick={()=>setShowAdd(true)} className="text-xs font-bold text-[#1a237e]/50 hover:text-[#1a237e] transition">✏️ Edit overview</button>
              </div>
            </div>
          ) : <Empty msg="No overview yet — click 'Set Overview' above."/>
        )}

        {/* ── Design Cards ── */}
        {!loading && tab==="cards" && !showAdd && !editItem && (
          data.cards.length===0 ? <Empty msg="No design cards yet."/> :
          <div className="space-y-2">
            {data.cards.map(c=>(
              <div key={c.id} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100 hover:border-slate-200 group transition">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0 overflow-hidden"
                  style={{background:c.colorBackground||"#EEF2FF"}}>
                  <img
                    src={courseApi.designCardImageUrl(c.id)}
                    alt=""
                    className="w-6 h-6 object-contain"
                    onError={e=>{ e.target.style.display="none"; e.target.nextSibling.style.display="inline"; }}
                  />
                  <span className="hidden">🎨</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{c.title}</p>
                  <p className="text-xs text-slate-400 truncate">{c.description}</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                  <Badge s={c.status}/>
                  <EditBtn onClick={()=>{setEditItem(c);setShowAdd(false);}}/>
                  <DelBtn onClick={()=>setDel({url:`${API_BASE}/design-cards/${c.id}/soft`})}/>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Contents ── */}
        {!loading && tab==="contents" && !showAdd && !editItem && (
          data.contents.length===0 ? <Empty msg="No content items yet."/> :
          <div className="space-y-2">
            {data.contents.map((c,i)=>(
              <div key={c.id} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100 hover:border-slate-200 group transition">
                <span className="w-7 h-7 rounded-lg text-[11px] font-black text-[#1a237e] flex items-center justify-center shrink-0"
                  style={{background:"#1a237e0c"}}>{String(i+1).padStart(2,"0")}</span>
                <p className="flex-1 text-sm text-slate-700">{c.title}</p>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                  <Badge s={c.status}/>
                  <EditBtn onClick={()=>{setEditItem(c);setShowAdd(false);}}/>
                  <DelBtn onClick={()=>setDel({url:`${API_BASE}/contents/${c.id}/soft`})}/>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Benefits ── */}
        {!loading && tab==="benefits" && !showAdd && !editItem && (
          data.benefits.length===0 ? <Empty msg="No benefits yet."/> :
          <div className="space-y-2">
            {data.benefits.map(b=>(
              <div key={b.id} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100 hover:border-slate-200 group transition">
                <div className="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center shrink-0 overflow-hidden">
                  <img
                    src={courseApi.benefitImageUrl(b.id)}
                    alt=""
                    className="w-6 h-6 object-contain"
                    onError={e=>{ e.target.style.display="none"; e.target.nextSibling.style.display="inline"; }}
                  />
                  <span className="hidden">⭐</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800">{b.title}</p>
                  <p className="text-xs text-slate-400 truncate">{b.description}</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                  <Badge s={b.status}/>
                  <EditBtn onClick={()=>{setEditItem(b);setShowAdd(false);}}/>
                  <DelBtn onClick={()=>setDel({url:`${API_BASE}/benefits/${b.id}/soft`})}/>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Sub Courses ── */}
        {!loading && tab==="subcourses" && !showAdd && !editItem && (
          data.subcourses.length===0 ? <Empty msg="No sub courses yet."/> :
          <div className="grid grid-cols-2 gap-3">
            {data.subcourses.map(s=>(
              <div key={s.id} className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:border-slate-200 group transition">
                <div className="h-24 bg-slate-50 overflow-hidden">
                  <img
                    src={courseApi.subCourseImageUrl(s.id)}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={e=>{ e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }}
                  />
                  <div className="w-full h-full hidden items-center justify-center text-3xl">📦</div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-bold text-slate-800 truncate">{s.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5 c2">{s.description}</p>
                  <div className="flex gap-1.5 mt-2.5 opacity-0 group-hover:opacity-100 transition">
                    <button onClick={()=>{setEditItem(s);setShowAdd(false);}}
                      className="flex-1 py-1.5 rounded-lg text-[11px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition">Edit</button>
                    <button onClick={()=>setDel({url:`${API_BASE}/subcourses/${s.id}/soft`})}
                      className="flex-1 py-1.5 rounded-lg text-[11px] font-bold text-red-500 bg-red-50 hover:bg-red-100 transition">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scroll down button */}
      <ScrollDownBtn containerRef={scrollRef}/>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
//  HERO SECTION FORM  (slide-in drawer from right)
// ══════════════════════════════════════════════════════════════════════════════
const HeroFormDrawer = ({ open, onClose, hero, onSaved }) => {
  const STORAGE_KEY = "flygulf_hero_section";
  const empty = { tag:"AHA CERTIFIED PROGRAMS", heading:"Explore Our", headingAccent:"Training Courses", subheading:"World-class clinical, licensing, and language programs designed to launch your Gulf healthcare career.", btnPrimary:"Enroll Now →", btnSecondary:"View All Courses", bgImage:"", sectionTag:"ALL PROGRAMS", sectionHeading:"Our", sectionHeadingAccent:"Certified Courses", sectionSubtext:"Choose from AHA-certified clinical programs, Gulf licensing exams, and language proficiency courses." };

  const [form, setForm] = useState({ ...empty, ...hero });
  const [bgFile, setBgFile] = useState(null);
  const [bgPrev, setBgPrev] = useState(hero?.bgImage || "");
  const [saving, setSaving] = useState(false);
  const ref = useRef();

  useEffect(() => { setForm({ ...empty, ...hero }); setBgPrev(hero?.bgImage || ""); }, [hero]);

  const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const save = async () => {
    setSaving(true);
    let finalImg = bgPrev;
    if (bgFile) {
      // convert to dataURL for localStorage persistence
      finalImg = await new Promise(res => {
        const r = new FileReader();
        r.onload = () => res(r.result);
        r.readAsDataURL(bgFile);
      });
    }
    const saved = { ...form, bgImage: finalImg };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    setSaving(false);
    toast("Hero section saved!");
    onSaved(saved);
    onClose();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}/>
      {/* drawer */}
      <div className="relative ml-auto w-full max-w-lg bg-white h-full flex flex-col shadow-2xl slide-right">
        {/* header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 shrink-0"
          style={{background:"linear-gradient(90deg,#1a237e0b,transparent)"}}>
          <div className="w-9 h-9 rounded-xl bg-[#1a237e14] flex items-center justify-center text-lg shrink-0">🖼️</div>
          <div className="flex-1">
            <p className="font-extrabold text-[#1a237e] text-sm">Edit Hero Section</p>
            <p className="text-[11px] text-slate-400">Banner shown at top of the courses page</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#1a237e] transition">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* scrollable form body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

          {/* Background Image */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Background Image</span>
            <div onClick={()=>ref.current.click()}
              className="relative group cursor-pointer rounded-xl overflow-hidden border-2 border-dashed border-slate-200 hover:border-[#1a237e] transition-all bg-slate-50"
              style={{height:140}}>
              {bgPrev ? (
                <>
                  <img src={bgPrev} alt="hero bg" className="w-full h-full object-cover"/>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="text-white text-xs font-bold bg-black/50 px-3 py-1 rounded-lg">Change Image</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 h-full text-slate-300 group-hover:text-[#1a237e]/50 transition">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span className="text-xs font-semibold">Click to upload hero background</span>
                  <span className="text-[10px] text-slate-300">Recommended: 1440 × 500 px</span>
                </div>
              )}
              <input ref={ref} type="file" accept="image/*" className="hidden"
                onChange={e=>{ const f=e.target.files[0]; if(f){ setBgFile(f); setBgPrev(URL.createObjectURL(f)); }}}/>
            </div>
          </div>

          {/* Tag line */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Tag Line (small top text)</label>
            <input name="tag" value={form.tag} onChange={set} placeholder="e.g. AHA CERTIFIED PROGRAMS"
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition"/>
          </div>

          {/* Heading */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Heading (white)</label>
              <input name="heading" value={form.heading} onChange={set} placeholder="Explore Our"
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition"/>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Heading Accent (cyan)</label>
              <input name="headingAccent" value={form.headingAccent} onChange={set} placeholder="Training Courses"
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition"/>
            </div>
          </div>

          {/* Subheading */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Subheading</label>
            <textarea name="subheading" value={form.subheading} onChange={set} rows={3}
              placeholder="World-class clinical, licensing, and language programs…"
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition resize-none"/>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Primary Button</label>
              <input name="btnPrimary" value={form.btnPrimary} onChange={set} placeholder="Enroll Now →"
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition"/>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Secondary Button</label>
              <input name="btnSecondary" value={form.btnSecondary} onChange={set} placeholder="View All Courses"
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition"/>
            </div>
          </div>

          {/* Section divider */}
          <div className="flex items-center gap-2 pt-1">
            <div className="flex-1 h-px bg-slate-100"/>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Courses Section Title</span>
            <div className="flex-1 h-px bg-slate-100"/>
          </div>

          {/* Section tag + headings */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Section Tag (e.g. ALL PROGRAMS)</label>
            <input name="sectionTag" value={form.sectionTag||""} onChange={set} placeholder="ALL PROGRAMS"
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition"/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Section Heading (dark)</label>
              <input name="sectionHeading" value={form.sectionHeading||""} onChange={set} placeholder="Our"
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition"/>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Section Heading (cyan)</label>
              <input name="sectionHeadingAccent" value={form.sectionHeadingAccent||""} onChange={set} placeholder="Certified Courses"
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition"/>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Section Subtext</label>
            <textarea name="sectionSubtext" value={form.sectionSubtext||""} onChange={set} rows={2}
              placeholder="Choose from AHA-certified clinical programs…"
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition resize-none"/>
          </div>

          {/* Live preview strip */}
          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2 bg-slate-50 border-b border-slate-100">Live Preview</p>
            <div className="relative h-32 flex flex-col items-center justify-center text-center px-6"
              style={{ background: bgPrev ? `linear-gradient(rgba(0,0,0,.52),rgba(0,0,0,.52)), url('${bgPrev}') center/cover` : "linear-gradient(135deg,#1a237e,#0d47a1)" }}>
              {form.tag && <p className="text-[9px] font-bold tracking-[.18em] text-slate-300 mb-1">{form.tag}</p>}
              <p className="text-white font-extrabold text-base leading-tight">
                {form.heading} <span style={{color:"#00d4ff"}}>{form.headingAccent}</span>
              </p>
              {form.subheading && <p className="text-slate-300 text-[10px] mt-1 line-clamp-2">{form.subheading}</p>}
              <div className="flex gap-2 mt-2">
                {form.btnPrimary   && <span className="px-3 py-1 rounded-full text-[9px] font-bold text-white" style={{background:"#00bcd4"}}>  {form.btnPrimary}</span>}
                {form.btnSecondary && <span className="px-3 py-1 rounded-full text-[9px] font-bold text-white border border-white/40">{form.btnSecondary}</span>}
              </div>
            </div>
          </div>

        </div>

        {/* footer */}
        <div className="shrink-0 px-6 py-4 bg-white border-t border-slate-100 flex gap-2 justify-end">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm font-semibold hover:bg-slate-50 transition">Cancel</button>
          <button onClick={save} disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold disabled:opacity-60 transition hover:opacity-90"
            style={{background:"linear-gradient(135deg,#1a237e,#2836b5)"}}>
            {saving
              ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spin"/>
              : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
            }
            {saving ? "Saving…" : "Save Hero"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Hero Section Display ──────────────────────────────────────────────────────
const HeroSection = ({ hero, onEdit }) => {
  const bg = hero?.bgImage
    ? `linear-gradient(rgba(0,0,0,.50),rgba(0,0,0,.50)), url('${hero.bgImage}') center/cover no-repeat`
    : "linear-gradient(135deg,#0d1b6e 0%,#1a237e 40%,#0d47a1 100%)";

  return (
    <div className="relative overflow-hidden" style={{background:bg, minHeight:220}}>
      {/* subtle animated overlay */}
      <div className="absolute inset-0 hero-shimmer"
        style={{background:"radial-gradient(ellipse at 70% 50%, rgba(0,212,255,.08) 0%, transparent 70%)"}}/>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-14 gap-3">
        {hero?.tag && (
          <p className="fade-up text-[11px] font-bold tracking-[.22em] text-slate-300 flex items-center gap-2"
            style={{animationDelay:".05s"}}>
            <span className="w-8 h-px bg-slate-400/50 inline-block"/>
            {hero.tag}
            <span className="w-8 h-px bg-slate-400/50 inline-block"/>
          </p>
        )}
        <h1 className="fade-up text-3xl sm:text-4xl font-extrabold text-white leading-tight"
          style={{animationDelay:".12s"}}>
          {hero?.heading || "Explore Our"}{" "}
          <span style={{color:"#00d4ff"}}>{hero?.headingAccent || "Training Courses"}</span>
        </h1>
        {hero?.subheading && (
          <p className="fade-up text-sm text-slate-300 max-w-md leading-relaxed"
            style={{animationDelay:".2s"}}>
            {hero.subheading}
          </p>
        )}
        {(hero?.btnPrimary || hero?.btnSecondary) && (
          <div className="fade-up flex items-center gap-3 mt-2" style={{animationDelay:".28s"}}>
            {hero?.btnPrimary && (
              <span className="px-5 py-2 rounded-full text-sm font-bold text-white cursor-default"
                style={{background:"#00bcd4", boxShadow:"0 4px 20px rgba(0,188,212,.35)"}}>
                {hero.btnPrimary}
              </span>
            )}
            {hero?.btnSecondary && (
              <span className="px-5 py-2 rounded-full text-sm font-bold text-white cursor-default border border-white/30 backdrop-blur-sm"
                style={{background:"rgba(255,255,255,.08)"}}>
                {hero.btnSecondary}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Edit Hero button — top right */}
      <button onClick={onEdit}
        className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition"
        style={{background:"rgba(255,255,255,.15)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,.22)"}}>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
        Edit Hero
      </button>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
//  MAIN — LIST VIEW
// ══════════════════════════════════════════════════════════════════════════════
export default function CoursesAdmin() {
  const HERO_KEY = "flygulf_hero_section";
  const defaultHero = { tag:"AHA CERTIFIED PROGRAMS", heading:"Explore Our", headingAccent:"Training Courses", subheading:"World-class clinical, licensing, and language programs designed to launch your Gulf healthcare career.", btnPrimary:"Enroll Now →", btnSecondary:"View All Courses", bgImage:"", sectionTag:"ALL PROGRAMS", sectionHeading:"Our", sectionHeadingAccent:"Certified Courses", sectionSubtext:"Choose from AHA-certified clinical programs, Gulf licensing exams, and language proficiency courses." };

  const [screen,      setScreen]      = useState("list");
  const [courses,     setCourses]     = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [selected,    setSelected]    = useState(null);
  const [search,      setSearch]      = useState("");
  const [deleteId,    setDeleteId]    = useState(null);
  const [apiErr,      setApiErr]      = useState("");
  const [heroOpen,    setHeroOpen]    = useState(false);
  const [hero,        setHero]        = useState(() => {
    try { return JSON.parse(localStorage.getItem(HERO_KEY)) || defaultHero; } catch { return defaultHero; }
  });
  const listRef = useRef();

  const load = async () => {
    setLoading(true); setApiErr("");
    const res = await courseApi.getAllCourses();
    if (res?.success === false) {
      setApiErr(res.message || "Cannot reach backend. Check server + CORS.");
      setCourses([]);
    } else {
      setCourses((res?.data || []).filter(c => !c.deleted));
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = courses.filter(c =>
    c.courseName?.toLowerCase().includes(search.toLowerCase()) ||
    c.shortForm?.toLowerCase().includes(search.toLowerCase())
  );

  const doDelete = async () => {
    const res = await courseApi.softDeleteCourse(deleteId);
    if (res?.success !== false) toast("Course deleted");
    else toast(res?.message,"error");
    setDeleteId(null); load();
  };

  const toggleStatus = async (c) => {
    const isActive = c.status === "ACTIVE";
    const newStatus = isActive ? "INACTIVE" : "ACTIVE";
    // Optimistically update badge immediately
    setCourses(prev => prev.map(x =>
      x.id === c.id ? { ...x, status: newStatus } : x
    ));
    try {
      await fetch(`${API_BASE}/${c.id}/toggle-status?updatedBy=admin`, {
        method: "PATCH",
        mode: "cors",
        headers: { Accept: "application/json" },
      });
      toast(isActive ? "Course deactivated" : "Course activated", isActive ? "info" : "success");
      load();
    } catch {
      // Revert on error
      setCourses(prev => prev.map(x =>
        x.id === c.id ? { ...x, status: c.status } : x
      ));
      toast("Network error", "error");
    }
  };

  // sub-screens
  const wrap = "fixed inset-0 z-50 bg-slate-50 flex flex-col";
  if (screen==="add")
    return <div className={wrap}><G/><CourseForm onSave={()=>{load();setScreen("list");}} onBack={()=>setScreen("list")}/></div>;
  if (screen==="edit" && selected)
    return <div className={wrap}><G/><CourseForm course={selected} onSave={()=>{load();setScreen("list");}} onBack={()=>setScreen("list")}/></div>;
  if (screen==="manage" && selected)
    return <div className={wrap}><G/><ManageView course={selected} onBack={()=>setScreen("list")}/></div>;

  return (
    <div style={{display:"flex", flexDirection:"column", height:"100vh", overflow:"hidden", background:"#f8fafc"}}>
      <G/>
      <Confirm open={!!deleteId} onOk={doDelete} onCancel={()=>setDeleteId(null)}/>
      <HeroFormDrawer open={heroOpen} onClose={()=>setHeroOpen(false)} hero={hero} onSaved={setHero}/>

      {/* ── Sticky Header ── */}
      <div style={{flexShrink:0}} className="bg-white border-b border-slate-100 shadow-sm z-10">
        <div className="w-full px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-slate-800">Courses Management</h1>
            <p className="text-sm text-slate-400 mt-0.5">Manage your training courses and programs</p>
          </div>
          <button onClick={()=>setScreen("add")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white shadow-md hover:opacity-90 active:scale-95 transition-all shrink-0"
            style={{background:"linear-gradient(135deg,#1a237e,#2836b5)"}}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/></svg>
            Add Course
          </button>
        </div>
      </div>

      {/* ── Scrollable content area ── */}
      <div
        id="courses-main-scroll"
        ref={listRef}
        style={{
          flex:1,
          overflowY:"scroll",
          overflowX:"hidden",
          scrollbarWidth:"thin",
          scrollbarColor:"#94a3b8 #f1f5f9",
        }}
      >
        <style>{`
          #courses-main-scroll::-webkit-scrollbar{width:7px}
          #courses-main-scroll::-webkit-scrollbar-track{background:#f1f5f9}
          #courses-main-scroll::-webkit-scrollbar-thumb{background:#94a3b8;border-radius:10px}
          #courses-main-scroll::-webkit-scrollbar-thumb:hover{background:#1a237e}
        `}</style>

        {/* ── Hero Section ── */}
        <HeroSection hero={hero} onEdit={()=>setHeroOpen(true)}/>

        {/* ── Courses section title ── */}
        {(hero?.sectionTag || hero?.sectionHeading || hero?.sectionHeadingAccent) && (
          <div className="bg-slate-50 pt-8 pb-2 text-center">
            {hero?.sectionTag && (
              <p className="text-[10px] font-bold tracking-[.2em] text-[#00bcd4] uppercase mb-2 flex items-center justify-center gap-2">
                <span className="w-8 h-px bg-[#00bcd4]/40 inline-block"/>{hero.sectionTag}<span className="w-8 h-px bg-[#00bcd4]/40 inline-block"/>
              </p>
            )}
            {(hero?.sectionHeading || hero?.sectionHeadingAccent) && (
              <h2 className="text-2xl font-extrabold" style={{color:"#1a237e"}}>
                {hero.sectionHeading} <span style={{color:"#00bcd4"}}>{hero.sectionHeadingAccent}</span>
              </h2>
            )}
            {hero?.sectionSubtext && (
              <p className="text-sm text-slate-400 mt-1 max-w-lg mx-auto px-4">{hero.sectionSubtext}</p>
            )}
          </div>
        )}

        {/* ── Search bar ── */}
        <div className="w-full px-6 pt-5 pb-4 flex items-center gap-3">
          <div className="relative w-72">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search courses…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 placeholder-slate-300 shadow-sm focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/10 transition"/>
          </div>
          <span className="text-xs text-slate-400 font-semibold">{filtered.length} course{filtered.length!==1?"s":""}</span>
        </div>

        {/* ── API Error Banner ── */}
        {apiErr && (
          <div className="mx-6 mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2">
            <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div className="flex-1">
              <p className="text-sm font-bold text-red-600">API Error</p>
              <p className="text-xs text-red-400 mt-0.5">{apiErr}</p>
              <p className="text-xs text-red-400 mt-1">
                Make sure your Spring Boot server is running at <code className="bg-red-100 px-1 rounded">{BASE_HOST}</code> and CORS is enabled.
              </p>
            </div>
            <button onClick={load} className="text-xs font-bold text-red-500 hover:underline shrink-0">Retry</button>
          </div>
        )}

        {/* ── Course Grid ── */}
        <div className="w-full px-6 pb-16">
          {loading ? (
            <div className="flex flex-col items-center py-24 gap-3">
              <div className="w-9 h-9 border-2 border-slate-200 border-t-[#1a237e] rounded-full spin"/>
              <p className="text-sm text-slate-400 font-semibold">Loading courses…</p>
            </div>
          ) : filtered.length===0 ? (
            <div className="flex flex-col items-center py-24 gap-3">
              <div className="w-16 h-16 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center text-4xl">📚</div>
              <p className="text-slate-400 font-semibold text-sm">{search?"No matching courses":"No courses yet"}</p>
              {!search && (
                <button onClick={()=>setScreen("add")}
                  className="mt-1 px-5 py-2.5 rounded-xl bg-[#1a237e] text-white text-sm font-bold hover:bg-[#1a237e]/90 transition">
                  + Add First Course
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(c => (
                <div key={c.id} className="hcard bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group">
                  <div className="relative h-40 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
                    <img src={courseApi.courseImageUrl(c.id,"card")} alt={c.courseName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={e=>{ e.target.style.display="none"; }}/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"/>
                    <div className="absolute top-3 left-3"><Badge s={c.status}/></div>
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-white text-[11px] font-black"
                      style={{background:"rgba(0,212,255,.22)",backdropFilter:"blur(6px)",border:"1px solid rgba(0,212,255,.32)"}}>
                      {c.shortForm}
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-lg bg-white/90 shadow p-1 overflow-hidden">
                      <img src={courseApi.courseImageUrl(c.id,"logo")} alt=""
                        className="w-full h-full object-contain"
                        onError={e=>{ e.target.parentElement.style.display="none"; }}/>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#1a237e] text-sm c2 leading-snug mb-1">{c.courseName}</h3>
                    <p className="text-xs text-slate-400 c2 leading-relaxed">{c.shortDesc}</p>
                    <div className="flex gap-3 text-[11px] text-slate-300 font-semibold mt-2 mb-3">
                      {c.courseHours && <span>⏱ {c.courseHours}h</span>}
                      {c.intensive   && <span>· {c.intensive}</span>}
                    </div>
                    <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-3">
                      {/* Manage + Edit row */}
                      <div className="grid grid-cols-2 gap-1.5">
                        <button onClick={()=>{setSelected(c);setScreen("manage");}}
                          className="py-2 rounded-xl text-[11px] font-bold transition"
                          style={{background:"#1a237e0d",color:"#1a237e"}}
                          onMouseEnter={e=>e.currentTarget.style.background="#1a237e18"}
                          onMouseLeave={e=>e.currentTarget.style.background="#1a237e0d"}>
                          🗂 Manage
                        </button>
                        <button onClick={()=>{setSelected(c);setScreen("edit");}}
                          className="py-2 rounded-xl bg-blue-50 text-blue-600 text-[11px] font-bold hover:bg-blue-100 transition">
                          ✏️ Edit
                        </button>
                      </div>

                      {/* Status toggle */}
                      <button
                        onClick={() => toggleStatus(c)}
                        className="w-full py-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1.5"
                        style={c.status === "ACTIVE"
                          ? { background:"#fef3c7", color:"#d97706", border:"1px solid #fde68a" }
                          : { background:"#f0fdf4", color:"#059669", border:"1px solid #bbf7d0" }}
                        onMouseEnter={e => e.currentTarget.style.opacity="0.75"}
                        onMouseLeave={e => e.currentTarget.style.opacity="1"}>
                        <span className="w-1.5 h-1.5 rounded-full inline-block"
                          style={{ background: c.status === "ACTIVE" ? "#f59e0b" : "#10b981" }}/>
                        {c.status === "ACTIVE" ? "Deactivate" : "Activate"}
                      </button>
                    </div>
                    <button onClick={()=>setDeleteId(c.id)}
                      className="w-full mt-1 py-1.5 rounded-xl text-[11px] font-semibold text-slate-300 hover:text-red-400 hover:bg-red-50 transition">
                      🗑 Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <PageScrollBtn containerRef={listRef}/>
      </div>
    </div>
  );
}