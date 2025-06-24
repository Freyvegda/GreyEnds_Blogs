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
  const [sortOption, setSortOption] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState<"title" | "author" | "tags">("title");

  if (loading) {
    return (
      <div className="min-h-screen h-full bg-gradient-to-br from-slate-400 via-gray-400 to-stone-400">
        <Appbar />
        <div className="flex justify-center">
          <div>
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

    switch (sortOption) {
      case "title-az":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-za":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
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
    <div className="min-h-screen bg-gradient-to-br from-slate-400 via-gray-400 to-stone-400 flex justify-center sm:px-4 px-2">
      <div className="w-full min-h-screen">
        <div className="h-20">
          <Appbar />
        </div>

        <div className="w-full max-w-4xl mx-auto mt-6 px-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            {/* Search Bar */}
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchBy={searchBy}
              setSearchBy={setSearchBy}
            />

            {/* Sorting Dropdown */}
            <div className="flex justify-end">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-3 ml-1 py-2 bg-transparent text-black font-semibold border-slate-500 rounded-lg border-2 appearance-none"
              >
                <option className="bg-transparent text-black" value="newest">Newest</option>
                <option className="bg-transparent text-black" value="oldest">Oldest</option>
                <option className="bg-transparent text-black" value="title-az">Title A-Z</option>
                <option className="bg-transparent text-black" value="title-za">Title Z-A</option>
              </select>
            </div>
          </div>

          {/* Blog Cards */}
          <div className="flex flex-col items-center mt-6">
            {sortedBlogs.length > 0 ? (
              sortedBlogs.map((blog) => (
                <div key={blog.id}>
                  <BlogCard
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={blog.publishedDate}
                    tags={blog.tags}
                  />
                </div>
              ))
            ) : (
              <div className="text-center text-lg text-white mt-10">
                <p>No blogs found for the given search.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 md:left-10 md:translate-x-0 z-20">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-rose-500 text-white px-3 py-2 rounded-full shadow hover:bg-rose-600 transition"
        >
          <span className="block md:hidden">↑</span>
          <span className="hidden md:inline">↑ Top</span>
        </button>
      </div>

      {/* Sakura Tree Image */}
      <img
        src={sakura}
        alt="Sakura Tree"
        className="fixed -bottom-11 -right-6 w-22 pointer-events-none z-10 hidden 2xl:block"
      />
    </div>
  );
};
