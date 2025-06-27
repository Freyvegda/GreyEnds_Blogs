import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
    id: string,
    tags?: { name: string }[];
    likes: number;
    likedByCurrentUser?: boolean;
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id,
    tags,
}: BlogCardProps)=>{
    return <Link to={`/blog/${id}`}>
        <div className=" w-screen max-w-screen-lg border border-1 border-gray-800 rounded-xl  p-4 pb-4 mt-4 cursor-pointer justify-center mb-6 bg-gradient-to-r from-slate-400 to-gray-300 mx-3">
            <div className=" flex">
                <div className="flex justify-center flex-col pr-2">
                    <AvatarComponent name={authorName}/> 
                </div>
                
                <div className="text-md text-slate-800 font-normal pr-2 flex justify-center flex-col">
                    {authorName}
                </div>
                <div className="text-md text-slate-700 font-light justify-center flex-col flex">
                    |  {new Date(publishedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                    })}
                </div>
                
            </div>
            <div className="text-2xl font-semibold mt-2 tracking-normal">
                {title}
            </div>
            <div className="text-xl font-normal mt-2 tracking-normal">
                {content.slice(0,200) + " ..."}
            </div>
            <div className="text-md text-zinc-700 font-semibold mt-3">
                {`${Math.ceil(content.length / 1000)} minute(s) read`}
            </div>
            {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, index) => (
                        <span key={index} className="bg-red-200 text-black text-xs font-semibold px-2 py-1 rounded-full">
                            #{tag.name}
                        </span>
                    ))}
                </div>
            )}
        </div>
    </Link>
}

export function AvatarComponent({name}:{name:string}){
    return <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-normal text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>
}