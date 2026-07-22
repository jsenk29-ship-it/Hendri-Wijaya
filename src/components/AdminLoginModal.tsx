import React, { useState } from 'react';
import { ShieldCheck, Lock, User, Key, AlertCircle, ArrowRight, X } from 'lucide-react';
import { Logo } from './Logo';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin
}) => {
  const [username, setUsername] = useState('admin_idealogika');
  const [password, setPassword] = useState('idealogika2026');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (username === 'admin_idealogika' && password === 'idealogika2026') {
        setLoading(false);
        onSuccessLogin();
      } else {
        setLoading(false);
        setError('Username atau kata sandi pengelola web tidak sesuai.');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative">
        {/* Header background with gold accents */}
        <div className="bg-stone-950 p-6 text-white text-center relative border-b border-amber-500/30">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-full bg-stone-900 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex justify-center mb-3">
            <Logo variant="dark" showTagline={false} />
          </div>

          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full border border-amber-500/30 mt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Portal Pengelola Web & Redaksi</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Quick Credential Box for User Reference */}
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl p-3.5 mb-5 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-300 mb-1.5">
              <Key className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Akses Masuk Pengelola (Kredensial Resmi)</span>
            </div>
            <div className="grid grid-cols-2 gap-2 font-mono bg-white dark:bg-stone-900 p-2 rounded border border-amber-200/80 dark:border-amber-800/40 text-stone-800 dark:text-stone-200">
              <div>
                <span className="text-stone-400 text-[10px] block">USERNAME:</span>
                <span className="font-semibold text-amber-700 dark:text-amber-400">admin_idealogika</span>
              </div>
              <div>
                <span className="text-stone-400 text-[10px] block">KATA SANDI:</span>
                <span className="font-semibold text-amber-700 dark:text-amber-400">idealogika2026</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs p-3 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Username Pengelola
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm rounded-lg pl-9 pr-3 py-2.5 border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="admin_idealogika"
                />
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm rounded-lg pl-9 pr-3 py-2.5 border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="••••••••"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-stone-950 text-amber-400 font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm mt-2"
            >
              {loading ? (
                <span>Memverifikasi Akses...</span>
              ) : (
                <>
                  <span>Masuk Dashboard Pengelola</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
