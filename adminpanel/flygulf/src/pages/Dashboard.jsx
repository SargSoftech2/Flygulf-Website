import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Star, MessageSquare, Image, MapPin,BookOpen } from "lucide-react";
import ReviewsPage from "../components/Reviewspage";
import ContactEnquiries from "../admin/contactEnquiry";
import GalleryAdmin from "../components/GalleryAdmin";
import CenterAddress from "../admin/centerAddress"; // ✅ Added
import CoursesPage from "../admin/coursesPage"; 

function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const navigate = useNavigate();

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: (
        <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
          <div className="bg-blue-400 rounded-sm"></div>
          <div className="bg-green-400 rounded-sm"></div>
          <div className="bg-yellow-400 rounded-sm"></div>
          <div className="bg-red-400 rounded-sm"></div>
        </div>
      ),
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: <Star size={20} className="text-pink-500 fill-pink-400" />,
    },
    {
      id: "enquiries",
      label: "Contact Enquiries",
      icon: <MessageSquare size={20} className="text-indigo-400" />,
    },
    {
      id: "gallery",
      label: "Gallery",
      icon: <Image size={20} className="text-purple-500" />,
    },
    {
      id: "centeraddress",                                         // ✅ Added
      label: "Center Address",
      icon: <MapPin size={20} className="text-emerald-500" />,
    },

    {
  id: "courses",
  label: "Courses",
  icon: <BookOpen size={20} className="text-blue-500" />,
},
  ];

  const pageTitle = navItems.find((item) => item.id === activePage)?.label;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ════════════ SIDEBAR ════════════ */}
      <aside className="w-64 bg-white h-screen flex flex-col border-r border-gray-100 shadow-sm flex-shrink-0">
        {/* Logo */}
        <div className="px-6 py-5 flex items-center gap-3 border-b border-gray-100">
          <div className="w-10 h-10 bg-green-700 rounded-xl flex items-center justify-center shadow">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-gray-800 text-base leading-tight">FlyGulf</p>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 pt-6">
          <p className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase px-2 mb-3">
            Main Menu
          </p>
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                    ${isActive
                      ? "bg-indigo-500 text-white shadow-md shadow-indigo-200"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                  {isActive && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-white opacity-70"></span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Logout */}
        <div className="px-4 py-5 border-t border-gray-100">
          <button
            onClick={() => navigate("/login")}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ════════════ MAIN AREA ════════════ */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
            <h2 className="text-lg font-bold text-gray-800">{pageTitle}</h2>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <LogOut size={16} />
            Logout
          </button>
        </header>

        {/* ── PAGE: DASHBOARD ── */}
        {activePage === "dashboard" && (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Dashboard</h1>
              <p className="text-gray-400 text-base">Welcome back, Admin 👋</p>
            </div>
          </div>
        )}
        {/* ── PAGE: COURSES ── */}
        {activePage === "courses" && <CoursesPage />}


        {/* ── PAGE: REVIEWS ── */}
        {activePage === "reviews" && <ReviewsPage />}

        {/* ── PAGE: CONTACT ENQUIRIES ── */}
        {activePage === "enquiries" && (
          // <div className="flex-1 overflow-y-auto">
            <ContactEnquiries />
          // </div>
        )}

        {/* ── PAGE: GALLERY ── */}
        {activePage === "gallery" && <GalleryAdmin />}

        {/* ── PAGE: CENTER ADDRESS ── */}
        {activePage === "centeraddress" && (  // ✅ Added
          // <div className="flex-1 overflow-y-auto">
            <CenterAddress />
          // </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;