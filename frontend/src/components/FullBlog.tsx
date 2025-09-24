import { useState, useEffect } from "react";
import type { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { AvatarComponent } from "./BlogCard";
import sakura from "../assets/sakura.png";
import { AddCommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { LikeButton } from "./LikeButton"; // ✅ LikeButton component
import axios from "axios";
import { BACKEND_URL } from "../config";
import BookmarkButton from "./BookmarkButton"


export const FullBlog = ({ blog }: { blog: Blog }) => {
  const [likes, setLikes] = useState(blog._count.likes || 0);
  const [liked, setLiked] = useState(blog["likedByCurrentUser?"] || false);
  const [loading, setLoading] = useState(false);

  // Optional: Re-fetch like count if needed on mount (if not reliable in props)
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${blog.id}/likes`);
        setLikes(res.data.count);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        console.error("Failed to load like count");
      }
    };
    fetchLikes();
  }, [blog.id]);

  const toggleLike = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in to like this post.");

    setLoading(true);

    try {
      if (liked) {
        await axios.delete(`${BACKEND_URL}/api/v1/blog/${blog.id}/like`, {
          headers: { Authorization: token }
        });
        setLikes(prev => Math.max(prev - 1, 0));
      } else {
        await axios.post(`${BACKEND_URL}/api/v1/blog/${blog.id}/like`, {}, {
          headers: { Authorization: token }
        });
        setLikes(prev => prev + 1);
      }

      setLiked(prev => !prev);
    } catch (err) {
      console.error("Error toggling like", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-400 via-gray-400 to-stone-400 flex flex-col">
      <Appbar />

      <div className="flex justify-center">
        <div className="w-full max-w-screen-xl px-4 md:px-10 pt-8 md:pt-12 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Blog content */}
          <div className="md:col-span-8">
            <h1 className="text-3xl md:text-5xl font-extrabold break-words">
              {blog.title}
            </h1>
            <div className="flex pt-5">
                <p className="text-slate-600 pt-1 text-md font-semibold md:text-base">
                    Posted on {new Date(blog.publishedDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    })}
                </p>
                <div className="pl-2">
                    <LikeButton count={likes} liked={liked} onClick={toggleLike} disabled={loading} />
                </div>
                <div className="mt-1">
                  <BookmarkButton blogId={blog.id}/>
                </div>
            </div>
            

            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {blog.tags.map((tag: { name: string }, index: number) => (
                  <span
                    key={index}
                    className="bg-rose-300 text-black-800 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-4 text-slate-800 font-medium text-base md:text-xl break-words whitespace-pre-line mb-20">
              {blog.content}
            </div>

            <div className="mt-12 mb-20">
              <h2 className="text-2xl font-bold mb-4">Comments:</h2>
              <AddCommentForm blogId={blog.id} />
              <CommentList blogId={blog.id} />
            </div>
          </div>

          {/* Author section */}
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

      {/* Scroll to Top */}
      <div className="fixed bottom-4 left-4 z-20 hidden md:block">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-rose-500 text-white px-4 py-2 rounded-full shadow hover:bg-rose-600 transition"
        >
          ↑ Top
        </button>
      </div>

      {/* Sakura */}
      <img
        src={sakura}
        alt="Sakura Tree"
        className="fixed -bottom-11 -right-6 w-30 pointer-events-none z-10 hidden 2xl:block"
      />
    </div>
  );
};
