import React from 'react';

interface LogoProps {
  variant?: 'full' | 'compact' | 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '', showTagline = true }) => {
  const isDark = variant === 'dark';
  
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Emblem / Symbol */}
      <div className="relative flex items-center justify-center shrink-0 w-12 h-12 rounded-xl bg-stone-900 border border-stone-800 shadow-sm p-0.5">
        <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center p-1 relative overflow-hidden">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:6px_6px]"></div>
          
          {/* Diamond Gunungan / Filigree Frame SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-500/50 absolute inset-0">
            <path d="M50 5 L95 50 L50 95 L5 50 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
          </svg>

          {/* Interlocking Monogram "IL" */}
          <div className="relative z-10 flex items-center justify-center font-serif font-black text-xl tracking-tighter drop-shadow-sm">
            <span className="text-amber-400">I</span>
            <span className="-ml-1 text-stone-100 italic">L</span>
          </div>
        </div>
      </div>

      {/* Brand Name & Taglines */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className={`font-serif font-black text-2xl md:text-3xl tracking-widest leading-none ${isDark ? 'text-stone-100' : 'text-stone-950'}`}>
            IDEALOGIKA
          </span>
          <span className="w-2 h-2 rounded-full bg-red-600 shrink-0 inline-block"></span>
        </div>

        {/* Media Tagline */}
        <span className={`text-[10px] sm:text-[11px] font-semibold tracking-tight leading-tight mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
          Media Independen, Gagasan & Suara Mahasiswa
        </span>

        {/* Slogan - Harmonized subtle colors with high legibility */}
        {showTagline && (
          <div className={`flex items-center gap-1.5 mt-1 text-[10px] font-medium tracking-wide px-2 py-0.5 rounded border w-fit transition-colors ${
            isDark 
              ? 'text-stone-300 bg-stone-900/90 border-stone-800' 
              : 'text-stone-700 bg-stone-200/70 border-stone-300/80'
          }`}>
            <span className="text-amber-600 text-[8px]">✦</span>
            <span>Berpikir Global Bertindak Lokal</span>
            <span className="text-amber-600 text-[8px]">✦</span>
          </div>
        )}
      </div>
    </div>
  );
};
