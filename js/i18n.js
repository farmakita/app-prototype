'use strict';

const TRANSLATIONS = {
  id: {
    appName: 'ApotekKu',
    tagline: 'Konsultasi Obat Mudah & Terpercaya',
    langToggle: 'English',

    // Steps
    step1: 'Konsultasi', step2: 'Rekomendasi', step3: 'Keranjang',
    step4: 'Pembayaran', step5: 'Pengiriman',

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
    submitConsult: 'Cari Rekomendasi Obat',

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
    subtotal: 'Subtotal', shippingEst: 'Ongkir (dipilih berikutnya)',
    total: 'Total', checkoutBtn: 'Lanjut ke Pembayaran',
    remove: 'Hapus',

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
    delivTitle: 'Pilih Metode Pengiriman',
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
    confSub: 'Terima kasih telah berbelanja di ApotekKu',
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
    appName: 'ApotekKu',
    tagline: 'Easy & Trusted Medication Consultation',
    langToggle: 'Indonesia',

    step1: 'Consult', step2: 'Recommend', step3: 'Cart',
    step4: 'Payment', step5: 'Delivery',

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
    submitConsult: 'Find Medication Recommendations',

    errAge: 'Enter a valid age (1–120 years)',
    errWeight: 'Enter a valid weight (1–300 kg)',
    errSymptoms: 'Select at least one symptom',

    searchTitle: 'Finding Recommendations…',
    searchSub1: 'Analyzing your symptoms…',
    searchSub2: 'Searching commonly used medications in Indonesia…',
    searchSub3: 'Checking safety based on age & allergies…',
    searchSub4: 'Almost done…',

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
    subtotal: 'Subtotal', shippingEst: 'Shipping (selected next)',
    total: 'Total', checkoutBtn: 'Proceed to Payment',
    remove: 'Remove',

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

    delivTitle: 'Select Delivery Method',
    delivSub: 'Choose the courier that best suits your needs',
    addressLabel: 'Delivery Address',
    addressPlaceholder: 'Enter full address (street, number, area, city, postal code)…',
    regularGroup: '📦 Regular Delivery', expressGroup: '⚡ Express Delivery', instantGroup: '🛵 Instant Delivery',
    estArrival: 'Est. Arrival', courierPrice: 'Shipping Fee',
    confirmOrder: 'Confirm Order',
    errAddress: 'Enter delivery address',
    errDelivery: 'Select a delivery method',

    confTitle: 'Order Successful! 🎉',
    confSub: 'Thank you for shopping at ApotekKu',
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
