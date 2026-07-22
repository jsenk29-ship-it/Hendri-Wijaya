import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bookmark, 
  PenTool, 
  Users, 
  Calendar, 
  Sun, 
  X,
  ShieldCheck,
  UserCheck,
  LogIn
} from 'lucide-react';
import { BREAKING_NEWS_LIST } from '../data/newsData';
import { Logo } from './Logo';
import { UserRole, WriterProfile } from '../types';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenSubmission: () => void;
  onOpenRedaksi: () => void;
  onOpenAdminAuth: () => void;
  onOpenWriterAuth: () => void;
  onOpenAdminDashboard: () => void;
  onOpenWriterDashboard: () => void;
  currentUserRole: UserRole;
  writerProfile: WriterProfile | null;
  activeCategory: string;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  savedCount,
  onOpenSaved,
  onOpenSubmission,
  onOpenRedaksi,
  onOpenAdminAuth,
  onOpenWriterAuth,
  onOpenAdminDashboard,
  onOpenWriterDashboard,
  currentUserRole,
  writerProfile
}) => {
  const [currentTickerIndex, setCurrentTickerIndex] = useState(0);
  const [currentDateString, setCurrentDateString] = useState('');

  useEffect(() => {
    // Format Indonesian Date
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDateString(now.toLocaleDateString('id-ID', options));

    const interval = setInterval(() => {
      setCurrentTickerIndex((prev) => (prev + 1) % BREAKING_NEWS_LIST.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-stone-200 bg-stone-50/95 sticky top-0 z-40 backdrop-blur-md transition-all">
      {/* Top Utility Ticker Bar */}
      <div className="bg-stone-950 text-stone-200 text-xs py-1.5 px-4 md:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Date & Weather */}
          <div className="flex items-center gap-4 text-stone-400">
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-stone-300">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              {currentDateString || 'Rabu, 22 Juli 2026'}
            </span>
            <span className="hidden sm:inline-block border-r border-stone-700 h-3"></span>
            <span className="hidden sm:flex items-center gap-1 text-[11px] text-stone-300">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              Jakarta/Depok 29°C
            </span>
          </div>

          {/* Center: Running Breaking News Ticker */}
          <div className="flex-1 max-w-lg mx-2 hidden lg:flex items-center gap-2 overflow-hidden bg-stone-900/90 rounded px-2.5 py-0.5 border border-stone-800">
            <span className="bg-red-600 text-white font-bold text-[10px] uppercase px-1.5 py-0.2 rounded tracking-wide shrink-0 animate-pulse">
              TERKINI
            </span>
            <div className="truncate text-[11px] font-medium text-stone-200">
              {BREAKING_NEWS_LIST[currentTickerIndex]}
            </div>
          </div>

          {/* Right: Actions & Login Shortcuts */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Login Writer / Contributor */}
            {currentUserRole === 'penulis' && writerProfile ? (
              <button
                onClick={onOpenWriterDashboard}
                className="flex items-center gap-1.5 bg-amber-500 text-stone-950 font-bold text-[11px] px-2.5 py-1 rounded shadow-xs hover:bg-amber-400 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span className="truncate max-w-[100px]">{writerProfile.name}</span>
              </button>
            ) : (
              <button
                onClick={onOpenWriterAuth}
                className="flex items-center gap-1.5 text-stone-300 hover:text-amber-400 transition-colors text-[11px] font-medium bg-stone-900 hover:bg-stone-850 px-2.5 py-1 rounded border border-stone-800"
              >
                <PenTool className="w-3 h-3 text-amber-400" />
                <span>Masuk Penulis</span>
              </button>
            )}

            {/* Login Admin / Redaksi */}
            {currentUserRole === 'admin' ? (
              <button
                onClick={onOpenAdminDashboard}
                className="flex items-center gap-1.5 bg-amber-600 text-white font-bold text-[11px] px-2.5 py-1 rounded shadow-xs hover:bg-amber-500 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-200" />
                <span>Dashboard Pengelola</span>
              </button>
            ) : (
              <button
                onClick={onOpenAdminAuth}
                className="flex items-center gap-1 text-stone-400 hover:text-amber-300 transition-colors text-[11px] font-medium"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>Login Pengelola</span>
              </button>
            )}

            <span className="border-r border-stone-800 h-3 hidden sm:inline-block"></span>

            <button
              onClick={onOpenSaved}
              className="relative flex items-center gap-1 text-stone-300 hover:text-white transition-colors text-[11px]"
              title="Artikel Tersimpan"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Simpan</span>
              {savedCount > 0 && (
                <span className="bg-amber-500 text-stone-950 font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenRedaksi}
              className="flex items-center gap-1 text-stone-400 hover:text-stone-200 transition-colors text-[11px]"
            >
              <Users className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Redaksi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Branding Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-stone-200 pb-3">
          {/* Left Edition Info */}
          <div className="hidden lg:block text-left text-xs text-stone-500 border-l-2 border-amber-600 pl-3">
            <div className="font-serif italic font-semibold text-stone-800">Edisi Pers Mahasiswa</div>
            <div className="text-[11px]">Vol. XII No. 07 — Juli 2026</div>
          </div>

          {/* Center Title & Official Logo Component */}
          <div className="cursor-pointer" onClick={() => setSearchQuery('')}>
            <Logo variant="light" showTagline={true} />
          </div>

          {/* Right Search Bar */}
          <div className="w-full md:w-64 relative">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari berita, opini, essay..."
                className="w-full bg-white text-stone-900 placeholder-stone-400 text-xs rounded-full pl-9 pr-8 py-2 border border-stone-300 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all shadow-xs"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-stone-400 hover:text-stone-700 p-0.5 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
