// import { useState, useEffect, useCallback } from "react";
// import { getCenters } from "../apiIntegration/centerAddress.api";



// // ─── API Layer ────────────────────────────────────────────────────────────────
// const http = {
//   get: (u) => fetch(u).then(r => r.json()).catch(() => ({ status: "ERROR" })),
//   post: (u, b) => fetch(u, { method: "POST", body: b }).then(r => r.json()).catch(() => ({ status: "ERROR" })),
//   put: (u, b) => fetch(u, { method: "PUT", body: b }).then(r => r.json()).catch(() => ({ status: "ERROR" })),
//   patch: (u) => fetch(u, { method: "PATCH" }).then(r => r.json()).catch(() => ({ status: "ERROR" })),
//   del: (u) => fetch(u, { method: "DELETE" }).then(r => r.json()).catch(() => ({ status: "ERROR" })),
// };
// const fd = (fields = {}, files = {}) => {
//   const f = new FormData();
//   Object.entries(fields).forEach(([k, v]) => { if (v !== undefined && v !== null && v !== "") f.append(k, v); });
//   Object.entries(files).forEach(([k, v]) => { if (v) f.append(k, v); });
//   return f;
// };



// // ─── Toast ────────────────────────────────────────────────────────────────────
// function useToast() {
//   const [toasts, setToasts] = useState([]);
//   const push = (msg, type = "success") => {
//     const id = Date.now();
//     setToasts(p => [...p, { id, msg, type }]);
//     setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3000);
//   };
//   return { toasts, ok: m => push(m, "success"), err: m => push(m, "error"), info: m => push(m, "info") };
// }

// function Toaster({ toasts }) {
//   const colors = { success: "from-emerald-500 to-teal-500", error: "from-red-500 to-rose-500", info: "from-blue-500 to-indigo-500" };
//   const icons = { success: "✓", error: "✗", info: "i" };
//   return (
//     <div className="fixed top-5 right-5 z-[999] flex flex-col gap-2">
//       {toasts.map(t => (
//         <div key={t.id} className={`flex items-center gap-3 pl-4 pr-5 py-3 rounded-2xl bg-gradient-to-r ${colors[t.type]} text-white text-sm font-semibold shadow-2xl`}
//           style={{ animation: "slideIn 0.3s ease" }}>
//           <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">{icons[t.type]}</span>
//           {t.msg}
//         </div>
//       ))}
//     </div>
//   );
// }

// // ─── Modal ────────────────────────────────────────────────────────────────────
// function Modal({ open, onClose, title, children, size = "md" }) {
//   if (!open) return null;
//   const sizes = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-3xl", xl: "max-w-5xl" };
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(10,15,40,0.7)", backdropFilter: "blur(6px)" }}>
//       <div className={`bg-white rounded-3xl shadow-2xl w-full ${sizes[size]} max-h-[90vh] overflow-y-auto`} style={{ animation: "popIn 0.25s ease" }}>
//         <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-7 py-5 border-b border-slate-100 rounded-t-3xl">
//           <h3 className="text-lg font-black text-slate-800 tracking-tight">{title}</h3>
//           <button onClick={onClose} className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 text-xl font-bold transition">×</button>
//         </div>
//         <div className="p-7">{children}</div>
//       </div>
//     </div>
//   );
// }

// // ─── Confirm ─────────────────────────────────────────────────────────────────
// function Confirm({ open, msg, onOk, onCancel }) {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-[60] flex items-center justify-center" style={{ background: "rgba(10,15,40,0.75)", backdropFilter: "blur(8px)" }}>
//       <div className="bg-white rounded-3xl p-10 text-center max-w-sm w-full mx-4 shadow-2xl" style={{ animation: "popIn 0.2s ease" }}>
//         <div className="text-6xl mb-5">⚠️</div>
//         <p className="text-slate-700 font-semibold mb-8 leading-relaxed">{msg}</p>
//         <div className="flex gap-3">
//           <button onClick={onCancel} className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition">Cancel</button>
//           <button onClick={onOk} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold hover:opacity-90 transition shadow-lg">Delete</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Form Components ──────────────────────────────────────────────────────────
// const inputCls = "w-full border-2 border-slate-100 bg-slate-50 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-indigo-400 focus:bg-white transition font-medium placeholder:text-slate-300";
// const textareaCls = `${inputCls} resize-none`;

// function FLabel({ label, req, children }) {
//   return (
//     <div className="space-y-1.5">
//       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex gap-1">
//         {label}{req && <span className="text-rose-400">*</span>}
//       </label>
//       {children}
//     </div>
//   );
// }

// function FileUpload({ label, name, onChange, current }) {
//   return (
//     <FLabel label={label}>
//       <div className="border-2 border-dashed border-slate-200 rounded-xl p-3 hover:border-indigo-300 transition">
//         <input type="file" accept="image/*" className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 transition" onChange={e => onChange(name, e.target.files[0])} />
//         {current && <img src={current} alt="current" className="mt-2 h-16 w-auto rounded-lg object-cover border border-slate-200" />}
//       </div>
//     </FLabel>
//   );
// }

// // ─── Status Badge ─────────────────────────────────────────────────────────────
// function StatusBadge({ status, deleted }) {
//   if (deleted) return <span className="text-[10px] px-2.5 py-1 rounded-full font-black bg-red-100 text-red-500 uppercase tracking-wide">Archived</span>;
//   return status === "ACTIVE"
//     ? <span className="text-[10px] px-2.5 py-1 rounded-full font-black bg-emerald-100 text-emerald-600 uppercase tracking-wide">Active</span>
//     : <span className="text-[10px] px-2.5 py-1 rounded-full font-black bg-slate-100 text-slate-400 uppercase tracking-wide">Inactive</span>;
// }

// // ─── Section Header ───────────────────────────────────────────────────────────
// function SectionHeader({ icon, title, subtitle, color, onAdd, addLabel }) {
//   return (
//     <div className="flex items-center justify-between mb-5">
//       <div className="flex items-center gap-3">
//         <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-lg ${color}`}>{icon}</div>
//         <div>
//           <h3 className="font-black text-slate-800 text-base tracking-tight">{title}</h3>
//           {subtitle && <p className="text-xs text-slate-400 font-medium mt-0.5">{subtitle}</p>}
//         </div>
//       </div>
//       {onAdd && (
//         <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold shadow-lg hover:opacity-90 transition">
//           <span className="text-base">+</span> {addLabel || "Add"}
//         </button>
//       )}
//     </div>
//   );
// }

// // ═══════════════════════════════════════════════════════════════════
// //  OVERVIEW SECTION
// // ═══════════════════════════════════════════════════════════════════
// function OverviewSection({ courseId, data, onRefresh, toast }) {
//   const [modal, setModal] = useState(false);
//   const [form, setForm] = useState({});
//   const [saving, setSaving] = useState(false);

