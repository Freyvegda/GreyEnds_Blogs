import type { ChangeEvent } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Feather, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface SignupInput {
    name?: string;
    email: string;
    password: string;
    catchPhrase?: string;
}

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: "",
        catchPhrase: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function sendRequest() {
        setIsLoading(true);
        try {
            const endpoint = type === "signup" ? "signup" : "signin";
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${endpoint}`, postInputs);

            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);

            // navigate to blogs after successful login/signup
            navigate("/blogs");
        } catch (err: unknown) {
            console.error(err);

            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401) {
                    alert("Wrong email or password");
                } else {
                    alert(`Error: ${err.response?.data?.message || "Something went wrong"}`);
                }
            } else {
                alert("Network error. Please check your connection.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-rose-50 via-orange-50 to-white relative overflow-hidden">
            {/* Animated Background Orbs */}
            <motion.div
                className="absolute w-96 h-96 bg-gradient-to-br from-orange-300/20 to-rose-300/20 rounded-full blur-3xl"
                animate={{
                    x: [0, 100, 0],
                    y: [0, -100, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                style={{ top: '10%', left: '5%' }}
            />
            <motion.div
                className="absolute w-96 h-96 bg-gradient-to-br from-rose-300/20 to-orange-300/20 rounded-full blur-3xl"
                animate={{
                    x: [0, -100, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                style={{ bottom: '10%', right: '5%' }}
            />

            <div className="flex-1 flex justify-center items-center p-4 relative z-10">
                <motion.div
                    className="w-full max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-200/50 p-8 md:p-10"
                        whileHover={{ boxShadow: "0 25px 50px -12px rgba(251, 146, 60, 0.25)" }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Header */}
                        <motion.div
                            className="text-center mb-8"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Link to="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-300 to-rose-400 rounded-lg flex items-center justify-center">
                                    <Feather className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-slate-700 text-xl">GreyEnds</span>
                            </Link>

                            <h1 className="text-slate-800 mb-2">
                                {type === "signup" ? "Create an account" : "Welcome back"}
                            </h1>
                            <p className="text-slate-600">
                                {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                                {" "}
                                <Link 
                                    to={type === "signin" ? "/signup" : "/signin"}
                                    className="text-orange-600 hover:text-orange-700 transition-colors underline"
                                >
                                    {type === "signin" ? "Sign up" : "Sign in"}
                                </Link>
                            </p>
                        </motion.div>

                        {/* Form */}
                        <motion.form
                            className="space-y-5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            onSubmit={(e) => {
                                e.preventDefault();
                                sendRequest();
                            }}
                        >
                            {type === "signup" && (
                                <LabelledInput
                                    label="Name"
                                    placeholder="John Doe"
                                    onChange={(e) => {
                                        setPostInputs({
                                            ...postInputs,
                                            name: e.target.value
                                        });
                                    }}
                                />
                            )}

                            <LabelledInput
                                label="Email"
                                type="email"
                                placeholder="xyz@gmail.com"
                                onChange={(e) => {
                                    setPostInputs({
                                        ...postInputs,
                                        email: e.target.value
                                    });
                                }}
                            />

                            <LabelledInput
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                onChange={(e) => {
                                    setPostInputs({
                                        ...postInputs,
                                        password: e.target.value
                                    });
                                }}
                            />

                            {type === "signup" && (
                                <LabelledInput
                                    label="Catch Phrase"
                                    placeholder="A tech explorer and coffee addict"
                                    onChange={(e) => {
                                        setPostInputs({
                                            ...postInputs,
                                            catchPhrase: e.target.value
                                        });
                                    }}
                                />
                            )}

                            <motion.div
                                className="pt-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-orange-400 to-rose-400 hover:from-orange-500 hover:to-rose-500 text-white shadow-lg"
                                >
                                    {isLoading ? (
                                        <motion.div
                                            className="flex items-center gap-2"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            >
                                                <Sparkles className="w-4 h-4" />
                                            </motion.div>
                                            Processing...
                                        </motion.div>
                                    ) : (
                                        type === "signup" ? "Sign up" : "Sign in"
                                    )}
                                </Button>
                            </motion.div>
                        </motion.form>

                        {/* Footer */}
                        <motion.p
                            className="text-center text-slate-500 text-sm mt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            By continuing, you agree to our Terms of Service and Privacy Policy
                        </motion.p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type = "text" }: LabelledInputType) {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const isPassword = type === "password";

    return (
        <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Label className="text-slate-700">{label}</Label>
            <div className="relative">
                <motion.div
                    animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <Input
                        onChange={onChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        type={isPassword && !showPassword ? "password" : type}
                        className={`pr-10 bg-white border-slate-300 focus:border-orange-400 focus:ring-orange-400 transition-all ${
                            isFocused ? 'shadow-md' : ''
                        }`}
                        placeholder={placeholder}
                        required
                    />
                </motion.div>
                {isPassword && (
                    <motion.button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-orange-600 transition-colors"
                        tabIndex={-1}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
}
