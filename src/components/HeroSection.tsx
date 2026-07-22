import React from 'react';
import { Article } from '../types';
import { Clock, Eye, Share2, Flame, Bookmark, ArrowUpRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  featuredArticle: Article;
  secondaryArticles: Article[];
  trendingArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onToggleSave: (articleId: string) => void;
  isSaved: (articleId: string) => boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredArticle,
  secondaryArticles,
  trendingArticles,
  onSelectArticle,
  onToggleSave,
  isSaved
}) => {
  if (!featuredArticle) return null;

  return (
    <section className="mb-12 border-b border-stone-200 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Hero Featured Article (Col 1-7) */}
        <div className="lg:col-span-7 group cursor-pointer" onClick={() => onSelectArticle(featuredArticle)}>
          <div className="relative overflow-hidden rounded-lg mb-4 bg-stone-900 aspect-16/10 shadow-md">
            <img
              src={featuredArticle.imageUrl}
              alt={featuredArticle.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
            />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="bg-red-600 text-white font-bold text-[11px] uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                HEADLINE UTAMA
              </span>
              <span className="bg-stone-900/80 text-amber-300 backdrop-blur-xs text-[11px] font-semibold px-2.5 py-1 rounded">
                {featuredArticle.category}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(featuredArticle.id);
              }}
              className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                isSaved(featuredArticle.id)
                  ? 'bg-amber-500 text-stone-900'
                  : 'bg-stone-900/60 text-white hover:bg-stone-900'
              }`}
              title="Simpan Artikel"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-950 group-hover:text-amber-800 transition-colors leading-tight">
              {featuredArticle.title}
            </h2>

            {featuredArticle.subtitle && (
              <p className="text-stone-600 text-sm sm:text-base line-clamp-2 leading-relaxed">
                {featuredArticle.subtitle}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-200 gap-2">
              <div className="flex items-center gap-2">
                <img
                  src={featuredArticle.author.avatar}
                  alt={featuredArticle.author.name}
                  className="w-6 h-6 rounded-full object-cover border border-stone-300"
                />
                <span className="font-semibold text-stone-800">{featuredArticle.author.name}</span>
                <span>•</span>
                <span>{featuredArticle.publishDate}</span>
              </div>

              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  {featuredArticle.readTimeMinutes} mnt baca
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-stone-400" />
                  {featuredArticle.viewCount.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Featured Articles Column (Col 8-12) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="border-b border-stone-800 pb-2 flex items-center justify-between">
            <h3 className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Laporan Unggulan Redaksi
            </h3>
            <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">Warta Pilihan</span>
          </div>

          <div className="space-y-5 divide-y divide-stone-200">
            {secondaryArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="pt-4 first:pt-0 group cursor-pointer flex gap-4 items-start"
              >
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                    <span className="text-[11px] text-stone-400">{article.publishDate}</span>
                  </div>

                  <h4 className="font-serif font-semibold text-stone-900 group-hover:text-amber-800 transition-colors text-base line-clamp-2 leading-snug">
                    {article.title}
                  </h4>

                  <div className="flex items-center gap-3 text-[11px] text-stone-500 pt-1">
                    <span>Oleh {article.author.name}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTimeMinutes} mnt
                    </span>
                  </div>
                </div>

                <div className="w-24 h-24 sm:w-28 sm:h-20 shrink-0 rounded overflow-hidden bg-stone-200 shadow-xs">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Trending Hot Box */}
          {trendingArticles.length > 0 && (
            <div className="bg-stone-900 text-stone-100 p-4 rounded-lg border border-stone-800 mt-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-3">
                <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
                Populer Hari Ini
              </div>
              <ul className="space-y-2.5">
                {trendingArticles.slice(0, 3).map((trend, idx) => (
                  <li
                    key={trend.id}
                    onClick={() => onSelectArticle(trend)}
                    className="flex items-start gap-2.5 text-xs group cursor-pointer hover:text-amber-300 transition-colors"
                  >
                    <span className="font-mono font-bold text-amber-500 text-sm">0{idx + 1}.</span>
                    <span className="line-clamp-2 leading-tight flex-1 font-medium">{trend.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400 shrink-0" />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
