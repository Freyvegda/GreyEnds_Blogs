import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
    tags?: { name: string }[];
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id,
    tags,
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all cursor-pointer border border-slate-200 rounded-lg p-6 w-full">
                {/* Author and Date Section */}
                <div className="flex items-center gap-2 mb-3">
                    <AvatarComponent name={authorName} />
                    <span className="text-slate-700 font-medium">{authorName}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 text-sm">
                        {new Date(publishedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </span>
                </div>

                {/* Title */}
                <h2 className="text-slate-800 text-2xl font-semibold mb-3">
                    {title}
                </h2>

                {/* Content Preview */}
                <p className="text-slate-600 mb-4 line-clamp-3">
                    {content.slice(0, 200) + " ..."}
                </p>

                {/* Tags */}
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className={`text-sm px-3 py-1 rounded-full font-medium ${
                                    index % 2 === 0
                                        ? 'bg-rose-100 text-rose-700'
                                        : 'bg-orange-100 text-orange-700'
                                }`}
                            >
                                #{tag.name}
                            </span>
                        ))}
                    </div>
                )}

                {/* Read Time */}
                <span className="text-slate-500 text-sm font-medium">
                    {`${Math.ceil(content.length / 1000)} minute(s) read`}
                </span>
            </div>
        </Link>
    );
};

export function AvatarComponent({ name }: { name: string }) {
    return (
        <div className="w-6 h-6 bg-gradient-to-br from-orange-300 to-rose-400 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-semibold">
                {name[0].toUpperCase()}
            </span>
        </div>
    );
}