//   const openModal = () => {
//     setForm({ title: data?.title || "", subTitle: data?.subTitle || "", description: data?.description || "", majorConceptHeading: data?.majorConceptHeading || "", majorConcepts: data?.majorConcepts?.join("|") || "" });
//     setModal(true);
//   };

//   const save = async () => {
//     setSaving(true);
//     const res = await (data ? http.put : http.post)(`${API}/${courseId}/overview`, fd({ ...form, actor: "admin" }));
//     setSaving(false);
//     if (res.status === "OK") { toast.ok("Overview saved!"); setModal(false); onRefresh(); }
//     else toast.err("Failed to save overview.");
//   };

//   return (
//     <div className="bg-white rounded-3xl border-2 border-violet-100 shadow-sm overflow-hidden">
//       <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-4 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <span className="text-2xl">📖</span>
//           <div><h3 className="font-black text-white text-base">Course Overview</h3><p className="text-violet-200 text-xs">Description & major concepts</p></div>
//         </div>
//         <button onClick={openModal} className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition">
//           {data ? "✏️ Edit" : "+ Add Overview"}
//         </button>
//       </div>
//       <div className="p-6">
//         {data ? (
//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-violet-50 rounded-2xl p-4">
//                 <p className="text-[10px] font-black text-violet-400 uppercase tracking-widest mb-1">Title</p>
//                 <p className="text-sm font-bold text-slate-800">{data.title || "—"}</p>
//               </div>
//               <div className="bg-purple-50 rounded-2xl p-4">
//                 <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">Subtitle</p>
//                 <p className="text-sm font-bold text-slate-800">{data.subTitle || "—"}</p>
//               </div>
//             </div>
//             <div className="bg-slate-50 rounded-2xl p-4">
//               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Description</p>
//               <p className="text-sm text-slate-600 leading-relaxed">{data.description || "—"}</p>
//             </div>
//             {data.majorConcepts?.length > 0 && (
//               <div>
//                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{data.majorConceptHeading || "Major Concepts"}</p>
//                 <div className="space-y-2">
//                   {data.majorConcepts.map((c, i) => (
//                     <div key={i} className="flex items-start gap-3 p-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl">
//                       <span className="w-6 h-6 rounded-lg bg-violet-500 text-white text-xs font-black flex items-center justify-center flex-shrink-0">{i + 1}</span>
//                       <p className="text-sm text-slate-700 font-medium">{c}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="text-center py-10">
//             <div className="text-5xl mb-3">📝</div>
//             <p className="text-slate-400 font-semibold text-sm">No overview added yet</p>
//             <button onClick={openModal} className="mt-4 px-5 py-2.5 rounded-xl bg-violet-500 text-white text-sm font-bold hover:bg-violet-600 transition">Add Overview</button>
//           </div>
//         )}
//       </div>
//       <Modal open={modal} onClose={() => setModal(false)} title="Course Overview" size="md">
//         <div className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <FLabel label="Title" req><input className={inputCls} value={form.title || ""} onChange={e => setForm({ ...form, title: e.target.value })} /></FLabel>
//             <FLabel label="Subtitle"><input className={inputCls} value={form.subTitle || ""} onChange={e => setForm({ ...form, subTitle: e.target.value })} /></FLabel>
//           </div>
//           <FLabel label="Description"><textarea rows={3} className={textareaCls} value={form.description || ""} onChange={e => setForm({ ...form, description: e.target.value })} /></FLabel>
//           <FLabel label="Major Concept Heading"><input className={inputCls} value={form.majorConceptHeading || ""} onChange={e => setForm({ ...form, majorConceptHeading: e.target.value })} /></FLabel>
//           <FLabel label="Major Concepts (pipe-separated: c1|c2|c3)"><textarea rows={3} className={textareaCls} placeholder="Concept 1|Concept 2|Concept 3" value={form.majorConcepts || ""} onChange={e => setForm({ ...form, majorConcepts: e.target.value })} /></FLabel>
//           <button onClick={save} disabled={saving} className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-black text-sm hover:opacity-90 transition disabled:opacity-50 shadow-lg">
//             {saving ? "Saving..." : "Save Overview"}
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// // ═══════════════════════════════════════════════════════════════════
// //  DESIGN CARDS SECTION
// // ═══════════════════════════════════════════════════════════════════
// function DesignCardsSection({ courseId, cards = [], onRefresh, toast }) {
//   const [modal, setModal] = useState(null);
//   const [form, setForm] = useState({});
//   const [file, setFile] = useState(null);
//   const [saving, setSaving] = useState(false);
//   const [confirm, setConfirm] = useState(null);

//   const openAdd = () => { setForm({ title: "", description: "", colorBackground: "#EFF6FF", sortOrder: "" }); setFile(null); setModal("add"); };
//   const openEdit = (c) => { setForm({ title: c.title, description: c.description || "", colorBackground: c.colorBackground || "#EFF6FF", sortOrder: c.sortOrder || "" }); setFile(null); setModal({ type: "edit", id: c.id, current: c.logo }); };

//   const save = async () => {
//     setSaving(true);
//     const res = modal === "add"
//       ? await http.post(`${API}/${courseId}/design-cards`, fd({ ...form, actor: "admin" }, { logo: file }))
//       : await http.put(`${API}/design-cards/${modal.id}`, fd({ ...form, actor: "admin" }, { logo: file }));
//     setSaving(false);
//     if (res.status === "OK") { toast.ok(modal === "add" ? "Card added!" : "Card updated!"); setModal(null); onRefresh(); }
//     else toast.err("Failed to save card.");
//   };

//   const del = async (id) => {
//     await http.del(`${API}/design-cards/${id}/soft?actor=admin`);
//     toast.ok("Card deleted"); setConfirm(null); onRefresh();
//   };

//   const colors = ["#EFF6FF", "#F0FDF4", "#FFF7ED", "#FDF4FF", "#FFFBEB", "#F0F9FF"];

