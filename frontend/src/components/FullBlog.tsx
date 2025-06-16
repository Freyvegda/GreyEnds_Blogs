import type { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { AvatarComponent } from "./BlogCard"
import sakura from '../assets/sakura.png';
import { useAuth } from "../hooks";


export const FullBlog = ({ blog }: {blog: Blog}) => {
    const { User } = useAuth();
    const signInName = blog.author?.name === User?.name ? User.name : blog.author?.name || "Anonymous";
    
    return <div className="min-h-screen bg-gradient-to-br from-slate-400 via-gray-400 to-stone-400 flex flex-col">
        <Appbar authorName={signInName}/>
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-12">
                <div className="col-span-8 pr-8"> {/* Fixed padding */}
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on {new Date().toLocaleDateString()} {/* Added dynamic date */}
                    </div>
                    <div className="pt-4 text-slate-800 font-semibold text-xl"> {/* Fixed text color */}
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4 rounded-lg px-2 pt-2 pl-10">
                    <div className="text-black-300 text-lg">
                        Author:
                    </div>
                    <div className="flex w-full justify-start items-center pt-4 pb-4 ">
                        <div className="pr-4 flex justify-center pb-14">
                            <AvatarComponent name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold pb-1">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-black-500">
                                Random catch phrase about the author's ability to grab the user's attention
                            </div>
                        </div>
                    </div>  
                </div>
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
        <img
            src={sakura}
            alt="Sakura Tree"
            className="fixed -bottom-11 -right-6 w-22 pointer-events-none z-10 hidden 2xl:block"
        />
    </div>
}