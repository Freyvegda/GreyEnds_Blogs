import { useState } from "react";
import { Bookmark } from "lucide-react"; // rename to Bookmark for clarity
import axios from "axios";

interface BookmarkButtonProps {
  blogId: string;
  initialBookmarked?: boolean; 
}

export default function BookmarkButton({ blogId, initialBookmarked = false }: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [loading, setLoading] = useState(false);

  const toggleBookmark = async () => {
    setLoading(true);
    try {
      if (bookmarked) {
        // remove bookmark
        await axios.delete(`/api/blog/${blogId}/bookmark`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setBookmarked(false);
      } else {
        // add bookmark
        await axios.post(`/api/blog/${blogId}/bookmark`, {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setBookmarked(true);
      }
    } catch (e) {
      console.error("Error toggling bookmark", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      disabled={loading}
      className="p-1 rounded transition hover:scale-110"
    >
      <Bookmark
        size={20}
        strokeWidth={2}
        // Keep the stroke black in both states for consistency
        color={"black"} 
        // Only toggle the fill between black (for filled) and none (for outline)
        fill={bookmarked ? "black" : "none"}
      />
    </button>
  );
}