//   return (
//     <div className="bg-white rounded-3xl border-2 border-blue-100 shadow-sm overflow-hidden">
//       <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <span className="text-2xl">🃏</span>
//           <div><h3 className="font-black text-white text-base">Design Cards</h3><p className="text-blue-100 text-xs">{cards.length} cards configured</p></div>
//         </div>
//         <button onClick={openAdd} className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition">+ Add Card</button>
//       </div>
//       <div className="p-6">
//         {cards.length > 0 ? (
//           <div className="grid grid-cols-2 gap-3">
//             {cards.map(card => (
//               <div key={card.id} className="relative rounded-2xl p-4 border-2 border-slate-100 hover:border-blue-200 transition group" style={{ backgroundColor: card.colorBackground || "#F8FAFF" }}>
//                 <div className="flex items-start justify-between mb-2">
//                   <div className="flex items-center gap-2">
//                     {card.logo ? <img src={card.logo} alt="" className="w-8 h-8 rounded-lg object-cover" /> : <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 text-sm">🎯</div>}
//                     <div>
//                       <p className="text-xs font-black text-slate-700">#{card.sortOrder || "—"}</p>
//                       <StatusBadge status={card.status} />
//                     </div>
//                   </div>
//                   <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
//                     <button onClick={() => openEdit(card)} className="px-2.5 py-1 bg-white rounded-lg text-blue-600 text-xs font-bold shadow hover:shadow-md transition">Edit</button>
//                     <button onClick={() => setConfirm(card.id)} className="px-2.5 py-1 bg-white rounded-lg text-red-500 text-xs font-bold shadow hover:shadow-md transition">Del</button>
//                   </div>
//                 </div>
//                 <p className="text-sm font-black text-slate-800 mb-1">{card.title}</p>
//                 <p className="text-xs text-slate-500 line-clamp-2">{card.description}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-10">
//             <div className="text-5xl mb-3">🃏</div>
//             <p className="text-slate-400 font-semibold text-sm">No design cards yet</p>
//           </div>
//         )}
//       </div>
//       <Modal open={!!modal} onClose={() => setModal(null)} title={modal === "add" ? "Add Design Card" : "Edit Design Card"}>
//         <div className="space-y-4">
//           <FLabel label="Title" req><input className={inputCls} value={form.title || ""} onChange={e => setForm({ ...form, title: e.target.value })} /></FLabel>
//           <FLabel label="Description"><textarea rows={2} className={textareaCls} value={form.description || ""} onChange={e => setForm({ ...form, description: e.target.value })} /></FLabel>
//           <FLabel label="Background Color">
//             <div className="flex gap-2 flex-wrap">
//               {colors.map(c => (
//                 <button key={c} onClick={() => setForm({ ...form, colorBackground: c })} className={`w-8 h-8 rounded-lg border-2 transition ${form.colorBackground === c ? "border-indigo-500 scale-110" : "border-transparent hover:scale-105"}`} style={{ backgroundColor: c }} />
//               ))}
//               <input type="color" className="w-8 h-8 rounded-lg border-2 border-slate-200 cursor-pointer" value={form.colorBackground || "#EFF6FF"} onChange={e => setForm({ ...form, colorBackground: e.target.value })} />
//             </div>
//           </FLabel>
//           <FLabel label="Sort Order"><input type="number" className={inputCls} value={form.sortOrder || ""} onChange={e => setForm({ ...form, sortOrder: e.target.value })} /></FLabel>
//           <FileUpload label="Logo Image" name="logo" onChange={(n, f) => setFile(f)} current={modal?.current} />
//           <button onClick={save} disabled={saving} className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-black text-sm hover:opacity-90 transition disabled:opacity-50 shadow-lg">{saving ? "Saving..." : "Save Card"}</button>
//         </div>
//       </Modal>
//       <Confirm open={!!confirm} msg="Delete this design card?" onOk={() => del(confirm)} onCancel={() => setConfirm(null)} />
//     </div>
//   );
// }

// // ═══════════════════════════════════════════════════════════════════
// //  CONTENTS SECTION
// // ═══════════════════════════════════════════════════════════════════
// function ContentsSection({ courseId, contents = [], onRefresh, toast }) {
//   const [modal, setModal] = useState(null);
//   const [form, setForm] = useState({ title: "", sortOrder: "" });
//   const [saving, setSaving] = useState(false);
//   const [confirm, setConfirm] = useState(null);

//   const openAdd = () => { setForm({ title: "", sortOrder: "" }); setModal("add"); };
//   const openEdit = (c) => { setForm({ title: c.title, sortOrder: c.sortOrder || "" }); setModal({ type: "edit", id: c.id }); };

//   const save = async () => {
//     setSaving(true);
//     await (modal === "add" ? http.post(`${API}/${courseId}/contents`, fd({ ...form, actor: "admin" })) : http.put(`${API}/contents/${modal.id}`, fd({ ...form, actor: "admin" })));
//     setSaving(false);
//     if (res.status === "OK") { toast.ok("Content saved!"); setModal(null); onRefresh(); }
//     else toast.err("Failed to save content.");
//   };

//   const del = async (id) => {
//     await http.del(`${API}/contents/${id}/soft?actor=admin`);
//     toast.ok("Content deleted"); setConfirm(null); onRefresh();
//   };

//   return (
//     <div className="bg-white rounded-3xl border-2 border-emerald-100 shadow-sm overflow-hidden">
//       <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <span className="text-2xl">📚</span>
//           <div><h3 className="font-black text-white text-base">Course Contents</h3><p className="text-emerald-100 text-xs">{contents.length} topics listed</p></div>
//         </div>
//         <button onClick={openAdd} className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition">+ Add Content</button>
//       </div>
//       <div className="p-6">
//         {contents.length > 0 ? (
//           <div className="space-y-2">
//             {contents.map((c, i) => (
//               <div key={c.id} className="flex items-center gap-3 p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 group hover:border-emerald-300 transition">
//                 <span className="w-7 h-7 rounded-xl bg-emerald-500 text-white text-xs font-black flex items-center justify-center flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
//                 <p className="flex-1 text-sm font-semibold text-slate-800">{c.title}</p>
//                 <StatusBadge status={c.status} />
//                 <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition">
//                   <button onClick={() => openEdit(c)} className="px-2.5 py-1 bg-white rounded-lg text-emerald-600 text-xs font-bold shadow hover:shadow-md">Edit</button>
//                   <button onClick={() => setConfirm(c.id)} className="px-2.5 py-1 bg-white rounded-lg text-red-500 text-xs font-bold shadow hover:shadow-md">Del</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-10">
//             <div className="text-5xl mb-3">📚</div>
//             <p className="text-slate-400 font-semibold text-sm">No contents yet</p>
//           </div>
//         )}
//       </div>
//       <Modal open={!!modal} onClose={() => setModal(null)} title={modal === "add" ? "Add Content" : "Edit Content"} size="sm">
//         <div className="space-y-4">
//           <FLabel label="Topic Title" req><input className={inputCls} placeholder="e.g. Science of Resuscitation" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></FLabel>
//           <FLabel label="Sort Order"><input type="number" className={inputCls} value={form.sortOrder} onChange={e => setForm({ ...form, sortOrder: e.target.value })} /></FLabel>
//           <button onClick={save} disabled={saving} className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-sm hover:opacity-90 transition disabled:opacity-50 shadow-lg">{saving ? "Saving..." : "Save Content"}</button>
//         </div>
//       </Modal>
//       <Confirm open={!!confirm} msg="Delete this content?" onOk={() => del(confirm)} onCancel={() => setConfirm(null)} />
//     </div>
//   );
// }

// // ═══════════════════════════════════════════════════════════════════
// //  BENEFITS SECTION
// // ═══════════════════════════════════════════════════════════════════
// function BenefitsSection({ courseId, benefits = [], onRefresh, toast }) {
//   const [modal, setModal] = useState(null);
//   const [form, setForm] = useState({});
//   const [file, setFile] = useState(null);
//   const [saving, setSaving] = useState(false);
//   const [confirm, setConfirm] = useState(null);

