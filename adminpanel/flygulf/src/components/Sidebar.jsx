import { useNavigate } from "react-router-dom";
import { Star, LogOut, MessageSquare } from "lucide-react";

function Sidebar({ activePage, setActivePage }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

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
      id: "Gallary",
      label: "Gallery",
      icon: <Star size={20} className="text-pink-500 fill-pink-400" />,

    }
  ];

  return (
    <aside className="w-64 bg-white h-screen flex flex-col border-r border-gray-100 shadow-sm">
      {/* Logo */}
      <div className="px-6 py-5 flex items-center gap-3 border-b border-gray-100">
        <div className="w-10 h-10 bg-green-700 rounded-xl flex items-center justify-center shadow">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 2a8 8 0 110 16A8 8 0 0112 4z" opacity="0.4" />
          </svg>
        </div>
        <div>
          <p className="font-bold text-gray-800 text-base leading-tight">FlyGulf</p>
          <p className="text-xs text-gray-400">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
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
                  ${
                    isActive
                      ? "bg-indigo-500 text-white shadow-md shadow-indigo-200"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
              >
                <span className={isActive ? "opacity-100" : "opacity-80"}>
                  {item.icon}
                </span>
                {item.label}
                {isActive && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-white opacity-70"></span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="px-4 py-5 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;