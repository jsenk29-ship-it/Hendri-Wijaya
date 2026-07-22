import React, { useState } from 'react';
import { 
  WriterProfile, 
  Article, 
  CategoryType 
} from '../types';
import { 
  PenTool, 
  User, 
  GraduationCap, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Plus, 
  Sparkles, 
  LogOut, 
  X, 
  FileText,
  BookOpen,
  Edit3
} from 'lucide-react';
import { Logo } from './Logo';

interface WriterDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  writer: WriterProfile;
  onLogout: () => void;
  articles: Article[];
  onSubmitArticle: (newArticle: Article) => void;
  onUpdateProfile: (updated: WriterProfile) => void;
}

export const WriterDashboardModal: React.FC<WriterDashboardModalProps> = ({
  isOpen,
  onClose,
  writer,
  onLogout,
  articles,
  onSubmitArticle,
  onUpdateProfile
}) => {
  const [activeTab, setActiveTab] = useState<'my_articles' | 'create' | 'profile'>('my_articles');

  // New Article Form
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('Opini & Essay');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200');
  
  // AI Assistant state
  const [aiTopic, setAiTopic] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Edit Profile State
  const [editName, setEditName] = useState(writer.name);
  const [editUniv, setEditUniv] = useState(writer.university);
  const [editMajor, setEditMajor] = useState(writer.major);
  const [editPhone, setEditPhone] = useState(writer.phone);
  const [editBio, setEditBio] = useState(writer.bio);

  if (!isOpen) return null;

  // Filter articles written by this contributor
  const myArticles = articles.filter(
    a => a.author.name === writer.name || a.author.email === writer.email
  );

  const handleGenerateAiDraft = async () => {
    if (!aiTopic.trim()) return;
    setIsGeneratingAi(true);

    try {
      const response = await fetch('/api/editorial-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiTopic,
          category
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.title) setTitle(data.title);
        if (data.subtitle) setSubtitle(data.subtitle);
        if (data.draft) setContent(data.draft);
      } else {
        // Fallback generator
        setTitle(`Opini Mahasiswa: ${aiTopic}`);
        setSubtitle(`Tinjauan kritis mengenai ${aiTopic} dari kacamata intelektual muda.`);
        setContent(`
          <p class="lead">Pembahasan mengenai ${aiTopic} menarik perhatian akademisi dan mahasiswa. Sebagai intelektual muda, kita dipanggil untuk mengkritisi setiap dampak sosial yang ditimbulkannya.</p>
          <h3>Gagasan Utama dan Realitas Lapangan</h3>
          <p>Dalam realitas hari ini, ${aiTopic} memerlukan penanganan komprehensif berbasis data dan keberpihakan pada kepentingan publik.</p>
        `);
      }
    } catch {
      setTitle(`Opini Mahasiswa: ${aiTopic}`);
      setSubtitle(`Tinjauan kritis mengenai ${aiTopic} dari kacamata intelektual muda.`);
      setContent(`
        <p class="lead">Pembahasan mengenai ${aiTopic} menarik perhatian akademisi dan mahasiswa. Sebagai intelektual muda, kita dipanggil untuk mengkritisi setiap dampak sosial yang ditimbulkannya.</p>
        <h3>Gagasan Utama dan Realitas Lapangan</h3>
        <p>Dalam realitas hari ini, ${aiTopic} memerlukan penanganan komprehensif berbasis data dan keberpihakan pada kepentingan publik.</p>
      `);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleFormSubmitArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const newArt: Article = {
      id: `art-writer-${Date.now()}`,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      subtitle,
      category,
      author: {
        name: writer.name,
        role: 'Penulis Kontributor',
        avatar: writer.avatar,
        university: writer.university,
        email: writer.email,
        phone: writer.phone
      },
      publishDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      readTimeMinutes: 5,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200',
      content: content || `<p>${subtitle}</p>`,
      tags: [`#${category}`, '#OpiniMahasiswa', `#${writer.university.replace(/\s+/g, '')}`],
      status: 'pending', // Pending approval by admin/redaksi
      viewCount: 0,
      shareCount: 0,
      comments: []
    };

    onSubmitArticle(newArt);
    setTitle('');
    setSubtitle('');
    setContent('');
    setAiTopic('');
    setActiveTab('my_articles');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...writer,
      name: editName,
      university: editUniv,
      major: editMajor,
      phone: editPhone,
      bio: editBio
    });
    alert('Profil penulis berhasil diperbarui!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 backdrop-blur-md p-2 sm:p-4 animate-fadeIn">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl max-w-5xl w-full h-[90vh] flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="bg-stone-950 text-white p-4 px-6 flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <Logo variant="dark" showTagline={false} />
            <div className="hidden sm:flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs border border-amber-500/30 font-semibold">
              <PenTool className="w-3.5 h-3.5 text-amber-400" />
              <span>PORTAL PENULIS MAHASISWA</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 px-3 py-1.5 rounded-lg border border-stone-700 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5 text-amber-400" />
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

        {/* Writer Info Strip */}
        <div className="bg-amber-500/10 dark:bg-stone-800 border-b border-amber-200 dark:border-stone-700 p-4 px-6 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <img
              src={writer.avatar}
              alt={writer.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/50"
            />
            <div>
              <div className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                {writer.name}
              </div>
              <div className="text-stone-600 dark:text-stone-400 flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3 h-3 text-amber-600" />
                  {writer.university} ({writer.major})
                </span>
                <span>•</span>
                <span>{writer.email}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('create')}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-4 py-2 rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Kirim Tulisan Baru</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-stone-100 dark:bg-stone-800 px-6 border-b border-stone-200 dark:border-stone-700 flex space-x-2 py-2">
          <button
            onClick={() => setActiveTab('my_articles')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'my_articles'
                ? 'bg-stone-900 text-amber-400 shadow-xs'
                : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Karya Tulisan Saya ({myArticles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('create')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'create'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-amber-700 dark:text-amber-400 hover:bg-amber-100'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Artikel Baru</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'profile'
                ? 'bg-stone-900 text-amber-400 shadow-xs'
                : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Biodata & Profil</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-50 dark:bg-stone-900/50">
          {/* TAB 1: MY ARTICLES */}
          {activeTab === 'my_articles' && (
            <div className="space-y-4">
              {myArticles.length === 0 ? (
                <div className="bg-white dark:bg-stone-800 rounded-xl p-12 text-center border border-stone-200 dark:border-stone-700">
                  <BookOpen className="w-12 h-12 text-amber-500 mx-auto mb-3 opacity-80" />
                  <h4 className="font-bold text-stone-800 dark:text-stone-200 text-base">
                    Belum Ada Tulisan Terdaftar
                  </h4>
                  <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                    Suarakan ide, pemikiran, dan opini Anda untuk dipublikasikan di portal berita Idealogika.
                  </p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="mt-4 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-4 py-2 rounded-xl text-xs transition-all inline-flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Mulai Menulis Pertama Kali</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {myArticles.map((art) => {
                    const status = art.status || 'published';
                    return (
                      <div
                        key={art.id}
                        className="bg-white dark:bg-stone-800 p-5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-xs flex flex-col sm:flex-row gap-4 items-start justify-between"
                      >
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="bg-stone-100 dark:bg-stone-700 text-stone-800 dark:text-stone-200 text-[10px] font-bold px-2 py-0.5 rounded">
                              {art.category}
                            </span>
                            <span className="text-xs text-stone-400">
                              {art.publishDate}
                            </span>
                          </div>

                          <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                            {art.title}
                          </h3>

                          {art.subtitle && (
                            <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2">
                              {art.subtitle}
                            </p>
                          )}

                          {status === 'rejected' && art.rejectionReason && (
                            <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs p-2.5 rounded-lg mt-2">
                              <strong>Catatan Redaksi / Revisi:</strong> {art.rejectionReason}
                            </div>
                          )}
                        </div>

                        {/* Status Badge */}
                        <div className="shrink-0 self-start">
                          {status === 'published' && (
                            <span className="inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Diterbitkan ({art.viewCount}x dibaca)</span>
                            </span>
                          )}

                          {status === 'pending' && (
                            <span className="inline-flex items-center gap-1 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-300 dark:border-amber-800">
                              <Clock className="w-3.5 h-3.5 text-amber-600" />
                              <span>Menunggu Review Redaksi</span>
                            </span>
                          )}

                          {status === 'rejected' && (
                            <span className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 text-xs font-bold px-3 py-1 rounded-full border border-red-300 dark:border-red-800">
                              <XCircle className="w-3.5 h-3.5 text-red-600" />
                              <span>Perlu Revisi</span>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CREATE NEW ARTICLE WITH AI ASSISTANT */}
          {activeTab === 'create' && (
            <div className="max-w-3xl mx-auto bg-white dark:bg-stone-800 p-6 rounded-xl border border-stone-200 dark:border-stone-700 space-y-5">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  Formulir Pengiriman Tulisan Mahasiswa
                </h3>
                <p className="text-xs text-stone-500">
                  Tulisan Anda akan diperiksa oleh tim redaksi sebelum resmi diterbitkan.
                </p>
              </div>

              {/* AI Generator Box */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-stone-900 dark:to-stone-850 p-4 rounded-xl border border-amber-200 dark:border-amber-800/60 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-amber-900 dark:text-amber-300">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Asisten AI Redaksi Idealogika (Bantuan Draf Tulisan)</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    placeholder="Masukkan topik isu, misal: 'Dampak Kenaikan Harga Sembako bagi Kos Mahasiswa'"
                    className="flex-1 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 p-2.5 rounded-lg border border-amber-300 dark:border-amber-700 focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateAiDraft}
                    disabled={isGeneratingAi || !aiTopic.trim()}
                    className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-4 py-2.5 rounded-lg text-xs shrink-0 transition-all flex items-center gap-1.5"
                  >
                    {isGeneratingAi ? 'Generasi...' : 'Buat Draf AI'}
                  </button>
                </div>
              </div>

              <form onSubmit={handleFormSubmitArticle} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Judul Tulisan *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Masukkan judul artikel tulisan Anda..."
                    className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-amber-500 font-semibold text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Kategori Tulisan *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as CategoryType)}
                      className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Kampus">Berita Kampus</option>
                      <option value="Pendidikan">Pendidikan</option>
                      <option value="Pemikiran">Pemikiran</option>
                      <option value="Nasional">Nasional</option>
                      <option value="Internasional">Internasional</option>
                      <option value="Opini & Essay">Opini & Essay</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                      URL Ilustrasi Gambar Sampul
                    </label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Sub-judul / Ringkasan Tulisan
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Satu kalimat pokok pikiran tulisan..."
                    className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Isi Lengkap Tulisan *
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tuliskan gagasan, opini, atau liputan Anda di sini secara lugas..."
                    className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 p-3 rounded-lg border border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-amber-500 text-xs font-sans leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-stone-900 hover:bg-stone-800 text-amber-400 font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <PenTool className="w-4 h-4" />
                  <span>Kirimkan ke Dewan Redaksi</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: PROFIL & BIODATA EDIT */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="max-w-xl mx-auto bg-white dark:bg-stone-800 p-6 rounded-xl border border-stone-200 dark:border-stone-700 space-y-4 text-xs">
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 border-b border-stone-200 dark:border-stone-700 pb-2">
                Ubah Biodata & Profil Penulis
              </h3>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 p-2.5 rounded-lg border border-stone-300 dark:border-stone-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Universitas / Institusi
                  </label>
                  <input
                    type="text"
                    required
                    value={editUniv}
                    onChange={(e) => setEditUniv(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 p-2.5 rounded-lg border border-stone-300 dark:border-stone-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Program Studi
                  </label>
                  <input
                    type="text"
                    required
                    value={editMajor}
                    onChange={(e) => setEditMajor(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 p-2.5 rounded-lg border border-stone-300 dark:border-stone-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Nomor Telepon / WhatsApp
                </label>
                <input
                  type="text"
                  required
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 p-2.5 rounded-lg border border-stone-300 dark:border-stone-700"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Bio / Deskripsi Penulis
                </label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 p-2.5 rounded-lg border border-stone-300 dark:border-stone-700"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold py-2.5 rounded-lg shadow-sm transition-all"
              >
                Simpan Perubahan Profil
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
