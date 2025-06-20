import type { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { AvatarComponent } from "./BlogCard"
import sakura from '../assets/sakura.png';

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-400 via-gray-400 to-stone-400 flex flex-col">
            <Appbar/>

            <div className="flex justify-center">
                <div className="w-full max-w-screen-xl px-4 md:px-10 pt-8 md:pt-12 grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Blog content */}
                    <div className="md:col-span-8">
                        <h1 className="text-3xl md:text-5xl font-extrabold break-words">
                            {blog.title}
                        </h1>
                        <p className="text-slate-600 pt-2 text-sm md:text-base">
                            Posted on {new Date(blog.publishedDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                        <div className="pt-4 text-slate-800 font-medium text-base md:text-xl break-words whitespace-pre-line mb-20">
                            {blog.content}
                        </div>
                    </div>

                    {/* Author section (mobile optimized) */}
                    <div className="md:col-span-4 rounded-lg px-2 md:px-4 pt-4 md:pt-2 mt-8 md:mt-0 border-t border-gray-800 md:border-none pb-8 md:pb-0">
                        <div className="text-black-300 text-base md:text-lg font-semibold">
                            Author:
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center pt-4 gap-4">
                            <div className="sm:pr-2 flex justify-center pb-12">
                                <AvatarComponent name={blog.author.name || "Anonymous"} />
                            </div>
                            <div>
                                <div className="text-lg md:text-xl font-bold">
                                    {blog.author.name || "Anonymous"}
                                </div>
                                <p className="pt-2 text-black-500 text-sm md:text-base mb-4 pb-2">
                                    {blog.author.catchPhrase || "A passionate writer who loves to share knowledge."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button – Only visible on md+ */}
            <div className="fixed bottom-4 left-4 z-20 hidden md:block">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="bg-rose-500 text-white px-4 py-2 rounded-full shadow hover:bg-rose-600 transition"
                >
                    ↑ Top
                </button>
            </div>

            {/* Sakura Image – visible on 2xl+ */}
            <img
                src={sakura}
                alt="Sakura Tree"
                className="fixed -bottom-11 -right-6 w-30 pointer-events-none z-10 hidden 2xl:block"
            />
        </div>
    );
};

