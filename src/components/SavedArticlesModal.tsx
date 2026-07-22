import React from 'react';
import { Article } from '../types';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';

interface SavedArticlesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveSave: (articleId: string) => void;
}

export const SavedArticlesModal: React.FC<SavedArticlesModalProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm overflow-y-auto flex justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-stone-50 w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="bg-stone-900 text-stone-100 px-6 py-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400 fill-current" />
            <h2 className="font-serif font-bold text-lg text-amber-400">
              Koleksi Bacaan Tersimpan ({savedArticles.length})
            </h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-stone-800 text-stone-400 hover:text-white rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {savedArticles.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Bookmark className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="text-stone-600 font-serif text-sm">
                Belum ada artikel yang Anda simpan. Klik ikon penanda buku pada artikel untuk menyimpannya di sini.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white p-4 rounded-xl border border-stone-200 flex items-center justify-between gap-4 hover:border-stone-400 transition-all shadow-xs group"
                >
                  <div
                    onClick={() => {
                      onSelectArticle(article);
                      onClose();
                    }}
                    className="flex items-center gap-3 cursor-pointer flex-1"
                  >
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-16 h-16 rounded object-cover shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                        {article.category}
                      </span>
                      <h4 className="font-serif font-bold text-stone-900 group-hover:text-amber-800 text-sm line-clamp-1 mt-1">
                        {article.title}
                      </h4>
                      <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                        Oleh {article.author.name} • {article.publishDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onRemoveSave(article.id)}
                      className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Hapus dari simpanan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onSelectArticle(article);
                        onClose();
                      }}
                      className="p-2 text-stone-700 hover:text-amber-800"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
