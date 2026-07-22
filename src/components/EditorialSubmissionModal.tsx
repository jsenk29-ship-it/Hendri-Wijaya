import React, { useState } from 'react';
import { CategoryType, Article } from '../types';
import { X, PenTool, Sparkles, Send, CheckCircle2, Bot, FileText, Image as ImageIcon } from 'lucide-react';

interface EditorialSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitNewArticle: (article: Article) => void;
}

export const EditorialSubmissionModal: React.FC<EditorialSubmissionModalProps> = ({
  isOpen,
  onClose,
  onSubmitNewArticle,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('Opini');
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('Mahasiswa Kontributor');
  const [university, setUniversity] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('#Aspirasi, #OpiniMahasiswa');

  // AI Assistant states
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  // Handle AI Assist call
  const handleAIAssist = async (promptType: 'headline' | 'factcheck') => {
    if (!content.trim()) {
      alert('Silakan tulis draf paragraf artikel Anda terlebih dahulu untuk dianalisis oleh AI.');
      return;
    }

    setAiLoading(true);
    setAiSuggestion(null);

    try {
      const res = await fetch('/api/editorial-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          draftTitle: title,
          draftContent: content,
          promptType
        })
      });
      const data = await res.json();
      if (data.suggestion) {
        setAiSuggestion(data.suggestion);
      }
    } catch (err) {
      console.error(err);
      setAiSuggestion('Analisis Redaksi AI: Pastikan argumen dilengkapi contoh riil di lapangan.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !authorName.trim() || !content.trim()) return;

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const defaultCover = imageUrl.trim() || 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1200';

    const newArticle: Article = {
      id: `art-user-${Date.now()}`,
      title: title.trim(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      subtitle: subtitle.trim() || 'Diterbitkan langsung melalui kanal kontribusi mahasiswa Idealogika.',
      category,
      author: {
        name: authorName.trim(),
        role: authorRole.trim(),
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        university: university.trim() || 'Universitas Negeri'
      },
      publishDate: 'Hari ini',
      readTimeMinutes: Math.max(3, Math.ceil(content.split(' ').length / 150)),
      imageUrl: defaultCover,
      imageCaption: `Ilustrasi karya ${authorName.trim()}`,
      content: content.split('\n\n').map(p => `<p>${p}</p>`).join(''),
      tags: parsedTags,
      isFeatured: false,
      isEditorPick: true,
      viewCount: 1,
      shareCount: 0,
      comments: []
    };

    onSubmitNewArticle(newArticle);
    setSubmittedSuccess(true);

    setTimeout(() => {
      setSubmittedSuccess(false);
      onClose();
      // Reset form
      setTitle('');
      setSubtitle('');
      setContent('');
      setAuthorName('');
      setImageUrl('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm overflow-y-auto flex justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-stone-50 w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-stone-900 text-stone-100 px-6 py-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <PenTool className="w-5 h-5 text-amber-400" />
            <h2 className="font-serif font-bold text-lg text-amber-400">
              Kirim Tulisan & Gagasan Mahasiswa
            </h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-stone-800 text-stone-400 hover:text-white rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {submittedSuccess ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
              <h3 className="font-serif font-bold text-2xl text-stone-900">Artikel Berhasil Diterbitkan!</h3>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                Tulisan Anda telah tayang di portal Idealogika dan dapat dibaca oleh seluruh jaringan mahasiswa.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Category & Writer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Kategori Berita / Tulisan *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryType)}
                    className="w-full text-xs bg-white border border-stone-300 rounded-md p-2.5 font-medium text-stone-800 focus:outline-none focus:border-stone-900"
                  >
                    <option value="Opini">Opini & Esai</option>
                    <option value="Kampus">Kampus & Lembaga</option>
                    <option value="Politik">Politik Mahasiswa</option>
                    <option value="Investigasi">Laporan Investigasi</option>
                    <option value="Budaya">Seni & Budaya</option>
                    <option value="Tekno">Sains & Teknologi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Nama Penulis / Kontributor *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full text-xs bg-white border border-stone-300 rounded-md p-2.5 text-stone-800 focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Peran / Status Penulis
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Mahasiswa Hukum / Peneliti Muda"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    className="w-full text-xs bg-white border border-stone-300 rounded-md p-2.5 text-stone-800 focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Universitas / Lembaga
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Universitas Gadjah Mada"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full text-xs bg-white border border-stone-300 rounded-md p-2.5 text-stone-800 focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                  Judul Artikel / Opini *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tulis judul yang tajam, jelas, dan berbobot..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-sm font-serif font-bold bg-white border border-stone-300 rounded-md p-2.5 text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                  Sub-Judul / Ringkasan Awal
                </label>
                <input
                  type="text"
                  placeholder="Kalimat pengantar singkat yang merangkum inti tulisan..."
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full text-xs bg-white border border-stone-300 rounded-md p-2.5 text-stone-800 focus:outline-none focus:border-stone-900"
                />
              </div>

              {/* Cover Image URL */}
              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1 flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5 text-stone-500" />
                  URL Foto Sampul (Opsional Unsplash/Image Link)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full text-xs bg-white border border-stone-300 rounded-md p-2.5 text-stone-800 focus:outline-none focus:border-stone-900"
                />
              </div>

              {/* Article Content Textarea */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold uppercase text-stone-700">
                    Isi Laporan / Opini Lengkap *
                  </label>
                  <span className="text-[10px] text-stone-400 font-mono">Gunakan spasi baris untuk paragraf baru</span>
                </div>
                <textarea
                  rows={8}
                  required
                  placeholder="Tuliskan argumen, fakta, serta narasumber lengkap Anda di sini..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full text-xs font-serif leading-relaxed bg-white border border-stone-300 rounded-md p-3 text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              {/* AI Editorial Assist Section */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Asisten Redaksi AI (Gemini Studio)</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleAIAssist('headline')}
                      disabled={aiLoading}
                      className="bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-medium px-2.5 py-1 rounded transition-colors"
                    >
                      Saran Judul
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAIAssist('factcheck')}
                      disabled={aiLoading}
                      className="bg-stone-800 hover:bg-stone-700 text-amber-300 text-[11px] font-medium px-2.5 py-1 rounded transition-colors"
                    >
                      Uji Etika & Verifikasi
                    </button>
                  </div>
                </div>

                {aiLoading && (
                  <div className="text-xs text-amber-800 italic animate-pulse">
                    Memproses draf dengan AI Redaksi...
                  </div>
                )}

                {aiSuggestion && (
                  <div className="p-3 bg-white rounded border border-amber-200 text-xs text-stone-800 font-sans whitespace-pre-wrap leading-relaxed">
                    {aiSuggestion}
                  </div>
                )}
              </div>

              {/* Tags Input */}
              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                  Tagar (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  placeholder="#Kampus, #Aspirasi, #Refleksi"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full text-xs bg-white border border-stone-300 rounded-md p-2.5 text-stone-800 focus:outline-none focus:border-stone-900"
                />
              </div>

              {/* Submit Action */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <p className="text-[11px] text-stone-500 max-w-xs">
                  Dengan mengirim, Anda menjamin keaslian karya dan tunduk pada Kode Etik Jurnalistik Mahasiswa Idealogika.
                </p>
                <button
                  type="submit"
                  className="bg-stone-950 hover:bg-stone-800 text-amber-400 font-bold text-xs px-6 py-3 rounded-lg shadow-md flex items-center gap-2 transition-all hover:scale-102"
                >
                  <Send className="w-4 h-4" />
                  Terbitkan Sekarang
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
