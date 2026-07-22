import React from 'react';
import { CategoryType } from '../types';
import { Flame, Sparkles, BookOpen, GraduationCap, Globe, Flag, Brain, Building2 } from 'lucide-react';

interface NavigationProps {
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  counts: Record<CategoryType, number>;
}

const CATEGORIES: { id: CategoryType; label: string; icon: React.ReactNode }[] = [
  { id: 'Semua', label: 'Semua Berita', icon: <BookOpen className="w-3.5 h-3.5" /> },
  { id: 'Kampus', label: 'Berita Kampus', icon: <Building2 className="w-3.5 h-3.5" /> },
  { id: 'Pendidikan', label: 'Pendidikan', icon: <GraduationCap className="w-3.5 h-3.5" /> },
  { id: 'Pemikiran', label: 'Pemikiran', icon: <Brain className="w-3.5 h-3.5" /> },
  { id: 'Nasional', label: 'Nasional', icon: <Flag className="w-3.5 h-3.5" /> },
  { id: 'Internasional', label: 'Internasional', icon: <Globe className="w-3.5 h-3.5" /> },
  { id: 'Opini & Essay', label: 'Opini & Essay', icon: <Sparkles className="w-3.5 h-3.5" /> },
];

export const Navigation: React.FC<NavigationProps> = ({
  activeCategory,
  onSelectCategory,
  counts
}) => {
  return (
    <div className="bg-stone-100 border-b border-stone-200 sticky top-[108px] z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2 no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = counts[cat.id] || 0;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-stone-900 text-amber-400 shadow-sm'
                    : 'text-stone-700 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
                <span
                  className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive
                      ? 'bg-amber-400/20 text-amber-300'
                      : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
