import React, { useState } from 'react';
import { X, Send, Bot, User, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { simulateMessage } from '../utils/api';

interface SimulatorProps {
    isOpen: boolean;
    onClose: () => void;
}

const Simulator: React.FC<SimulatorProps> = ({ isOpen, onClose }) => {
    const [message, setMessage] = useState('');
    const [phone, setPhone] = useState('923001234567');
    const [isSending, setIsSending] = useState(false);
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setIsSending(true);
        setResponse(null);
        setError(null);

        try {
            const res = await simulateMessage(phone, message);
            setResponse(res);
            setMessage('');
        } catch (err: any) {
            console.error('Simulation failed', err);
            setError(err.response?.data?.message || err.message || 'Connection failed to backend');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full max-w-lg glass-card overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-600">
                            <Bot size={22} />
                        </div>
                        <div>
                            <h3 className="font-black text-slate-900 dark:text-white leading-none">AI Activity Simulator</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Testing Environment</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl transition-colors">
                        <X size={20} className="text-slate-400" />
                    </button>
                </div>

                <div className="p-8 space-y-6">
                    <form onSubmit={handleSend} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Virtual Phone Number</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/5 focus:border-brand-500/50 outline-none font-bold text-sm transition-all"
                                    placeholder="Enter Phone Number..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Simulated Message</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={3}
                                className="w-full px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/5 focus:border-brand-500/50 outline-none font-medium text-sm transition-all resize-none"
                                placeholder="Type a message to test AI response..."
                            />
                        </div>

                        <button
                            disabled={isSending || !message.trim()}
                            className="w-full py-4 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-brand-600/20 transition-all flex items-center justify-center gap-3 active:scale-95"
                        >
                            {isSending ? <Loader2 className="animate-spin" size={18} /> : (
                                <>
                                    <Send size={18} />
                                    <span>Send Simulated Message</span>
                                </>
                            )}
                        </button>
                    </form>

                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 animate-in shake duration-300">
                            <AlertCircle size={18} />
                            <span className="text-xs font-bold">{error}</span>
                        </div>
                    )}

                    {response && (
                        <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 size={18} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Processing Successful</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/10">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Intent</p>
                                    <p className="text-xs font-black text-emerald-600 dark:text-emerald-400">{response.analysis.intent}</p>
                                </div>
                                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/10">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Needs Approval</p>
                                    <p className="text-xs font-black text-slate-900 dark:text-white">{response.needsApproval ? 'YES' : 'NO'}</p>
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium italic">
                                Check the <span className="font-bold text-brand-600">Approvals</span> page or Dashboard logs to see the result.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Simulator;
