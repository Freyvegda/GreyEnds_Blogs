import { AvatarComponent } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/Logo.png';
import { useAuth } from "../hooks/index";

export const Appbar = () => {
    const { User, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/signin");
    };

    return (
        <div className="w-full flex justify-between items-center pt-5 pb-4 px-0 sm:px-5 border-b border-l border-r border-stone-600 rounded-xl">
            {/* Left: Logo + Title */}
            <Link
                to="/blogs"
                className="flex items-center text-xl sm:text-2xl font-semibold text-gray-700 hover:text-gray-900 transition pl-2 sm:pl-4"
            >
                <img src={logo} alt="GreyEnds Logo" className="w-8 h-8 sm:w-10 sm:h-10 mr-2" />
                GreyEnds
            </Link>

            {/* Right: New Button + Avatar + Welcome + Logout */}
            <div className="flex items-center space-x-2 sm:space-x-4 pr-3 sm:pr-0">
                <Link to="/publish">
                    <button
                        type="button"
                        className="text-sm sm:text-sm bg-transparent sm:bg-gray-700 hover:bg-gray-100 sm:hover:bg-gray-800 text-gray-800 sm:text-white border border-gray-300 sm:border-0 font-medium rounded-full px-3 py-1 sm:px-5 sm:py-2.5 transition"
                    >
                        New
                    </button>
                </Link>

                {User && (
                    <div className="flex items-center space-x-2">
                        <AvatarComponent name={User.name} />
                        <span className="text-base font-semibold hidden sm:block">
                            Welcome {User.name}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="text-white bg-red-500 hover:bg-red-600 rounded-xl px-3 py-1 text-sm"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
