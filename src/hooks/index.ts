import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";


export interface Blog {
    "content": string;
    "title": string;
    "id": number
    "author": {
        "name": string
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    const [error, setError] = useState<string>();


    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if (!token) {
            setError("Not authenticated");
            setLoading(false);
            return;
        }

        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setBlog(response.data.blogs);
        })
        .catch(error => {
            setError(error.response?.data?.error || 'Failed to fetch blog');
        })
        .finally(() => {
            setLoading(false);
        });
    }, [id]);

    return {
        loading,
        blog,
        error
    };
}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if (!token) {
            setError("Not authenticated");
            setLoading(false);
            return;
        }

        axios.get(`${BACKEND_URL}/api/v1/blogs/bulk`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setBlogs(response.data.posts); // Changed from 'blogs' to 'posts'
        })
        .catch(error => {
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                window.location.href = "/signin";
            }
            setError(error.response?.data?.error || 'Failed to fetch blogs');
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    return {
        loading,
        blogs,
        error
    };
};