//   const benefitColors = ["bg-amber-50 border-amber-200", "bg-rose-50 border-rose-200", "bg-indigo-50 border-indigo-200", "bg-cyan-50 border-cyan-200", "bg-lime-50 border-lime-200", "bg-fuchsia-50 border-fuchsia-200"];
//   const iconColors = ["bg-amber-400", "bg-rose-400", "bg-indigo-400", "bg-cyan-400", "bg-lime-400", "bg-fuchsia-400"];

//   const openAdd = () => { setForm({ title: "", description: "", sortOrder: "" }); setFile(null); setModal("add"); };
//   const openEdit = (b) => { setForm({ title: b.title, description: b.description || "", sortOrder: b.sortOrder || "" }); setFile(null); setModal({ type: "edit", id: b.id, current: b.logo }); };

//   const save = async () => {
//     setSaving(true);
//     await (modal === "add" ? http.post(`${API}/${courseId}/benefits`, fd({ ...form, actor: "admin" }, { logo: file })) : http.put(`${API}/benefits/${modal.id}`, fd({ ...form, actor: "admin" }, { logo: file })));
//     setSaving(false);
//     if (res.status === "OK") { toast.ok("Benefit saved!"); setModal(null); onRefresh(); }
//     else toast.err("Failed to save benefit.");
//   };

//   const del = async (id) => {
//     await http.del(`${API}/benefits/${id}/soft?actor=admin`);
//     toast.ok("Benefit deleted"); setConfirm(null); onRefresh();
//   };

//   return (
//     <div className="bg-white rounded-3xl border-2 border-amber-100 shadow-sm overflow-hidden">
//       <div className="bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-4 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <span className="text-2xl">⭐</span>
//           <div><h3 className="font-black text-white text-base">Benefits</h3><p className="text-amber-100 text-xs">{benefits.length} benefits listed</p></div>
//         </div>
//         <button onClick={openAdd} className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition">+ Add Benefit</button>
//       </div>
//       <div className="p-6">
//         {benefits.length > 0 ? (
//           <div className="grid grid-cols-2 gap-3">
//             {benefits.map((b, i) => (
//               <div key={b.id} className={`relative p-4 rounded-2xl border-2 group hover:shadow-md transition ${benefitColors[i % benefitColors.length]}`}>
//                 <div className="flex items-start justify-between mb-3">
//                   <div className={`w-10 h-10 rounded-xl ${iconColors[i % iconColors.length]} flex items-center justify-center text-white text-lg shadow-md`}>
//                     {b.logo ? <img src={b.logo} alt="" className="w-full h-full rounded-xl object-cover" /> : "🏆"}
//                   </div>
//                   <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
//                     <button onClick={() => openEdit(b)} className="px-2 py-1 bg-white rounded-lg text-indigo-600 text-xs font-bold shadow">Edit</button>
//                     <button onClick={() => setConfirm(b.id)} className="px-2 py-1 bg-white rounded-lg text-red-500 text-xs font-bold shadow">Del</button>
//                   </div>
//                 </div>
//                 <p className="text-xs font-black text-slate-700 uppercase tracking-wider mb-1">{b.title}</p>
//                 <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{b.description}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-10">
//             <div className="text-5xl mb-3">⭐</div>
//             <p className="text-slate-400 font-semibold text-sm">No benefits yet</p>
//           </div>
//         )}
//       </div>
//       <Modal open={!!modal} onClose={() => setModal(null)} title={modal === "add" ? "Add Benefit" : "Edit Benefit"}>
//         <div className="space-y-4">
//           <FLabel label="Title" req><input className={inputCls} value={form.title || ""} onChange={e => setForm({ ...form, title: e.target.value })} /></FLabel>
//           <FLabel label="Description"><textarea rows={3} className={textareaCls} value={form.description || ""} onChange={e => setForm({ ...form, description: e.target.value })} /></FLabel>
//           <FLabel label="Sort Order"><input type="number" className={inputCls} value={form.sortOrder || ""} onChange={e => setForm({ ...form, sortOrder: e.target.value })} /></FLabel>
//           <FileUpload label="Icon / Logo" name="logo" onChange={(n, f) => setFile(f)} current={modal?.current} />
//           <button onClick={save} disabled={saving} className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-black text-sm hover:opacity-90 transition disabled:opacity-50 shadow-lg">{saving ? "Saving..." : "Save Benefit"}</button>
//         </div>
//       </Modal>
//       <Confirm open={!!confirm} msg="Delete this benefit?" onOk={() => del(confirm)} onCancel={() => setConfirm(null)} />
//     </div>
//   );
// }

// // ═══════════════════════════════════════════════════════════════════
// //  SUBCOURSES SECTION
// // ═══════════════════════════════════════════════════════════════════
// function SubCoursesSection({ courseId, subCourses = [], onRefresh, toast }) {
//   const [modal, setModal] = useState(null);
//   const [form, setForm] = useState({});
//   const [file, setFile] = useState(null);
//   const [saving, setSaving] = useState(false);
//   const [confirm, setConfirm] = useState(null);

//   const openAdd = () => { setForm({ title: "", description: "", sortOrder: "" }); setFile(null); setModal("add"); };
//   const openEdit = (s) => { setForm({ title: s.title, description: s.description || "", sortOrder: s.sortOrder || "" }); setFile(null); setModal({ type: "edit", id: s.id, current: s.cardImage }); };

//   const save = async () => {
//     setSaving(true);
//     await (modal === "add" ? http.post(`${API}/${courseId}/subcourses`, fd({ ...form, actor: "admin" }, { cardImage: file })) : http.put(`${API}/subcourses/${modal.id}`, fd({ ...form, actor: "admin" }, { cardImage: file })));
//     setSaving(false);
//     if (res.status === "OK") { toast.ok("SubCourse saved!"); setModal(null); onRefresh(); }
//     else toast.err("Failed to save sub-course.");
//   };

//   const del = async (id) => {
//     await http.del(`${API}/subcourses/${id}/soft?actor=admin`);
//     toast.ok("SubCourse deleted"); setConfirm(null); onRefresh();
//   };

