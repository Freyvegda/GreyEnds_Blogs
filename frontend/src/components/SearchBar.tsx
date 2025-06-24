import type { FC } from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchBy: "title" | "author" | "tags";
  setSearchBy: (value: "title" | "author" | "tags") => void;
}

export const SearchBar: FC<SearchBarProps> = ({ searchTerm, setSearchTerm, searchBy, setSearchBy }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form reload
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto w-full">
      <label htmlFor="blog-search" className="mb-2 text-sm font-medium text-black sr-only">
        Search
      </label>
      <div className="flex gap-2 items-center  border-2 border-slate-500 rounded-xl">
        {/* Dropdown for search category */}
        <div>
          <select
            className="px-2 py-1 ml-3 text-lg border-2 border-slate-500 rounded-xl bg-transparent text-black"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value as "title" | "author" | "tags")}
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="tags">Tags</option>
          </select>
        </div>

        {/* Search input */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="blog-search"
            className="block w-full p-4 ps-10 text-lg text-black bg-transparent"
            placeholder={`Search by ${searchBy}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="text-black absolute end-2.5 bottom-2.5 bg-rose-300 hover:bg-rose-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-md px-4 py-2 mb"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};
