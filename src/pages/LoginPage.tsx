import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, Loader2, Bot } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const data = await loginUser({ email, password });
            login(data.access_token, data.user);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Please check credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 transition-colors duration-500">
            {/* Background Orbs */}
            <div className="fixed top-0 left-0 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            <div className="fixed bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

            <div className="w-full max-w-lg relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-600/10 to-indigo-600/10 blur-3xl -z-10" />

                <div className="glass-card p-10 md:p-14 animate-in zoom-in-95 duration-500">
                    <div className="flex flex-col items-center mb-10 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-brand-500/20 mb-6">
                            <Bot size={32} />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Welcome Back</h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Log in to manage your AI digital workforce.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 focus:border-brand-500/50 outline-none font-bold text-sm transition-all"
                                    placeholder="admin@company.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 focus:border-brand-500/50 outline-none font-bold text-sm transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-xs font-bold text-center animate-shake">
                                {error}
                            </div>
                        )}

                        <button
                            disabled={isLoading}
                            className="w-full py-5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 disabled:opacity-50 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-brand-600/20 transition-all flex items-center justify-center gap-3 active:scale-95"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={18} /> : (
                                <>
                                    <LogIn size={18} />
                                    <span>Log In to Dashboard</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-sm font-medium text-slate-500">
                            Don't have an account? {' '}
                            <Link to="/signup" className="text-brand-600 dark:text-brand-400 font-black hover:underline">Create Company Account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
