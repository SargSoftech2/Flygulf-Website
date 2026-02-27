import { useState, useEffect, useRef } from "react";

const API_BASE = "http://localhost:8081/api/contact";
const TOKEN = localStorage.getItem("token") || "";

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
  { id: 1, name: "Ahmed Al Rashid", email: "ahmed@example.com", subject: "Web Development",       message: "I would like to enroll in the web development bootcamp. Please share the curriculum and fee details.", status: "NEW",         createdAt: "2024-02-20" },
  { id: 2, name: "Sarah Mitchell",  email: "sarah.m@gmail.com", subject: "Data Science & AI",     message: "Interested in the Data Science program. Can you share details about the duration and certification?", status: "IN_PROGRESS", createdAt: "2024-02-19" },
  { id: 3, name: "James Porter",    email: "jporter@corp.com",  subject: "UI/UX Design",          message: "Our company wants to enroll 10 employees in the UI/UX design course. Looking for group pricing.", status: "CONFIRMED",   createdAt: "2024-02-18" },
  { id: 4, name: "Fatima Hassan",   email: "fatima.h@mail.com", subject: "Cybersecurity",         message: "I completed the intro module and want to know more about the advanced cybersecurity track.", status: "COMPLETED",   createdAt: "2024-02-17" },
  { id: 5, name: "Robert Chen",     email: "rchen@tech.io",     subject: "Cloud Computing",       message: "Please send me info about the cloud computing certification pathway and AWS exam prep.", status: "CANCELLED",   createdAt: "2024-02-16" },
  { id: 6, name: "Priya Sharma",    email: "priya.s@outlook.com", subject: "Mobile Development", message: "Looking to learn Flutter for mobile development. What are the prerequisites?", status: "NEW",         createdAt: "2024-02-15" },
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

function StatusDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const current = getStatus(value);

  useEffect(() => {
    const fn = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold border-2 transition-all bg-white"
        style={{ borderColor: open ? current.dot : "#e2e8f0", color: current.text, minWidth: 160 }}>
        <span className="w-2 h-2 rounded-full" style={{ background: current.dot }} />
        <span className="flex-1 text-left">{current.label}</span>
        <svg className={`w-4 h-4 transition-transform text-slate-400 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-40 overflow-hidden">
          {STATUS_OPTIONS.map(s => (
            <button key={s.value} onClick={() => { onChange(s.value); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium hover:bg-slate-50 transition-colors"
              style={{ color: value === s.value ? s.text : "#64748b" }}>
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.dot }} />
              {s.label}
              {value === s.value && (
                <svg className="w-3.5 h-3.5 ml-auto" fill="currentColor" viewBox="0 0 20 20" style={{ color: s.dot }}>
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
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

        {/* Color accent top */}
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

          {/* Course interest */}
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

          {/* Message */}
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
  const [enquiries, setEnquiries]       = useState([]);
  const [loading, setLoading]           = useState(true);
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selected, setSelected]         = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/enquiries`, { headers: { Authorization: `Bearer ${TOKEN}` } });
        if (!res.ok) throw new Error();
        setEnquiries(await res.json());
      } catch {
        setEnquiries(MOCK_DATA);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = enquiries.filter(e => {
    const q = search.toLowerCase();
    const matchSearch = !search || e.name?.toLowerCase().includes(q) || e.email?.toLowerCase().includes(q) || e.subject?.toLowerCase().includes(q);
    const matchStatus = statusFilter === "ALL" || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const total    = enquiries.length;
  const newCount = enquiries.filter(e => e.status === "NEW").length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif !important; box-sizing: border-box; }

        @keyframes popIn {
          from { opacity: 0; transform: scale(0.94) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeRow {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-row { animation: fadeRow 0.18s ease both; }
        ::placeholder { color: #cbd5e1; }
      `}</style>

      <div className="min-h-screen bg-slate-50 p-6 lg:p-10">

        {/* ── Header ── */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Contact Enquiries</h1>
          <p className="text-sm text-slate-400 mt-1">Manage all student enquiries from one place</p>
        </div>

        {/* ── 2 Large Stat Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8 max-w-xl">

          {/* Total */}
          <div className="bg-white rounded-3xl p-7 shadow-sm border border-slate-100 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #eff6ff, #dbeafe)" }}>
              <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-slate-800">{total}</p>
              <p className="text-sm font-medium text-slate-400 mt-1">Total Enquiries</p>
            </div>
          </div>

          {/* New */}
          <div className="bg-white rounded-3xl p-7 shadow-sm border border-slate-100 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7)" }}>
              <svg className="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-slate-800">{newCount}</p>
              <p className="text-sm font-medium text-slate-400 mt-1">New Enquiries</p>
            </div>
          </div>
        </div>

        {/* ── Search + Status Dropdown ── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
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

          {/* Status Dropdown */}
          <StatusDropdown value={statusFilter} onChange={setStatusFilter} />
        </div>

        {/* ── Enquiries List ── */}
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
            <p className="text-sm text-slate-300">Try changing your search or filter</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Results count */}
            <p className="text-xs font-semibold text-slate-400 px-1">
              Showing <span className="text-slate-600">{filtered.length}</span> of {total} enquiries
            </p>

            {filtered.map((e, i) => (
              <div key={e.id}
                className="fade-row bg-white rounded-3xl px-6 py-5 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group"
                style={{ animationDelay: `${i * 0.05}s` }}
                onClick={() => { setSelected(e); setSelectedIndex(i); }}>

                {/* Avatar */}
                <Avatar name={e.name} index={i} />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold text-slate-800 text-sm">{e.name}</p>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{e.email}</p>
                </div>

                {/* Course */}
                <div className="hidden sm:flex items-center gap-1.5 min-w-0 max-w-[160px]">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-50">
                    <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-slate-500 truncate">{e.subject || "—"}</span>
                </div>

                {/* Status Badge */}
                <div className="flex-shrink-0">
                  <StatusBadge status={e.status} />
                </div>

                {/* Date */}
                <p className="hidden md:block text-xs text-slate-300 flex-shrink-0">{e.createdAt}</p>

                {/* Arrow */}
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-slate-50 group-hover:bg-blue-50 transition-colors">
                  <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal message={selected} index={selectedIndex} onClose={() => setSelected(null)} />
    </>
  );
}