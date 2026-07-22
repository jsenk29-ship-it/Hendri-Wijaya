import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onOpenSubmission: () => void;
  onOpenRedaksi: () => void;
  onSelectCategory: (cat: any) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSubmission,
  onOpenRedaksi,
  onSelectCategory
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-stone-800">
          {/* Brand Info (Col 1-5) */}
          <div className="md:col-span-5 space-y-4">
            <Logo variant="dark" showTagline={true} />
            <p className="text-xs text-stone-400 font-serif leading-relaxed pr-4">
              Portal warta, investigasi, dan opini independen pers mahasiswa. Mengusung dialektika kritis, objektivitas data, dan keberanian akademis.
            </p>

            <div className="flex items-center gap-3 text-stone-400 pt-2 text-xs font-mono">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Pers Mahasiswa Terverifikasi
              </span>
            </div>
          </div>

          {/* Nav Categories (Col 6-8) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-amber-400 text-sm uppercase tracking-wider">
              Kanal Berita
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => onSelectCategory('Kampus')} className="hover:text-amber-300 transition-colors">
                  Berita Kampus
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Pendidikan')} className="hover:text-amber-300 transition-colors">
                  Pendidikan
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Pemikiran')} className="hover:text-amber-300 transition-colors">
                  Pemikiran
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Nasional')} className="hover:text-amber-300 transition-colors">
                  Berita Nasional
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Internasional')} className="hover:text-amber-300 transition-colors">
                  Berita Internasional
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Opini & Essay')} className="hover:text-amber-300 transition-colors">
                  Opini & Essay
                </button>
              </li>
              <li>
                <button onClick={onOpenSubmission} className="text-amber-400 hover:underline font-semibold pt-1 inline-block">
                  + Kirim Tulisan Mahasiswa
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription (Col 9-12) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif font-bold text-amber-400 text-sm uppercase tracking-wider">
              Buletin Idealogika
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Dapatkan rangkuman laporan investigasi mingguan dan esai terpilih langsung di surel Anda.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs p-3 rounded-lg animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Terima kasih! Surel Anda telah terdaftar dalam buletin.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Masukkan surel Anda..."
                    className="w-full bg-stone-900 border border-stone-800 rounded-md pl-8 pr-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                  <Mail className="w-3.5 h-3.5 text-stone-500 absolute left-2.5 top-3 pointer-events-none" />
                </div>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs px-3.5 py-2 rounded-md transition-colors shrink-0"
                >
                  Berlangganan
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4 pt-4 font-mono">
          <div>
            © 2026 <span className="text-stone-300 font-bold">IDEALOGIKA</span>. Berpikir Global Bertindak Lokal.
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onOpenRedaksi} className="hover:text-stone-300">
              Dewan Redaksi
            </button>
            <span>•</span>
            <span className="hover:text-stone-300">Kode Etik Pers</span>
            <span>•</span>
            <span className="hover:text-stone-300">Hak Cipta Dilindungi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
