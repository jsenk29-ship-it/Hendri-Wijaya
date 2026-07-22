import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  X, 
  ArrowRight,
  Send,
  FileText
} from 'lucide-react';
import { WriterProfile } from '../types';
import { Logo } from './Logo';

interface WriterAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (writer: WriterProfile) => void;
}

export const WriterAuthModal: React.FC<WriterAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin
}) => {
  const [authStep, setAuthStep] = useState<'method' | 'phone_otp' | 'profile_form'>('method');
  const [loginMethod, setLoginMethod] = useState<'google' | 'phone'>('google');
  
  // Phone OTP state
  const [phoneNumber, setPhoneNumber] = useState('081234567890');
  const [otpCode, setOtpCode] = useState('8888');
  const [otpSent, setOtpSent] = useState(false);

  // Writer Profile state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [university, setUniversity] = useState('Universitas Indonesia');
  const [major, setMajor] = useState('Ilmu Komunikasi');
  const [bio, setBio] = useState('Mahasiswa aktif yang tertarik pada isu kebijakan pendidikan dan dinamika politik kampus.');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200');

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    setLoginMethod('google');
    // Pre-fill profile from Google mock
    setName('Ahmad Fauzi');
    setEmail('ahmad.fauzi@student.ac.id');
    setPhone('081298765432');
    setAuthStep('profile_form');
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginMethod('phone');
    setPhone(phoneNumber);
    setName('Kontributor Mahasiswa');
    setEmail('kontributor@idealogika.id');
    setAuthStep('profile_form');
  };

  const handleSubmitProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const newWriter: WriterProfile = {
      id: `writer-${Date.now()}`,
      name: name || 'Penulis Idealogika',
      email: email || 'penulis@idealogika.id',
      phone: phone || phoneNumber,
      university: university || 'Perguruan Tinggi',
      major: major || 'Program Studi',
      bio: bio || 'Penulis dan kontributor opini mahasiswa.',
      avatar,
      loginMethod
    };
    onSuccessLogin(newWriter);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 text-white p-6 relative border-b border-amber-500/30">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-full bg-stone-800 hover:bg-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <Logo variant="dark" showTagline={false} />

          <p className="text-xs text-amber-200/90 mt-2 font-medium">
            Masuk atau daftar sebagai Penulis / Kontributor Gagasan Mahasiswa
          </p>
        </div>

        {/* Step 1: Select Auth Method */}
        {authStep === 'method' && (
          <div className="p-6 space-y-4">
            <div className="text-center mb-2">
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                Pilih Metode Masuk Penulis
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Gunakan akun Google atau Nomor HP untuk mendaftarkan tulisan Anda
              </p>
            </div>

            {/* Google Login Option */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-between p-4 bg-stone-50 hover:bg-amber-50 dark:bg-stone-800 dark:hover:bg-stone-750 border border-stone-200 dark:border-stone-700 rounded-xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-stone-900 flex items-center justify-center shadow-xs border border-stone-200 dark:border-stone-700 shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                    Lanjutkan dengan Akun Google
                  </div>
                  <div className="text-xs text-stone-500 dark:text-stone-400">
                    Otentikasi cepat & instan via Google Workspace
                  </div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-stone-400 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Phone Number Login Option */}
            <button
              onClick={() => setAuthStep('phone_otp')}
              className="w-full flex items-center justify-between p-4 bg-stone-50 hover:bg-amber-50 dark:bg-stone-800 dark:hover:bg-stone-750 border border-stone-200 dark:border-stone-700 rounded-xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                    Masuk dengan Nomor Handphone
                  </div>
                  <div className="text-xs text-stone-500 dark:text-stone-400">
                    Verifikasi kode OTP SMS / WhatsApp
                  </div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-stone-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* Step 2: Phone OTP Verification */}
        {authStep === 'phone_otp' && (
          <div className="p-6 space-y-4">
            <button
              onClick={() => setAuthStep('method')}
              className="text-xs font-semibold text-amber-600 hover:underline mb-2 inline-block"
            >
              ← Kembali ke Pilihan Metode
            </button>

            <div className="text-center">
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                Masuk dengan No. Handphone
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Masukkan nomor HP Anda untuk menerima kode verifikasi OTP
              </p>
            </div>

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Nomor WhatsApp / HP
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="081234567890"
                      className="w-full bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm rounded-lg pl-9 pr-3 py-2.5 border border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-amber-500"
                    />
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Kode OTP</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="bg-amber-50 dark:bg-amber-950/40 p-3 rounded-lg text-xs text-amber-800 dark:text-amber-300 border border-amber-200">
                  Kode OTP dikirimkan ke <strong>{phoneNumber}</strong> (Gunakan kode demo: <strong>8888</strong>)
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Kode Verifikasi (4 Digit)
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full text-center tracking-widest font-mono font-bold text-xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-stone-900 hover:bg-stone-800 text-amber-400 font-bold py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verifikasi & Lanjutkan</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* Step 3: Complete Profile Data Form */}
        {authStep === 'profile_form' && (
          <form onSubmit={handleSubmitProfile} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="bg-stone-900 text-stone-100 p-3.5 rounded-xl border border-amber-500/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-stone-950 font-bold flex items-center justify-center text-sm shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                  Lengkapi Biodata Penulis
                </div>
                <div className="text-xs text-stone-300">
                  Data ini akan ditampilkan pada atribusi artikel tulisan Anda.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Nama Lengkap Penulis *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 p-2.5 pl-8 rounded-lg border border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-amber-500"
                  />
                  <User className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Email Aktif *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@kampus.ac.id"
                    className="w-full bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 p-2.5 pl-8 rounded-lg border border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-amber-500"
                  />
                  <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Nomor Telepon / WhatsApp *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="081234567890"
                    className="w-full bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 p-2.5 pl-8 rounded-lg border border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-amber-500"
                  />
                  <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Universitas / Instansi *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="Universitas Indonesia"
                    className="w-full bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 p-2.5 pl-8 rounded-lg border border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-amber-500"
                  />
                  <GraduationCap className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
                </div>
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Program Studi / Jurusan
              </label>
              <input
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                placeholder="Ilmu Komunikasi / Sosiologi"
                className="w-full bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="text-xs">
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Bio Singkat Penulis
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tuliskan kepakaran atau ketertarikan isu yang sering Anda bahas..."
                className="w-full bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-stone-900 hover:bg-stone-800 text-amber-400 font-bold py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm mt-2"
            >
              <FileText className="w-4 h-4" />
              <span>Simpan Profil & Buka Dashboard Penulis</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
