import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const SignUp = () => {
    // UI state
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const API_URL = import.meta.env?.VITE_SERVER || "";

    const resetFeedback = () => {
        setError(null);
        setSuccess(null);
    };

    const signUp = async (e) => {
        e.preventDefault();
        resetFeedback();

        if (!username || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const payload = { username, email, password };
            const headers = { "Content-Type": "application/json" };

            const res = await axios.post(`${API_URL}/api/auth/signup`, payload, {
                headers,
                timeout: 12000,
            });

            if (res?.data?.token) {
                localStorage.setItem("token", res.data.token);
                setSuccess("Account created successfully! Welcome to Meme Battle Arena.");
            } else {
                setError(res?.data?.message || "Unexpected response from server.");
            }
        } catch (err) {
            console.error(err);
            const msg = err?.response?.data?.message || err.message || "Network error";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#7d1b5e] via-[#9a76b7] to-[#0ea5a4] p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full max-w-xl rounded-2xl bg-white/6 backdrop-blur-lg border border-white/10 shadow-2xl overflow-hidden"
            >
                {/* decorative gradient overlay */}
                <div className="absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#7d1b5e]/30 via-[#9a76b7]/20 to-[#0ea5a4]/10 pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2">
                    {/* Left: Branding / Illustration */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.7 }}
                        className="hidden md:flex flex-col items-start justify-center gap-6 p-10"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white/12 border border-white/8">
                                {/* mini logo */}
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                    <rect x="3" y="3" width="18" height="18" rx="4" stroke="white" strokeOpacity="0.9" strokeWidth="1.2" />
                                    <path d="M8 12c1.5-2 4-3 6-2" stroke="white" strokeOpacity="0.9" strokeWidth="1.2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-xl">Meme Battle Arena</h3>
                                <p className="text-white/80 text-sm -mt-0.5">Sign up to join or create meme battles</p>
                            </div>
                        </div>

                        <p className="text-white/80 leading-relaxed">
                            Fast sign-up, secure token storage, and a playful arena waiting for your best memes.
                        </p>

                        <div className="mt-3">
                            <div className="w-48 h-48 rounded-xl bg-gradient-to-br from-white/8 to-white/2 border border-white/6 flex items-center justify-center text-white/80">
                                <div className="text-center text-sm">⚔️ Meme Battles</div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Right: Form */}
                    <section className="p-8 md:p-10">
                        <h2 className="text-white text-2xl font-semibold">Join the Arena</h2>
                        <p className="text-white/80 mt-2 text-sm">Create your account to start battling</p>

                        <form onSubmit={signUp} className="mt-6 space-y-4">
                            <label className="block">
                                <span className="text-xs text-white/80">Username</span>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text"
                                    className="mt-1 w-full rounded-xl bg-white/6 border border-white/10 backdrop-blur py-3 px-4 placeholder-white/50 text-black outline-none focus:border-[#f6c358]"
                                    placeholder="Choose a username"
                                />
                            </label>

                            <label className="block">
                                <span className="text-xs text-white/80">Email</span>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    className="mt-1 w-full rounded-xl bg-white/6 border border-white/10 backdrop-blur py-3 px-4 placeholder-white/50 text-black outline-none focus:border-[#f6c358]"
                                    placeholder="you@memebattle.gg"
                                />
                            </label>

                            <label className="block">
                                <span className="text-xs text-white/80">Password</span>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    className="mt-1 w-full rounded-xl bg-white/6 border border-white/10 backdrop-blur py-3 px-4 placeholder-white/50 text-black outline-none focus:border-[#f6c358]"
                                    placeholder="Create a password"
                                />
                            </label>

                            <label className="block">
                                <span className="text-xs text-white/80">Confirm Password</span>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    type="password"
                                    className="mt-1 w-full rounded-xl bg-white/6 border border-white/10 backdrop-blur py-3 px-4 placeholder-white/50 text-black outline-none focus:border-[#f6c358]"
                                    placeholder="Repeat your password"
                                />
                            </label>

                            <div>
                                <motion.button
                                    type="submit"
                                    whileTap={{ scale: 0.995 }}
                                    className="w-full rounded-xl py-3 font-medium shadow-lg border border-white/6 bg-gradient-to-r from-[#7d1b5e] to-[#9a76b7] hover:brightness-105 active:brightness-95 transition"
                                    disabled={loading}
                                >
                                    {loading ? "Signing up…" : "Sign up"}
                                </motion.button>
                            </div>

                            {/* Feedback */}
                            {error && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-300 mt-1">
                                    {error}
                                </motion.div>
                            )}
                            {success && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-green-200 mt-1">
                                    {success}
                                </motion.div>
                            )}

                            <div className="pt-2 text-center text-xs text-white/70">Or continue with</div>

                            <div className="mt-3 grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => alert('Social sign-up placeholder — hook your OAuth here')}
                                    className="rounded-xl py-2 border border-white/8 bg-white/4 text-white/90"
                                >
                                    Continue with Google
                                </button>

                                <button
                                    type="button"
                                    onClick={() => alert('Social sign-up placeholder — hook your OAuth here')}
                                    className="rounded-xl py-2 border border-white/8 bg-white/4 text-white/90"
                                >
                                    Continue with Discord
                                </button>
                            </div>

                            <p className="mt-4 text-center text-xs text-white/70">
                                Already have an account? <a href="/signin" className="text-white/90 font-medium">Sign in</a>
                            </p>
                        </form>
                    </section>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUp;
