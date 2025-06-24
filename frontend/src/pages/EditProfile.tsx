import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/index";

export const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");
  const [message, setMessage] = useState("");
  const { updateUser } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/user/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setName(res.data.name);
        setEmail(res.data.email);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${BACKEND_URL}/api/v1/user/update`, {
        name,
        email,
        password: password.length > 0 ? password : undefined,
        catchPhrase,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (res.status === 200) {
        setMessage("Profile updated successfully!");
        updateUser({ name });
        setPassword(""); // clear password field
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-400 via-gray-400 to-stone-400 flex flex-col">
      <Appbar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-sm w-full bg-transparent p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-5 text-center border-b border-slate-800 pb-1">Edit Profile</h2>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="w-full mb-3 bg-gray-50 border border-slate-500 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-3 bg-slate-400 placeholder:text-black"
            placeholder="Name"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full mb-3 bg-gray-50 border border-slate-500 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-3 bg-slate-400 placeholder:text-black"
            placeholder="Email"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full mb-3 bg-gray-50 border border-slate-500 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-3 bg-slate-400 placeholder:text-black"
            placeholder="New Password (leave blank to keep current)"
          />
          <input
            value={catchPhrase}
            onChange={(e) => setCatchPhrase(e.target.value)}
            type="text"
            className="w-full mb-3 bg-gray-50 border border-slate-500 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-3 bg-slate-400 placeholder:text-black"
            placeholder="New CatchPhrase (leave blank to keep current)"
          />

          <button
            onClick={handleUpdate}
            className="w-full bg-rose-400 hover:bg-rose-500 text-white py-2.5 px-5 text-md font-medium rounded-lg transition mt-5"
          >
            Save Changes
          </button>

          {message && (
            <p className="mt-3 text-center text-sm text-gray-800">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};
