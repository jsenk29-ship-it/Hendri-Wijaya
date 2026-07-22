import React from 'react';
import { Article } from '../types';
import { Sparkles, Quote, ArrowRight } from 'lucide-react';

interface OpinionSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const OpinionSection: React.FC<OpinionSectionProps> = ({ articles, onSelectArticle }) => {
  if (articles.length === 0) return null;

  return (
    <section className="my-12 bg-stone-900 text-stone-100 p-6 sm:p-8 rounded-2xl border border-stone-800 shadow-xl">
      <div className="flex flex-wrap items-center justify-between border-b border-stone-800 pb-4 mb-6 gap-2">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Kolom & Pemikiran Kritis
          </div>
          <h3 className="font-serif font-black text-2xl sm:text-3xl text-stone-100 mt-1">
            Opini & Esai Kebijakan
          </h3>
        </div>
        <p className="text-xs text-stone-400 font-serif italic max-w-sm hidden sm:block">
          Gagasan akademis, refleksi sosial, dan perdebatan ideologi pemuda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="bg-stone-800/90 hover:bg-stone-800 p-6 rounded-xl border border-stone-700/80 hover:border-amber-500/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <Quote className="w-8 h-8 text-amber-500/40 group-hover:text-amber-400 transition-colors" />

              <h4 className="font-serif font-bold text-lg text-stone-100 group-hover:text-amber-300 leading-snug line-clamp-3">
                "{article.title}"
              </h4>

              <p className="text-stone-400 text-xs line-clamp-2 leading-relaxed">
                {article.subtitle}
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-stone-700/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-8 h-8 rounded-full object-cover border border-amber-500/40"
                />
                <div>
                  <div className="text-xs font-bold text-stone-200">{article.author.name}</div>
                  <div className="text-[10px] text-amber-400/90 font-mono">{article.author.university || article.author.role}</div>
                </div>
              </div>

              <div className="p-2 bg-stone-700 group-hover:bg-amber-500 text-stone-200 group-hover:text-stone-950 rounded-full transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
