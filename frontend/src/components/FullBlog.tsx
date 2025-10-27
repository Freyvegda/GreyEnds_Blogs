import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { AddCommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { LikeButton } from "./LikeButton";
import BookmarkButton from "./BookmarkButton";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(blog._count.likes || 0);
  const [liked, setLiked] = useState(blog["likedByCurrentUser?"] || false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${blog.id}/likes`);
        setLikes(res.data.count);
      } catch (error) {
        console.error("Failed to load like count", error);
        
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Appbar />
      
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Back Button */}
        <button
          onClick={() => navigate('/blogs')}
          className="mb-6 -ml-4 text-slate-600 hover:text-slate-800 flex items-center gap-2 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all blogs
        </button>

        {/* Blog Article */}
        <article className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 md:p-12">
          {/* Blog Header */}
          <div className="mb-6">
            <h1 className="text-slate-800 text-3xl md:text-4xl font-bold mb-4 break-words">
              {blog.title}
            </h1>
            
            {/* Date, Like, and Bookmark */}
            <div className="flex flex-wrap gap-4 text-slate-600 mb-6 items-center">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">
                  {new Date(blog.publishedDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">
                  {`${Math.ceil(blog.content.length / 1000)} min read`}
                </span>
              </div>
              <LikeButton count={likes} liked={liked} onClick={toggleLike} disabled={loading} />
              <BookmarkButton blogId={blog.id} />
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-300 to-rose-400 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {(blog.author.name || "Anonymous")[0].toUpperCase()}
                </span>
              </div>
              <div>
                <div className="text-slate-800 font-medium">{blog.author.name || "Anonymous"}</div>
                <div className="text-slate-500 text-sm">Author</div>
              </div>
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex items-center gap-3 flex-wrap mb-6">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {blog.tags.map((tag: { name: string }, index: number) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      index % 2 === 0
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}

            <div className="border-t border-slate-200"></div>
          </div>

          {/* Blog Content */}
          <div className="prose prose-slate max-w-none mb-8">
            {blog.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-slate-800 text-2xl font-semibold mt-8 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              } else if (paragraph.match(/^\d+\.\s/)) {
                const listItems = paragraph.split('\n').filter(item => item.trim());
                return (
                  <ol key={index} className="list-decimal list-inside space-y-2 mb-6">
                    {listItems.map((item, i) => (
                      <li key={i} className="text-slate-700 leading-relaxed">
                        {item.replace(/^\d+\.\s/, '')}
                      </li>
                    ))}
                  </ol>
                );
              } else {
                return (
                  <p key={index} className="text-slate-700 mb-4 leading-relaxed break-words whitespace-pre-line">
                    {paragraph}
                  </p>
                );
              }
            })}
          </div>

          <div className="border-t border-slate-200 mb-6"></div>

          {/* Author Bio */}
          <div className="bg-slate-50 rounded-lg p-6 mb-8">
            <div className="text-slate-800 text-lg font-semibold mb-4">About the Author</div>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-300 to-rose-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl font-semibold">
                  {(blog.author.name || "Anonymous")[0].toUpperCase()}
                </span>
              </div>
              <div>
                <div className="text-slate-800 font-semibold text-lg mb-1">
                  {blog.author.name || "Anonymous"}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {blog.author.catchPhrase || "A passionate writer who loves to share knowledge."}
                </p>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-12">
            <h2 className="text-slate-800 text-2xl font-bold mb-6">Comments</h2>
            <AddCommentForm blogId={blog.id} />
            <CommentList blogId={blog.id} />
          </div>
        </article>
      </div>
    </div>
  );
};