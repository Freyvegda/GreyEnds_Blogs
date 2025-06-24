import { useState, useRef, useEffect } from "react";
import { AvatarComponent } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import { useAuth } from "../hooks/index";
import { ChevronDown } from "lucide-react";

export const Appbar = () => {
  const { User, logout } = useAuth();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full flex justify-between items-center pt-5 pb-4 px-0 sm:px-5 border-b border-l border-r border-stone-600 rounded-xl">
      {/* Left: Logo + Title */}
      <Link
        to="/blogs"
        className="flex items-center text-xl sm:text-2xl font-semibold text-gray-700 hover:text-gray-900 transition pl-2 sm:pl-4"
      >
        <img
          src={logo}
          alt="GreyEnds Logo"
          className="w-8 h-8 sm:w-10 sm:h-10 mr-2"
        />
        GreyEnds
      </Link>

      {/* Right: New Button + Dropdown */}
      <div className="flex items-center space-x-2 sm:space-x-4 pr-3 sm:pr-0 relative">
        <Link to="/publish">
          <button
            type="button"
            className="text-sm font-semibold sm:text-sm bg-slate-500 sm:bg-gray-700 hover:bg-gray-100 sm:hover:bg-gray-800 text-white sm:text-white border border-gray-300 sm:border-0 rounded-full px-3 py-1 sm:px-5 sm:py-2.5 transition ml-3 sm:ml-0"
          >
            New
          </button>
        </Link>

        {User && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpenDropdown((prev) => !prev)}
              className="flex items-center space-x-2 focus:outline-none w-xl"
            >
              <AvatarComponent name={User.name} />
              <span className="text-base font-semibold hidden sm:block">
                {User.name}
              </span>
              <ChevronDown className="w-5 h-5 mt-1 text-black" />
            </button>

            {openDropdown && (
              <div className="absolute right-0 mt-2 w-39 bg-gray-500 rounded-lg shadow-lg z-50 border">
                <Link
                  to="/edit"
                  className="block px-4 py-2 text-lg font-semibold text-green-400 hover:bg-emerald-800 rounded-t-lg border-b border-stone-700"
                  onClick={() => setOpenDropdown(false)}
                >
                  Edit Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-lg font-semibold text-red-400 hover:bg-red-800 rounded-b-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
