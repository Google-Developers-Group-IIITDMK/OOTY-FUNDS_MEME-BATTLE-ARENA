import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const SignIn= ()=> {
    // UI state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const API_URL = import.meta.env?.VITE_SERVER || "";

    const resetFeedback = () => {
        setError(null);
        setSuccess(null);
    };

    const signIn = async (e) => {
        e.preventDefault();
        resetFeedback();
        if (!email || !password) {
            toast.error("Please enter both email and password.");
            return;
        }

        setLoading(true);
        try {
            const payload = { email, password };

            const headers = {
                "Content-Type": "application/json",
            };
            if (API_KEY) headers["x-api-key"] = API_KEY;

            const res = await axios.post(
                `${API_URL}/api/auth/login`,
                payload,
                { headers, timeout: 12000}
            );

            if (res?.data?.token) {
                localStorage.setItem("token", res.data.token);
                toast.success("Signed in successfully — welcome to Meme Battle Arena!");
            } else {
                toast.error(res?.data?.message || "Unexpected response from server.");
            }
        } catch (err) {
            console.error(err);
            const msg =
                err?.response?.data?.message || err.message || "Network error";
            toast.error(msg);
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
                                <p className="text-white/80 text-sm -mt-0.5">Sign in to join or create meme battles</p>
                            </div>
                        </div>

                        <p className="text-white/80 leading-relaxed">
                            Fast sign-in, secure token storage and a playful arena waiting for your best memes.
                        </p>

                        <div className="mt-3">
                            <div className="w-48 h-48 rounded-xl bg-gradient-to-br from-white/8 to-white/2 border border-white/6 flex items-center justify-center text-white/80">
                                {/* simple illustration placeholder */}
                                <div className="text-center text-sm">⚔️ Meme Battles</div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Right: Form */}
                    <section className="p-8 md:p-10">
                        <h2 className="text-white text-2xl font-semibold">Welcome back</h2>
                        <p className="text-white/80 mt-2 text-sm">Sign in to continue to the arena</p>

                        <form onSubmit={signIn} className="mt-6 space-y-4">
                            <label className="block">
                                <span className="text-xs text-white/80">Email</span>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    autoComplete="email"
                                    className="mt-1 w-full rounded-xl bg-white/6 border border-white/10 backdrop-blur py-3 px-4 placeholder-white/50 text-white outline-none focus:border-[#f6c358]"
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
                                    autoComplete="current-password"
                                    className="mt-1 w-full rounded-xl bg-white/6 border border-white/10 backdrop-blur py-3 px-4 placeholder-white/50 text-white outline-none focus:border-[#f6c358]"
                                    placeholder="Your secret arena key"
                                />
                            </label>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 text-white/80 text-sm">
                                    <input type="checkbox" className="w-4 h-4 rounded bg-white/6" />
                                    <span>Remember me</span>
                                </label>

                                <a href="#" className="text-sm text-white/90 hover:underline">
                                    Forgot?
                                </a>
                            </div>

                            <div>
                                <motion.button
                                    type="submit"
                                    whileTap={{ scale: 0.995 }}
                                    className="w-full rounded-xl py-3 font-medium shadow-lg border border-white/6 bg-gradient-to-r from-[#7d1b5e] to-[#9a76b7] hover:brightness-105 active:brightness-95 transition"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <motion.span
                                                animate={{ rotate: 360 }}
                                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                className="inline-block w-4 h-4 border-2 border-t-transparent rounded-full"
                                            />
                                            <span>Signing in…</span>
                                        </div>
                                    ) : (
                                        <span>Sign in</span>
                                    )}
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
                                    onClick={() => alert('Social sign-in placeholder — hook your OAuth here')}
                                    className="rounded-xl py-2 border border-white/8 bg-white/4 text-white/90"
                                >
                                    Continue with Google
                                </button>

                                <button
                                    type="button"
                                    onClick={() => alert('Social sign-in placeholder — hook your OAuth here')}
                                    className="rounded-xl py-2 border border-white/8 bg-white/4 text-white/90"
                                >
                                    Continue with Discord
                                </button>
                            </div>
                            <p className="mt-4 text-center text-xs text-white/70">Don't have an account? <a href="#" className="text-white/90 font-medium">Create one</a></p>
                        </form>
                    </section>
                </div>
            </motion.div>
        </div>
    );
}
export default SignIn;