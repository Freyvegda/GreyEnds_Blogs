import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { jwtDecode } from "jwt-decode"

export interface decodedUser{
    "id": string,
    "name": string
}   

export interface Blog {
    "tags": { name: string; }[] | undefined;
    "content": string;
    "title": string;
    "id": string;  // Changed from number to string since Prisma uses string IDs
    "publishedDate": string;
    "author": {
        "name": string,
        "catchPhrase": string
    }
}


export const useAuth=()=>{
    const [User, setUser] = useState<decodedUser | null>(null)
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            try{
                const decoded = jwtDecode<decodedUser>(token);
                setUser(decoded);
            }
            catch(err){
                console.error("invalid token", err);
                setUser(null)
            }
        }
    }, [])
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

  return { User, logout };
}


export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false);
            })
    }, [id])

    return {
        loading,
        blog
    }

}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blogs
    }
}