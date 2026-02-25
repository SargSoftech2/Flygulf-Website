import { useState, useRef, useEffect } from "react";
import {
  Star,
  Plus,
  X,
  Edit2,
  Trash2,
  Camera,
  Mic,
  Video,
  ChevronDown,
  Search,
  AlertTriangle,
  Eye,
} from "lucide-react";
import * as reviewApi from "../services/reviewApi";

/* ─────────────────────────────────────────────
   MOCK DATA  (replace with real API calls)
───────────────────────────────────────────── */
const COURSES_API = [
  "Cabin Crew Training",
  "Ground Staff Operations",
  "Aviation Security",
  "Airport Management",
  "Customer Service Excellence",
];

const MOCK_REVIEWS = [
  {
    id: 1,
    name: "Aisha Rahman",
    mobile: "+91 98765 43210",
    designation: "Cabin Crew",
    course: "Cabin Crew Training",
    review:
      "FlyGulf Academy transformed my career! The instructors are world-class and the curriculum is incredibly detailed. I landed my dream job within 3 months of completing the course.",
    rating: 5,
    profilePic: null,
    audio: null,
    video: null,
    date: "2025-12-10",
  },
  {
    id: 2,
    name: "Mohammed Al-Farsi",
    mobile: "+91 87654 32109",
    designation: "Ground Staff",
    course: "Ground Staff Operations",
    review:
      "Excellent training program. The hands-on experience was invaluable and prepared me perfectly for the real-world aviation environment.",
    rating: 4,
    profilePic: null,
    audio: null,
    video: null,
    date: "2025-11-22",
  },
  {
    id: 3,
    name: "Priya Sharma",
    mobile: "+91 76543 21098",
    designation: "Security Officer",
    course: "Aviation Security",
    review:
      "Very comprehensive course content. Would have appreciated more practical sessions but overall a great learning experience at FlyGulf.",
    rating: 4,
    profilePic: null,
    audio: null,
    video: null,
    date: "2025-11-05",
  },
  {
    id: 4,
    name: "Rahul Mehta",
    mobile: "+91 65432 10987",
    designation: "Airport Manager",
    course: "Airport Management",
    review:
      "The academy's facilities are top-notch and the faculty's industry experience really shows. Highly recommend to anyone serious about aviation.",
    rating: 5,
    profilePic: null,
    audio: null,
    video: null,
    date: "2025-10-18",
  },
];

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const EMPTY_FORM = {
  name: "",
  mobile: "",
  designation: "",
  course: "",
  review: "",
  rating: 0,
  profilePic: null,
  profilePicPreview: null,
  audio: null,
  audioName: null,
  video: null,
  videoName: null,
};

