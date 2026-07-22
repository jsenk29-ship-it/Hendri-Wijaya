import React, { useState, useEffect } from 'react';
import { Article, Comment } from '../types';
import { 
  X, 
  Clock, 
  Eye, 
  Share2, 
  Bookmark, 
  MessageSquare, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ThumbsUp, 
  Send, 
  Check, 
  Type, 
  Copy, 
  Printer, 
  ExternalLink,
  Bot
} from 'lucide-react';

interface ArticleDetailModalProps {
  article: Article | null;
  onClose: () => void;
  onToggleSave: (articleId: string) => void;
  isSaved: boolean;
  relatedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onAddComment: (articleId: string, comment: Comment) => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  onToggleSave,
  isSaved,
  relatedArticles,
  onSelectArticle,
  onAddComment,
}) => {
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [aiSummaryResult, setAiSummaryResult] = useState<{ summary: string; keyPoints: string[] } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Audio Speech state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechUtterance, setSpeechUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  // New comment state
  const [commentName, setCommentName] = useState('');
  const [commentRole, setCommentRole] = useState('');
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (article?.aiSummary) {
      setAiSummaryResult(article.aiSummary);
    } else {
      setAiSummaryResult(null);
    }
    // Stop audio if active when switching articles
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  }, [article]);

  if (!article) return null;

  // Handle AI Summary Generation
  const handleGenerateAISummary = async () => {
    setIsSummarizing(true);
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: article.title,
          content: article.content.replace(/<[^>]*>?/gm, '') // Strip HTML
        })
      });
      const data = await res.json();
      if (data.summary) {
        setAiSummaryResult(data);
      }
    } catch (err) {
      console.error('Failed to summarize:', err);
      setAiSummaryResult({
        summary: `Ringkasan: Artikel ini membedah isu ${article.category} bertajuk "${article.title}". Menganalisis implikasi sosial dan kebijakan kampus dari sudut pandang kritis mahasiswa.`,
        keyPoints: [
          'Poin analisis utama mencakup fakta riset di lapangan.',
          'Implikasi terhadap transparansi dan hak publik.',
          'Rekomendasi bagi pemangku kepentingan.'
        ]
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  // Handle Text to Speech
  const toggleAudioNarration = () => {
    if (!('speechSynthesis' in window)) {
      alert('Browser Anda tidak mendukung fitur narasi suara.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      const textToRead = `${article.title}. Oleh ${article.author.name}. ${article.content.replace(/<[^>]*>?/gm, '')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      setSpeechUtterance(utterance);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  // Handle Copy Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  // Handle Submit Comment
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const newComment: Comment = {
      id: `comm-${Date.now()}`,
      author: commentName.trim(),
      role: commentRole.trim() || 'Pembaca Idealogika',
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100`,
      date: 'Baru saja',
      content: commentText.trim(),
      likes: 1
    };

    onAddComment(article.id, newComment);
    setCommentName('');
    setCommentRole('');
    setCommentText('');
  };

  const fontSizeClass = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-relaxed',
    xl: 'text-xl leading-relaxed'
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm overflow-y-auto flex justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div className="relative bg-stone-50 w-full max-w-4xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Sticky Top Nav Header */}
        <div className="bg-stone-900 text-stone-100 px-6 py-3.5 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-stone-950 font-mono font-bold text-[10px] uppercase px-2 py-0.5 rounded">
              {article.category}
            </span>
            <span className="text-xs text-stone-400 font-mono hidden sm:inline">
              {article.readTimeMinutes} mnt baca • {article.publishDate}
            </span>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center gap-2">
            {/* Font Size Adjuster */}
            <div className="hidden sm:flex items-center gap-1 bg-stone-800 rounded px-2 py-1 border border-stone-700 text-xs">
              <Type className="w-3.5 h-3.5 text-stone-400 mr-1" />
              <button
                onClick={() => setFontSize('sm')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${fontSize === 'sm' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${fontSize === 'base' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${fontSize === 'lg' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'}`}
              >
                A+
              </button>
            </div>

            {/* Narration Voice Reader Button */}
            <button
              onClick={toggleAudioNarration}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors ${
                isPlayingAudio
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
              }`}
              title="Dengarkan Artikel (Audio Reader)"
            >
              {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
              <span className="hidden sm:inline">{isPlayingAudio ? 'Berhenti' : 'Dengar'}</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={() => onToggleSave(article.id)}
              className={`p-1.5 rounded transition-colors ${
                isSaved ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-300 hover:text-white'
              }`}
              title="Simpan Artikel"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Scrollable Body Content */}
        <div className="p-6 md:p-10 overflow-y-auto space-y-8 divide-y divide-stone-200">
          {/* Header & Meta */}
          <div className="space-y-4">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-950 leading-tight">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="text-stone-600 font-sans text-base sm:text-lg italic border-l-3 border-amber-500 pl-4 py-1">
                {article.subtitle}
              </p>
            )}

            {/* Author Card */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200 text-xs text-stone-600">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-stone-300"
                />
                <div>
                  <div className="font-bold text-stone-900 text-sm">{article.author.name}</div>
                  <div className="text-stone-500">{article.author.role} {article.author.university ? `• ${article.author.university}` : ''}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-stone-500 font-mono text-[11px]">
                <span>Diterbitkan: {article.publishDate}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> {article.viewCount} Dibaca
                </span>
              </div>
            </div>
          </div>

          {/* Cover Photo */}
          <div className="pt-6 space-y-2">
            <div className="rounded-xl overflow-hidden bg-stone-900 aspect-16/9 shadow-md">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            {article.imageCaption && (
              <p className="text-xs text-stone-500 font-sans italic text-center">
                {article.imageCaption}
              </p>
            )}
          </div>

          {/* AI Summary Box Widget */}
          <div className="pt-6">
            <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Ringkasan & Poin Kunci AI (Ideabot)</span>
                </div>
                {!aiSummaryResult && (
                  <button
                    onClick={handleGenerateAISummary}
                    disabled={isSummarizing}
                    className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs px-3 py-1.5 rounded-md transition-colors shadow-xs"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>{isSummarizing ? 'Memproses AI...' : 'Buat Ringkasan AI'}</span>
                  </button>
                )}
              </div>

              {aiSummaryResult && (
                <div className="space-y-2 text-xs text-stone-800 animate-fadeIn">
                  <p className="font-medium italic border-b border-amber-200/60 pb-2">
                    "{aiSummaryResult.summary}"
                  </p>
                  {aiSummaryResult.keyPoints && (
                    <ul className="space-y-1 list-disc list-inside font-sans text-stone-700">
                      {aiSummaryResult.keyPoints.map((point, idx) => (
                        <li key={idx} className="leading-relaxed">{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Main Article Body Text */}
          <div className="pt-6">
            <div 
              className={`prose max-w-none text-stone-800 font-serif ${fontSizeClass} space-y-4 leading-relaxed tracking-normal`}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags Pill List */}
            {article.tags && (
              <div className="flex flex-wrap gap-1.5 pt-6 mt-6 border-t border-stone-200">
                {article.tags.map((tag, idx) => (
                  <span key={idx} className="bg-stone-200 text-stone-700 font-mono text-xs px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Share & Interactive Actions Bar */}
          <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold px-3 py-2 rounded-md transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Tersalin!' : 'Salin Tautan'}</span>
              </button>

              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-md transition-colors flex items-center gap-1"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Bagikan WhatsApp</span>
              </a>
            </div>

            <button
              onClick={() => window.print()}
              className="text-stone-500 hover:text-stone-800 text-xs flex items-center gap-1 font-mono"
            >
              <Printer className="w-3.5 h-3.5" /> Cetak Laporan
            </button>
          </div>

          {/* Comments Section */}
          <div className="pt-8 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-600" />
                Diskusi Pembaca ({article.comments.length})
              </h3>
              <span className="text-xs font-mono text-stone-500">Kritik & Tanggapan Terbuka</span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="bg-white p-4 rounded-xl border border-stone-200 space-y-3 shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Nama Lengkap *"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded px-3 py-2 focus:outline-none focus:border-stone-800"
                  required
                />
                <input
                  type="text"
                  placeholder="Program Studi / Kampus / Status"
                  value={commentRole}
                  onChange={(e) => setCommentRole(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded px-3 py-2 focus:outline-none focus:border-stone-800"
                />
              </div>
              <textarea
                rows={3}
                placeholder="Tulis tanggapan atau argumen pembanding Anda..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full text-xs bg-stone-50 border border-stone-300 rounded p-3 focus:outline-none focus:border-stone-800"
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-stone-900 hover:bg-stone-800 text-amber-400 font-bold text-xs px-4 py-2 rounded flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" /> Kirim Komentar
                </button>
              </div>
            </form>

            {/* Comment List */}
            <div className="space-y-4">
              {article.comments.length === 0 ? (
                <p className="text-xs text-stone-500 italic text-center py-4">
                  Belum ada tanggapan. Jadilah yang pertama menyampaikan pandangan!
                </p>
              ) : (
                article.comments.map((comm) => (
                  <div key={comm.id} className="p-4 bg-stone-100/80 rounded-xl space-y-2 border border-stone-200">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img src={comm.avatar} alt={comm.author} className="w-6 h-6 rounded-full object-cover" />
                        <span className="font-bold text-stone-900">{comm.author}</span>
                        {comm.role && <span className="text-[11px] text-stone-500">({comm.role})</span>}
                      </div>
                      <span className="text-[10px] text-stone-400 font-mono">{comm.date}</span>
                    </div>
                    <p className="text-xs text-stone-800 font-serif leading-relaxed">
                      {comm.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Related Articles Footer */}
          {relatedArticles.length > 0 && (
            <div className="pt-8 space-y-4">
              <h4 className="font-serif font-bold text-stone-900 text-base">Berita Terkait Lainnya</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.slice(0, 3).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectArticle(rel)}
                    className="p-3 bg-white rounded-lg border border-stone-200 hover:border-stone-400 transition-all cursor-pointer group"
                  >
                    <div className="aspect-16/10 rounded overflow-hidden mb-2 bg-stone-200">
                      <img src={rel.imageUrl} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <span className="text-[10px] font-bold text-amber-700 uppercase">{rel.category}</span>
                    <h5 className="font-serif text-xs font-semibold text-stone-900 line-clamp-2 mt-1 group-hover:text-amber-800">
                      {rel.title}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