//   return (
//     <div className="bg-white rounded-3xl border-2 border-rose-100 shadow-sm overflow-hidden">
//       <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-4 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <span className="text-2xl">🗂</span>
//           <div><h3 className="font-black text-white text-base">Sub-Courses</h3><p className="text-rose-100 text-xs">{subCourses.length} specialty tracks</p></div>
//         </div>
//         <button onClick={openAdd} className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition">+ Add SubCourse</button>
//       </div>
//       <div className="p-6">
//         {subCourses.length > 0 ? (
//           <div className="grid grid-cols-3 gap-3">
//             {subCourses.map(s => (
//               <div key={s.id} className="relative rounded-2xl overflow-hidden border-2 border-rose-100 group hover:border-rose-300 hover:shadow-lg transition">
//                 <div className="h-24 bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
//                   {s.cardImage ? <img src={s.cardImage} alt="" className="h-full w-full object-cover" /> : <span className="text-4xl">🗂</span>}
//                 </div>
//                 <div className="p-3">
//                   <p className="text-xs font-black text-slate-800 mb-1">{s.title}</p>
//                   <p className="text-[11px] text-slate-500 line-clamp-2">{s.description}</p>
//                 </div>
//                 <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
//                   <button onClick={() => openEdit(s)} className="px-2 py-1 bg-white rounded-lg text-indigo-600 text-xs font-bold shadow">Edit</button>
//                   <button onClick={() => setConfirm(s.id)} className="px-2 py-1 bg-white rounded-lg text-red-500 text-xs font-bold shadow">Del</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-10">
//             <div className="text-5xl mb-3">🗂</div>
//             <p className="text-slate-400 font-semibold text-sm">No sub-courses yet</p>
//           </div>
//         )}
//       </div>
//       <Modal open={!!modal} onClose={() => setModal(null)} title={modal === "add" ? "Add Sub-Course" : "Edit Sub-Course"}>
//         <div className="space-y-4">
//           <FLabel label="Title" req><input className={inputCls} value={form.title || ""} onChange={e => setForm({ ...form, title: e.target.value })} /></FLabel>
//           <FLabel label="Description"><textarea rows={2} className={textareaCls} value={form.description || ""} onChange={e => setForm({ ...form, description: e.target.value })} /></FLabel>
//           <FLabel label="Sort Order"><input type="number" className={inputCls} value={form.sortOrder || ""} onChange={e => setForm({ ...form, sortOrder: e.target.value })} /></FLabel>
//           <FileUpload label="Card Image" name="cardImage" onChange={(n, f) => setFile(f)} current={modal?.current} />
//           <button onClick={save} disabled={saving} className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black text-sm hover:opacity-90 transition disabled:opacity-50 shadow-lg">{saving ? "Saving..." : "Save SubCourse"}</button>
//         </div>
//       </Modal>
//       <Confirm open={!!confirm} msg="Delete this sub-course?" onOk={() => del(confirm)} onCancel={() => setConfirm(null)} />
//     </div>
//   );
// }

// // ═══════════════════════════════════════════════════════════════════
// //  MAIN INFO SECTION
// // ═══════════════════════════════════════════════════════════════════
// function MainInfoSection({ course, onEdit }) {
//   const imgs = [
//     { label: "Banner", src: course.bannerImage },
//     { label: "Card", src: course.cardImage },
//     { label: "Logo", src: course.logo },
//     { label: "About", src: course.aboutImage },
//     { label: "Detail", src: course.courseDetailImage },
//   ];

//   return (
//     <div className="bg-white rounded-3xl border-2 border-indigo-100 shadow-sm overflow-hidden">
//       <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <span className="text-2xl">📋</span>
//           <div><h3 className="font-black text-white text-base">Main Info</h3><p className="text-indigo-200 text-xs">Core course details & images</p></div>
//         </div>
//         <button onClick={onEdit} className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition">✏️ Edit</button>
//       </div>
//       <div className="p-6 space-y-5">
//         {/* Images */}
//         <div>
//           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Images</p>
//           <div className="grid grid-cols-5 gap-3">
//             {imgs.map(img => (
//               <div key={img.label} className="text-center">
//                 <p className="text-[10px] text-slate-400 font-bold mb-2">{img.label}</p>
//                 {img.src ? (
//                   <img src={img.src} alt={img.label} className="w-full h-16 rounded-xl object-cover border-2 border-slate-100" />
//                 ) : (
//                   <div className="w-full h-16 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 text-xs">None</div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* Fields */}
//         <div className="grid grid-cols-3 gap-3">
//           {[
//             ["Course Name", course.courseName],
//             ["Short Form", course.shortForm],
//             ["Course Hours", course.courseHours ? `${course.courseHours}h` : "—"],
//             ["Intensive", course.intensive || "—"],
//             ["Experience", course.aboutTotalExperience || "—"],
//             ["About Title", course.aboutTitle || "—"],
//           ].map(([l, v]) => (
//             <div key={l} className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-3.5 border border-indigo-100">
//               <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1">{l}</p>
//               <p className="text-sm font-bold text-slate-800">{v}</p>
//             </div>
//           ))}
//         </div>
//         {/* Short Desc */}
//         <div className="bg-slate-50 rounded-2xl p-4">
//           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Short Description</p>
//           <p className="text-sm text-slate-600 leading-relaxed">{course.shortDesc || "—"}</p>
//         </div>
//         {/* Features */}
//         {course.features?.length > 0 && (
//           <div>
//             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Features</p>
//             <div className="flex flex-wrap gap-2">
//               {course.features.map((f, i) => (
//                 <span key={i} className="text-xs px-3 py-1.5 rounded-full font-bold bg-indigo-100 text-indigo-700">{f}</span>
//               ))}
//             </div>
//           </div>
//         )}
//         {/* About Description */}
//         {course.aboutDescription && (
//           <div className="bg-slate-50 rounded-2xl p-4">
//             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">About Description</p>
//             <p className="text-sm text-slate-600 leading-relaxed">{course.aboutDescription}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ═══════════════════════════════════════════════════════════════════
// //  COURSE DETAIL PAGE
// // ═══════════════════════════════════════════════════════════════════
// function CourseDetailPage({ course: initialCourse, onBack, toast, onCoursesUpdate }) {
//   const [course, setCourse] = useState(initialCourse);
//   const [editModal, setEditModal] = useState(false);
//   const [form, setForm] = useState({});
//   const [files, setFiles] = useState({});
//   const [saving, setSaving] = useState(false);
//   const [confirm, setConfirm] = useState(null);

//   const refresh = useCallback(async () => {
//     const res = await http.get(`${API}/${course.id}`);
//     if (res.status === "OK") setCourse(res.data);
//     else {
//       // demo: just use local update
//       setCourse(c => ({ ...c }));
//     }
//   }, [course.id]);

//   const openEdit = () => {
//     setForm({
//       courseName: course.courseName, shortForm: course.shortForm, shortDesc: course.shortDesc || "",
//       aboutTitle: course.aboutTitle || "", aboutTotalExperience: course.aboutTotalExperience || "",
//       aboutDescription: course.aboutDescription || "", features: course.features?.join(",") || "",
//       courseDetailTitle: course.courseDetailTitle || "", courseHours: course.courseHours || "",
//       intensive: course.intensive || "",
//     });
//     setFiles({}); setEditModal(true);
//   };

//   const saveEdit = async () => {
//     setSaving(true);
//     const res = await http.put(`${API}/${course.id}`, fd({ ...form, updatedBy: "admin" }, files));
//     setSaving(false);
//     if (res.status === "OK") { toast.ok("Course updated!"); setEditModal(false); setCourse(res.data); }
//     else toast.err("Update failed. Check your API connection.");
//     onCoursesUpdate();
//   };

