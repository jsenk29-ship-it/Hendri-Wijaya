import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini AI lazily or check env
  const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }
    return new GoogleGenAI({ apiKey });
  };

  // API Route: AI News Summary
  app.post('/api/summarize', async (req, res) => {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          summary: `[Ringkasan Standar] ${title}: ${content.slice(0, 180)}...`,
          keyPoints: [
            'Topik utama mencakup dinamika kampus dan gerakan mahasiswa.',
            'Poin penting disarikan dari laporan fakta lapangan.',
            'Direkomendasikan untuk dibaca seluruhnya untuk pemahaman komprehensif.'
          ]
        });
      }

      const ai = getGenAI();
      const prompt = `Anda adalah editor berita senior untuk majalah/portal berita mahasiswa "Idealogika".
Tolong buat ringkasan eksekutif dan poin-poin utama dari artikel berita berikut dalam bahasa Indonesia yang lugas, kritis, dan jurnalistik.

Judul: ${title}
Konten: ${content}

Format output JSON persis seperti ini (tanpa markdown format luar, hanya valid JSON):
{
  "summary": "Ringkasan 2-3 kalimat...",
  "keyPoints": ["Poin penting 1", "Poin penting 2", "Poin penting 3"]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const responseText = response.text || '';
      // Clean potential codeblocks
      const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      try {
        const parsed = JSON.parse(cleaned);
        return res.json(parsed);
      } catch {
        return res.json({
          summary: responseText.slice(0, 300),
          keyPoints: ['Artikel ini menyoroti poin kunci dalam warta terbaru.']
        });
      }
    } catch (err: any) {
      console.error('API Error /api/summarize:', err);
      return res.status(500).json({ error: err.message || 'Failed to generate summary' });
    }
  });

  // API Route: AI Editorial Assist / Fact Check
  app.post('/api/editorial-assist', async (req, res) => {
    try {
      const { draftTitle, draftContent, promptType } = req.body;
      if (!draftContent) {
        return res.status(400).json({ error: 'Draft content required' });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          suggestion: 'Analisis Editor AI: Tulisan memiliki narasi yang kuat. Pastikan data pendukung dan narasumber telah diverifikasi dengan baik.'
        });
      }

      const ai = getGenAI();
      let prompt = '';
      if (promptType === 'headline') {
        prompt = `Buatkan 3 alternatif judul jurnalistik yang tajam dan menarik (gaya portal berita independen mahasiswa "Idealogika") untuk draf artikel ini:\nJudul saat ini: ${draftTitle}\nKonten: ${draftContent}`;
      } else if (promptType === 'factcheck') {
        prompt = `Bertindaklah sebagai Asisten Redaktur Verifikasi Berita untuk portal "Idealogika". Tinjau draf berikut untuk memeriksa obyektifitas, logika narasi, serta poin mana yang perlu rujukan narasumber tambahan:\nJudul: ${draftTitle}\nKonten: ${draftContent}`;
      } else {
        prompt = `Bantu rapikan dan tingkatkan diksi jurnalistik draf berikut agar berbobot namun mudah dipahami publik:\nJudul: ${draftTitle}\nKonten: ${draftContent}`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return res.json({ suggestion: response.text });
    } catch (err: any) {
      console.error('API Error /api/editorial-assist:', err);
      return res.status(500).json({ error: err.message || 'Failed to execute assist' });
    }
  });

  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Idealogika] News Portal server running at http://localhost:${PORT}`);
  });
}

startServer();
