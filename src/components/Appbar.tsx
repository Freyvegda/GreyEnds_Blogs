import { AvatarComponent } from "./BlogCard";
import { Link } from "react-router-dom";
import logo from '../assets/Logo.png';

interface ProfileImageProps {
    authorName: string;
}

export const Appbar = ({ authorName }: ProfileImageProps) => {
    return (
        <div className="w-full flex justify-between items-center mt-5 pt-2 pb-2 px-5 border-b border-stone-600 rounded-xl">
            {/* Left: Logo + Title */}
            <Link
                to="/blogs"
                className="flex items-center text-2xl font-semibold text-gray-700 hover:text-gray-900 transition"
            >
                <img src={logo} alt="GreyEnds Logo" className="w-10 h-10 mr-2" />
                GreyEnds
            </Link>

            {/* Right: New Button + Avatar + Welcome */}
            <div className="flex items-center space-x-4">
                <Link to="/publish">
                    <button
                        type="button"
                        className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 transition"
                    >
                        New
                    </button>
                </Link>

                <div className="flex items-center space-x-2 ">
                    <AvatarComponent name={authorName} />
                    <span className="text-base font-lg font-semibold hidden sm:block">
                        Welcome {authorName}
                    </span>
                </div>
            </div>
        </div>
    );
};
