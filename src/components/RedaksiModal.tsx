import React from 'react';
import { EDITORIAL_BOARD } from '../data/newsData';
import { X, ShieldCheck, Users, Mail, MapPin, Award, BookOpen, HeartHandshake } from 'lucide-react';

interface RedaksiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RedaksiModal: React.FC<RedaksiModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm overflow-y-auto flex justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-stone-50 w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-stone-900 text-stone-100 px-6 py-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" />
            <h2 className="font-serif font-bold text-lg text-amber-400 uppercase tracking-wide">
              Dewan Redaksi & Manifesto Idealogika
            </h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-stone-800 text-stone-400 hover:text-white rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8">
          {/* Manifesto Section */}
          <div className="bg-stone-900 text-stone-100 p-6 rounded-xl space-y-3 border border-stone-800 shadow-md">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              Manifesto Jurnalisme Independen
            </div>
            <p className="font-serif text-sm leading-relaxed text-stone-200">
              "Idealogika hadir sebagai wadah independen intelektual muda. Kami berdiri di atas asas objektivitas riset, ketajaman analisis, dan keberpihakan pada kebenaran publik. Kami menolak intervensi kekuasaan maupun kapitalisasi ruang akademik."
            </p>
          </div>

          {/* Editorial Board List */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-stone-900 text-lg border-b border-stone-200 pb-2 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              Jajaran Redaksi Pelaksana 2026
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EDITORIAL_BOARD.map((member, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-stone-200 flex gap-3 items-start shadow-xs">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-stone-300 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="font-bold text-stone-900 text-sm">{member.name}</div>
                    <div className="text-xs text-amber-800 font-medium">{member.role}</div>
                    <div className="text-[11px] text-stone-500 font-mono">{member.major}</div>
                    <p className="text-[11px] text-stone-600 font-serif italic pt-1">
                      "{member.quote}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ethics Code Section */}
          <div className="space-y-3 bg-white p-5 rounded-xl border border-stone-200">
            <h4 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-600" />
              Kode Etik Kebijakan Redaksi
            </h4>
            <ul className="text-xs text-stone-700 space-y-2 list-disc list-inside leading-relaxed font-sans">
              <li><strong>Verifikasi Dua Arah:</strong> Setiap klaim fakta diuji melalui konfirmasi narasumber dan analisis dokumen pendukung.</li>
              <li><strong>Perlindungan Narasumber:</strong> Identitas narasumber sensitif dilindungi penuh demi keselamatan integritas informasi.</li>
              <li><strong>Hak Jawab:</strong> Pihak yang disebutkan dalam laporan kritis memiliki hak proporsional menyampaikan tanggapan resmi.</li>
            </ul>
          </div>

          {/* Contact Footer */}
          <div className="pt-4 border-t border-stone-200 text-xs text-stone-600 flex flex-wrap justify-between gap-4 font-mono">
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-amber-600" />
              <span>redaksi@idealogika.org</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Gedung Sekretariat Bersama Pers Mahasiswa, Kampus Depok / Yogya</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
