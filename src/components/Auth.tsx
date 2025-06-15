import type { ChangeEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { SignupInput } from "frey_medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config"
import { Eye, EyeOff } from "lucide-react";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        username: "",
        email: "",
        password: ""
    });

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (e: Error | unknown) {
            const error = e as Error;
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 401) {
                    alert("Wrong ID or password");
                } else {
                    alert(`Error: ${e.response?.data?.message || "Something went wrong"}`);
                }
            } else {
                alert(`Network or server error: ${ error.message}`);
            }
    }
    }
    
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-4xl font-extrabold text-center text-gray-800">
                        Create an account
                    </div>
                    <div className="text-slate-500 text-lg text-center font-semibold pt-2 ">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?" }
                        <Link className="pl-2 underline text-slate-800" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
                </div>
                <div className="pt-5">
                    {type === "signup" ? <LabelledInput label="Username" placeholder="JohnDoe" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            username: e.target.value
                        })
                    }} /> : null}
                    <LabelledInput label="Email" placeholder="xyz@gmail.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }} />
                    <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <div className="mt-1.5">
                        <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-900 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}
 
function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
        <div className="relative">
            <label className="block mb-2 text-xl text-black font-bold pt-4">{label}</label>
            <input
                onChange={onChange}
                type={isPassword && !showPassword ? "password" : "text"}
                className="bg-gray-200 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                placeholder={placeholder}
                required
            />
            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-[67px] text-gray-600 hover:text-gray-800"
                    tabIndex={-1}
                >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
            )}
        </div>
    );
}