//   const toggle = async () => {
//     const res = await http.patch(`${API}/${course.id}/toggle-status?updatedBy=admin`);
//     if (res.status === "OK") { toast.ok("Status toggled!"); setCourse(res.data); onCoursesUpdate(); }
//     else toast.err("Failed to toggle status.");
//   };

//   const doDelete = async (type) => {
//     await http.del(`${API}/${course.id}/${type}?updatedBy=admin`);
//     toast.ok(type === "soft" ? "Course archived!" : "Course deleted!");
//     setConfirm(null); onBack();
//   };

//   return (
//     <div>
//       {/* Page Header */}
//       <div className="flex items-center gap-4 mb-7">
//         <button onClick={onBack} className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-slate-200 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition shadow-sm">
//           ← Back
//         </button>
//         <div className="flex-1 flex items-center gap-4">
//           <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-lg">
//             {course.shortForm?.charAt(0)}
//           </div>
//           <div>
//             <h2 className="text-xl font-black text-slate-900 tracking-tight">{course.courseName}</h2>
//             <div className="flex items-center gap-2 mt-1">
//               <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 font-black">{course.shortForm}</span>
//               <StatusBadge status={course.status} deleted={course.deleted} />
//             </div>
//           </div>
//         </div>
//         <div className="flex gap-2">
//           <button onClick={openEdit} className="px-4 py-2.5 rounded-2xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition shadow-md">✏️ Edit Course</button>
//           <button onClick={toggle} className="px-4 py-2.5 rounded-2xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition">⚡ Toggle</button>
//           <button onClick={() => setConfirm("soft")} className="px-4 py-2.5 rounded-2xl bg-amber-100 text-amber-700 text-sm font-bold hover:bg-amber-200 transition">📦 Archive</button>
//           <button onClick={() => setConfirm("hard")} className="px-4 py-2.5 rounded-2xl bg-red-100 text-red-600 text-sm font-bold hover:bg-red-200 transition">🗑 Delete</button>
//         </div>
//       </div>

//       {/* ALL SECTIONS VISIBLE */}
//       <div className="space-y-6">
//         {/* Row 1: Main Info full width */}
//         <MainInfoSection course={course} onEdit={openEdit} />

//         {/* Row 2: Overview + Design Cards */}
//         <div className="grid grid-cols-2 gap-6">
//           <OverviewSection courseId={course.id} data={course.overview} onRefresh={refresh} toast={toast} />
//           <DesignCardsSection courseId={course.id} cards={course.designCards} onRefresh={refresh} toast={toast} />
//         </div>

//         {/* Row 3: Contents + Benefits */}
//         <div className="grid grid-cols-2 gap-6">
//           <ContentsSection courseId={course.id} contents={course.contents} onRefresh={refresh} toast={toast} />
//           <BenefitsSection courseId={course.id} benefits={course.benefits} onRefresh={refresh} toast={toast} />
//         </div>

//         {/* Row 4: SubCourses full width */}
//         <SubCoursesSection courseId={course.id} subCourses={course.subCourses} onRefresh={refresh} toast={toast} />
//       </div>

//       {/* Edit Modal */}
//       <Modal wide open={editModal} onClose={() => setEditModal(false)} title={`Edit: ${course.courseName}`} size="lg">
//         <div className="space-y-5">
//           <div className="grid grid-cols-2 gap-4">
//             <FLabel label="Course Name" req><input className={inputCls} value={form.courseName || ""} onChange={e => setForm({ ...form, courseName: e.target.value })} /></FLabel>
//             <FLabel label="Short Form" req><input className={inputCls} placeholder="ACLS" value={form.shortForm || ""} onChange={e => setForm({ ...form, shortForm: e.target.value })} /></FLabel>
//           </div>
//           <FLabel label="Short Description"><textarea rows={2} className={textareaCls} value={form.shortDesc || ""} onChange={e => setForm({ ...form, shortDesc: e.target.value })} /></FLabel>
//           <div className="grid grid-cols-2 gap-4">
//             <FLabel label="About Title"><input className={inputCls} value={form.aboutTitle || ""} onChange={e => setForm({ ...form, aboutTitle: e.target.value })} /></FLabel>
//             <FLabel label="Total Experience"><input className={inputCls} placeholder="10+" value={form.aboutTotalExperience || ""} onChange={e => setForm({ ...form, aboutTotalExperience: e.target.value })} /></FLabel>
//           </div>
//           <FLabel label="About Description"><textarea rows={3} className={textareaCls} value={form.aboutDescription || ""} onChange={e => setForm({ ...form, aboutDescription: e.target.value })} /></FLabel>
//           <FLabel label="Features (comma-separated)"><input className={inputCls} placeholder="AHA Certified,Simulation Lab,Expert Instructors" value={form.features || ""} onChange={e => setForm({ ...form, features: e.target.value })} /></FLabel>
//           <div className="grid grid-cols-3 gap-4">
//             <FLabel label="Course Detail Title"><input className={inputCls} value={form.courseDetailTitle || ""} onChange={e => setForm({ ...form, courseDetailTitle: e.target.value })} /></FLabel>
//             <FLabel label="Course Hours"><input type="number" className={inputCls} value={form.courseHours || ""} onChange={e => setForm({ ...form, courseHours: e.target.value })} /></FLabel>
//             <FLabel label="Intensive"><input className={inputCls} placeholder="2 Days Intensive" value={form.intensive || ""} onChange={e => setForm({ ...form, intensive: e.target.value })} /></FLabel>
//           </div>
//           <div className="border-t-2 border-dashed border-slate-100 pt-5">
//             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">🖼 Images (leave blank to keep existing)</p>
//             <div className="grid grid-cols-2 gap-4">
//               {[["Banner Image", "bannerImage"], ["Card Image", "cardImage"], ["Logo", "logo"], ["About Image", "aboutImage"], ["Course Detail Image", "courseDetailImage"]].map(([l, k]) => (
//                 <FileUpload key={k} label={l} name={k} onChange={(n, f) => setFiles(p => ({ ...p, [n]: f }))} current={course[k]} />
//               ))}
//             </div>
//           </div>
//           <button onClick={saveEdit} disabled={saving} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-sm hover:opacity-90 transition disabled:opacity-50 shadow-xl">
//             {saving ? "Updating..." : "Update Course"}
//           </button>
//         </div>
//       </Modal>

//       <Confirm open={!!confirm} msg={confirm === "hard" ? "Permanently delete this course? This cannot be undone!" : "Archive this course? It will be hidden from the public site."} onOk={() => doDelete(confirm)} onCancel={() => setConfirm(null)} />
//     </div>
//   );
// }

