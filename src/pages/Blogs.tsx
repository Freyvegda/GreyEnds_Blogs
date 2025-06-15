import { BlogCard } from "../components/BlogCard"
import sakura from '../assets/sakura.png'; 
import { Appbar } from "../components/Appbar";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks/index"; 


export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>
            <Appbar authorName="Loading..."/> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    const authorName = blogs[0]?.author?.name || "Guest";

    return (
        <div className=" min-h-screen bg-gradient-to-br from-slate-400 via-gray-400 to-stone-400 flex justify-center px-4">
            <div className="w-full min-h-screen">
                <div className="h-20 ">
                    <Appbar authorName={authorName} />
                </div>  
                <div className="w-4xl mx-auto mt-5 flex justify-center flex-col items-center">
                     {blogs.map(blog => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            authorName={blog.author.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={"2nd Feb 2024"}
                        />
                    ))}
                </div>
            </div>
           <div className="fixed bottom-4 left-10 z-20">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="bg-rose-500 text-white px-3 py-2 mb-2 rounded-full shadow hover:bg-rose-600 transition"
                >
                    {/* Responsive label: only show "Top" on md and up */}
                    <span className="block md:hidden ">↑</span>
                    <span className="hidden md:inline">↑ Top</span>
                </button>
            </div>

            {/* Sakura Tree Image (hidden on small screens) */}
            <img
                src={sakura}
                alt="Sakura Tree"
                className="fixed -bottom-11 -right-6 w-22 pointer-events-none z-10 hidden 2xl:block"
            />
        </div>
    );
}

