import { useState } from "react";
import { BlogCard } from "../components/BlogCard";
import sakura from "../assets/sakura.png";
import { Appbar } from "../components/Appbar";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks/index";
import type { Blog } from "../hooks";
import { SearchBar } from "../components/SearchBar";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState<"title" | "author" | "tags">("title");

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50">
        <Appbar />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <BlogSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const sortBlogs = (blogs: Blog[]) => {
    const sorted = [...blogs];

    // Always prioritize Freyvegda's blogs first
    sorted.sort((a, b) => {
      const isFreyA = a.author.name === "Freyvegda" ? 1 : 0;
      const isFreyB = b.author.name === "Freyvegda" ? 1 : 0;
      return isFreyB - isFreyA;
    });

    switch (sortBy) {
      case "title":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "oldest":
        sorted.sort(
          (a, b) =>
            new Date(a.publishedDate).getTime() -
            new Date(b.publishedDate).getTime()
        );
        break;
      case "newest":
      default:
        sorted.sort(
          (a, b) =>
            new Date(b.publishedDate).getTime() -
            new Date(a.publishedDate).getTime()
        );
    }

    return sorted;
  };

  const filteredBlogs = blogs.filter((blog) => {
    const value = searchTerm.toLowerCase();
    if (searchBy === "title") return blog.title.toLowerCase().includes(value);
    if (searchBy === "author") return blog.author.name.toLowerCase().includes(value);
    if (searchBy === "tags") return blog.tags?.some(tag => tag.name.toLowerCase().includes(value));
    return false;
  });

  const sortedBlogs = sortBlogs(filteredBlogs);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50 relative">
      <Appbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Search Bar with Sorting */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchBy={searchBy}
          setSearchBy={setSearchBy}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Blog Cards */}
        <div className="space-y-6">
          {sortedBlogs.length > 0 ? (
            sortedBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.publishedDate}
                tags={blog.tags}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500">No blogs found for the given search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 left-6 bg-gradient-to-r from-rose-400 to-orange-400 hover:from-rose-500 hover:to-orange-500 text-white w-14 h-14 rounded-full shadow-lg transition-all flex items-center justify-center z-10"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>

      {/* Decorative Sakura Tree Image */}
      <div className="fixed bottom-0 right-0 pointer-events-none opacity-50 z-0">
        <img
          src={sakura}
          alt="Sakura Tree"
          className="w-56 h-auto"
        />
      </div>
    </div>
  );
};