// // ═══════════════════════════════════════════════════════════════════
// //  ADD COURSE PAGE
// // ═══════════════════════════════════════════════════════════════════
// function AddCoursePage({ onSuccess, onCancel, toast }) {
//   const [form, setForm] = useState({ courseName: "", shortForm: "", shortDesc: "", aboutTitle: "", aboutTotalExperience: "", aboutDescription: "", features: "", courseDetailTitle: "", courseHours: "", intensive: "" });
//   const [files, setFiles] = useState({});
//   const [saving, setSaving] = useState(false);

//   const save = async () => {
//     if (!form.courseName.trim() || !form.shortForm.trim()) return toast.err("Course name and short form are required!");
//     setSaving(true);
//     const res = await http.post(API, fd({ ...form, createdBy: "admin" }, files));
//     setSaving(false);
//     if (res.status === "OK") { toast.ok("Course created!"); onSuccess(res.data); }
//     else toast.err("Failed to create course. Check your API connection.");
//   };

//   return (
//     <div className="w-full">
//       <div className="bg-white rounded-3xl border-2 border-indigo-100 shadow-sm overflow-hidden">
//         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-7 py-5">
//           <h3 className="font-black text-white text-lg">Create New Course</h3>
//           <p className="text-indigo-200 text-sm mt-1">Fill in the details to add a new course to FlyGulf Academy</p>
//         </div>
//         <div className="p-7 space-y-5">
//           <div className="grid grid-cols-2 gap-4">
//             <FLabel label="Course Name" req><input className={inputCls} placeholder="e.g. Basic Life Support" value={form.courseName} onChange={e => setForm({ ...form, courseName: e.target.value })} /></FLabel>
//             <FLabel label="Short Form" req><input className={inputCls} placeholder="e.g. BLS" value={form.shortForm} onChange={e => setForm({ ...form, shortForm: e.target.value })} /></FLabel>
//           </div>
//           <FLabel label="Short Description"><textarea rows={2} className={textareaCls} placeholder="Brief description shown on course cards..." value={form.shortDesc} onChange={e => setForm({ ...form, shortDesc: e.target.value })} /></FLabel>
//           <div className="grid grid-cols-2 gap-4">
//             <FLabel label="About Title"><input className={inputCls} value={form.aboutTitle} onChange={e => setForm({ ...form, aboutTitle: e.target.value })} /></FLabel>
//             <FLabel label="Total Experience"><input className={inputCls} placeholder="10+" value={form.aboutTotalExperience} onChange={e => setForm({ ...form, aboutTotalExperience: e.target.value })} /></FLabel>
//           </div>
//           <FLabel label="About Description"><textarea rows={3} className={textareaCls} placeholder="Detailed course description..." value={form.aboutDescription} onChange={e => setForm({ ...form, aboutDescription: e.target.value })} /></FLabel>
//           <FLabel label="Features (comma-separated)"><input className={inputCls} placeholder="AHA Certified, Simulation Lab, Expert Instructors" value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} /></FLabel>
//           <div className="grid grid-cols-3 gap-4">
//             <FLabel label="Course Detail Title"><input className={inputCls} value={form.courseDetailTitle} onChange={e => setForm({ ...form, courseDetailTitle: e.target.value })} /></FLabel>
//             <FLabel label="Course Hours"><input type="number" className={inputCls} placeholder="16" value={form.courseHours} onChange={e => setForm({ ...form, courseHours: e.target.value })} /></FLabel>
//             <FLabel label="Intensive"><input className={inputCls} placeholder="2 Days Intensive" value={form.intensive} onChange={e => setForm({ ...form, intensive: e.target.value })} /></FLabel>
//           </div>
//           <div className="border-t-2 border-dashed border-slate-100 pt-5">
//             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">🖼 Upload Images</p>
//             <div className="grid grid-cols-3 gap-4">
//               {[["Banner Image", "bannerImage"], ["Card Image", "cardImage"], ["Logo", "logo"], ["About Image", "aboutImage"], ["Course Detail Image", "courseDetailImage"]].map(([l, k]) => (
//                 <FileUpload key={k} label={l} name={k} onChange={(n, f) => setFiles(p => ({ ...p, [n]: f }))} />
//               ))}
//             </div>
//           </div>
//           <div className="flex gap-3 pt-2">
//             <button onClick={save} disabled={saving} className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-sm hover:opacity-90 transition disabled:opacity-50 shadow-xl">
//               {saving ? "Creating..." : "🚀 Create Course"}
//             </button>
//             <button onClick={onCancel} className="px-7 py-3.5 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition">
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ═══════════════════════════════════════════════════════════════════
// //  COURSES LIST PAGE
// // ═══════════════════════════════════════════════════════════════════
// function CoursesListPage({ courses, loading, onManage, onRefresh, toast }) {
//   const [search, setSearch] = useState("");
//   const filtered = courses.filter(c =>
//     c.courseName?.toLowerCase().includes(search.toLowerCase()) ||
//     c.shortForm?.toLowerCase().includes(search.toLowerCase())
//   );
//   const active = courses.filter(c => c.status === "ACTIVE" && !c.deleted).length;
//   const archived = courses.filter(c => c.deleted).length;

//   const statCards = [
//     { label: "Total Courses", val: courses.length, icon: "📚", grad: "from-indigo-500 to-purple-600", light: "from-indigo-50 to-purple-50", text: "text-indigo-700" },
//     { label: "Active", val: active, icon: "✅", grad: "from-emerald-400 to-teal-500", light: "from-emerald-50 to-teal-50", text: "text-emerald-700" },
//     { label: "Inactive", val: courses.filter(c => c.status === "INACTIVE").length, icon: "⏸", grad: "from-slate-400 to-slate-500", light: "from-slate-50 to-slate-100", text: "text-slate-600" },
//     { label: "Archived", val: archived, icon: "📦", grad: "from-amber-400 to-orange-500", light: "from-amber-50 to-orange-50", text: "text-amber-700" },
//   ];

//   return (
//     <div>
//       {/* Stats */}
//       <div className="grid grid-cols-4 gap-5 mb-7">
//         {statCards.map(s => (
//           <div key={s.label} className={`relative rounded-3xl p-5 bg-gradient-to-br ${s.light} border-2 border-white shadow-sm overflow-hidden`}>
//             <div className={`absolute -right-3 -top-3 w-16 h-16 rounded-full bg-gradient-to-br ${s.grad} opacity-10`} />
//             <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${s.grad} flex items-center justify-center text-lg shadow-md mb-3`}>{s.icon}</div>
//             <p className={`text-3xl font-black ${s.text}`}>{s.val}</p>
//             <p className="text-xs text-slate-500 font-bold mt-1">{s.label}</p>
//           </div>
//         ))}
//       </div>

