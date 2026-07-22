import { Article, EditorialBoardMember } from '../types';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Transformasi Biaya Pendidikan Tinggi: Menakar Urgensi Reformasi Sistem UKT 2026',
    slug: 'transformasi-biaya-pendidikan-tinggi-2026',
    subtitle: 'Gelombang protes mahasiswa di berbagai kampus negeri mendorong transparansi penggolongan UKT dan alokasi subsidi silang yang adil.',
    category: 'Pendidikan',
    author: {
      name: 'Rafi Alamsyah',
      role: 'Jurnalis Investigasi Idealogika',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      university: 'Universitas Indonesia'
    },
    publishDate: '22 Juli 2026',
    readTimeMinutes: 6,
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    imageCaption: 'Aksi damai Aliansi Mahasiswa menuntut audit transparan operasional dana perguruan tinggi.',
    isFeatured: true,
    isTrending: true,
    isEditorPick: true,
    status: 'published',
    viewCount: 4120,
    shareCount: 890,
    tags: ['#IsuUKT', '#PendidikanTinggi', '#KampusMerdeka', '#AspirasiMahasiswa'],
    content: `
      <p class="lead">Kebijakan penetapan Uang Kuliah Tunggal (UKT) kembali menjadi pusat perdebatan hangat di lingkungan perguruan tinggi negeri. Ribuan mahasiswa dari berbagai fakultas menyuarakan urgensi audit independen terhadap penetapan nominal UKT yang dinilai kerap tidak presisi dengan kemampuan ekonomi riil keluarga mahasiswa.</p>
      
      <h3>Ketimpangan Golongan dan Prosedur Banding</h3>
      <p>Berdasarkan survei internal yang dihimpun tim Riset Idealogika pada kuartal kedua 2026 terhadap 1.200 responden mahasiswa, sebanyak 38% mengaku pernah mengajukan penyesuaian UKT namun menghadapi kerumitan birokrasi serta keterbatasan kuota subsidi.</p>
      <p>"Sistem banding seharusnya mengedepankan prinsip keadilan substantif. Banyak mahasiswa yang orang tuanya mengalami penurunan pendapatan mendadak, namun status UKT-nya terkunci selama bertahun-tahun," tegas Koordinator BEM Seluruh Indonesia dalam konferensi pers kemarin.</p>
      
      <blockquote>
        "Pendidikan tinggi adalah hak publik dan investasi peradaban, bukan semata komoditas pasar yang diukur dari efisiensi kas semata."
      </blockquote>

      <h3>Tuntutan Transparansi Postur Anggaran</h3>
      <p>Guna merespons gelombang aspirasi ini, majelis rektorat berjanji mempercepat digitalisasi proses verifikasi berkas dan membuka saluran pengaduan langsung. Kendati demikian, gerakan mahasiswa menekankan perlunya keterlibatan perwakilan intelektual muda dalam penentuan formulasi tarif sejak tahap awal.</p>
      <p>Langkah nyata yang kini didesak adalah transparansi rincian Biaya Kuliah Tunggal (BKT) per program studi agar publik dapat menakar secara akurat porsi efisiensi anggaran operasional kampus.</p>
    `,
    comments: [
      {
        id: 'c1',
        author: 'Dian Sastroatmodjo',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
        role: 'Mahasiswa Soshum',
        date: '2 jam yang lalu',
        content: 'Liputan yang mendalam! Isu UKT ini sangat nyata dirasakan kawan-kawan yang orang tuanya pensiun tapi kesulitan urus penyesuaian.',
        likes: 24
      },
      {
        id: 'c2',
        author: 'Farhan Naufal',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
        role: 'Ketua Himpro',
        date: '1 jam yang lalu',
        content: 'Data kuesionernya presisi. Semoga artikel dari Idealogika ini dibaca jajaran dekanat.',
        likes: 15
      }
    ],
    aiSummary: {
      summary: 'Laporan ini mengulas aksi dan dinamika penyesuaian UKT di PTN tahun 2026. Mahasiswa menuntut audit transparan BKT serta penyederhanaan mekanisme penyesuaian tarif bagi keluarga berpenghasilan tidak tetap.',
      keyPoints: [
        '38% responden dari 1.200 mahasiswa mengeluhkan kerumitan proses penetapan dan verifikasi UKT.',
        'Aliansi mahasiswa mendesak transparansi struktur BKT tiap program studi.',
        'Pihak rektorat menjanjikan saluran digitalisasi aduan dan peninjauan berkas.'
      ]
    }
  },
  {
    id: 'art-2',
    title: 'Dinamika Kebijakan Kampus: Konsolidasi Kebebasan Mimbar Akademik dan Otonomi Mahasiswa',
    slug: 'dinamika-kebijakan-kampus-kebebasan-mimbar',
    subtitle: 'Rektorat merilis pedoman baru mengenai izin kegiatan malam dan keterlibatan organisasi mahasiswa dalam pengambilan keputusan.',
    category: 'Kampus',
    author: {
      name: 'Maya Putri S.',
      role: 'Redaktur Isu Kampus',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      university: 'ITB'
    },
    publishDate: '21 Juli 2026',
    readTimeMinutes: 5,
    imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1200',
    imageCaption: 'Suasana sidang senat terbuka pembahasan tata tertib kehidupan kampus.',
    isFeatured: false,
    isTrending: true,
    isEditorPick: true,
    status: 'published',
    viewCount: 3200,
    shareCount: 610,
    tags: ['#IsuKampus', '#OtonomiMahasiswa', '#MimbarAkademik'],
    content: `
      <p>Tata kelola organisasi kemahasiswaan di lingkungan kampus negeri dan swasta tengah memasuki babak baru. Setelah serangkaian dialog terbuka, majelis rektorat menyepakati perbaikan regulasi sarana prasarana serta perlindungan aktivitas intelektual di luar jam kuliah formal.</p>
    `,
    comments: []
  },
  {
    id: 'art-3',
    title: 'Opini & Essay: Membangun Kembali Mimbar Bebas di Era Ruang Publik Digital',
    slug: 'membuat-kembali-mimbar-bebas-digital',
    subtitle: 'Ruang fisik di kampus mungkin dibatasi jam malam, namun narasi gagasan kritis tidak boleh terbungkam oleh intimidasi algoritma.',
    category: 'Opini & Essay',
    author: {
      name: 'Dr. Hendra Gunawan',
      role: 'Dosen Sosiologi & Penulis Tamu',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      university: 'UGM'
    },
    publishDate: '20 Juli 2026',
    readTimeMinutes: 7,
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200',
    imageCaption: 'Diskusi publik mahasiswa dalam forum kebebasan mimbar akademik.',
    isFeatured: false,
    isTrending: false,
    isEditorPick: true,
    status: 'published',
    viewCount: 2890,
    shareCount: 430,
    tags: ['#OpiniKritis', '#DemokrasiKampus', '#KebebasanBerpikir', '#RuangPublik'],
    content: `
      <p>Secara historis, mimbar bebas di pelataran kampus adalah inkubator pemikiran progresif bangsa. Ketika hari ini kampus-kampus memperketat regulasi izin perhimpunan malam hari, ruang dialektika berpindah secara masif ke media sosial dan zine independen.</p>
      <p>Namun, tantangan baru muncul: polarisasi dangkal yang disetir oleh algoritma impresi singkat. Idealogika berdiri untuk memulihkan kedalaman argumen berbasis riset dan keberanian moril.</p>
    `,
    comments: []
  },
  {
    id: 'art-4',
    title: 'Pemikiran & Filsafat: Menggugat Hegemony Algoritma dalam Peradaban Informasi Modern',
    slug: 'pemikiran-filsafat-hegemony-algoritma',
    subtitle: 'Tinjauan kritis pemikiran kritis abad ke-21 terhadap dampak otomatisasi AI bagi nalar independen generasi muda.',
    category: 'Pemikiran',
    author: {
      name: 'Fikri Ardiansyah',
      role: 'Analis Filsafat & Kebudayaan',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200',
      university: 'Universitas Indonesia'
    },
    publishDate: '19 Juli 2026',
    readTimeMinutes: 8,
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
    imageCaption: 'Gagasan filsafat sains dan kecerdasan buatan dalam lanskap berpikir modern.',
    isFeatured: false,
    isTrending: true,
    isEditorPick: true,
    status: 'published',
    viewCount: 5100,
    shareCount: 1200,
    tags: ['#Filsafat', '#PemikiranKritis', '#SainsTeknologi'],
    content: `
      <p>Kemudahan mengakses informasi hari ini sering kali berbanding terbalik dengan kedalaman sintesis berpikir. Artikel ini membedah bagaimana nalar kritis harus tetap dipelihara di tengah gempuran otomatisasi generasi konten buatan mesin.</p>
    `,
    comments: []
  },
  {
    id: 'art-5',
    title: 'Nasional: Menakar Arah Kebijakan Riset & Peta Jalan Pendidikan Nasional 2026-2030',
    slug: 'nasional-kebijakan-riset-pendidikan-2026',
    subtitle: 'Pemerintah dan DPR membahas alokasi dana abadi penelitian serta hilirisasi produk inovasi pemuda.',
    category: 'Nasional',
    author: {
      name: 'Tim Redaksi Nasional',
      role: 'Warta Publik Idealogika',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
    },
    publishDate: '18 Juli 2026',
    readTimeMinutes: 5,
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=1200',
    imageCaption: 'Suasana dengar pendapat publik DPR mengenai undang-undang sistem pendidikan nasional.',
    isFeatured: false,
    isTrending: false,
    isEditorPick: false,
    status: 'published',
    viewCount: 2450,
    shareCount: 320,
    tags: ['#BeritaNasional', '#RisetNasional', '#KebijakanPublik'],
    content: `
      <p>Sidang parlemen menyepakati peningkatan kuota riset aplikatif berbasis konsorsium perguruan tinggi dan industri nasional guna mempercepat ketahanan teknologi dalam negeri.</p>
    `,
    comments: []
  },
  {
    id: 'art-6',
    title: 'Internasional: Geopolitik Energi Global dan Implikasinya Terhadap Ekonomi Negara Berkembang',
    slug: 'internasional-geopolitik-energi-global-2026',
    subtitle: 'Pergeseran peta aliansi ekonomi dan transisi energi terbarukan di kawasan Asia Tenggara dan Pasifik.',
    category: 'Internasional',
    author: {
      name: 'Nadia Larasati',
      role: 'Editor Hubungan Internasional',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      university: 'Universitas Airlangga'
    },
    publishDate: '17 Juli 2026',
    readTimeMinutes: 6,
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
    imageCaption: 'Konferensi internasional perubahan iklim dan diplomasi energi di ASEAN.',
    isFeatured: false,
    isTrending: true,
    isEditorPick: false,
    status: 'published',
    viewCount: 3890,
    shareCount: 640,
    tags: ['#IsuInternasional', '#Geopolitik', '#TransisiEnergi'],
    content: `
      <p>KTT Ekonomi Internasional yang berlangsung pekan ini melahirkan kesepakatan pembiayaan hijau untuk percepatan jaringan energi bersih di kawasan selatan global.</p>
    `,
    comments: []
  },
  {
    id: 'art-7',
    title: 'Pendidikan: Reorientasi Kurikulum Berbasis Keterampilan Kritis dan Pengabdian Masyarakat',
    slug: 'pendidikan-reorientasi-kurikulum-kritis',
    subtitle: 'Bagaimana perguruan tinggi menyelaraskan teori akademis dengan realitas sosial di lapangan.',
    category: 'Pendidikan',
    author: {
      name: 'Bagas Perkasa',
      role: 'Jurnalis Pendidikan',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200'
    },
    publishDate: '16 Juli 2026',
    readTimeMinutes: 4,
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1200',
    imageCaption: 'Program studi lapangan mahasiswa bersama masyarakat akar rumput.',
    isFeatured: false,
    isTrending: false,
    isEditorPick: true,
    status: 'published',
    viewCount: 1980,
    shareCount: 290,
    tags: ['#PendidikanMasyarakat', '#KurikulumKritis', '#Pengabdian'],
    content: `
      <p>Pendidikan sejati bukan sekadar menumpuk angka ijazah, melainkan kepekaan menjawab persoalan nyata masyarakat di pedesaan maupun permukiman perkotaan.</p>
    `,
    comments: []
  }
];