function StarRating({ value, onChange, size = 22 }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange && onChange(s)}
          onMouseEnter={() => onChange && setHovered(s)}
          onMouseLeave={() => onChange && setHovered(0)}
          className={`transition-transform ${onChange ? "hover:scale-110 cursor-pointer" : "cursor-default"}`}
        >
          <Star
            size={size}
            className={`transition-colors ${s <= (hovered || value) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
          />
        </button>
      ))}
    </div>
  );
}

function Avatar({ name, src, size = 44 }) {
  const colors = [
    "bg-indigo-500",
    "bg-pink-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-sky-500",
    "bg-violet-500",
  ];
  const color = colors[(name?.charCodeAt(0) || 0) % colors.length];
  return src ? (
    <img
      src={src}
      alt={name}
      className="rounded-2xl object-cover flex-shrink-0"
      style={{ width: size, height: size }}
    />
  ) : (
    <div
      className={`${color} rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-bold`}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {name?.[0]?.toUpperCase() || "?"}
    </div>
  );
}

function Badge({ children, color = "indigo" }) {
  const map = {
    indigo: "bg-indigo-50 text-indigo-600 border border-indigo-100",
    pink: "bg-pink-50 text-pink-600 border border-pink-100",
    amber: "bg-amber-50 text-amber-600 border border-amber-100",
    emerald: "bg-emerald-50 text-emerald-600 border border-emerald-100",
  };
  return (
    <span
      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${map[color]}`}
    >
      {children}
    </span>
  );
}

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div
      className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-white text-sm font-semibold transition-all animate-bounce-once
      ${type === "error" ? "bg-red-500" : type === "warning" ? "bg-amber-500" : "bg-emerald-500"}`}
    >
      {type === "error" ? "❌" : type === "warning" ? "⚠️" : "✅"}
      {message}
    </div>
  );
}

/* ─────────────────────────────────────────────
   REVIEW FORM MODAL
───────────────────────────────────────────── */
function ReviewFormModal({ isOpen, onClose, onSave, initialData, courses }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const imgRef = useRef();
  const audioRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    if (isOpen) {
      setForm(
        initialData
          ? {
              ...initialData,
              profilePicPreview: initialData.profilePic || null,
              audioName: initialData.audioName || null,
              videoName: initialData.videoName || null,
            }
          : EMPTY_FORM,
      );
      setErrors({});
    }
  }, [isOpen, initialData]);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      set("profilePic", file);
      set("profilePicPreview", ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAudio = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    set("audio", file);
    set("audioName", file.name);
  };

  const handleVideo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    set("video", file);
    set("videoName", file.name);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.mobile.trim()) e.mobile = "Mobile number is required";
    if (!form.review.trim()) e.review = "Review is required";
    if (form.rating === 0) e.rating = "Please select a rating";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave({
      ...form,
      date: form.date || new Date().toISOString().split("T")[0],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg max-h-[90vh] bg-white flex flex-col shadow-2xl overflow-hidden rounded-3xl mx-4">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-indigo-600 to-indigo-500">
          <div>
            <h2
              className="text-white font-bold text-lg leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {initialData ? "Edit Review" : "Add Review"}
            </h2>
            <p className="text-indigo-200 text-xs mt-0.5">
              Share experience at FlyGulf Academy
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Star Rating */}
          <div className="text-center py-2">
            <StarRating
              value={form.rating}
              onChange={(v) => set("rating", v)}
              size={30}
            />
            <p className="text-xs text-gray-400 mt-2">
              {form.rating === 0
                ? "Tap a star to rate"
                : ["", "Poor", "Fair", "Good", "Very Good", "Excellent"][
                    form.rating
                  ]}
            </p>
            {errors.rating && (
              <p className="text-red-500 text-xs mt-1">{errors.rating}</p>
            )}
          </div>

          {/* Name + Mobile */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                className={`w-full border rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 outline-none focus:ring-2 focus:ring-indigo-300 transition ${errors.name ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50 focus:bg-white"}`}
                placeholder="Your name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
              {errors.name && (
                <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                Mobile Number <span className="text-red-400">*</span>
              </label>
              <input
                className={`w-full border rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 outline-none focus:ring-2 focus:ring-indigo-300 transition ${errors.mobile ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50 focus:bg-white"}`}
                placeholder="+91 XXXXX XXXXX"
                value={form.mobile}
                onChange={(e) => set("mobile", e.target.value)}
              />
              {errors.mobile && (
                <p className="text-red-500 text-[11px] mt-1">{errors.mobile}</p>
              )}
            </div>
          </div>

          {/* Designation + Course */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                Designation
              </label>
              <input
                className="w-full border border-gray-200 bg-gray-50 focus:bg-white rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 outline-none focus:ring-2 focus:ring-indigo-300 transition"
                placeholder="e.g. Cabin Crew"
                value={form.designation}
                onChange={(e) => set("designation", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                Course Enrolled
              </label>
              <div className="relative">
                <select
                  className="w-full border border-gray-200 bg-gray-50 focus:bg-white rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 outline-none focus:ring-2 focus:ring-indigo-300 transition appearance-none"
                  value={form.course}
                  onChange={(e) => set("course", e.target.value)}
                >
                  <option value="">Select course</option>
                  {courses.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Your Review <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <textarea
                className={`w-full border rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 outline-none focus:ring-2 focus:ring-indigo-300 transition resize-none ${errors.review ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50 focus:bg-white"}`}
                placeholder="Tell us about your experience at FlyGulf Academy…"
                rows={4}
                maxLength={400}
                value={form.review}
                onChange={(e) => set("review", e.target.value)}
              />
              <span className="absolute bottom-2 right-3 text-[11px] text-gray-400">
                {form.review.length} / 400
              </span>
            </div>
            {errors.review && (
              <p className="text-red-500 text-[11px] mt-1">{errors.review}</p>
            )}
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Profile Picture{" "}
              <span className="text-gray-400 font-normal normal-case">
                (optional)
              </span>
            </label>
            <input
              ref={imgRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />
            {form.profilePicPreview ? (
              <div className="flex items-center gap-3">
                <img
                  src={form.profilePicPreview}
                  alt="preview"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-200"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Photo uploaded
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      set("profilePic", null);
                      set("profilePicPreview", null);
                    }}
                    className="text-xs text-red-500 mt-1 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => imgRef.current.click()}
                className="w-full border-2 border-dashed border-gray-200 rounded-2xl py-6 flex flex-col items-center gap-2 text-gray-400 hover:border-indigo-300 hover:text-indigo-400 transition-colors bg-gray-50"
              >
                <Camera size={24} />
                <span className="text-xs font-medium">
                  Click to upload or drag & drop
                </span>
                <span className="text-[11px]">JPG, PNG up to 2MB</span>
              </button>
            )}
          </div>

          {/* Audio Review */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Audio Review{" "}
              <span className="text-gray-400 font-normal normal-case">
                (optional)
              </span>
            </label>
            <input
              ref={audioRef}
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleAudio}
            />
            {form.audioName ? (
              <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Mic size={16} className="text-indigo-500" />
                </div>
                <p className="text-sm text-indigo-700 font-medium flex-1 truncate">
                  {form.audioName}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    set("audio", null);
                    set("audioName", null);
                  }}
                  className="text-indigo-400 hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => audioRef.current.click()}
                className="w-full border-2 border-dashed border-gray-200 rounded-xl py-4 flex items-center justify-center gap-3 text-gray-400 hover:border-indigo-300 hover:text-indigo-400 transition-colors bg-gray-50"
              >
                <Mic size={18} />
                <span className="text-xs font-medium">
                  Upload audio review (MP3, WAV, M4A)
                </span>
              </button>
            )}
          </div>

          {/* Video Review */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Video Review{" "}
              <span className="text-gray-400 font-normal normal-case">
                (optional)
              </span>
            </label>
            <input
              ref={videoRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideo}
            />
            {form.videoName ? (
              <div className="flex items-center gap-3 bg-pink-50 border border-pink-100 rounded-xl px-4 py-3">
                <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                  <Video size={16} className="text-pink-500" />
                </div>
                <p className="text-sm text-pink-700 font-medium flex-1 truncate">
                  {form.videoName}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    set("video", null);
                    set("videoName", null);
                  }}
                  className="text-pink-400 hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => videoRef.current.click()}
                className="w-full border-2 border-dashed border-gray-200 rounded-xl py-4 flex items-center justify-center gap-3 text-gray-400 hover:border-pink-300 hover:text-pink-400 transition-colors bg-gray-50"
              >
                <Video size={18} />
                <span className="text-xs font-medium">
                  Upload video review (MP4, MOV, WEBM)
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95"
          >
            {initialData ? "Save Changes" : "Submit Review ✦"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DELETE CONFIRM MODAL
───────────────────────────────────────────── */
function DeleteModal({ review, onConfirm, onCancel }) {
  if (!review) return null;
  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative z-10 bg-white rounded-3xl p-7 w-full max-w-sm shadow-2xl mx-4">
        <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={28} className="text-red-500" />
        </div>
        <h3
          className="text-center font-bold text-gray-800 text-lg mb-1"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Delete Review?
        </h3>
        <p className="text-center text-gray-400 text-sm mb-6">
          <span className="font-semibold text-gray-600">{review.name}'s</span>{" "}
          review will be permanently removed. This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   REVIEW CARD
───────────────────────────────────────────── */
function ReviewCard({ review, onEdit, onDelete, onView }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.review.length > 160;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-indigo-100 transition-all duration-200 group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <Avatar
            name={review.name}
            src={review.profilePicPreview || review.profilePic}
            size={46}
          />
          <div className="min-w-0">
            <p
              className="font-bold text-gray-800 text-sm leading-tight truncate"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {review.name}
            </p>
            <p className="text-gray-400 text-xs mt-0.5 truncate">
              {review.designation} · {review.mobile}
            </p>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <StarRating value={review.rating} size={13} />
              {review.course && <Badge color="indigo">{review.course}</Badge>}
              {review.audioName && (
                <Badge color="amber">
                  <span className="flex items-center gap-1">
                    <Mic size={9} /> Audio
                  </span>
                </Badge>
              )}
              {review.videoName && (
                <Badge color="pink">
                  <span className="flex items-center gap-1">
                    <Video size={9} /> Video
                  </span>
                </Badge>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Review Text */}
      <div className="mt-3 pt-3 border-t border-gray-50">
        <p className="text-gray-600 text-sm leading-relaxed">
          {isLong && !expanded
            ? `${review.review.slice(0, 160)}…`
            : review.review}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-indigo-500 text-xs font-semibold mt-1 hover:underline"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
        <p className="text-gray-300 text-[11px]">{review.date}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onView && onView(review)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold transition-colors"
          >
            <Eye size={13} />
            View
          </button>
          <button
            onClick={() => onEdit(review)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-semibold transition-colors"
          >
            <Edit2 size={13} />
            Update
          </button>
          <button
            onClick={() => onDelete(review)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-colors"
          >
            <Trash2 size={13} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN: REVIEWS PAGE
───────────────────────────────────────────── */
export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRating, setFilterRating] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [viewTarget, setViewTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReviews();
    loadCourses();
  }, []);

  useEffect(() => {
    loadReviews();
  }, [search, filterRating]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await reviewApi.fetchReviews(search, filterRating || null);
      setReviews(data.map(r => ({
        ...r,
        date: r.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0],
        profilePic: r.hasProfilePic ? reviewApi.getFileUrl(r.id, 'profilePic') : null,
        audioName: r.hasAudio ? 'audio' : null,
        videoName: r.hasVideo ? 'video' : null
      })));
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const loadCourses = async () => {
    try {
      const data = await reviewApi.fetchCourses();
      setCourses(data);
    } catch (error) {
      console.error('Failed to load courses:', error);
    }
  };

  const showToast = (msg, type = "success") => setToast({ msg, type });

  /* ── CRUD handlers ── */
  const handleSave = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('mobile', data.mobile);
      formData.append('designation', data.designation || '');
      formData.append('course', data.course || '');
      formData.append('review', data.review);
      formData.append('rating', data.rating);
      
      if (data.profilePic instanceof File) formData.append('profilePic', data.profilePic);
      if (data.audio instanceof File) formData.append('audio', data.audio);
      if (data.video instanceof File) formData.append('video', data.video);

      if (editTarget) {
        await reviewApi.updateReview(editTarget.id, formData);
        showToast("Review updated successfully!");
      } else {
        await reviewApi.createReview(formData);
        showToast("Review added successfully!");
      }
      
      setFormOpen(false);
      setEditTarget(null);
      loadReviews();
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (review) => {
    setEditTarget(review);
    setFormOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      await reviewApi.deleteReview(deleteTarget.id);
      showToast("Review deleted.", "error");
      setDeleteTarget(null);
      loadReviews();
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (review) => {
    setViewTarget(review);
  };

  /* ── Filtering ── */
  const filtered = reviews;

  const avgRating = reviews.length
    ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
    : "—";
  const fiveStars = reviews.filter((r) => r.rating === 5).length;

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        className="flex-1 bg-gray-50 flex flex-col overflow-y-auto"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* ── Page Header ── */}
        <div className="px-8 pt-8 pb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1
                className="text-2xl font-extrabold text-gray-900 leading-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Reviews
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Manage all student testimonials for FlyGulf Academy
              </p>
            </div>
            <button
              onClick={() => {
                setEditTarget(null);
                setFormOpen(true);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95"
            >
              <Plus size={16} />
              Add Review
            </button>
          </div>

          {/* ── Stat Cards ── */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-2xl border border-gray-100 px-5 py-4">
              <p
                className="text-3xl font-extrabold text-indigo-500"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {reviews.length}
              </p>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mt-1">
                Total Reviews
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 px-5 py-4">
              <p
                className="text-3xl font-extrabold text-amber-500"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                ⭐ {avgRating}
              </p>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mt-1">
                Avg Rating
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 px-5 py-4">
              <p
                className="text-3xl font-extrabold text-emerald-500"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {fiveStars}
              </p>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mt-1">
                5-Star Reviews
              </p>
            </div>
          </div>
        </div>

        {/* ── Filters ── */}
        <div className="px-8 pb-4 flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[220px] max-w-sm">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:ring-2 focus:ring-indigo-200 transition"
              placeholder="Search name, designation, course…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Star filter */}
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl px-3 py-2">
            <span className="text-xs text-gray-400 font-medium mr-1">
              Filter:
            </span>
            {[0, 5, 4, 3, 2, 1].map((s) => (
              <button
                key={s}
                onClick={() => setFilterRating(s === filterRating ? 0 : s)}
                className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all ${filterRating === s && s !== 0 ? "bg-indigo-500 text-white" : s === 0 && filterRating === 0 ? "bg-indigo-500 text-white" : "text-gray-400 hover:bg-gray-50"}`}
              >
                {s === 0 ? "All" : `${s}★`}
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-400 ml-auto font-medium">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* ── Reviews Grid ── */}
        <div className="flex-1 px-8 pb-8">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <Star size={28} className="text-gray-300" />
              </div>
              <p className="text-gray-400 font-semibold">No reviews found</p>
              <p className="text-gray-300 text-sm mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {filtered.map((r) => (
                <ReviewCard
                  key={r.id}
                  review={r}
                  onEdit={handleEdit}
                  onDelete={setDeleteTarget}
                  onView={handleView}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Modals ── */}
      <ReviewFormModal
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditTarget(null);
        }}
        onSave={handleSave}
        initialData={editTarget}
        courses={courses}
      />

      <DeleteModal
        review={deleteTarget}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      {viewTarget && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setViewTarget(null)} />
          <div className="relative z-10 bg-white rounded-3xl p-6 w-full max-w-2xl shadow-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-bold text-gray-800 text-xl" style={{ fontFamily: "'Outfit', sans-serif" }}>Review Details</h3>
              <button onClick={() => setViewTarget(null)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar name={viewTarget.name} src={viewTarget.profilePic} size={60} />
                <div>
                  <p className="font-bold text-gray-800 text-lg">{viewTarget.name}</p>
                  <p className="text-gray-500 text-sm">{viewTarget.designation}</p>
                  <p className="text-gray-400 text-xs">{viewTarget.mobile}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StarRating value={viewTarget.rating} size={20} />
                <span className="text-sm font-semibold text-gray-600">({viewTarget.rating}/5)</span>
              </div>
              {viewTarget.course && (
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Course</p>
                  <Badge color="indigo">{viewTarget.course}</Badge>
                </div>
              )}
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Review</p>
                <p className="text-gray-700 text-sm leading-relaxed">{viewTarget.review}</p>
              </div>
              {viewTarget.profilePic && (
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Profile Picture</p>
                  <img src={viewTarget.profilePic} alt={viewTarget.name} className="w-full max-w-sm rounded-2xl border-2 border-gray-200" />
                </div>
              )}
              {viewTarget.audioName && (
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Audio Review</p>
                  <audio src={reviewApi.getFileUrl(viewTarget.id, 'audio')} controls className="w-full rounded-xl" />
                </div>
              )}
              {viewTarget.videoName && (
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Video Review</p>
                  <video src={reviewApi.getFileUrl(viewTarget.id, 'video')} controls className="w-full rounded-2xl border-2 border-gray-200" />
                </div>
              )}
              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400">Submitted on {viewTarget.date}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toast && (
        <Toast
          message={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
