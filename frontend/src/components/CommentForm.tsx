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
        className="mt-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-4 rounded transition disabled:opacity-50"
      >
        {loading ? "Posting..." : "Post Comment"}
      </button>
    </div>
  );
};
