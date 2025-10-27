import { useState } from "react";
import { useAddComment } from "../hooks/index";

export const AddCommentForm = ({ blogId }: { blogId: string }) => {
  const [content, setContent] = useState("");
  const { postComment, loading } = useAddComment(blogId, () => {
    setContent("");
  });

  return (
    <div className="mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="w-full bg-transparent p-3 rounded-xl border-2 border-black-400 focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
        rows={3}
      />
      <button
        onClick={() => {
          if (content.trim()) {
            postComment(content);
          }
        }}
        disabled={loading || !content.trim()}
        className="px-4 py-2 bg-gradient-to-r from-rose-400 to-orange-400 hover:from-rose-500 hover:to-orange-500 text-white font-medium rounded-md text-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
      >
        {loading ? "Posting..." : "Post Comment"}
      </button>
    </div>
  );
};
