import React, { useState } from 'react';
import { 
  Article, 
  CategoryType, 
  ArticleStatus 
} from '../types';
import { 
  ShieldCheck, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Edit3, 
  Trash2, 
  Eye, 
  Plus, 
  TrendingUp, 
  Star, 
  LogOut, 
  X,
  Search,
  Check,
  AlertCircle
} from 'lucide-react';
import { Logo } from './Logo';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  articles: Article[];
  onUpdateArticle: (updated: Article) => void;
  onDeleteArticle: (id: string) => void;
  onCreateArticle: (newArticle: Article) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  onLogout,
  articles,
  onUpdateArticle,
  onDeleteArticle,
  onCreateArticle
}) => {
  const [activeTab, setActiveTab] = useState<'articles' | 'submissions' | 'create'>('articles');
  const [filterCategory, setFilterCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Form state for creating/editing article by admin
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('Kampus');
  const [authorName, setAuthorName] = useState('Redaksi Idealogika');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200');
  const [content, setContent] = useState('');
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  if (!isOpen) return null;

  const pendingArticles = articles.filter(a => a.status === 'pending');
  const publishedArticles = articles.filter(a => !a.status || a.status === 'published');

  const filteredArticles = publishedArticles.filter(a => {
    const matchesCat = filterCategory === 'Semua' || a.category === filterCategory;
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleApproveArticle = (article: Article) => {
    onUpdateArticle({
      ...article,
      status: 'published'
    });
  };

  const handleRejectArticle = (article: Article) => {
    const reason = prompt('Masukkan alasan penolakan/catatan revisi untuk penulis:', 'Tulisan memerlukan referensi data kuantitatif lebih rinci.');
    if (reason !== null) {
      onUpdateArticle({
        ...article,
        status: 'rejected',
        rejectionReason: reason
      });
    }
  };

  const handleToggleFeatured = (article: Article) => {
    onUpdateArticle({ ...article, isFeatured: !article.isFeatured });
  };

  const handleToggleTrending = (article: Article) => {
    onUpdateArticle({ ...article, isTrending: !article.isTrending });
  };

  const handleToggleEditorPick = (article: Article) => {
    onUpdateArticle({ ...article, isEditorPick: !article.isEditorPick });
  };

  const handleStartCreate = () => {
    setEditingArticleId(null);
    setTitle('');
    setSubtitle('');
    setCategory('Kampus');
    setAuthorName('Redaksi Idealogika');
    setImageUrl('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200');
    setContent('<p>Tuliskan paragraf berita resmi redaksi di sini...</p>');
    setActiveTab('create');
  };

  const handleStartEdit = (article: Article) => {
    setEditingArticleId(article.id);
    setTitle(article.title);
    setSubtitle(article.subtitle || '');
    setCategory(article.category);
    setAuthorName(article.author.name);
    setImageUrl(article.imageUrl);
    setContent(article.content);
    setActiveTab('create');
  };

  const handleSaveArticleForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingArticleId) {
      const existing = articles.find(a => a.id === editingArticleId);
      if (existing) {
        onUpdateArticle({
          ...existing,
          title,
          subtitle,
          category,
          imageUrl,
          content,
          author: { ...existing.author, name: authorName }
        });
      }
    } else {
      const newArt: Article = {
        id: `art-admin-${Date.now()}`,
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        subtitle,
        category,
        author: {
          name: authorName,
          role: 'Redaktur Idealogika',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
        },
        publishDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        readTimeMinutes: 4,
        imageUrl,
        content: content || `<p>${subtitle}</p>`,
        tags: [`#${category}`, '#IdealogikaRedaksi'],
        status: 'published',
        viewCount: 1,
        shareCount: 0,
        comments: []
      };
      onCreateArticle(newArt);
    }
    setActiveTab('articles');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 backdrop-blur-md p-2 sm:p-4 animate-fadeIn">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl max-w-6xl w-full h-[92vh] flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="bg-stone-950 text-white p-4 px-6 flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-4">
            <Logo variant="dark" showTagline={false} />
            <div className="hidden sm:flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs border border-amber-500/30 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>DASHBOARD PENGELOLA WEB</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-900/60 px-3 py-1.5 rounded-lg border border-red-800/50 transition-colors font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-stone-100 dark:bg-stone-800/80 px-6 border-b border-stone-200 dark:border-stone-700 flex items-center justify-between overflow-x-auto">
          <div className="flex space-x-1 py-2">
            <button
              onClick={() => setActiveTab('articles')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'articles'
                  ? 'bg-stone-900 text-amber-400 shadow-sm'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Kelola Keluaran Berita ({publishedArticles.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('submissions')}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'submissions'
                  ? 'bg-stone-900 text-amber-400 shadow-sm'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Review Tulisan Penulis</span>
              {pendingArticles.length > 0 && (
                <span className="bg-red-600 text-white font-mono text-[10px] px-2 py-0.5 rounded-full animate-pulse">
                  {pendingArticles.length}
                </span>
              )}
            </button>

            <button
              onClick={handleStartCreate}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'create'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-stone-700'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>{editingArticleId ? 'Edit Artikel' : 'Tulis Artikel Redaksi Baru'}</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-50 dark:bg-stone-900/50">
          {/* TAB 1: ARTICLES MANAGEMENT */}
          {activeTab === 'articles' && (
            <div className="space-y-4">
              {/* Filter controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-stone-800 p-3.5 rounded-xl border border-stone-200 dark:border-stone-700">
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari judul atau penulis..."
                    className="w-full bg-stone-50 dark:bg-stone-900 text-xs text-stone-900 dark:text-stone-100 pl-8 pr-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                  <span className="text-xs font-semibold text-stone-500 shrink-0">Kategori:</span>
                  {['Semua', 'Kampus', 'Pendidikan', 'Pemikiran', 'Nasional', 'Internasional', 'Opini & Essay'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold shrink-0 transition-colors ${
                        filterCategory === cat
                          ? 'bg-amber-500 text-stone-950 font-bold'
                          : 'bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table list */}
              <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-300 font-bold uppercase tracking-wider border-b border-stone-200 dark:border-stone-700">
                      <tr>
                        <th className="p-3">Berita / Artikel</th>
                        <th className="p-3">Kategori</th>
                        <th className="p-3">Penulis</th>
                        <th className="p-3">Statistik</th>
                        <th className="p-3 text-center">Status Flag</th>
                        <th className="p-3 text-right">Aksi Redaksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 dark:divide-stone-700">
                      {filteredArticles.map((art) => (
                        <tr key={art.id} className="hover:bg-stone-50 dark:hover:bg-stone-750/50 transition-colors">
                          <td className="p-3 max-w-md">
                            <div className="font-bold text-stone-900 dark:text-stone-100 text-sm line-clamp-1">
                              {art.title}
                            </div>
                            <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                              {art.publishDate} • {art.readTimeMinutes} menit baca
                            </div>
                          </td>

                          <td className="p-3">
                            <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold px-2 py-0.5 rounded text-[10px]">
                              {art.category}
                            </span>
                          </td>

                          <td className="p-3">
                            <div className="font-medium text-stone-800 dark:text-stone-200">
                              {art.author.name}
                            </div>
                            <div className="text-[10px] text-stone-500">
                              {art.author.university || art.author.role}
                            </div>
                          </td>

                          <td className="p-3 font-mono text-[11px] text-stone-600 dark:text-stone-400">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3 text-amber-500" />
                              <span>{art.viewCount.toLocaleString()} dibaca</span>
                            </div>
                          </td>

                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => handleToggleFeatured(art)}
                                title="Utama / Featured"
                                className={`p-1 rounded ${art.isFeatured ? 'bg-amber-500 text-stone-950' : 'bg-stone-100 dark:bg-stone-700 text-stone-400'}`}
                              >
                                <Star className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleToggleTrending(art)}
                                title="Trending"
                                className={`p-1 rounded ${art.isTrending ? 'bg-red-500 text-white' : 'bg-stone-100 dark:bg-stone-700 text-stone-400'}`}
                              >
                                <TrendingUp className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleToggleEditorPick(art)}
                                title="Pilihan Redaksi"
                                className={`p-1 rounded ${art.isEditorPick ? 'bg-blue-600 text-white' : 'bg-stone-100 dark:bg-stone-700 text-stone-400'}`}
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>

                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => handleStartEdit(art)}
                                className="p-1.5 bg-stone-100 hover:bg-amber-100 dark:bg-stone-700 dark:hover:bg-amber-900/50 text-stone-700 dark:text-stone-200 hover:text-amber-700 rounded transition-colors"
                                title="Edit Artikel"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => {
                                  if (confirm(`Hapus artikel "${art.title}"?`)) {
                                    onDeleteArticle(art.id);
                                  }
                                }}
                                className="p-1.5 bg-stone-100 hover:bg-red-100 dark:bg-stone-700 dark:hover:bg-red-950 text-stone-700 dark:text-stone-200 hover:text-red-600 rounded transition-colors"
                                title="Hapus Artikel"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REVIEW SUBMISSIONS FROM WRITERS */}
          {activeTab === 'submissions' && (
            <div className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 p-4 rounded-xl text-xs text-amber-900 dark:text-amber-200">
                <span className="font-bold block mb-1">Mekanisme Review Tulisan Masuk:</span>
                Setiap tulisan dari Penulis/Kontributor luar memerlukan persetujuan Dewan Redaksi sebelum resmi diterbitkan di portal berita Idealogika.
              </div>

              {pendingArticles.length === 0 ? (
                <div className="bg-white dark:bg-stone-800 rounded-xl p-12 text-center border border-stone-200 dark:border-stone-700">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3 opacity-80" />
                  <h4 className="font-bold text-stone-800 dark:text-stone-200 text-base">
                    Semua Tulisan Sudah Didevisi & Di-review
                  </h4>
                  <p className="text-xs text-stone-500 mt-1">
                    Tidak ada antrean tulisan baru yang menunggu persetujuan redaksi saat ini.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingArticles.map((art) => (
                    <div key={art.id} className="bg-white dark:bg-stone-800 p-5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-700 pb-3">
                        <div>
                          <span className="bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 font-bold text-[10px] uppercase px-2 py-0.5 rounded mr-2">
                            {art.category}
                          </span>
                          <span className="text-xs text-stone-500">
                            Dikirim: {art.publishDate}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApproveArticle(art)}
                            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition-all"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Setujui & Terbitkan</span>
                          </button>

                          <button
                            onClick={() => handleRejectArticle(art)}
                            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition-all"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Minta Revisi / Tolak</span>
                          </button>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                          {art.title}
                        </h3>
                        {art.subtitle && (
                          <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 italic">
                            "{art.subtitle}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-3 bg-stone-50 dark:bg-stone-900 p-3 rounded-lg border border-stone-200 dark:border-stone-700 text-xs">
                        <img
                          src={art.author.avatar}
                          alt={art.author.name}
                          className="w-8 h-8 rounded-full object-cover shrink-0"
                        />
                        <div>
                          <div className="font-bold text-stone-900 dark:text-stone-100">
                            {art.author.name}
                          </div>
                          <div className="text-[11px] text-stone-500">
                            {art.author.university || 'Kontributor'} {art.author.phone ? `• HP: ${art.author.phone}` : ''}
                          </div>
                        </div>
                      </div>

                      <div className="bg-stone-100 dark:bg-stone-900/60 p-4 rounded-lg text-xs text-stone-800 dark:text-stone-200 font-sans max-h-40 overflow-y-auto border border-stone-200 dark:border-stone-750">
                        <div dangerouslySetInnerHTML={{ __html: art.content }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CREATE / EDIT ARTICLE FORM */}
          {activeTab === 'create' && (
            <form onSubmit={handleSaveArticleForm} className="bg-white dark:bg-stone-800 p-6 rounded-xl border border-stone-200 dark:border-stone-700 space-y-4 max-w-4xl mx-auto">
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 border-b border-stone-200 dark:border-stone-700 pb-2">
                {editingArticleId ? 'Sunting Berita Redaksi' : 'Tulis Berita Redaksi Baru'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Judul Berita *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Masukkan judul utama berita..."
                    className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-amber-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Kategori Berita *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryType)}
                    className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-amber-500 text-sm"
                  >
                    <option value="Kampus">Berita Kampus</option>
                    <option value="Pendidikan">Pendidikan</option>
                    <option value="Pemikiran">Pemikiran</option>
                    <option value="Nasional">Nasional</option>
                    <option value="Internasional">Internasional</option>
                    <option value="Opini & Essay">Opini & Essay</option>
                  </select>
                </div>
              </div>

              <div className="text-xs">
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Sub-judul / Lead Paragraf
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Ringkasan singkat 1 kalimat di bawah judul..."
                  className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Nama Atribusi Penulis / Jurnalis
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Tim Redaksi Idealogika"
                    className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    URL Gambar Sampul Header
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Isi Konten Berita Lengkap (HTML / Teks)
                </label>
                <textarea
                  rows={8}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full font-mono bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 p-3 rounded-lg border border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-amber-500 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('articles')}
                  className="px-4 py-2 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-200 rounded-lg text-xs font-bold"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-lg text-xs shadow-md transition-all"
                >
                  {editingArticleId ? 'Simpan Perubahan' : 'Terbitkan Berita'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