//       {/* Search + Refresh */}
//       <div className="flex gap-3 mb-5">
//         <div className="flex-1 relative">
//           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-lg">🔍</span>
//           <input className="w-full pl-11 pr-4 py-3 bg-white border-2 border-slate-100 rounded-2xl text-sm text-slate-800 font-medium focus:outline-none focus:border-indigo-300 transition placeholder:text-slate-300"
//             placeholder="Search by course name or short form..." value={search} onChange={e => setSearch(e.target.value)} />
//         </div>
//         <button onClick={onRefresh} className="px-5 py-3 bg-white border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition flex items-center gap-2">
//           <span className="text-lg">↺</span> Refresh
//         </button>
//       </div>

//       {/* Courses Grid */}
//       {loading ? (
//         <div className="grid grid-cols-3 gap-5">
//           {[...Array(6)].map((_, i) => (
//             <div key={i} className="h-56 bg-white rounded-3xl border-2 border-slate-100 animate-pulse" />
//           ))}
//         </div>
//       ) : filtered.length === 0 ? (
//         <div className="text-center py-24">
//           <div className="text-7xl mb-5">📭</div>
//           <p className="text-slate-400 font-bold text-lg">No courses found</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-3 gap-5">
//           {filtered.map((course, idx) => {
//             const gradients = ["from-indigo-500 to-purple-600", "from-emerald-500 to-teal-500", "from-amber-400 to-orange-500", "from-rose-500 to-pink-500", "from-blue-500 to-cyan-500", "from-violet-500 to-purple-600"];
//             const grad = gradients[idx % gradients.length];
//             return (
//               <div key={course.id} className="bg-white rounded-3xl border-2 border-slate-100 overflow-hidden hover:border-indigo-200 hover:shadow-xl transition group">
//                 {/* Card Top */}
//                 <div className={`relative h-28 bg-gradient-to-br ${grad} p-5 flex items-end`}>
//                   {course.cardImage && <img src={course.cardImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />}
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs px-2.5 py-1 rounded-full bg-white/20 text-white font-black backdrop-blur-sm">{course.shortForm}</span>
//                     <StatusBadge status={course.status} deleted={course.deleted} />
//                   </div>
//                 </div>
//                 {/* Card Body */}
//                 <div className="p-5">
//                   <h4 className="font-black text-slate-900 text-sm leading-tight mb-2 line-clamp-2">{course.courseName}</h4>
//                   <p className="text-xs text-slate-400 font-medium line-clamp-2 mb-4">{course.shortDesc || "No description"}</p>
//                   {/* Meta */}
//                   <div className="flex gap-2 mb-4 flex-wrap">
//                     {course.courseHours && <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-lg font-bold">⏱ {course.courseHours}h</span>}
//                     {course.intensive && <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-lg font-bold">📅 {course.intensive}</span>}
//                     {course.overview && <span className="text-[10px] bg-violet-100 text-violet-600 px-2 py-1 rounded-lg font-bold">📖 Overview</span>}
//                     {course.designCards?.length > 0 && <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-1 rounded-lg font-bold">🃏 {course.designCards.length} Cards</span>}
//                     {course.contents?.length > 0 && <span className="text-[10px] bg-emerald-100 text-emerald-600 px-2 py-1 rounded-lg font-bold">📚 {course.contents.length} Topics</span>}
//                     {course.benefits?.length > 0 && <span className="text-[10px] bg-amber-100 text-amber-600 px-2 py-1 rounded-lg font-bold">⭐ {course.benefits.length} Benefits</span>}
//                   </div>
//                   <button onClick={() => onManage(course)} className={`w-full py-2.5 rounded-2xl bg-gradient-to-r ${grad} text-white text-xs font-black hover:opacity-90 transition shadow-md`}>
//                     Manage Course →
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// // ═══════════════════════════════════════════════════════════════════
// //  ROOT APP
// // ═══════════════════════════════════════════════════════════════════
// export default function App() {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState("list"); // list | add | detail
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const toast = useToast();

//   const loadCourses = useCallback(async () => {
//     setLoading(true);
//     const res = await http.get(API);
//     if (res.status === "OK" && Array.isArray(res.data)) setCourses(res.data);
//     else setCourses([]);
//     setLoading(false);
//   }, []);

//   useEffect(() => { loadCourses(); }, []);

//   return (
//     <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }} className="bg-slate-50">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
//         @keyframes slideIn { from { transform: translateX(80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
//         @keyframes popIn { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }
//         .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
//         .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
//         * { box-sizing: border-box; }
//         .page-scroll::-webkit-scrollbar { width: 6px; }
//         .page-scroll::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
//         .page-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
//         .page-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
//       `}</style>

//       <Toaster toasts={toast.toasts} />

//       {/* ── Topbar (fixed) ── */}
//       <header className="flex-shrink-0 bg-white/90 backdrop-blur-xl border-b-2 border-slate-100 px-8 py-4 flex items-center justify-between" style={{ zIndex: 20 }}>
//         <div>
//           <h1 className="text-lg font-black text-slate-900 tracking-tight">
//             {page === "list" && "Course Management"}
//             {page === "add" && "Add New Course"}
//             {page === "detail" && selectedCourse?.courseName}
//           </h1>
//           <p className="text-xs text-slate-400 font-medium mt-0.5">
//             {page === "list" && `${courses.length} courses · FlyGulf Academy`}
//             {page === "add" && "Create a new training course"}
//             {page === "detail" && `${selectedCourse?.shortForm} · Manage all sections`}
//           </p>
//         </div>
//         <div className="flex items-center gap-3">
//           {page === "list" && (
//             <button onClick={() => setPage("add")}
//               className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-black shadow-lg hover:opacity-90 transition">
//               <span className="text-base">+</span> New Course
//             </button>
//           )}
//           {page !== "list" && (
//             <button onClick={() => { setPage("list"); setSelectedCourse(null); }}
//               className="px-5 py-2.5 rounded-2xl border-2 border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition">
//               ← All Courses
//             </button>
//           )}
//         </div>
//       </header>

//       {/* ── Scrollable Page Content ── */}
//       <div className="page-scroll flex-1 overflow-y-auto p-8">
//         {page === "list" && (
//           <CoursesListPage
//             courses={courses}
//             loading={loading}
//             onManage={c => { setSelectedCourse(c); setPage("detail"); }}
//             onRefresh={loadCourses}
//             toast={toast}
//           />
//         )}
//         {page === "add" && (
//           <AddCoursePage
//             onSuccess={c => { setCourses(p => [c, ...p]); setPage("list"); }}
//             onCancel={() => setPage("list")}
//             toast={toast}
//           />
//         )}
//         {page === "detail" && selectedCourse && (
//           <CourseDetailPage
//             course={selectedCourse}
//             onBack={() => { setPage("list"); setSelectedCourse(null); }}
//             toast={toast}
//             onCoursesUpdate={loadCourses}
//           />
//         )}
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
                    <div className="grid grid-cols-2 gap-1.5 border-t border-slate-100 pt-3">
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
                    <button onClick={()=>setDeleteId(c.id)}
                      className="w-full mt-1.5 py-1.5 rounded-xl text-[11px] font-semibold text-slate-300 hover:text-red-400 hover:bg-red-50 transition">
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