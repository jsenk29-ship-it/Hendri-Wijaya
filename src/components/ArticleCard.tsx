import React from 'react';
import { Article } from '../types';
import { Clock, Eye, Bookmark, Share2, MessageSquare, Sparkles } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  onToggleSave: (articleId: string) => void;
  isSaved: boolean;
  variant?: 'standard' | 'compact' | 'editorial';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  onToggleSave,
  isSaved,
  variant = 'standard'
}) => {
  if (variant === 'compact') {
    return (
      <div
        onClick={() => onSelect(article)}
        className="group cursor-pointer flex gap-3 p-3 bg-white rounded-lg border border-stone-200 hover:border-stone-400 hover:shadow-sm transition-all"
      >
        <div className="w-20 h-20 shrink-0 rounded overflow-hidden bg-stone-100">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
              {article.category}
            </span>
            <h4 className="font-serif text-sm font-semibold text-stone-900 group-hover:text-amber-800 line-clamp-2 mt-1 leading-tight">
              {article.title}
            </h4>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-stone-400 mt-2 font-mono">
            <span>{article.publishDate}</span>
            <span>•</span>
            <span>{article.readTimeMinutes} mnt</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article
      onClick={() => onSelect(article)}
      className="group cursor-pointer bg-white rounded-xl border border-stone-200/80 overflow-hidden hover:border-stone-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Cover Image */}
        <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="bg-stone-950/85 text-amber-300 backdrop-blur-xs font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded">
              {article.category}
            </span>
            {article.isEditorPick && (
              <span className="bg-amber-500 text-stone-950 font-bold text-[10px] uppercase px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
                <Sparkles className="w-2.5 h-2.5" /> Pilihan
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(article.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
              isSaved
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'bg-stone-900/60 text-white hover:bg-stone-900'
            }`}
            title="Simpan Artikel"
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-2.5">
          <h3 className="font-serif text-lg font-bold text-stone-950 group-hover:text-amber-800 transition-colors leading-snug line-clamp-2">
            {article.title}
          </h3>

          {article.subtitle && (
            <p className="text-stone-600 text-xs line-clamp-2 leading-relaxed">
              {article.subtitle}
            </p>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {article.tags.slice(0, 2).map((tag, idx) => (
                <span key={idx} className="text-[10px] font-mono text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-5 pb-4 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-5 h-5 rounded-full object-cover border border-stone-300"
          />
          <span className="font-medium text-stone-700 truncate max-w-[120px]">
            {article.author.name}
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px] text-stone-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTimeMinutes}m
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3 h-3" />
            {article.comments.length}
          </span>
        </div>
      </div>
    </article>
  );
};
