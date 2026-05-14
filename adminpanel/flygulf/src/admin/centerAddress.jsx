import { useState, useEffect, useRef } from "react";
import { getCenters, createCenter, updateCenter, deleteCenter } from "../apiIntegration/centerAddress.api";

const EMPTY_FORM = { city: "", address: "", description: "", headOffice: false };

// ── Toast ──────────────────────────────────────────────────────────────────────
function Toast({ toast }) {
  if (!toast) return null;
  const ok = toast.type === "success";
  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-semibold"
      style={{ background: ok ? "#ecfdf5" : "#fef2f2", color: ok ? "#059669" : "#dc2626", border: `1.5px solid ${ok ? "#a7f3d0" : "#fecaca"}`, animation: "slideInRight 0.25s ease" }}>
      {ok
        ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>}
      {toast.msg}
    </div>
  );
}

// ── Confirm Delete Modal ───────────────────────────────────────────────────────
function ConfirmModal({ cityName, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-7 text-center"
        style={{ animation: "popIn 0.2s cubic-bezier(0.34,1.56,0.64,1)" }} onClick={e => e.stopPropagation()}>
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">Delete Center</h3>
        <p className="text-sm text-slate-400 mb-6">Are you sure you want to delete <span className="font-semibold text-slate-600">{cityName}</span>? This cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-2xl border-2 border-slate-100 text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-2xl bg-red-500 hover:bg-red-600 text-sm font-semibold text-white transition-colors shadow-sm">Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── Add / Edit Form Modal ──────────────────────────────────────────────────────
function FormModal({ form, setForm, editId, errors, saving, onSubmit, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
        style={{ animation: "popIn 0.2s cubic-bezier(0.34,1.56,0.64,1)" }} onClick={e => e.stopPropagation()}>
        <div className="h-1.5" style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6)" }} />
        <div className="p-7">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">{editId ? "Edit Center" : "Add New Center"}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{editId ? "Update the center details below" : "Fill in the details to add a new center"}</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { key: "city", label: "City Name", placeholder: "e.g. Pune, Mumbai, Nashik", type: "input" },
              { key: "address", label: "Address", placeholder: "e.g. Shivraj Capital, Near ICICI Bank, Narhe", type: "input" },
              { key: "description", label: "Description", placeholder: "Brief description about this center...", type: "textarea" },
            ].map(({ key, label, placeholder, type }) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label} <span className="text-red-400">*</span></label>
                {type === "textarea"
                  ? <textarea rows={3} placeholder={placeholder} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className="w-full px-4 py-3 text-sm bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all text-slate-700 resize-none"
                      style={{ borderColor: errors[key] ? "#fca5a5" : "#e2e8f0" }} />
                  : <input type="text" placeholder={placeholder} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className="w-full px-4 py-3 text-sm bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all text-slate-700"
                      style={{ borderColor: errors[key] ? "#fca5a5" : "#e2e8f0" }} />}
                {errors[key] && <p className="text-xs text-red-400 mt-1">{errors[key]}</p>}
              </div>
            ))}
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
              style={{ background: saving ? "#a5b4fc" : "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
              {saving
                ? <><div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />Saving...</>
                : <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{editId ? "Update Center" : "Add Center"}</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Center Detail View ─────────────────────────────────────────────────────────
function CenterDetailView({ center, onEdit, onDelete }) {
  const isHead = center.headOffice;
  const accent = isHead ? "#6366f1" : "#10b981";
  const accentBg = isHead ? "linear-gradient(135deg,#ede9fe,#ddd6fe)" : "linear-gradient(135deg,#f0fdf4,#dcfce7)";
  return (
    <div style={{ animation: "fadeIn 0.2s ease both" }}>
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden" style={{ border: `2px solid ${isHead ? "#6366f1" : "#e2e8f0"}` }}>
        <div className="h-2" style={{ background: `linear-gradient(90deg,${accent},${isHead ? "#8b5cf6" : "#34d399"})` }} />
        <div className="p-7">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: accentBg }}>
              <svg className="w-7 h-7" fill="none" stroke={accent} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-2xl font-extrabold text-slate-800">{center.city}</h2>
                {isHead && <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ background: "#ede9fe", color: "#6366f1" }}>HEAD OFFICE</span>}
              </div>
              <p className="text-sm text-slate-400 mt-0.5">{isHead ? "Primary Office" : "Branch Office"}</p>
            </div>
          </div>
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
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: accent }}>
                <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
                {isHead ? "Head Office" : "Branch Office"}
              </span>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => onEdit(center)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold border-2 border-indigo-100 text-indigo-600 hover:bg-indigo-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              Edit
            </button>
            <button onClick={() => onDelete(center)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold border-2 border-red-100 text-red-500 hover:bg-red-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Center Row Card ────────────────────────────────────────────────────────────
function CenterRow({ center, onClick, delay = 0 }) {
  const isHead = center.headOffice;
  const accent = isHead ? "#6366f1" : "#10b981";
  const accentBg = isHead ? "linear-gradient(135deg,#ede9fe,#ddd6fe)" : "linear-gradient(135deg,#f0fdf4,#dcfce7)";
  return (
    <div
      className="bg-white rounded-3xl px-6 py-5 shadow-sm flex items-start gap-4 hover:shadow-md transition-all cursor-pointer group"
      style={{ border: `2px solid ${isHead ? "#6366f1" : "#e2e8f0"}`, animation: `fadeRow 0.18s ease ${delay}s both` }}
      onClick={onClick}>
      <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: accentBg }}>
        <svg className="w-5 h-5" fill="none" stroke={accent} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="font-bold text-slate-800">{center.city}</p>
          {isHead && <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#ede9fe", color: "#6366f1" }}>HEAD OFFICE</span>}
        </div>
        <p className="text-sm text-slate-500 truncate">{center.address}</p>
        {center.description && <p className="text-xs text-slate-400 mt-1 truncate">{center.description}</p>}
      </div>
      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-slate-50 group-hover:bg-indigo-50 transition-colors">
        <svg className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  MAIN
// ══════════════════════════════════════════════════════════════════════════════
export default function CenterAddressAdmin() {
  const scrollRef = useRef();

  const [centers,        setCenters]        = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [form,           setForm]           = useState(EMPTY_FORM);
  const [editId,         setEditId]         = useState(null);
  const [showForm,       setShowForm]       = useState(false);
  const [deleteTarget,   setDeleteTarget]   = useState(null);
  const [saving,         setSaving]         = useState(false);
  const [toast,          setToast]          = useState(null);
  const [errors,         setErrors]         = useState({});
  const [view,           setView]           = useState("home");
  const [selectedCenter, setSelectedCenter] = useState(null);

  useEffect(() => { load(); }, []);
  useEffect(() => { scrollRef.current?.scrollTo(0, 0); }, [view]);

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

  const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setErrors({}); setShowForm(true); };
  const openEdit = (c) => { setForm({ city: c.city, address: c.address, description: c.description || "", headOffice: c.headOffice || false }); setEditId(c.id); setErrors({}); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditId(null); setForm(EMPTY_FORM); setErrors({}); };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSaving(true);
    const res = editId ? await updateCenter(editId, form) : await createCenter(form);
    setSaving(false);
    if (res.success) {
      showToast(editId ? "Center updated!" : "Center added!");
      closeForm();
      load();
      if (editId && selectedCenter?.id === editId) setSelectedCenter({ ...selectedCenter, ...form });
    } else {
      showToast(res.message || "Something went wrong", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const res = await deleteCenter(deleteTarget.id);
    setDeleteTarget(null);
    if (res.success) {
      showToast("Center deleted!");
      load();
      if (selectedCenter?.id === deleteTarget.id) { setView("home"); setSelectedCenter(null); }
    } else {
      showToast("Failed to delete center", "error");
    }
  };

  const headOffice = centers.find(c => c.headOffice);
  const others     = centers.filter(c => !c.headOffice);

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
        * { font-family:'Plus Jakarta Sans',sans-serif!important; box-sizing:border-box; }
        @keyframes popIn        { from{opacity:0;transform:scale(0.94) translateY(8px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes fadeRow      { from{opacity:0;transform:translateY(6px)}             to{opacity:1;transform:translateY(0)}          }
        @keyframes slideInRight { from{opacity:0;transform:translateX(20px)}            to{opacity:1;transform:translateX(0)}          }
        @keyframes fadeIn       { from{opacity:0}                                        to{opacity:1}                                  }
        ::placeholder { color:#cbd5e1; }
        #ca-scroll::-webkit-scrollbar              { width:6px; }
        #ca-scroll::-webkit-scrollbar-track        { background:#f1f5f9; border-radius:99px; }
        #ca-scroll::-webkit-scrollbar-thumb        { background:#c7d2e0; border-radius:99px; }
        #ca-scroll::-webkit-scrollbar-thumb:hover  { background:#6366f1; }
      `}</style>

      <Toast toast={toast} />

      {/* ── Full-height flex layout ── */}
      <div style={{ display:"flex", flexDirection:"column", height:"100vh", background:"#f8fafc", overflow:"hidden" }}>

        {/* ── Sticky Header ── */}
        <div style={{ flexShrink:0, background:"#fff", borderBottom:"1px solid #e2e8f0", padding:"18px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", zIndex:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            {view !== "home" && (
              <button
                onClick={() => {
                  if (view === "detail") { setView(selectedCenter?.headOffice ? "head" : "branch"); setSelectedCenter(null); }
                  else { setView("home"); setSelectedCenter(null); }
                }}
                style={{ width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", borderRadius:12, border:"1px solid #e2e8f0", background:"#fff", cursor:"pointer" }}>
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <div>
              <h1 style={{ fontSize:20, fontWeight:800, color:"#1e293b", margin:0 }}>{headerTitle}</h1>
              <p style={{ fontSize:13, color:"#94a3b8", margin:"2px 0 0" }}>{headerSub}</p>
            </div>
          </div>
          {view === "home" && (
            <button onClick={openAdd}
              style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 22px", borderRadius:16, background:"linear-gradient(135deg,#6366f1,#8b5cf6)", color:"#fff", fontWeight:700, fontSize:14, border:"none", cursor:"pointer", boxShadow:"0 4px 14px rgba(99,102,241,.35)" }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Add Center
            </button>
          )}
        </div>

        {/* ── Scrollable Body ── */}
        <div id="ca-scroll" ref={scrollRef} style={{ flex:1, overflowY:"scroll", overflowX:"hidden", scrollbarWidth:"thin", scrollbarColor:"#c7d2e0 #f1f5f9" }}>
          <div style={{ padding:"28px 28px 48px", width:"100%" }}>

            {/* ════ HOME ════ */}
            {view === "home" && (
              <div style={{ animation:"fadeIn 0.2s ease both" }}>
                {loading ? (
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:300, gap:12 }}>
                    <div style={{ width:32, height:32, borderRadius:"50%", border:"4px solid #e2e8f0", borderTopColor:"#6366f1", animation:"spin 0.8s linear infinite" }} />
                    <span style={{ fontSize:14, color:"#94a3b8" }}>Loading centers...</span>
                  </div>
                ) : centers.length === 0 ? (
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:300, gap:16 }}>
                    <div style={{ width:80, height:80, background:"#f1f5f9", borderRadius:24, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <svg className="w-9 h-9 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </div>
                    <p style={{ fontSize:15, fontWeight:600, color:"#94a3b8" }}>No centers added yet</p>
                    <button onClick={openAdd}
                      style={{ padding:"10px 22px", borderRadius:16, background:"linear-gradient(135deg,#6366f1,#8b5cf6)", color:"#fff", fontWeight:700, fontSize:14, border:"none", cursor:"pointer" }}>
                      Add First Center
                    </button>
                  </div>
                ) : (
                  <>
                    {/* ── 3 stat cards ── */}
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginBottom:28 }}>
                      {/* Total */}
                      <div style={{ background:"#fff", borderRadius:24, padding:"24px 28px", boxShadow:"0 1px 4px rgba(0,0,0,.06)", border:"1px solid #f1f5f9", display:"flex", alignItems:"center", gap:20 }}>
                        <div style={{ width:56, height:56, borderRadius:18, background:"#ede9fe", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          <svg className="w-7 h-7" fill="none" stroke="#6366f1" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <p style={{ fontSize:36, fontWeight:800, color:"#1e293b", lineHeight:1 }}>{centers.length}</p>
                          <p style={{ fontSize:13, color:"#94a3b8", marginTop:6 }}>Total Centers</p>
                        </div>
                      </div>

                      {/* Head Office */}
                      <div onClick={() => headOffice && setView("head")}
                        style={{ background:"#fff", borderRadius:24, padding:"24px 28px", boxShadow:"0 1px 4px rgba(0,0,0,.06)", border:"1px solid #f1f5f9", display:"flex", alignItems:"center", gap:20, cursor: headOffice ? "pointer" : "default", opacity: headOffice ? 1 : 0.6, transition:"box-shadow .15s,border-color .15s" }}
                        onMouseEnter={e => headOffice && (e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,.1)")}
                        onMouseLeave={e => (e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,.06)")}>
                        <div style={{ width:56, height:56, borderRadius:18, background:"#fffbeb", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          <svg className="w-7 h-7" fill="none" stroke="#f59e0b" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div style={{ flex:1 }}>
                          <p style={{ fontSize:36, fontWeight:800, color:"#1e293b", lineHeight:1 }}>{headOffice ? 1 : 0}</p>
                          <p style={{ fontSize:13, color:"#94a3b8", marginTop:6 }}>Head Office</p>
                        </div>
                        {headOffice && <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
                      </div>

                      {/* Branch Offices */}
                      <div onClick={() => others.length > 0 && setView("branch")}
                        style={{ background:"#fff", borderRadius:24, padding:"24px 28px", boxShadow:"0 1px 4px rgba(0,0,0,.06)", border:"1px solid #f1f5f9", display:"flex", alignItems:"center", gap:20, cursor: others.length > 0 ? "pointer" : "default", opacity: others.length > 0 ? 1 : 0.6, transition:"box-shadow .15s" }}
                        onMouseEnter={e => others.length > 0 && (e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,.1)")}
                        onMouseLeave={e => (e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,.06)")}>
                        <div style={{ width:56, height:56, borderRadius:18, background:"#ecfdf5", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          <svg className="w-7 h-7" fill="none" stroke="#10b981" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div style={{ flex:1 }}>
                          <p style={{ fontSize:36, fontWeight:800, color:"#1e293b", lineHeight:1 }}>{others.length}</p>
                          <p style={{ fontSize:13, color:"#94a3b8", marginTop:6 }}>Branch Offices</p>
                        </div>
                        {others.length > 0 && <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
                      </div>
                    </div>

                    {/* ── All Centers list ── */}
                    <div>
                      <p style={{ fontSize:12, fontWeight:600, color:"#94a3b8", marginBottom:12 }}>
                        All Centers — <span style={{ color:"#475569" }}>{centers.length} total</span>
                      </p>
                      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                        {headOffice && (
                          <CenterRow center={headOffice} onClick={() => setView("head")} delay={0} />
                        )}
                        {others.map((c, i) => (
                          <CenterRow key={c.id} center={c} onClick={() => { setSelectedCenter(c); setView("detail"); }} delay={i * 0.04} />
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ════ HEAD OFFICE ════ */}
            {view === "head" && (
              headOffice
                ? <CenterDetailView center={headOffice} onEdit={openEdit} onDelete={c => setDeleteTarget(c)} />
                : <div style={{ textAlign:"center", padding:"80px 0", color:"#94a3b8", fontWeight:600 }}>No head office set</div>
            )}

            {/* ════ BRANCH LIST ════ */}
            {view === "branch" && (
              <div style={{ animation:"fadeIn 0.2s ease both" }}>
                <p style={{ fontSize:12, fontWeight:600, color:"#94a3b8", marginBottom:12 }}>
                  Showing <span style={{ color:"#475569" }}>{others.length}</span> branch office{others.length !== 1 ? "s" : ""}
                </p>
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  {others.map((c, i) => (
                    <CenterRow key={c.id} center={c} onClick={() => { setSelectedCenter(c); setView("detail"); }} delay={i * 0.04} />
                  ))}
                </div>
              </div>
            )}

            {/* ════ DETAIL ════ */}
            {view === "detail" && selectedCenter && (
              <CenterDetailView center={selectedCenter} onEdit={openEdit} onDelete={c => setDeleteTarget(c)} />
            )}

          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      {showForm && <FormModal form={form} setForm={setForm} editId={editId} errors={errors} saving={saving} onSubmit={handleSubmit} onClose={closeForm} />}
      {deleteTarget && <ConfirmModal cityName={deleteTarget.city} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
    </>
  );
}