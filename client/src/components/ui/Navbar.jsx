import { useState } from "react";
import { MdMenu, MdClose, MdLogout } from "react-icons/md";

const Navbar = ({ userName, onLogout }) => {
  const [navOpen, setNavOpen] = useState(false);

  const initial = userName ? userName.charAt(0).toUpperCase() : "U";

  const handleLogout = () => {
    setNavOpen(false);
    onLogout();
  };

  return (
    <nav className="bg-white/90 backdrop-blur border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-14">
          <span className="font-bold text-lg sm:text-xl text-teal-600">
            SurveyApp
          </span>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center font-semibold">
                {initial}
              </div>
              <span className="text-gray-700 text-sm font-medium">
                {userName}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="cursor-pointer flex items-center gap-1 px-3 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              <MdLogout size={16} />
              Logout
            </button>
          </div>

          <button
            onClick={() => setNavOpen(!navOpen)}
            className="cursor-pointer md:hidden p-2 rounded-md hover:bg-gray-100 transition"
          >
            {navOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
          </button>
        </div>
      </div>

      {navOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-3 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center font-semibold">
              {initial}
            </div>
            <span className="text-gray-700 font-medium">{userName}</span>
          </div>

          <button
            onClick={handleLogout}
            className="cursor-pointer w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm"
          >
            <MdLogout size={16} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
