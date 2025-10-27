import { motion } from "framer-motion";
import { Feather, Sparkles, Heart, BookOpen } from "lucide-react";


export const Quote = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-100 via-rose-100 to-orange-50 flex justify-center items-center relative overflow-hidden p-4">
            {/* Animated Background Elements */}
            <motion.div
                className="absolute w-96 h-96 bg-gradient-to-br from-rose-300/30 to-orange-300/30 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, -50, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{ top: '10%', left: '10%' }}
            />
            <motion.div
                className="absolute w-96 h-96 bg-gradient-to-br from-orange-300/30 to-rose-300/30 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, -50, 0],
                    y: [0, 50, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                style={{ bottom: '10%', right: '10%' }}
            />

            {/* Floating Icons */}
            <motion.div
                className="absolute top-20 left-10 text-orange-400/40"
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <BookOpen className="w-12 h-12" />
            </motion.div>

            <motion.div
                className="absolute top-40 right-20 text-rose-400/40"
                animate={{
                    y: [0, -15, 0],
                    rotate: [0, -10, 0],
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
                <Sparkles className="w-10 h-10" />
            </motion.div>

            <motion.div
                className="absolute bottom-32 left-20 text-orange-400/40"
                animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
                <Heart className="w-8 h-8" />
            </motion.div>

            {/* Main Quote Card */}
            <motion.div
                className="relative z-10 max-w-3xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.div
                    className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-orange-200/50 p-8 md:p-12 lg:p-16"
                    whileHover={{ 
                        boxShadow: "0 30px 60px -15px rgba(251, 146, 60, 0.3)",
                        scale: 1.02
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Logo Icon */}
                    <motion.div
                        className="flex justify-center mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.div
                            className="w-16 h-16 bg-gradient-to-br from-orange-300 to-rose-400 rounded-2xl flex items-center justify-center shadow-lg"
                            animate={{
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Feather className="w-8 h-8 text-white" />
                        </motion.div>
                    </motion.div>

                    {/* Quote Text */}
                    <motion.div
                        className="text-center mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <motion.div
                            className="text-slate-700 text-2xl md:text-3xl lg:text-4xl leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7, staggerChildren: 0.05 }}
                        >
                            <span className="text-slate-600">"Every </span>
                            <motion.span
                                className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent"
                                whileHover={{ scale: 1.05 }}
                                style={{ display: 'inline-block' }}
                            >
                                story
                            </motion.span>
                            <span className="text-slate-600"> begins with a moment shared. Start </span>
                            <motion.span
                                className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent"
                                whileHover={{ scale: 1.05 }}
                                style={{ display: 'inline-block' }}
                            >
                                yours
                            </motion.span>
                            <span className="text-slate-600"> with us!"</span>
                        </motion.div>
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        className="w-24 h-1 bg-gradient-to-r from-orange-400 to-rose-400 mx-auto rounded-full mb-8"
                        initial={{ width: 0 }}
                        animate={{ width: 96 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    />

                    {/* Author */}
                    <motion.div
                        className="text-right space-y-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                    >
                        <p className="text-slate-700 text-xl md:text-2xl">
                            — Frey Vegda
                        </p>
                        <motion.p
                            className="text-slate-600 flex items-center justify-end gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.4 }}
                        >
                            With Love 
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                            </motion.span>
                            GreyEnds
                        </motion.p>
                    </motion.div>

                    {/* Decorative Elements */}
                    <motion.div
                        className="absolute -top-4 -left-4 text-orange-400"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <Sparkles className="w-8 h-8" />
                    </motion.div>
                    <motion.div
                        className="absolute -bottom-4 -right-4 text-rose-400"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    >
                        <Sparkles className="w-8 h-8" />
                    </motion.div>
                </motion.div>

                {/* Floating Particles */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-br from-orange-400 to-rose-400 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </motion.div>

            {/* Decorative Tree Image */}
            <motion.div
                className="absolute bottom-0 right-0 pointer-events-none opacity-20"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 0.2, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
            </motion.div>
        </div>
    );
};
