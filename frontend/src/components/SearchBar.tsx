import type { FC } from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchBy: "title" | "author" | "tags";
  setSearchBy: (value: "title" | "author" | "tags") => void;
  sortBy?: "newest" | "oldest" | "title";
  setSortBy?: (value: "newest" | "oldest" | "title") => void;
}

export const SearchBar: FC<SearchBarProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  searchBy, 
  setSearchBy,
  sortBy = "newest",
  setSortBy
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form reload
  };

  const handleSearch = () => {
    // Trigger search action if needed
  };

  const handleSort = (value: "newest" | "oldest" | "title") => {
    if (setSortBy) {
      setSortBy(value);
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 mb-8 border border-slate-200 max-w-3xl mx-auto w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-4 items-center">
          {/* Sort dropdown */}
          <select
            className="w-[140px] px-3 py-2 text-sm border border-slate-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-rose-400"
            value={sortBy}
            onChange={(e) => handleSort(e.target.value as "newest" | "oldest" | "title")}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="title">Title</option>
          </select>

          {/* Search input and button */}
          <div className="flex-1 flex gap-2">
            {/* Search category dropdown */}
            <select
              className="w-[120px] px-3 py-2 text-sm border border-slate-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-rose-400"
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value as "title" | "author" | "tags")}
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="tags">Tags</option>
            </select>

            <div className="relative flex-1">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
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
                className="block w-full px-4 py-2 ps-10 text-sm text-black bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                placeholder={`Search by ${searchBy}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-rose-400 to-orange-400 hover:from-rose-500 hover:to-orange-500 text-white font-medium rounded-md text-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              <svg
                className="w-4 h-4"
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
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};