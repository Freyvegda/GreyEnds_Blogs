import React from "react";
import clsx from "clsx";

interface LikeButtonProps {
  count: number;
  liked: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ count, liked, onClick, disabled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={liked}
      aria-label={liked ? "Unlike this blog" : "Like this blog"}
      className={clsx(
        "flex items-center gap-1 rounded-md border border-transparent p-1 text-md text-slate-800 transition-all",
        "hover:bg-rose-300 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none font-semibold"
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={liked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.645 20.91a.752.752 0 0 0 .71 0l.007-.003.022-.012c.095-.054.229-.133.383-.218a25.18 25.18 0 0 0 4.244-3.17C19.562 15.36 22 12.174 22 8.25 22 5.322 19.536 3 16.562 3A5.5 5.5 0 0 0 12 5.052 5.5 5.5 0 0 0 7.688 3C4.714 3 2.25 5.322 2.25 8.25c0 3.925 2.438 7.111 4.739 9.256a25.18 25.18 0 0 0 4.244 3.17c.154.085.288.164.383.218l.022.012.007.004Z"
        />
      </svg>
      <span title={liked ? "Unlike" : "Like"}>{count}</span>
    </button>
  );
};