export const EDITORIAL_BOARD: EditorialBoardMember[] = [
  {
    name: 'Andikha Pratama',
    role: 'Pemimpin Redaksi',
    major: 'Ilmu Politik 2023',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    quote: 'Idealogika adalah komitmen kami untuk menjaga kebenaran jurnalistik dan independensi nurani mahasiswa.'
  },
  {
    name: 'Siti Rahmawati',
    role: 'Redaktur Pelaksana',
    major: 'Jurnalistik & Komunikasi 2023',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    quote: 'Setiap kata yang dipublikasikan harus teruji lewat verifikasi fakta ketat dan etika kemanusiaan.'
  },
  {
    name: 'Rian Kurnia',
    role: 'Kepala Litbang & Data',
    major: 'Ilmu Komputer 2024',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    quote: 'Mengawinkan keakuratan data kuantitatif dengan narasi humanis yang menggerakkan.'
  },
  {
    name: 'Tania Citra',
    role: 'Editor Seni & Tata Letak',
    major: 'Desain Komunikasi Visual 2024',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    quote: 'Visual bukan sekadar pemanis, melainkan penyampai pesan emosional yang berbobot.'
  }
];

export const BREAKING_NEWS_LIST = [
  'Sidang Pleno BEM Mahasiswa Hasilkan 5 Poin Deklarasi Transparansi Kampus',
  'Tim Robotik Mahasiswa Raih Juara Internasional di Seoul, Korea Selatan',
  'Pendaftaran Beasiswa Riset Inovasi Muda Idealogika 2026 Resmi Dibuka',
  'Diskusi Publik: Menakar Masa Depan Kebebasan Mimbar Akademik di Indonesia',
  'Peluncuran Majalah Cetak Edisi Khusus "Ekologi dan Suara Pinggiran"'
];
