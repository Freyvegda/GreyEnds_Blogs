import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
    id: number;
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id
}: BlogCardProps)=>{
    return <Link to={`/blog/${id}`}>
        <div className=" w-screen max-w-screen-lg border border-1 border-gray-800 rounded-xl  p-4 pb-4 mt-4 cursor-pointer justify-center mb-6 bg-gradient-to-br from-slate-400 to-neutral-400">
            <div className=" flex">
                <div className="flex justify-center flex-col pr-2">
                    <AvatarComponent name={authorName}/> 
                </div>
                
                <div className="text-md text-slate-800 font-normal pr-2 flex justify-center flex-col">
                    {authorName}
                </div>
                <div className="text-md text-slate-700 font-light justify-center flex-col flex">
                    |  {publishedDate}
                </div>
            </div>
            <div className="text-2xl font-semibold mt-2 tracking-normal">
                {title}
            </div>
            <div className="text-xl font-normal mt-2 tracking-normal">
                {content.slice(0,200) + " ..."}
            </div>
            <div className="text-md text-slate-600 font-normal mt-3">
                {`${Math.ceil(content.length / 1000)} minute(s) read`}
            </div>
        </div>
    </Link>
}

export function AvatarComponent({name}:{name:string}){
    return <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-normal text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>
}