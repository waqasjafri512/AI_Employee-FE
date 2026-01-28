import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDashboardStats, getDashboardEngagement } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Simulator from '../components/Simulator';
import {
    MessageSquare,
    Clock,
    Activity,
    TrendingUp,
    Zap,
    MoreVertical,
    Cpu,
    BrainCircuit,
    ChevronRight,
    Loader2
} from 'lucide-react';

const Dashboard = () => {
    const [isSimulatorOpen, setSimulatorOpen] = useState(false);
    const { user } = useAuth();

    const { data: stats, isLoading: statsLoading } = useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: getDashboardStats,
        refetchInterval: 30000, // Refresh every 30s
    });

    const { data: engagement, isLoading: engagementLoading } = useQuery({
        queryKey: ['dashboard-engagement'],
        queryFn: getDashboardEngagement,
        refetchInterval: 15000, // Refresh every 15s
    });

    const statCards = [
        {
            label: 'Total Interactions',
            value: stats?.totalInteractions || 0,
            icon: MessageSquare,
            change: statsLoading ? '...' : '+100%',
            color: 'blue'
        },
        {
            label: 'Active Sessions',
            value: stats?.activeSessions || 0,
            icon: Activity,
            change: statsLoading ? '...' : 'Live',
            color: 'purple'
        },
        {
            label: 'Approval Required',
            value: stats?.pendingApprovals || 0,
            icon: Clock,
            change: stats?.pendingApprovals > 0 ? 'Priority' : 'Clear',
            color: 'rose'
        },
        {
            label: 'System Health',
            value: stats?.systemHealth !== undefined ? `${stats.systemHealth.toFixed(1)}%` : '0%',
            icon: Zap,
            change: 'Optimal',
            color: 'emerald'
        },
    ];

    return (
        <div className="space-y-10 animate-fade-in pb-12">
            {/* HERO SECTION */}
            <div className="relative overflow-hidden rounded-[40px] bg-slate-900 p-8 md:p-12 shadow-2xl shadow-brand-500/10 group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-indigo-700 opacity-90 dark:opacity-80" />

                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48 transition-transform group-hover:scale-110 duration-700" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Live AI Monitor Active</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-4">
                            Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-200 to-indigo-200">{user?.businessName}.</span>
                        </h1>
                        <p className="text-brand-50/80 text-lg font-medium leading-relaxed mb-8 max-w-lg">
                            Your AI workforce is currently monitoring {stats?.totalInteractions || 0} interactions across your business channels.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => setSimulatorOpen(true)}
                                className="px-8 py-4 bg-white text-brand-700 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-brand-50 transition-all shadow-xl active:scale-95"
                            >
                                Launch Simulator
                            </button>
                            <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all active:scale-95">
                                View Analytics
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <div key={i} className="glass-card p-6 group cursor-pointer">
                        <div className="flex items-start justify-between mb-6">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ${stat.color === 'blue' ? 'bg-brand-500/10 text-brand-600 dark:text-brand-500' :
                                stat.color === 'purple' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-500' :
                                    stat.color === 'rose' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-500' :
                                        'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500'
                                }`} >
                                <stat.icon size={26} strokeWidth={2.5} />
                            </div>
                            <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg ${stat.color === 'blue' ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600' :
                                stat.color === 'purple' ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600' :
                                    stat.color === 'rose' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600' :
                                        'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600'
                                }`}>
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            {statsLoading ? <Loader2 className="animate-spin text-slate-300" size={20} /> : stat.value}
                        </h3>
                    </div>
                ))}
            </div>

            {/* Engagement & Analytics */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Engagement Stream */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between mb-2 px-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                                <TrendingUp size={20} />
                            </div>
                            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Engagement Stream</h2>
                        </div>
                        <button
                            onClick={async () => {
                                try {
                                    const response = await fetch('http://localhost:3000/dashboard/export', {
                                        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                                    });
                                    const blob = await response.blob();
                                    const url = window.URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = `logs-${new Date().toISOString().split('T')[0]}.csv`;
                                    document.body.appendChild(a);
                                    a.click();
                                    a.remove();
                                } catch (error) {
                                    console.error('Export failed:', error);
                                }
                            }}
                            className="text-xs font-black text-brand-600 dark:text-brand-400 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
                        >
                            Export Logs <ChevronRight size={14} />
                        </button>
                    </div>

                    <div className="glass-card">
                        <div className="p-8">
                            <div className="space-y-6">
                                {engagementLoading ? (
                                    <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                                        <Loader2 className="animate-spin mb-4" size={32} />
                                        <p className="text-sm font-medium">Syncing stream data...</p>
                                    </div>
                                ) : engagement?.length === 0 ? (
                                    <div className="text-center py-10 text-slate-500 font-medium">
                                        No recent activity detected.
                                    </div>
                                ) : (
                                    engagement?.map((item: any) => (
                                        <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group/item border border-transparent hover:border-slate-100 dark:hover:border-white/5">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xs ${item.status === 'PENDING' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                    }`}>
                                                    {item.intent.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{item.content}</h4>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">Intent: {item.intent} • Status: {item.status}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                                    {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                                <MoreVertical size={18} className="text-slate-300 dark:text-slate-600 group-hover/item:text-slate-600 dark:group-hover/item:text-slate-300 transition-colors cursor-pointer" />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Intelligence Engine */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2 px-2">
                        <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-600">
                            <BrainCircuit size={20} />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Intelligence</h2>
                    </div>

                    <div className="glass-card p-8 bg-gradient-to-br from-brand-600 to-indigo-800 text-white dark:from-brand-600 dark:to-indigo-900 shadow-xl shadow-brand-500/20 border-none group">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center transform transition-transform group-hover:rotate-12">
                                <Cpu size={28} className="text-brand-100" />
                            </div>
                            <div>
                                <h3 className="text-lg font-black leading-none mb-1">Model: Llama v3.1</h3>
                                <p className="text-brand-100/60 text-[10px] font-black uppercase tracking-[0.2em]">Status: High Performance</p>
                            </div>
                        </div>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-xs font-bold">
                                <span>Processing Load</span>
                                <span>{Math.floor(Math.random() * 20) + 40}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-white w-[65%] rounded-full shadow-[0_0_10px_white]" />
                            </div>
                        </div>
                        <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                            <p className="text-sm font-medium text-brand-50/80 leading-relaxed italic">
                                "AI core for {user?.businessName} is currently optimizing response latency."
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SIMULATOR MODAL */}
            <Simulator
                isOpen={isSimulatorOpen}
                onClose={() => setSimulatorOpen(false)}
            />
        </div>
    );
};

export default Dashboard;
