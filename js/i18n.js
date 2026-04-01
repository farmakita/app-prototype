'use strict';

const TRANSLATIONS = {
  id: {
    appName: 'Apotek Mutiara',
    tagline: 'Konsultasi Obat Mudah & Terpercaya',
    langToggle: 'English',

    // Steps
    step1: 'Konsultasi', step2: 'Rekomendasi', step3: 'Keranjang', step4: 'Pengiriman', step5: 'Pembayaran',

    // Welcome
    welcomeHero: 'Butuh Obat?',
    welcomeSubHero: 'Konsultasikan gejala Anda dan dapatkan rekomendasi obat yang tepat, dikirim langsung ke pintu Anda.',
    feat1: 'Konsultasi Cepat', feat1Sub: 'Analisis gejala dalam hitungan detik',
    feat2: 'Rekomendasi Akurat', feat2Sub: 'Disesuaikan usia & berat badan',
    feat3: 'Pengiriman Cepat', feat3Sub: 'Dari apotek ke rumah Anda',
    startBtn: 'Mulai Konsultasi',

    // Consultation
    consultTitle: 'Informasi Pasien',
    consultSub: 'Data ini digunakan untuk menentukan dosis dan keamanan obat',
    ageLabel: 'Usia (tahun)', agePlaceholder: 'Contoh: 25',
    weightLabel: 'Berat Badan (kg)', weightPlaceholder: 'Contoh: 60',
    allergyLabel: 'Alergi Obat (jika ada)',
    noAllergyKnown: 'Tidak ada alergi yang diketahui',
    symptomsTitle: 'Pilih Gejala Anda',
    symptomsSub: 'Pilih satu atau lebih gejala yang Anda alami saat ini',
    customSymptomsLabel: 'Gejala Tambahan (opsional)',
    customSymptomsPlaceholder: 'Ketik gejala lain yang tidak ada di daftar di atas…',
    submitConsult: 'Cari Rekomendasi Obat',
    profileLoaded: 'Data profil Anda telah dimuat otomatis.',

    // Errors
    errAge: 'Masukkan usia yang valid (1–120 tahun)',
    errWeight: 'Masukkan berat badan yang valid (1–300 kg)',
    errSymptoms: 'Pilih minimal satu gejala',

    // Searching
    searchTitle: 'Mencari Rekomendasi Obat…',
    searchSub1: 'Menganalisis gejala Anda…',
    searchSub2: 'Mencari obat yang umum digunakan di Indonesia…',
    searchSub3: 'Memeriksa keamanan berdasarkan usia & alergi…',
    searchSub4: 'Hampir selesai…',

    // Recommendations
    // Doctor offer screen
    doctorOfferTitle: 'Butuh Konsultasi Dokter?',
    doctorOfferSub: 'Jika gejala Anda terasa serius atau Anda tidak yakin, konsultasikan langsung dengan dokter berlisensi.',
    doctorYes: 'Ya, Konsultasi Dokter',
    doctorNo: 'Tidak, Lihat Rekomendasi Obat',
    doctorNote: 'Konsultasi dokter diperlukan untuk mendapatkan resep obat keras.',
    doctorComingTitle: 'Segera Hadir!',
    doctorComingSub: 'Fitur konsultasi dokter online sedang dalam pengembangan. Sementara itu, Anda dapat menggunakan aplikasi seperti Halodoc atau Alodokter.',
    doctorClose: 'Tutup',

    // Drug category badges
    catLabelBebas: 'Obat Bebas',
    catLabelBebasTerbatas: 'Bebas Terbatas',
    catLabelHerbal: 'Herbal / Jamu',

    // Map
    mapLabel: 'Tandai Lokasi di Peta',
    mapHint: 'Ketuk peta untuk menandai lokasi pengiriman Anda',

    recomTitle: 'Rekomendasi Obat',
    recomSub: 'Berdasarkan gejala, usia, dan berat badan Anda',
    patientSummary: 'Ringkasan Pasien',
    ageLabel2: 'Usia', weightLabel2: 'Berat', categoryLabel: 'Kategori',
    catInfant: 'Bayi (0–2 thn)', catChild: 'Anak (2–12 thn)', catAdult: 'Dewasa (≥12 thn)',
    symptomsFor: 'Gejala yang dipilih',
    dosageTitle: 'Dosis', warningTitle: 'Perhatian',
    addToCart: 'Tambah ke Keranjang', added: '✓ Ditambahkan',
    isConsult: 'Konsultasi Dokter Dianjurkan',
    consultNote: 'Untuk kondisi ini, kami menyarankan konsultasi langsung dengan dokter atau apoteker.',
    disclaimerTitle: 'Penting',
    disclaimer: 'Rekomendasi ini hanya untuk obat bebas (OTC) dan bukan pengganti konsultasi medis. Untuk kondisi serius, segera hubungi dokter.',
    noRec: 'Tidak ada rekomendasi tersedia. Silakan konsultasikan langsung dengan dokter.',
    viewCart: 'Lihat Keranjang',
    cartCount: item => `${item} item di keranjang`,

    // Cart
    cartTitle: 'Keranjang Belanja',
    emptyCart: 'Keranjang Anda kosong',
    emptyCartSub: 'Tambahkan obat dari halaman rekomendasi',
    backToRec: 'Kembali ke Rekomendasi',
    subtotal: 'Subtotal', shippingEst: 'Ongkir',
    total: 'Total', checkoutBtn: 'Lanjut ke Pengiriman',
    continueToPayment: 'Lanjut ke Pembayaran',
    remove: 'Hapus',

    // Payment & Delivery combined
    payDelivTitle: 'Pembayaran & Pengiriman',
    payDelivSub: 'Aman & terenkripsi · Pilih pengiriman sesuai kebutuhan Anda',
    pickupGroup: '🏪 Ambil Sendiri',
    pickupNote: 'Ambil pesanan langsung di Apotek Mutiara. Tidak ada biaya pengiriman.',

    // Payment
    payTitle: 'Pilih Metode Pembayaran',
    paySub: 'Semua transaksi terenkripsi dan aman',
    groupCard: 'Kartu', groupEwallet: 'Dompet Digital', groupQRIS: 'QRIS', groupBank: 'Transfer Bank',
    payCredit: 'Kartu Kredit', payDebit: 'Kartu Debit',
    payGopay: 'GoPay', payOvo: 'OVO', payDana: 'DANA', payLinkaja: 'LinkAja',
    payQRIS: 'QRIS', payBca: 'BCA Virtual', payBni: 'BNI Virtual', payBri: 'BRI Virtual',
    cardNumber: 'Nomor Kartu', cardExpiry: 'Kedaluwarsa', cardCVV: 'CVV', cardName: 'Nama di Kartu',
    phoneWallet: 'Nomor HP terdaftar',
    orderSummary: 'Ringkasan Pesanan',
    payNow: 'Bayar Sekarang',
    processingPay: 'Memproses pembayaran…',
    selectPayFirst: 'Pilih metode pembayaran terlebih dahulu',

    // Delivery
    delivTitle: 'Pilih Pengiriman',
    delivSub: 'Pilih kurir yang sesuai kebutuhan Anda',
    addressLabel: 'Alamat Pengiriman',
    addressPlaceholder: 'Masukkan alamat lengkap (jalan, nomor, RT/RW, kelurahan, kota, kode pos)…',
    regularGroup: '📦 Pengiriman Reguler', expressGroup: '⚡ Pengiriman Kilat', instantGroup: '🛵 Pengiriman Instan',
    estArrival: 'Estimasi', courierPrice: 'Ongkir',
    confirmOrder: 'Konfirmasi Pesanan',
    errAddress: 'Masukkan alamat pengiriman',
    errDelivery: 'Pilih metode pengiriman',

    // Confirmation
    confTitle: 'Pesanan Berhasil! 🎉',
    confSub: 'Terima kasih telah berbelanja di Apotek Mutiara',
    orderNum: 'Nomor Pesanan',
    estimatedDel: 'Estimasi Tiba',
    orderItems: 'Pesanan Anda',
    payMethod: 'Metode Bayar',
    delivMethod: 'Kurir',
    trackBtn: 'Lacak Pesanan',
    homeBtn: 'Kembali ke Beranda',
    trackMsg: 'Fitur pelacakan akan segera tersedia di aplikasi mobile kami.',

    // Misc
    back: 'Kembali', currency: 'Rp', free: 'Gratis',
    years: 'thn', kg: 'kg',
  },

  en: {
    appName: 'Apotek Mutiara',
    tagline: 'Easy & Trusted Medication Consultation',
    langToggle: 'Indonesia',

    step1: 'Consult', step2: 'Recommend', step3: 'Cart', step4: 'Delivery', step5: 'Payment',

    welcomeHero: 'Need Medicine?',
    welcomeSubHero: 'Consult your symptoms and get accurate medication recommendations, delivered straight to your door.',
    feat1: 'Quick Consultation', feat1Sub: 'Symptom analysis in seconds',
    feat2: 'Accurate Recommendations', feat2Sub: 'Tailored to age & weight',
    feat3: 'Fast Delivery', feat3Sub: 'From pharmacy to your door',
    startBtn: 'Start Consultation',

    consultTitle: 'Patient Information',
    consultSub: 'This data is used to determine appropriate dosage and drug safety',
    ageLabel: 'Age (years)', agePlaceholder: 'E.g. 25',
    weightLabel: 'Weight (kg)', weightPlaceholder: 'E.g. 60',
    allergyLabel: 'Drug Allergies (if any)',
    noAllergyKnown: 'No known allergies',
    symptomsTitle: 'Select Your Symptoms',
    symptomsSub: 'Select one or more symptoms you are currently experiencing',
    customSymptomsLabel: 'Additional Symptoms (optional)',
    customSymptomsPlaceholder: 'Type any other symptoms not listed above…',
    submitConsult: 'Find Medication Recommendations',
    profileLoaded: 'Your profile data has been loaded automatically.',

    errAge: 'Enter a valid age (1–120 years)',
    errWeight: 'Enter a valid weight (1–300 kg)',
    errSymptoms: 'Select at least one symptom',

    searchTitle: 'Finding Recommendations…',
    searchSub1: 'Analyzing your symptoms…',
    searchSub2: 'Searching commonly used medications in Indonesia…',
    searchSub3: 'Checking safety based on age & allergies…',
    searchSub4: 'Almost done…',

    // Doctor offer screen
    doctorOfferTitle: 'Need a Doctor?',
    doctorOfferSub: 'If your symptoms feel serious or you are unsure, consult directly with a licensed doctor.',
    doctorYes: 'Yes, Consult a Doctor',
    doctorNo: 'No, Show Medication Recommendations',
    doctorNote: 'Doctor consultation is required to obtain a prescription for prescription-only medicines.',
    doctorComingTitle: 'Coming Soon!',
    doctorComingSub: 'The online doctor consultation feature is currently in development. In the meantime, you can use apps like Halodoc or Alodokter.',
    doctorClose: 'Close',

    // Drug category badges
    catLabelBebas: 'OTC (Free)',
    catLabelBebasTerbatas: 'Limited OTC',
    catLabelHerbal: 'Herbal / Jamu',

    // Map
    mapLabel: 'Pin Your Location on Map',
    mapHint: 'Tap the map to mark your delivery location',

    recomTitle: 'Medication Recommendations',
    recomSub: 'Based on your symptoms, age, and weight',
    patientSummary: 'Patient Summary',
    ageLabel2: 'Age', weightLabel2: 'Weight', categoryLabel: 'Category',
    catInfant: 'Infant (0–2 yrs)', catChild: 'Child (2–12 yrs)', catAdult: 'Adult (≥12 yrs)',
    symptomsFor: 'Selected symptoms',
    dosageTitle: 'Dosage', warningTitle: 'Warning',
    addToCart: 'Add to Cart', added: '✓ Added',
    isConsult: 'Doctor Consultation Recommended',
    consultNote: 'For this condition, we recommend consulting directly with a doctor or pharmacist.',
    disclaimerTitle: 'Important',
    disclaimer: 'These recommendations are for over-the-counter (OTC) medications only and are not a substitute for medical consultation. For serious conditions, see a doctor immediately.',
    noRec: 'No recommendations available. Please consult a doctor directly.',
    viewCart: 'View Cart',
    cartCount: item => `${item} item${item !== 1 ? 's' : ''} in cart`,

    cartTitle: 'Shopping Cart',
    emptyCart: 'Your cart is empty',
    emptyCartSub: 'Add medications from the recommendations page',
    backToRec: 'Back to Recommendations',
    subtotal: 'Subtotal', shippingEst: 'Shipping',
    total: 'Total', checkoutBtn: 'Proceed to Delivery',
    continueToPayment: 'Continue to Payment',
    remove: 'Remove',

    payDelivTitle: 'Payment & Delivery',
    payDelivSub: 'Secure & encrypted · Choose delivery to suit your needs',
    pickupGroup: '🏪 Pickup In-store',
    pickupNote: 'Pick up your order directly at Apotek Mutiara. No delivery fee.',

    payTitle: 'Select Payment Method',
    paySub: 'All transactions are encrypted and secure',
    groupCard: 'Card', groupEwallet: 'Digital Wallet', groupQRIS: 'QRIS', groupBank: 'Bank Transfer',
    payCredit: 'Credit Card', payDebit: 'Debit Card',
    payGopay: 'GoPay', payOvo: 'OVO', payDana: 'DANA', payLinkaja: 'LinkAja',
    payQRIS: 'QRIS', payBca: 'BCA Virtual', payBni: 'BNI Virtual', payBri: 'BRI Virtual',
    cardNumber: 'Card Number', cardExpiry: 'Expiry Date', cardCVV: 'CVV', cardName: 'Name on Card',
    phoneWallet: 'Registered phone number',
    orderSummary: 'Order Summary',
    payNow: 'Pay Now',
    processingPay: 'Processing payment…',
    selectPayFirst: 'Please select a payment method first',

    delivTitle: 'Select Delivery',
    delivSub: 'Choose the courier that best suits your needs',
    addressLabel: 'Delivery Address',
    addressPlaceholder: 'Enter full address (street, number, area, city, postal code)…',
    regularGroup: '📦 Regular Delivery', expressGroup: '⚡ Express Delivery', instantGroup: '🛵 Instant Delivery',
    estArrival: 'Est. Arrival', courierPrice: 'Shipping Fee',
    confirmOrder: 'Confirm Order',
    errAddress: 'Enter delivery address',
    errDelivery: 'Select a delivery method',

    confTitle: 'Order Successful! 🎉',
    confSub: 'Thank you for shopping at Apotek Mutiara',
    orderNum: 'Order Number',
    estimatedDel: 'Estimated Arrival',
    orderItems: 'Your Order',
    payMethod: 'Payment',
    delivMethod: 'Courier',
    trackBtn: 'Track Order',
    homeBtn: 'Back to Home',
    trackMsg: 'Tracking feature will soon be available in our mobile app.',

    back: 'Back', currency: 'Rp', free: 'Free',
    years: 'yrs', kg: 'kg',
  }
};

function t(key, ...args) {
  const val = TRANSLATIONS[App.state.lang][key];
  if (typeof val === 'function') return val(...args);
  return val !== undefined ? val : key;
}
