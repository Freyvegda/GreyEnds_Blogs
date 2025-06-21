import { BlogCard } from "../components/BlogCard"
import sakura from '../assets/sakura.png'; 
import { Appbar } from "../components/Appbar";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks/index"; 



export const Blogs = () => {
    const { loading, blogs } = useBlogs();


    if (loading) {
        return <div className="min-h-screen h-full bg-gradient-to-br from-slate-400 via-gray-400 to-stone-400 ">
            <Appbar/> 
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

    

    return (
        <div className=" min-h-screen bg-gradient-to-br from-slate-400 via-gray-400 to-stone-400 flex justify-center sm:px-4 px-2">
            <div className="w-full min-h-screen">
                <div className="h-20 ">
                    <Appbar />
                </div>  
                <div className="w-4xl mx-auto mt-5 flex justify-center flex-col items-center ">
                     {blogs.map(blog => (
                        <div key={blog.id} className="">
                            <BlogCard
                                key={blog.id}
                                id={blog.id}
                                authorName={blog.author.name || "Anonymous"}
                                title={blog.title}
                                content={blog.content}
                                publishedDate={blog.publishedDate}
                                tags={blog.tags}
                            />
                        </div>
                    ))}
                </div>
            </div>
           <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 md:left-10 md:translate-x-0 z-20">
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="bg-rose-500 text-white px-3 py-2 rounded-full shadow hover:bg-rose-600 transition"
            >
                <span className="block md:hidden">↑</span>
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

