import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { jwtDecode } from "jwt-decode"
import { useCallback } from "react";

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

export interface Comment{
    id: string,
    content: string,
    createdAt: string,
    author:{
        name: string
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
    const updateUser = (updatedFields: Partial<decodedUser>) => {
        setUser((prev) => (prev ? { ...prev, ...updatedFields } : prev));
    };

    return { User, logout, updateUser };
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

export const useComments = (blogId: string) =>{
    const [loading, setLoading] = useState(true);
    const [comments, setComments]= useState<Comment[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchComments = useCallback(async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/v1/blog/comment/${blogId}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            setComments(res.data.comments)
        }
        catch {
            setError("Failed to load comments");
        }
        finally {
            setLoading(false)
        }
    }, [blogId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    return {
        loading,
        comments,
        error,
        refresh: fetchComments
    }
}


export const useAddComment = (blogId: string, onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postComment = async (content: string) => {
    try {
      setLoading(true);
      await axios.post(`${BACKEND_URL}/api/v1/blog/comment`, {
        blogId,
        content
      }, {
        headers: {
          Authorization: localStorage.getItem("token"),
         'Content-Type': 'application/json'
        }
      });

      onSuccess?.();
    } catch {
      setError("Failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  return {
    postComment,
    loading,
    error
  };
};
