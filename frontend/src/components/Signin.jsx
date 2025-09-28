import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const API_URL = import.meta.env?.VITE_SERVER || "";
    const navigate = useNavigate();
    const resetFeedback = () => {
        setError(null);
        setSuccess(null);
    };

    const signIn = async (e) => {
        e.preventDefault();
        resetFeedback();
        if (!username || !password) {
            setError("Please enter both username and password.");
            return;
        }

        setLoading(true);
        try {
            const payload = { username, password };
            const headers = { "Content-Type": "application/json" };

            const res = await axios.post(`${API_URL}/api/auth/login`, payload, {
                headers,
                timeout: 12000,
            });
            console.log(res.data)
            if (res?.data?.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user",JSON.stringify(res.data.user));
                setSuccess("Signed in successfully — welcome to Meme Battle Arena!");
            } else {
                setError(res?.data?.message || "Unexpected response from server.");
            }
            navigate("/")
        } catch (err) {
            console.error(err);
            const msg =
                err?.response?.data?.message || err.message || "Network error";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-cyan-900 p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden"
            >
                {/* Glow effect */}
                <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-cyan-500/20 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl" />

                <div className="relative z-10 p-8">
                    <h2 className="text-white text-3xl font-bold text-center">
                        Meme Battle Arena
                    </h2>
                    <p className="text-slate-300 mt-2 text-center text-sm">
                        Sign in to join the arena
                    </p>

                    <form onSubmit={signIn} className="mt-8 space-y-5">
                        <label className="block">
                            <span className="text-xs text-slate-300">Username</span>
                            <motion.input
                                whileFocus={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                autoComplete="username"
                                className="mt-1 w-full rounded-xl bg-white/10 border border-white/20 backdrop-blur py-3 px-4 placeholder-slate-400 text-white outline-none focus:border-cyan-400"
                                placeholder="Your meme warrior name"
                            />
                        </label>

                        <label className="block">
                            <span className="text-xs text-slate-300">Password</span>
                            <motion.input
                                whileFocus={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                autoComplete="current-password"
                                className="mt-1 w-full rounded-xl bg-white/10 border border-white/20 backdrop-blur py-3 px-4 placeholder-slate-400 text-white outline-none focus:border-cyan-400"
                                placeholder="Your secret arena key"
                            />
                        </label>

                        <motion.button
                            type="submit"
                            whileTap={{ scale: 0.98 }}
                            className="w-full rounded-xl py-3 font-medium shadow-lg border border-white/10 bg-gradient-to-r from-cyan-600 to-blue-600 hover:brightness-110 active:brightness-95 text-white transition"
                            disabled={loading}
                        >
                            {loading ? "Signing in…" : "Sign in"}
                        </motion.button>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-sm text-red-400 mt-2 text-center"
                            >
                                {error}
                            </motion.div>
                        )}
                        {success && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-sm text-green-300 mt-2 text-center"
                            >
                                {success}
                            </motion.div>
                        )}
                    </form>

                    <p className="mt-6 text-center text-xs text-slate-400">
                        Don’t have an account?{" "}
                        <a href="/signup" className="text-cyan-300 hover:underline">
                            Create one
                        </a>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SignIn;
