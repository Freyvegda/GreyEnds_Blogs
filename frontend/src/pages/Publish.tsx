import { Appbar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                
                const blog = response.data.blog;
                if (blog) {
                    setTitle(blog.title);
                    setDescription(blog.content);
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
                // Add error handling here
            }
        };

        if (id) {
            fetchBlog();
        }
    }, [id]);

    return <div className="min-h-screen bg-gradient-to-br from-slate-400 via-gray-400 to-stone-400 flex flex-col">
        <Appbar/>
        <div className="flex justify-center w-full pt-8 "> 
            <div className="max-w-screen-lg w-full">
                <input value={title} onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className=" w-full bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2 " placeholder="Title" />

                <TextEditor
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    tags={tags}
                    setTags={setTags}
                />
                <button
                    onClick={async () => {
                        try {
                            let response;
                            if (id) {
                                // Update existing blog
                                response = await axios.put(`${BACKEND_URL}/api/v1/blog/${id}`, {
                                    title,
                                    content: description
                                }, {
                                    headers: {
                                        Authorization: localStorage.getItem("token")
                                    }
                                });
                            } else {
                                // Create new blog
                                response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                                    title,
                                    content: description,
                                    tags: tags.length > 0 ? tags : ["general"]
                                }, {
                                    headers: {
                                        Authorization: localStorage.getItem("token")
                                    }
                                });
                            }
                            if (response.data.id) {
                                navigate(`/blog/${response.data.id}`);
                            }
                        } catch (error) {
                            console.error("Error publishing/updating blog:", error);
                            // Add error handling here
                        }
                    }}
                    type="submit"
                    className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                >
                    {id ? "Update post" : "Publish post"}
                </button>
            </div>
        </div>
    </div>
}


import { useState, type ChangeEvent } from "react";

export function TextEditor({
  onChange,
  value,
  tags,
  setTags
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  tags: string[];
  setTags: (tags: string[]) => void;
}) {
  const [tagInput, setTagInput] = useState("");

  const handleTagAdd = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setTagInput("");
  };

  return (
    <div className="mt-2">
      <div className="w-full mb-4">
        <div className="flex items-center justify-between border">
          <div className="bg-white rounded-b-lg w-full">
            <label className="sr-only">Publish post</label>
            <textarea
              value={value}
              onChange={onChange}
              id="editor"
              rows={8}
              className="focus:outline-none block w-full px-0 text-lg text-gray-800 bg-white border-0 pl-2"
              placeholder="Write an article..."
              required
            />
          </div>
        </div>
      </div>

      {/* Tag input section */}
      <input
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            handleTagAdd();
          }
        }}
        type="text"
        className="mt-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-2 px-2"
        placeholder="Enter tags (press Enter or comma to add)"
      />

      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-200 text-blue-800 text-sm px-2 py-1 rounded-full"
          >
            {tag}
            <button
              className="ml-1 text-red-500"
              onClick={() =>
                setTags(tags.filter((t) => t !== tag))
              }
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
