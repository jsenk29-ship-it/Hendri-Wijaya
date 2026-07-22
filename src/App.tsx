import React, { useState, useEffect, useMemo } from 'react';
import { Article, CategoryType, Comment, UserRole, WriterProfile } from './types';
import { INITIAL_ARTICLES } from './data/newsData';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { EditorialSubmissionModal } from './components/EditorialSubmissionModal';
import { RedaksiModal } from './components/RedaksiModal';
import { SavedArticlesModal } from './components/SavedArticlesModal';
import { OpinionSection } from './components/OpinionSection';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { WriterAuthModal } from './components/WriterAuthModal';
import { WriterDashboardModal } from './components/WriterDashboardModal';
import { Footer } from './components/Footer';
import { SearchX, Sparkles, ChevronRight } from 'lucide-react';

export default function App() {
  const [articles, setArticles] = useState<Article[]>(() => {
    const local = localStorage.getItem('idealogika_articles');
    if (local) {
      try { return JSON.parse(local); } catch { return INITIAL_ARTICLES; }
    }
    return INITIAL_ARTICLES;
  });

  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    const local = localStorage.getItem('idealogika_saved_ids');
    if (local) {
      try { return JSON.parse(local); } catch { return []; }
    }
    return ['art-1', 'art-3'];
  });

  // User Authentication State
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(() => {
    return (localStorage.getItem('idealogika_role') as UserRole) || 'guest';
  });

  const [writerProfile, setWriterProfile] = useState<WriterProfile | null>(() => {
    const local = localStorage.getItem('idealogika_writer');
    if (local) {
      try { return JSON.parse(local); } catch { return null; }
    }
    return null;
  });

  const [activeCategory, setActiveCategory] = useState<CategoryType>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedArticleDetail, setSelectedArticleDetail] = useState<Article | null>(null);
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);
  const [isRedaksiOpen, setIsRedaksiOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  // Admin & Writer Auth/Dashboard Modals
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isWriterAuthOpen, setIsWriterAuthOpen] = useState(false);
  const [isWriterDashboardOpen, setIsWriterDashboardOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('idealogika_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('idealogika_saved_ids', JSON.stringify(savedArticleIds));
  }, [savedArticleIds]);

  useEffect(() => {
    localStorage.setItem('idealogika_role', currentUserRole);
  }, [currentUserRole]);

  useEffect(() => {
    if (writerProfile) {
      localStorage.setItem('idealogika_writer', JSON.stringify(writerProfile));
    } else {
      localStorage.removeItem('idealogika_writer');
    }
  }, [writerProfile]);

  // Handle Save / Bookmark toggle
  const toggleSaveArticle = (articleId: string) => {
    setSavedArticleIds((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId]
    );
  };

  const isArticleSaved = (articleId: string) => savedArticleIds.includes(articleId);

  // Filtered Articles Logic (showing published articles to public)
  const filteredArticles = useMemo(() => {
    return articles
      .filter(art => !art.status || art.status === 'published')
      .filter((art) => {
        const matchCategory = activeCategory === 'Semua' || art.category === activeCategory;
        if (!matchCategory) return false;

        if (!searchQuery.trim()) return true;

        const q = searchQuery.toLowerCase();
        const matchTitle = art.title.toLowerCase().includes(q);
        const matchSubtitle = art.subtitle?.toLowerCase().includes(q) || false;
        const matchAuthor = art.author.name.toLowerCase().includes(q);
        const matchTag = art.tags?.some((t) => t.toLowerCase().includes(q)) || false;

        return matchTitle || matchSubtitle || matchAuthor || matchTag;
      });
  }, [articles, activeCategory, searchQuery]);

  // Category Counters
  const categoryCounts = useMemo(() => {
    const published = articles.filter(a => !a.status || a.status === 'published');
    const counts: Record<CategoryType, number> = {
      Semua: published.length,
      Kampus: 0,
      Pendidikan: 0,
      Pemikiran: 0,
      Nasional: 0,
      Internasional: 0,
      'Opini & Essay': 0
    };

    published.forEach((art) => {
      if (counts[art.category] !== undefined) {
        counts[art.category]++;
      }
    });

    return counts;
  }, [articles]);

  // Featured Article for Hero
  const featuredArticle = useMemo(() => {
    const published = articles.filter(a => !a.status || a.status === 'published');
    return published.find((a) => a.isFeatured) || published[0];
  }, [articles]);

  const secondaryArticles = useMemo(() => {
    const published = articles.filter(a => !a.status || a.status === 'published');
    return published.filter((a) => a.id !== featuredArticle?.id && a.isEditorPick).slice(0, 3);
  }, [articles, featuredArticle]);

  const trendingArticles = useMemo(() => {
    const published = articles.filter(a => !a.status || a.status === 'published');
    return published.filter((a) => a.isTrending);
  }, [articles]);

  const opinionArticles = useMemo(() => {
    const published = articles.filter(a => !a.status || a.status === 'published');
    return published.filter((a) => a.category === 'Opini & Essay' || a.category === 'Pemikiran');
  }, [articles]);

  const savedArticlesList = useMemo(() => {
    return articles.filter((a) => savedArticleIds.includes(a.id));
  }, [articles, savedArticleIds]);

  // Handle Add Comment
  const handleAddComment = (articleId: string, newComment: Comment) => {
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id === articleId) {
          return {
            ...art,
            comments: [newComment, ...art.comments]
          };
        }
        return art;
      })
    );

    if (selectedArticleDetail && selectedArticleDetail.id === articleId) {
      setSelectedArticleDetail((prev) =>
        prev ? { ...prev, comments: [newComment, ...prev.comments] } : null
      );
    }
  };

  // Article State Handlers for Admin and Writers
  const handleUpdateArticle = (updated: Article) => {
    setArticles(prev => prev.map(a => a.id === updated.id ? updated : a));
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  const handleCreateArticle = (newArt: Article) => {
    setArticles(prev => [newArt, ...prev]);
  };

  // Auth Action Handlers
  const handleSuccessAdminLogin = () => {
    setCurrentUserRole('admin');
    setIsAdminAuthOpen(false);
    setIsAdminDashboardOpen(true);
  };

  const handleSuccessWriterLogin = (profile: WriterProfile) => {
    setCurrentUserRole('penulis');
    setWriterProfile(profile);
    setIsWriterAuthOpen(false);
    setIsWriterDashboardOpen(true);
  };

  const handleLogout = () => {
    setCurrentUserRole('guest');
    setWriterProfile(null);
    setIsAdminDashboardOpen(false);
    setIsWriterDashboardOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans selection:bg-amber-400 selection:text-stone-950">
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        savedCount={savedArticleIds.length}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        onOpenSubmission={() => {
          if (currentUserRole === 'penulis' && writerProfile) {
            setIsWriterDashboardOpen(true);
          } else {
            setIsWriterAuthOpen(true);
          }
        }}
        onOpenRedaksi={() => setIsRedaksiOpen(true)}
        onOpenAdminAuth={() => {
          if (currentUserRole === 'admin') {
            setIsAdminDashboardOpen(true);
          } else {
            setIsAdminAuthOpen(true);
          }
        }}
        onOpenWriterAuth={() => {
          if (currentUserRole === 'penulis' && writerProfile) {
            setIsWriterDashboardOpen(true);
          } else {
            setIsWriterAuthOpen(true);
          }
        }}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
        onOpenWriterDashboard={() => setIsWriterDashboardOpen(true)}
        currentUserRole={currentUserRole}
        writerProfile={writerProfile}
        activeCategory={activeCategory}
      />

      {/* Navigation */}
      <Navigation
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
        }}
        counts={categoryCounts}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Search Header Banner if searching */}
        {searchQuery && (
          <div className="bg-white p-4 rounded-xl border border-stone-300 flex items-center justify-between shadow-xs">
            <div className="text-sm font-serif">
              Hasil pencarian untuk <span className="font-bold text-amber-800">"{searchQuery}"</span> ({filteredArticles.length} artikel ditemukan)
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-stone-500 hover:text-stone-900 underline"
            >
              Bersihkan Pencarian
            </button>
          </div>
        )}

        {/* Hero Newspaper Section (Only when viewing 'Semua' and no search query active) */}
        {activeCategory === 'Semua' && !searchQuery && featuredArticle && (
          <HeroSection
            featuredArticle={featuredArticle}
            secondaryArticles={secondaryArticles}
            trendingArticles={trendingArticles}
            onSelectArticle={(art) => setSelectedArticleDetail(art)}
            onToggleSave={toggleSaveArticle}
            isSaved={isArticleSaved}
          />
        )}

        {/* Opinion Section Spotlight */}
        {activeCategory === 'Semua' && !searchQuery && opinionArticles.length > 0 && (
          <OpinionSection
            articles={opinionArticles}
            onSelectArticle={(art) => setSelectedArticleDetail(art)}
          />
        )}

        {/* Article Grid Header */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b-2 border-stone-900 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-amber-500 rounded-full inline-block"></span>
              <h3 className="font-serif text-xl sm:text-2xl font-black text-stone-950 uppercase tracking-tight">
                {activeCategory === 'Semua' ? 'Warta & Laporan Terbaru' : `Kategori: ${activeCategory}`}
              </h3>
            </div>
            <span className="text-xs font-mono text-stone-500">
              Menampilkan {filteredArticles.length} Laporan
            </span>
          </div>

          {/* Articles Cards Grid */}
          {filteredArticles.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
              <SearchX className="w-12 h-12 text-stone-400 mx-auto" />
              <h4 className="font-serif font-bold text-lg text-stone-800">Tidak ada artikel ditemukan</h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Coba ubah kata kunci pencarian Anda atau pilih kategori berita lainnya.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onSelect={(art) => setSelectedArticleDetail(art)}
                  onToggleSave={toggleSaveArticle}
                  isSaved={isArticleSaved(article.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Citizen Journalism / Call to Action Box */}
        <div className="bg-stone-900 text-stone-100 p-8 rounded-2xl border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <div className="text-amber-400 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Kanal Pers Mahasiswa
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Ingin Mempublikasikan Gagasan atau Hasil Riset Anda?
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed font-serif">
              Idealogika memberikan panggung bagi intelektual muda. Masuk dengan Google atau No HP dan kirimkan tulisan Anda langsung ke dewan redaksi.
            </p>
          </div>

          <button
            onClick={() => {
              if (currentUserRole === 'penulis' && writerProfile) {
                setIsWriterDashboardOpen(true);
              } else {
                setIsWriterAuthOpen(true);
              }
            }}
            className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-md transition-all shrink-0 flex items-center gap-2"
          >
            Tulis & Kirim Laporan
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenSubmission={() => {
          if (currentUserRole === 'penulis' && writerProfile) {
            setIsWriterDashboardOpen(true);
          } else {
            setIsWriterAuthOpen(true);
          }
        }}
        onOpenRedaksi={() => setIsRedaksiOpen(true)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modals */}
      <ArticleDetailModal
        article={selectedArticleDetail}
        onClose={() => setSelectedArticleDetail(null)}
        onToggleSave={toggleSaveArticle}
        isSaved={selectedArticleDetail ? isArticleSaved(selectedArticleDetail.id) : false}
        relatedArticles={articles.filter((a) => a.id !== selectedArticleDetail?.id)}
        onSelectArticle={(art) => setSelectedArticleDetail(art)}
        onAddComment={handleAddComment}
      />

      <EditorialSubmissionModal
        isOpen={isSubmissionOpen}
        onClose={() => setIsSubmissionOpen(false)}
        onSubmitNewArticle={handleCreateArticle}
      />

      <RedaksiModal
        isOpen={isRedaksiOpen}
        onClose={() => setIsRedaksiOpen(false)}
      />

      <SavedArticlesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedArticles={savedArticlesList}
        onSelectArticle={(art) => setSelectedArticleDetail(art)}
        onRemoveSave={toggleSaveArticle}
      />

      {/* Admin Auth & Dashboard Modals */}
      <AdminLoginModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onSuccessLogin={handleSuccessAdminLogin}
      />

      <AdminDashboardModal
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        onLogout={handleLogout}
        articles={articles}
        onUpdateArticle={handleUpdateArticle}
        onDeleteArticle={handleDeleteArticle}
        onCreateArticle={handleCreateArticle}
      />

      {/* Writer Auth & Dashboard Modals */}
      <WriterAuthModal
        isOpen={isWriterAuthOpen}
        onClose={() => setIsWriterAuthOpen(false)}
        onSuccessLogin={handleSuccessWriterLogin}
      />

      {writerProfile && (
        <WriterDashboardModal
          isOpen={isWriterDashboardOpen}
          onClose={() => setIsWriterDashboardOpen(false)}
          writer={writerProfile}
          onLogout={handleLogout}
          articles={articles}
          onSubmitArticle={handleCreateArticle}
          onUpdateProfile={(updated) => setWriterProfile(updated)}
        />
      )}
    </div>
  );
}
