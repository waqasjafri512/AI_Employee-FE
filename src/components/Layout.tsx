import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    CheckSquare,
    BrainCircuit,
    LogOut,
    Menu,
    X,
    User,
    Bot,
    ShieldCheck,
    Sun,
    Moon
} from 'lucide-react';

const Layout: React.FC = () => {
    const location = useLocation();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { user, logout } = useAuth();

    // Persistence logic
    const [isDarkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved === 'dark';
    });

    // CRITICAL: Sync both HTML and BODY classes for maximum Tailwind/CSS compatibility
    useEffect(() => {
        const root = window.document.documentElement;
        const body = window.document.body;

        if (isDarkMode) {
            root.classList.add('dark');
            body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDarkMode(prev => !prev);
    };

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Approvals', path: '/approvals', icon: CheckSquare },
        { name: 'AI Brain', path: '/settings', icon: BrainCircuit },
    ];

    return (
        <div className={`flex h-screen overflow-hidden font-sans transition-colors duration-500 ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>

            {/* Sidebar Wrapper */}
            <aside className={`
                fixed lg:relative inset-y-0 left-0 w-72 h-full z-40 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]
                glass-nav
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}
            `}>
                <div className="flex flex-col h-full">
                    {/* Logo Area */}
                    <div className="h-24 flex items-center px-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center shadow-xl shadow-brand-500/20 flex-shrink-0">
                                <Bot className="text-white" size={24} />
                            </div>
                            {isSidebarOpen && (
                                <div className="flex flex-col">
                                    <span className={`text-lg font-black tracking-tight leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{user?.businessName?.toUpperCase() || 'AI OFFICE'}</span>
                                    <span className="text-[10px] font-bold text-brand-600 dark:text-brand-500 tracking-[0.2em] uppercase mt-1">Intelligence</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <nav className="flex-1 px-4 py-8 space-y-2">
                        {isSidebarOpen && (
                            <p className="px-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-4">Control System</p>
                        )}
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`
                                        sidebar-link transition-all group relative
                                        ${isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'}
                                    `}
                                >
                                    <item.icon size={22} className={`
                                        ${isSidebarOpen ? 'mr-4' : 'mx-auto'}
                                        ${isActive ? (isDarkMode ? 'text-brand-400' : 'text-brand-600') : 'group-hover:text-brand-600 dark:group-hover:text-white'}
                                    `} />
                                    {isSidebarOpen && (
                                        <>
                                            <span className="flex-1 whitespace-nowrap">{item.name}</span>
                                            {isActive && <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_10px_#2563eb]" />}
                                        </>
                                    )}
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="p-4 mt-auto">
                        <div className={`p-4 rounded-3xl border mb-4 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/5 ${!isSidebarOpen && 'hidden'}`}>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center">
                                    <ShieldCheck size={16} className="text-brand-600 dark:text-brand-400" />
                                </div>
                                <span className="text-xs font-bold text-brand-600 dark:text-brand-500 uppercase tracking-widest">Active Guard</span>
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                                Monitoring {user?.businessName} channels.
                            </p>
                        </div>

                        <button
                            onClick={logout}
                            className="sidebar-link sidebar-link-inactive w-full text-slate-400 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/5 transition-all"
                        >
                            <LogOut size={22} className={isSidebarOpen ? 'mr-4' : 'mx-auto'} />
                            {isSidebarOpen && <span className="font-bold">End Session</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Container */}
            <section className="flex-1 flex flex-col relative min-w-0 transition-colors duration-500">
                <header className="h-24 px-8 flex items-center justify-between z-30 backdrop-blur-md border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-slate-950/80">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                            className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all"
                        >
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className={`w-12 h-12 rounded-2xl border-2 transition-all flex items-center justify-center shadow-lg active:scale-95 cursor-pointer z-[100]
                                ${isDarkMode ? 'bg-slate-800 border-brand-500/50' : 'bg-slate-100 border-slate-300'}
                            `}
                        >
                            {isDarkMode ? <Sun size={20} className="text-brand-400" /> : <Moon size={20} className="text-slate-600" />}
                        </button>

                        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />

                        <div className="flex items-center gap-3 bg-white dark:bg-slate-900/50 p-2 pr-4 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                            <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold">
                                <User size={14} />
                            </div>
                            <span className="text-xs font-bold hidden sm:block">{user?.name}</span>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 lg:p-12 scrollbar-hide bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]">
                    <div className="max-w-[1400px] mx-auto animate-in-up">
                        <Outlet />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Layout;
