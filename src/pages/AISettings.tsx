import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBusinessProfile, updateBusinessProfile } from '../utils/api';
import {
    BrainCircuit,
    Save,
    Sparkles,
    Info,
    ShieldAlert,
    CheckCircle2,
    Loader2
} from 'lucide-react';

const AISettings = () => {
    const queryClient = useQueryClient();
    const [knowledgeBase, setKnowledgeBase] = useState('');
    const [aiInstructions, setAiInstructions] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { data: profile, isLoading } = useQuery({
        queryKey: ['business-profile'],
        queryFn: getBusinessProfile,
    });

    const mutation = useMutation({
        mutationFn: updateBusinessProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['business-profile'] });
            setSuccessMessage('AI Brain updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        },
    });

    useEffect(() => {
        if (profile) {
            setKnowledgeBase(profile.knowledgeBase || '');
            setAiInstructions(profile.aiInstructions || '');
        }
    }, [profile]);

    const handleSave = () => {
        mutation.mutate({ knowledgeBase, aiInstructions });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <Loader2 className="animate-spin text-brand-600" size={40} />
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-fade-in pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">AI Knowledge Base</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Define your business details and AI behavior rules.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={mutation.isPending}
                    className="flex items-center gap-3 px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-brand-500/20 active:scale-95 disabled:opacity-50"
                >
                    {mutation.isPending ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    {mutation.isPending ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {successMessage && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 p-4 rounded-2xl flex items-center gap-3 animate-in-up">
                    <CheckCircle2 size={20} />
                    <span className="font-bold text-sm tracking-wide">{successMessage}</span>
                </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Knowledge Base Section */}
                <div className="space-y-6">
                    <div className="glass-card p-8 h-full flex flex-col">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400">
                                <Sparkles size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">Business Description</h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">The "What"</p>
                            </div>
                        </div>

                        <div className="flex-1">
                            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1">
                                Company Knowledge & FAQs
                            </label>
                            <textarea
                                value={knowledgeBase}
                                onChange={(e) => setKnowledgeBase(e.target.value)}
                                placeholder="Describe your business, services, pricing, and common questions. The more detail you provide, the smarter the AI will be."
                                className="w-full h-[300px] p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all text-sm font-medium leading-relaxed resize-none"
                            />
                        </div>

                        <div className="mt-6 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-3">
                            <Info size={18} className="text-blue-500 mt-1 shrink-0" />
                            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                Example: "We are a luxury car rental service based in Dubai. Our fleet includes Range Rovers and Ferraris. Pricing starts at $500/day."
                            </p>
                        </div>
                    </div>
                </div>

                {/* AI Instructions Section */}
                <div className="space-y-6">
                    <div className="glass-card p-8 h-full flex flex-col">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <BrainCircuit size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">AI Behavior & Tone</h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">The "How"</p>
                            </div>
                        </div>

                        <div className="flex-1">
                            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1">
                                Specific Instructions
                            </label>
                            <textarea
                                value={aiInstructions}
                                onChange={(e) => setAiInstructions(e.target.value)}
                                placeholder="Instructions on how to speak: e.g., 'Be very formal', 'Use lots of emojis', 'Never offer discounts without manager approval'."
                                className="w-full h-[300px] p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all text-sm font-medium leading-relaxed resize-none"
                            />
                        </div>

                        <div className="mt-6 p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 flex items-start gap-3">
                            <ShieldAlert size={18} className="text-rose-500 mt-1 shrink-0" />
                            <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                                Guardrails: Add rules to prevent the AI from making promises or giving wrong information.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AISettings;
