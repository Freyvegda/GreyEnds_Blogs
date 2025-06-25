import { useComments } from "../hooks";


export const CommentList = ({ blogId }: { blogId: string }) => {
  const { comments, loading, error } = useComments(blogId);

  if (loading) return <p className="text-gray-600">Loading comments...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (comments.length === 0) return <p className="text-gray-600">No comments yet. Be the first!</p>;

  return (
    <div className="space-y-4 shadow">
      {comments.map(comment => (
        <div>
          <div key={comment.id} className="bg-transparent rounded-lg p-4 border-b border-slate-500">
            <div className="text-md text-gray-500 mb-1">
              <span className="font-semibold text-black">{comment.author.name}</span> on{" "}
              {new Date(comment.createdAt).toLocaleDateString()}
            </div>
            <div className="text-mc text-gray-800 whitespace-pre-wrap">{comment.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
