import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPendingApprovals, updateApprovalStatus } from '../utils/api';
import { Check, X, ShieldAlert, Cpu, Loader2 } from 'lucide-react';

const Approvals = () => {
    const queryClient = useQueryClient();

    const { data: approvals, isLoading } = useQuery({
        queryKey: ['approvals'],
        queryFn: getPendingApprovals,
    });

    const mutation = useMutation({
        mutationFn: ({ id, status }: { id: string; status: 'APPROVED' | 'REJECTED' }) =>
            updateApprovalStatus(id, status, 'admin@dev.com'),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['approvals'] });
        },
    });

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <Loader2 className="animate-spin text-brand-500" size={40} />
                <p className="text-slate-400 font-medium tracking-tight">Fetching pending approvals...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Approval Queue</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Review AI decisions that require human oversight.</p>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/20 px-6 py-3 rounded-2xl flex items-center space-x-3 w-fit shadow-sm shadow-amber-500/5">
                    <ShieldAlert className="text-amber-600 dark:text-amber-500" size={20} />
                    <span className="text-amber-600 dark:text-amber-500 text-sm font-black uppercase tracking-widest">{approvals?.length || 0} Items Pending</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {approvals?.length === 0 && (
                    <div className="glass-card p-20 text-center border-dashed border-2 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400 mb-6">
                            <Check size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Queue is Clear</h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">No pending approvals at the moment. Good job!</p>
                    </div>
                )}

                {approvals?.map((item: any) => (
                    <div key={item.id} className="glass-card shadow-lg shadow-slate-200/50 dark:shadow-none">
                        {/* Ticket Header */}
                        <div className="p-6 md:px-8 border-b border-slate-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-400 dark:text-slate-400 shadow-sm">
                                    <Cpu size={22} />
                                </div>
                                <div>
                                    <h3 className="font-black uppercase text-[10px] tracking-[0.2em] text-brand-600 dark:text-brand-400 mb-0.5">Intent: {item.workflowRule.intentName}</h3>
                                    <p className="text-sm font-bold text-slate-900 dark:text-slate-200">Confidence Rule: <span className="text-brand-600 dark:text-brand-400">{(item.workflowRule.minConfidence * 100).toFixed(1)}%</span></p>
                                </div>
                            </div>
                            <span className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-[10px] font-black tracking-widest text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5 shadow-sm">
                                ID: {item.id.substring(0, 8).toUpperCase()}
                            </span>
                        </div>

                        {/* Content Section */}
                        <div className="p-8 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-4 bg-slate-300 dark:bg-slate-700 rounded-full" />
                                    <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Incoming Message</h4>
                                </div>
                                <div className="p-6 bg-slate-100 dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-white/5 italic text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                                    "{item.proposedAction.original_text}"
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-4 bg-brand-500 rounded-full" />
                                    <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">AI Suggested Action</h4>
                                </div>
                                <div className="p-6 bg-brand-50/50 dark:bg-brand-500/5 rounded-3xl border border-brand-100 dark:border-brand-500/20 text-brand-700 dark:text-brand-300 font-bold leading-relaxed">
                                    "{item.proposedAction.reply_text}"
                                </div>
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="p-6 md:px-8 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-white/5 flex items-center justify-end space-x-4">
                            <button
                                onClick={() => mutation.mutate({ id: item.id, status: 'REJECTED' })}
                                disabled={mutation.isPending}
                                className="flex items-center space-x-2 px-8 py-3.5 rounded-2xl text-slate-500 hover:text-red-600 hover:bg-red-50 dark:text-slate-400 dark:hover:text-red-400 dark:hover:bg-red-400/5 transition-all font-black text-xs uppercase tracking-widest disabled:opacity-50 active:scale-95"
                            >
                                <X size={18} />
                                <span>Reject Action</span>
                            </button>
                            <button
                                onClick={() => mutation.mutate({ id: item.id, status: 'APPROVED' })}
                                disabled={mutation.isPending}
                                className="flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white transition-all shadow-xl shadow-brand-600/20 font-black text-xs uppercase tracking-widest disabled:opacity-50 active:scale-95"
                            >
                                {mutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
                                <span>Approve & Execute</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Approvals;
