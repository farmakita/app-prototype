'use strict';

const SYMPTOMS = [
  { id: 'fever',       emoji: '🌡️', id_label: 'Demam',                   en_label: 'Fever' },
  { id: 'cough',       emoji: '😮‍💨', id_label: 'Batuk',                   en_label: 'Cough' },
  { id: 'cold',        emoji: '🤧', id_label: 'Pilek / Hidung Tersumbat', en_label: 'Cold / Stuffy Nose' },
  { id: 'sorethroat',  emoji: '🔴', id_label: 'Sakit Tenggorokan',        en_label: 'Sore Throat' },
  { id: 'headache',    emoji: '🤕', id_label: 'Sakit Kepala',             en_label: 'Headache' },
  { id: 'nausea',      emoji: '🤢', id_label: 'Mual / Muntah',            en_label: 'Nausea / Vomiting' },
  { id: 'diarrhea',    emoji: '💊', id_label: 'Diare',                    en_label: 'Diarrhea' },
  { id: 'stomachache', emoji: '😣', id_label: 'Sakit Perut / Maag',       en_label: 'Stomachache / Heartburn' },
  { id: 'itching',     emoji: '🌿', id_label: 'Gatal / Alergi Kulit',     en_label: 'Itching / Skin Allergy' },
  { id: 'musclepain',  emoji: '💪', id_label: 'Nyeri Otot / Sendi',       en_label: 'Muscle / Joint Pain' },
];

const ALLERGIES = [
  { id: 'paracetamol', id_label: 'Paracetamol',               en_label: 'Paracetamol' },
  { id: 'nsaid',       id_label: 'Ibuprofen / Aspirin (NSAID)', en_label: 'Ibuprofen / Aspirin (NSAIDs)' },
  { id: 'penicillin',  id_label: 'Penisilin',                  en_label: 'Penicillin' },
  { id: 'sulfa',       id_label: 'Sulfa',                      en_label: 'Sulfa drugs' },
  { id: 'codeine',     id_label: 'Kodein',                     en_label: 'Codeine' },
];

/*
  category values (sesuai regulasi BPOM Indonesia):
    'bebas'          – Obat Bebas (lingkaran hijau)
    'bebas_terbatas' – Obat Bebas Terbatas (lingkaran biru)
    'herbal'         – Obat Herbal / Jamu / Fitofarmaka
    'keras'          – Obat Keras (TIDAK ditampilkan – butuh resep dokter)

  age groups: 'infant' = 0–<2y | 'child' = 2–<12y | 'adult' = ≥12y
  isConsult: true → tampilkan kartu "konsultasi dokter" (bukan produk yang bisa dibeli)
*/
const MEDICATIONS = [

  /* ══════════════════════════════════════════
     DEMAM / FEVER
  ══════════════════════════════════════════ */
  {
    id: 'pct_drops', symptoms: ['fever'], ageGroups: ['infant'],
    brand: 'Tempra Drops', generic_id: 'Parasetamol Tetes', generic_en: 'Paracetamol Drops',
    form_id: 'Tetes', form_en: 'Drops', emoji: '💧', category: 'bebas',
    dosage_id: '0.5 mL/kg setiap 4–6 jam. Maks 5x/hari.',
    dosage_en: '0.5 mL/kg every 4–6 hours. Max 5x/day.',
    warning_id: 'Jangan gunakan >5 hari. Konsultasikan dokter untuk bayi <3 bulan.',
    warning_en: 'Do not use >5 days. Consult doctor for infants <3 months.',
    price: 38000, allergies: ['paracetamol'],
  },
  {
    id: 'ibu_drops_infant', symptoms: ['fever'], ageGroups: ['infant'],
    brand: 'Proris Baby Drops', generic_id: 'Ibuprofen Tetes', generic_en: 'Ibuprofen Drops',
    form_id: 'Tetes', form_en: 'Drops', emoji: '💧', category: 'bebas_terbatas',
    dosage_id: '5–10 mg/kg setiap 6–8 jam. Hanya untuk bayi >6 bulan.',
    dosage_en: '5–10 mg/kg every 6–8 hours. Only for infants >6 months.',
    warning_id: 'Tidak untuk bayi <6 bulan. Berikan bersama susu/makanan.',
    warning_en: 'Not for infants <6 months. Give with milk/food.',
    price: 42000, allergies: ['nsaid'],
  },
  {
    id: 'sanmol_drops', symptoms: ['fever'], ageGroups: ['infant'],
    brand: 'Sanmol Drops', generic_id: 'Parasetamol Tetes', generic_en: 'Paracetamol Drops',
    form_id: 'Tetes', form_en: 'Drops', emoji: '💧', category: 'bebas',
    dosage_id: '0.5 mL/kg setiap 4–6 jam.',
    dosage_en: '0.5 mL/kg every 4–6 hours.',
    warning_id: 'Produk generik terjangkau. Tidak untuk >5 hari.',
    warning_en: 'Affordable generic. Do not use >5 days.',
    price: 28000, allergies: ['paracetamol'],
  },
  {
    id: 'pct_syrup_child', symptoms: ['fever', 'headache', 'musclepain'], ageGroups: ['child'],
    brand: 'Sanmol Sirup', generic_id: 'Parasetamol Sirup', generic_en: 'Paracetamol Syrup',
    form_id: 'Sirup', form_en: 'Syrup', emoji: '🧴', category: 'bebas',
    dosage_id: '10–15 mg/kg setiap 4–6 jam. Anak 6–12 thn: 5–10 mL.',
    dosage_en: '10–15 mg/kg every 4–6 hours. Child 6–12 y: 5–10 mL.',
    warning_id: 'Tidak untuk penggunaan lebih dari 5 hari berturut-turut.',
    warning_en: 'Not for use more than 5 consecutive days.',
    price: 28000, allergies: ['paracetamol'],
  },
  {
    id: 'ibu_syrup_child', symptoms: ['fever', 'musclepain'], ageGroups: ['child'],
    brand: 'Proris Sirup', generic_id: 'Ibuprofen Sirup', generic_en: 'Ibuprofen Syrup',
    form_id: 'Sirup', form_en: 'Syrup', emoji: '🧴', category: 'bebas_terbatas',
    dosage_id: '5–10 mg/kg setiap 6–8 jam. Berikan bersama makanan.',
    dosage_en: '5–10 mg/kg every 6–8 hours. Give with food.',
    warning_id: 'Hanya untuk anak >6 bulan. Berikan bersama makanan.',
    warning_en: 'Only for children >6 months. Give with food.',
    price: 32000, allergies: ['nsaid'],
  },
  {
    id: 'tempra_forte', symptoms: ['fever', 'headache'], ageGroups: ['child'],
    brand: 'Tempra Forte Sirup', generic_id: 'Parasetamol 250mg/5mL', generic_en: 'Paracetamol 250mg/5mL',
    form_id: 'Sirup', form_en: 'Syrup', emoji: '🧴', category: 'bebas',
    dosage_id: 'Anak 6–12 thn: 10–15 mL setiap 4–6 jam.',
    dosage_en: 'Child 6–12 y: 10–15 mL every 4–6 hours.',
    warning_id: 'Konsentrasi lebih tinggi. Tidak untuk bayi.',
    warning_en: 'Higher concentration. Not for infants.',
    price: 35000, allergies: ['paracetamol'],
  },
  {
    id: 'panadol', symptoms: ['fever', 'headache', 'musclepain'], ageGroups: ['adult'],
    brand: 'Panadol', generic_id: 'Parasetamol 500mg', generic_en: 'Paracetamol 500mg',
    form_id: 'Tablet', form_en: 'Tablet', emoji: '💊', category: 'bebas',
    dosage_id: '500–1000 mg setiap 4–6 jam. Maks 4 g/hari.',
    dosage_en: '500–1000 mg every 4–6 hours. Max 4 g/day.',
    warning_id: 'Hindari alkohol. Tidak untuk penggunaan >3 hari untuk demam.',
    warning_en: 'Avoid alcohol. Not for use >3 days for fever.',
    price: 12000, allergies: ['paracetamol'],
  },
  {
    id: 'advil', symptoms: ['fever', 'headache', 'musclepain'], ageGroups: ['adult'],
    brand: 'Advil / Ibuprofen 400mg', generic_id: 'Ibuprofen 400mg', generic_en: 'Ibuprofen 400mg',
    form_id: 'Tablet', form_en: 'Tablet', emoji: '💊', category: 'bebas_terbatas',
    dosage_id: '400 mg setiap 6–8 jam sesudah makan. Maks 1200 mg/hari (OTC).',
    dosage_en: '400 mg every 6–8 hours with food. Max 1200 mg/day (OTC).',
    warning_id: 'Tidak untuk penderita maag aktif atau ibu hamil trimester 3.',
    warning_en: 'Not for active gastritis or 3rd trimester pregnancy.',
    price: 18000, allergies: ['nsaid'],
  },
  {
    id: 'bodrex', symptoms: ['fever', 'headache'], ageGroups: ['adult'],
    brand: 'Bodrex', generic_id: 'Parasetamol + Kafein', generic_en: 'Paracetamol + Caffeine',
    form_id: 'Tablet', form_en: 'Tablet', emoji: '💊', category: 'bebas',
    dosage_id: '1–2 tablet 3x sehari. Tidak lebih dari 3 hari.',
    dosage_en: '1–2 tablets 3x daily. Not more than 3 days.',
    warning_id: 'Mengandung kafein. Hindari jika sensitif terhadap kafein.',
    warning_en: 'Contains caffeine. Avoid if sensitive to caffeine.',
    price: 8000, allergies: ['paracetamol'],
  },

  /* ══════════════════════════════════════════
     BATUK / COUGH
  ══════════════════════════════════════════ */
  {
    id: 'cough_infant_consult', symptoms: ['cough'], ageGroups: ['infant'],
    brand: '—', generic_id: 'Konsultasi Dokter', generic_en: 'Doctor Consultation',
    form_id: 'Konsultasi', form_en: 'Consultation', emoji: '👨‍⚕️', category: 'bebas',
    dosage_id: 'Obat batuk OTC umumnya tidak dianjurkan untuk bayi <2 tahun.',
    dosage_en: 'OTC cough medicines are generally not recommended for infants <2 years.',
    warning_id: 'Segera konsultasikan dengan dokter atau kunjungi fasilitas kesehatan.',
    warning_en: 'Consult a doctor or visit a healthcare facility immediately.',
    price: 0, allergies: [], isConsult: true,
  },
  {
    id: 'obh_combi_anak', symptoms: ['cough'], ageGroups: ['child'],
    brand: 'OBH Combi Anak', generic_id: 'Bromheksin + Guaifenesin Sirup', generic_en: 'Bromhexine + Guaifenesin Syrup',
    form_id: 'Sirup', form_en: 'Syrup', emoji: '🧴', category: 'bebas_terbatas',
    dosage_id: 'Anak 2–6 thn: 5 mL 3–4x/hari. Anak 6–12 thn: 10 mL 3–4x/hari.',
    dosage_en: 'Child 2–6 y: 5 mL 3–4x/day. Child 6–12 y: 10 mL 3–4x/day.',
    warning_id: 'Kocok dahulu sebelum digunakan. Untuk batuk berdahak.',
    warning_en: 'Shake well before use. For productive (wet) cough.',
    price: 25000, allergies: [],
  },
  {
    id: 'bisolvon_syrup', symptoms: ['cough'], ageGroups: ['child', 'adult'],
    brand: 'Bisolvon Sirup', generic_id: 'Ambroksol HCl Sirup', generic_en: 'Ambroxol HCl Syrup',
    form_id: 'Sirup', form_en: 'Syrup', emoji: '🧴', category: 'bebas_terbatas',
    dosage_id: 'Anak 2–5 thn: 2.5 mL 3x/hari. 6–14 thn: 5 mL 3x/hari. Dewasa: 10 mL 3x/hari.',
    dosage_en: 'Child 2–5 y: 2.5 mL 3x/day. 6–14 y: 5 mL 3x/day. Adult: 10 mL 3x/day.',
    warning_id: 'Untuk batuk berdahak. Perbanyak minum air putih.',
    warning_en: 'For wet cough. Drink plenty of water.',
    price: 32000, allergies: [],
  },
  {
    id: 'siladex_dmp', symptoms: ['cough'], ageGroups: ['child'],
    brand: 'Siladex Antitusif', generic_id: 'Dekstrometorfan HBr Sirup', generic_en: 'Dextromethorphan HBr Syrup',
    form_id: 'Sirup', form_en: 'Syrup', emoji: '🧴', category: 'bebas_terbatas',
    dosage_id: 'Anak 2–6 thn: 2.5 mL 3–4x/hari. 6–12 thn: 5 mL 3–4x/hari.',
    dosage_en: 'Child 2–6 y: 2.5 mL 3–4x/day. 6–12 y: 5 mL 3–4x/day.',
    warning_id: 'Untuk batuk kering. Jangan gunakan untuk batuk berdahak.',
    warning_en: 'For dry cough only. Do not use for productive cough.',
    price: 28000, allergies: [],
  },
  {
    id: 'obh_combi_dewasa', symptoms: ['cough'], ageGroups: ['adult'],
    brand: 'OBH Combi', generic_id: 'Bromheksin + Guaifenesin + DMP', generic_en: 'Bromhexine + Guaifenesin + DXM',
    form_id: 'Sirup', form_en: 'Syrup', emoji: '🧴', category: 'bebas_terbatas',
    dosage_id: '15 mL 3–4x sehari sesudah makan.',
    dosage_en: '15 mL 3–4x daily after meals.',
    warning_id: 'Tersedia varian batuk berdahak dan batuk kering.',
    warning_en: 'Available in wet-cough and dry-cough variants.',
    price: 28000, allergies: [],
  },
  {
    id: 'ambroxol', symptoms: ['cough'], ageGroups: ['adult'],
    brand: 'Mucos / Ambroxol 30mg', generic_id: 'Ambroksol HCl Tablet', generic_en: 'Ambroxol HCl Tablet',
    form_id: 'Tablet', form_en: 'Tablet', emoji: '💊', category: 'bebas_terbatas',
    dosage_id: '30 mg 3x sehari sesudah makan.',
    dosage_en: '30 mg 3x daily after meals.',
    warning_id: 'Untuk batuk berdahak. Perbanyak minum air.',
    warning_en: 'For productive cough. Drink plenty of water.',
    price: 22000, allergies: [],
  },

  /* ══════════════════════════════════════════
     PILEK / COLD
  ══════════════════════════════════════════ */
  {
    id: 'saline_nasal', symptoms: ['cold'], ageGroups: ['infant', 'child'],
    brand: 'Otrivin Baby / Sterimar', generic_id: 'NaCl 0.9% Tetes Hidung', generic_en: 'NaCl 0.9% Nasal Drops',
    form_id: 'Tetes Hidung', form_en: 'Nasal Drops', emoji: '💧', category: 'bebas',
    dosage_id: '2–3 tetes tiap lubang hidung, 3–4x sehari.',
    dosage_en: '2–3 drops per nostril, 3–4x daily.',
    warning_id: 'Aman untuk semua usia. Gunakan bulb syringe untuk bayi.',
    warning_en: 'Safe for all ages. Use a bulb syringe for infants.',
    price: 35000, allergies: [],
  },
  {
    id: 'otrivin_nasal', symptoms: ['cold'], ageGroups: ['infant'],
    brand: 'Otrivin 0.05%', generic_id: 'Xylometazoline 0.05% Tetes Hidung', generic_en: 'Xylometazoline 0.05% Nasal Drops',
    form_id: 'Tetes Hidung', form_en: 'Nasal Drops', emoji: '💧', category: 'bebas',
    dosage_id: '2–3 tetes tiap lubang hidung, maks 3x/hari. Untuk bayi 0–2 thn.',
    dosage_en: '2–3 drops per nostril, max 3x/day. For infants 0–2 y.',
    warning_id: 'Hanya untuk penggunaan <5 hari. Konsultasikan dokter untuk bayi <6 bulan.',
    warning_en: 'Use max 5 days only. Consult doctor for infants <6 months.',
    price: 28000, allergies: [],
  },
  {
    id: 'humidifier_note', symptoms: ['cold'], ageGroups: ['infant'],
    brand: 'Uap Hangat / Balsem Bayi', generic_id: 'Minyak Telon / Balsem Bayi', generic_en: 'Baby Telon Oil / Baby Balm',
    form_id: 'Minyak / Balsem', form_en: 'Oil / Balm', emoji: '🌿', category: 'herbal',
    dosage_id: 'Oleskan balsem bayi di dada dan punggung. Gunakan uap hangat di ruangan.',
    dosage_en: 'Apply baby balm on chest and back. Use a warm humidifier in the room.',
    warning_id: 'Jangan oleskan di area wajah/hidung bayi secara langsung.',
    warning_en: 'Do not apply directly to infant face/nose area.',
    price: 22000, allergies: [],
  },
  {
    id: 'decolgen_anak', symptoms: ['cold', 'fever'], ageGroups: ['child'],
    brand: 'Decolgen Flu Anak', generic_id: 'Parasetamol + Fenilefrin + CTM Sirup', generic_en: 'Paracetamol + Phenylephrine + CTM Syrup',
    form_id: 'Sirup', form_en: 'Syrup', emoji: '🧴', category: 'bebas_terbatas',
    dosage_id: 'Anak 6–12 thn: 10 mL 3x sehari.',
    dosage_en: 'Child 6–12 y: 10 mL 3x daily.',
    warning_id: 'Dapat menyebabkan kantuk. Tidak untuk anak <6 thn.',
    warning_en: 'May cause drowsiness. Not for children <6 y.',
    price: 24000, allergies: ['paracetamol'],
  },
  {
    id: 'triaminic_cold', symptoms: ['cold'], ageGroups: ['child'],
    brand: 'Triaminic Cold & Cough', generic_id: 'Guaifenesin + Fenilefrin Sirup', generic_en: 'Guaifenesin + Phenylephrine Syrup',
    form_id: 'Sirup', form_en: 'Syrup', emoji: '🧴', category: 'bebas_terbatas',
    dosage_id: 'Anak 6–12 thn: 10 mL setiap 4 jam.',
    dosage_en: 'Child 6–12 y: 10 mL every 4 hours.',
    warning_id: 'Tidak untuk anak <2 thn. Dapat menyebabkan kantuk.',
    warning_en: 'Not for children <2 y. May cause drowsiness.',
    price: 38000, allergies: [],
  },
  {
    id: 'decolgen_forte', symptoms: ['cold', 'fever'], ageGroups: ['adult'],
    brand: 'Decolgen Forte', generic_id: 'Parasetamol + Fenilefrin + CTM Kaplet', generic_en: 'Paracetamol + Phenylephrine + CTM Caplet',
    form_id: 'Kaplet', form_en: 'Caplet', emoji: '💊', category: 'bebas_terbatas',
    dosage_id: '1 kaplet 3–4x sehari.',
    dosage_en: '1 caplet 3–4x daily.',
    warning_id: 'Dapat menyebabkan kantuk. Jangan mengemudi setelah konsumsi.',
    warning_en: 'May cause drowsiness. Do not drive after taking.',
    price: 22000, allergies: ['paracetamol'],
  },
  {
    id: 'neozep', symptoms: ['cold'], ageGroups: ['adult'],
    brand: 'Neozep Forte', generic_id: 'Parasetamol + Fenilefrin + CTM', generic_en: 'Paracetamol + Phenylephrine + CTM',
    form_id: 'Tablet', form_en: 'Tablet', emoji: '💊', category: 'bebas_terbatas',
    dosage_id: '1 tablet 3–4x sehari.',
    dosage_en: '1 tablet 3–4x daily.',
    warning_id: 'Dapat menyebabkan kantuk.',
    warning_en: 'May cause drowsiness.',
    price: 18000, allergies: ['paracetamol'],
  },
  {
    id: 'procold', symptoms: ['cold'], ageGroups: ['adult'],
    brand: 'Procold', generic_id: 'Parasetamol + Pseudoefedrin + CTM', generic_en: 'Paracetamol + Pseudoephedrine + CTM',
    form_id: 'Kaplet', form_en: 'Caplet', emoji: '💊', category: 'bebas_terbatas',
    dosage_id: '1 kaplet 3x sehari sesudah makan.',
    dosage_en: '1 caplet 3x daily after meals.',
    warning_id: 'Dapat menyebabkan kantuk dan mulut kering.',
    warning_en: 'May cause drowsiness and dry mouth.',
    price: 20000, allergies: ['paracetamol'],
  },

  /* ══════════════════════════════════════════
     SAKIT TENGGOROKAN / SORE THROAT
  ══════════════════════════════════════════ */
  {
    id: 'throat_infant_consult', symptoms: ['sorethroat'], ageGroups: ['infant'],
    brand: '—', generic_id: 'Konsultasi Dokter', generic_en: 'Doctor Consultation',
    form_id: 'Konsultasi', form_en: 'Consultation', emoji: '👨‍⚕️', category: 'bebas',
    dosage_id: 'Sakit tenggorokan pada bayi harus dievaluasi oleh dokter.',
    dosage_en: 'Sore throat in infants must be evaluated by a doctor.',
    warning_id: 'Segera ke dokter jika disertai demam tinggi atau kesulitan menelan.',
    warning_en: 'See a doctor immediately if accompanied by high fever or difficulty swallowing.',
    price: 0, allergies: [], isConsult: true,
  },
  {
    id: 'strepsils', symptoms: ['sorethroat'], ageGroups: ['child', 'adult'],
    brand: 'Strepsils', generic_id: 'Amylmetacresol + Diklorobenzil Alkohol', generic_en: 'Amylmetacresol + Dichlorobenzyl Alcohol',
    form_id: 'Pastil', form_en: 'Lozenge', emoji: '🍬', category: 'bebas',
    dosage_id: 'Anak >6 thn & Dewasa: 1 pastil setiap 2–3 jam (maks 8/hari).',
    dosage_en: 'Child >6 y & Adult: 1 lozenge every 2–3 hours (max 8/day).',
    warning_id: 'Hisap perlahan. Tidak untuk anak <6 thn.',
    warning_en: 'Dissolve slowly. Not for children <6 y.',
    price: 28000, allergies: [],
  },
  {
    id: 'betadine_gargle', symptoms: ['sorethroat'], ageGroups: ['child', 'adult'],
    brand: 'Betadine Kumur', generic_id: 'Povidon Iodine 1% Kumur', generic_en: 'Povidone Iodine 1% Gargle',
    form_id: 'Cairan Kumur', form_en: 'Gargle', emoji: '🫧', category: 'bebas',
    dosage_id: 'Encerkan 1:1 dengan air. Kumur 30 detik, 3–4x sehari. Untuk anak >6 thn.',
    dosage_en: 'Dilute 1:1 with water. Gargle 30 seconds, 3–4x daily. For children >6 y.',
    warning_id: 'Jangan ditelan. Tidak untuk penggunaan >7 hari.',
    warning_en: 'Do not swallow. Not for use >7 days.',
    price: 32000, allergies: [],
  },
  {
    id: 'propolis_drops', symptoms: ['sorethroat'], ageGroups: ['child', 'adult'],
    brand: 'Propolis Throat Spray', generic_id: 'Propolis Ekstrak Herbal', generic_en: 'Propolis Herbal Extract',
    form_id: 'Semprotan Tenggorokan', form_en: 'Throat Spray', emoji: '🌿', category: 'herbal',
    dosage_id: '2–3 semprotan ke tenggorokan, 3x sehari.',
    dosage_en: '2–3 sprays to throat, 3x daily.',
    warning_id: 'Produk herbal. Tidak untuk alergi propolis/madu.',
    warning_en: 'Herbal product. Not for those allergic to propolis/honey.',
    price: 45000, allergies: [],
  },
  {
    id: 'tantum_verde', symptoms: ['sorethroat'], ageGroups: ['adult'],
    brand: 'Tantum Verde Spray', generic_id: 'Benzidamin HCl Semprot', generic_en: 'Benzydamine HCl Spray',
    form_id: 'Semprot Mulut', form_en: 'Oral Spray', emoji: '💨', category: 'bebas_terbatas',
    dosage_id: '4–8 semprotan setiap 1.5–3 jam.',
    dosage_en: '4–8 sprays every 1.5–3 hours.',
    warning_id: 'Untuk penggunaan luar. Jangan ditelan.',
    warning_en: 'External use only. Do not swallow.',
    price: 55000, allergies: [],
  },

  /* ══════════════════════════════════════════
     SAKIT KEPALA / HEADACHE
  ══════════════════════════════════════════ */
  {
    id: 'head_infant_consult', symptoms: ['headache'], ageGroups: ['infant'],
    brand: '—', generic_id: 'Konsultasi Dokter', generic_en: 'Doctor Consultation',
    form_id: 'Konsultasi', form_en: 'Consultation', emoji: '👨‍⚕️', category: 'bebas',
    dosage_id: 'Sakit kepala pada bayi memerlukan evaluasi medis segera.',
    dosage_en: 'Headache in infants requires immediate medical evaluation.',
    warning_id: 'Segera konsultasikan ke dokter.',
    warning_en: 'Consult a doctor immediately.',
    price: 0, allergies: [], isConsult: true,
  },
  {
    id: 'paramex', symptoms: ['headache'], ageGroups: ['adult'],
    brand: 'Paramex', generic_id: 'Parasetamol + Propifenazon', generic_en: 'Paracetamol + Propyphenazone',
    form_id: 'Tablet', form_en: 'Tablet', emoji: '💊', category: 'bebas_terbatas',
    dosage_id: '1–2 tablet 3–4x sehari.',
    dosage_en: '1–2 tablets 3–4x daily.',
    warning_id: 'Tidak untuk anak <12 thn. Tidak untuk penggunaan jangka panjang.',
    warning_en: 'Not for children <12 y. Not for long-term use.',
    price: 10000, allergies: ['paracetamol'],
  },

  /* ══════════════════════════════════════════
     MUAL / MUNTAH — NAUSEA
  ══════════════════════════════════════════ */
  {
    id: 'nausea_infant_consult', symptoms: ['nausea'], ageGroups: ['infant'],
    brand: '—', generic_id: 'Konsultasi Dokter', generic_en: 'Doctor Consultation',
    form_id: 'Konsultasi', form_en: 'Consultation', emoji: '👨‍⚕️', category: 'bebas',
    dosage_id: 'Mual dan muntah pada bayi memerlukan evaluasi medis.',
    dosage_en: 'Nausea and vomiting in infants requires medical evaluation.',
    warning_id: 'Perhatikan tanda dehidrasi. Segera ke dokter.',
    warning_en: 'Watch for signs of dehydration. See a doctor immediately.',
    price: 0, allergies: [], isConsult: true,
  },
  {
    id: 'antimo_anak', symptoms: ['nausea'], ageGroups: ['child'],
    brand: 'Antimo Anak', generic_id: 'Dimenhidrinat Sirup', generic_en: 'Dimenhydrinate Syrup',
    form_id: 'Sirup', form_en: 'Syrup', emoji: '🧴', category: 'bebas_terbatas',
    dosage_id: 'Anak 2–6 thn: 5 mL 3–4x/hari. Anak 6–12 thn: 10 mL 3–4x/hari.',
    dosage_en: 'Child 2–6 y: 5 mL 3–4x/day. Child 6–12 y: 10 mL 3–4x/day.',
    warning_id: 'Dapat menyebabkan kantuk.',
    warning_en: 'May cause drowsiness.',
    price: 22000, allergies: [],
  },
  {
    id: 'jahe_anak', symptoms: ['nausea'], ageGroups: ['child'],
    brand: 'Jahe Instan / Wedang Jahe', generic_id: 'Ekstrak Jahe Herbal', generic_en: 'Ginger Herbal Extract',
    form_id: 'Serbuk Herbal', form_en: 'Herbal Powder', emoji: '🌿', category: 'herbal',
    dosage_id: 'Larutkan 1 sachet dalam air hangat. 2–3x sehari.',
    dosage_en: 'Dissolve 1 sachet in warm water. 2–3x daily.',
    warning_id: 'Produk herbal alami. Aman untuk anak >2 thn.',
    warning_en: 'Natural herbal product. Safe for children >2 y.',
    price: 15000, allergies: [],
  },
  {
    id: 'tolak_angin_anak', symptoms: ['nausea', 'stomachache'], ageGroups: ['child'],
    brand: 'Tolak Angin Anak', generic_id: 'Jahe + Kayu Manis + Madu', generic_en: 'Ginger + Cinnamon + Honey',
    form_id: 'Cairan Herbal', form_en: 'Herbal Liquid', emoji: '🌿', category: 'herbal',
    dosage_id: 'Anak 3–12 thn: 1 sachet (5 mL) 1–3x sehari.',
    dosage_en: 'Child 3–12 y: 1 sachet (5 mL) 1–3x daily.',
    warning_id: 'Produk herbal. Kocok sebelum diminum.',
    warning_en: 'Herbal product. Shake before use.',
    price: 18000, allergies: [],
  },
  {
    id: 'antimo', symptoms: ['nausea'], ageGroups: ['adult'],
    brand: 'Antimo', generic_id: 'Dimenhidrinat 50mg', generic_en: 'Dimenhydrinate 50mg',
    form_id: 'Tablet', form_en: 'Tablet', emoji: '💊', category: 'bebas_terbatas',
    dosage_id: '50 mg 30 menit sebelum perjalanan, atau 3–4x sehari.',
    dosage_en: '50 mg 30 min before travel, or 3–4x daily.',
    warning_id: 'Dapat menyebabkan kantuk. Tidak untuk mengemudi.',
    warning_en: 'May cause drowsiness. Do not drive.',
    price: 12000, allergies: [],
  },
  {
    id: 'antangin', symptoms: ['nausea', 'stomachache'], ageGroups: ['adult'],
    brand: 'Antangin', generic_id: 'Jahe + Minyak Atsiri (Herbal)', generic_en: 'Ginger + Essential Oil (Herbal)',
    form_id: 'Kapsul Herbal', form_en: 'Herbal Capsule', emoji: '🌿', category: 'herbal',
    dosage_id: '1–2 kapsul 3x sehari sesudah makan.',
    dosage_en: '1–2 capsules 3x daily after meals.',
    warning_id: 'Produk herbal. Aman untuk penggunaan jangka pendek.',
    warning_en: 'Herbal product. Safe for short-term use.',
    price: 18000, allergies: [],
  },
  {
    id: 'tolak_angin', symptoms: ['nausea', 'stomachache'], ageGroups: ['adult'],
    brand: 'Tolak Angin', generic_id: 'Jahe + Kayu Manis + Jinten (Herbal)', generic_en: 'Ginger + Cinnamon + Cumin (Herbal)',
    form_id: 'Cairan Herbal', form_en: 'Herbal Liquid', emoji: '🌿', category: 'herbal',
    dosage_id: '1 sachet (15 mL) 3x sehari sesudah makan.',
    dosage_en: '1 sachet (15 mL) 3x daily after meals.',
    warning_id: 'Produk jamu. Kocok sebelum diminum.',
    warning_en: 'Jamu product. Shake before use.',
    price: 12000, allergies: [],
  },

  /* ══════════════════════════════════════════
     DIARE / DIARRHEA
  ══════════════════════════════════════════ */
  {
    id: 'oralit', symptoms: ['diarrhea'], ageGroups: ['infant', 'child', 'adult'],
    brand: 'Oralit 200', generic_id: 'Garam Rehidrasi Oral (ORS)', generic_en: 'Oral Rehydration Salts (ORS)',
    form_id: 'Serbuk Sachet', form_en: 'Powder Sachet', emoji: '🫗', category: 'bebas',
    dosage_id: 'Larutkan 1 sachet dalam 200 mL air matang. Minum sesering mungkin.',
    dosage_en: 'Dissolve 1 sachet in 200 mL boiled water. Drink as often as possible.',
    warning_id: 'Penting untuk mencegah dehidrasi. Jika diare >2 hari, segera ke dokter.',
    warning_en: 'Important to prevent dehydration. If diarrhea >2 days, see a doctor.',
    price: 8000, allergies: [],
  },
  {
    id: 'zinc_syrup', symptoms: ['diarrhea'], ageGroups: ['infant', 'child'],
    brand: 'Zinkid Sirup', generic_id: 'Zink Sulfat Sirup', generic_en: 'Zinc Sulfate Syrup',
    form_id: 'Sirup', form_en: 'Syrup', emoji: '🧴', category: 'bebas',
    dosage_id: 'Bayi <6 bln: 10 mg/hari. Anak ≥6 bln: 20 mg/hari. Selama 10 hari.',
    dosage_en: 'Infant <6 mo: 10 mg/day. Child ≥6 mo: 20 mg/day. For 10 days.',
    warning_id: 'Direkomendasikan WHO untuk diare pada anak.',
    warning_en: 'WHO-recommended for diarrhea in children.',
    price: 28000, allergies: [],
  },
  {
    id: 'lacto_b', symptoms: ['diarrhea'], ageGroups: ['infant', 'child'],
    brand: 'Lacto-B', generic_id: 'Probiotik (Lactobacillus + Bifidobacterium)', generic_en: 'Probiotic (Lactobacillus + Bifidobacterium)',
    form_id: 'Serbuk Sachet', form_en: 'Powder Sachet', emoji: '🧫', category: 'bebas',
    dosage_id: 'Bayi: 1 sachet 3x/hari dicampur MPASI/susu. Anak: 2 sachet 3x/hari.',
    dosage_en: 'Infant: 1 sachet 3x/day mixed with food/milk. Child: 2 sachets 3x/day.',
    warning_id: 'Probiotik untuk keseimbangan flora usus. Digunakan bersama oralit.',
    warning_en: 'Probiotic for gut flora balance. Use alongside ORS.',
    price: 32000, allergies: [],
  },
  {
    id: 'new_diatabs', symptoms: ['diarrhea'], ageGroups: ['child', 'adult'],
    brand: 'New Diatabs', generic_id: 'Attapulgit 600mg', generic_en: 'Attapulgite 600mg',
    form_id: 'Tablet', form_en: 'Tablet', emoji: '💊', category: 'bebas',
    dosage_id: 'Dewasa: 2 tablet setelah BAB cair (maks 12/hari). Anak 6–12 thn: 1 tablet (maks 6/hari).',
    dosage_en: 'Adult: 2 tablets after loose stool (max 12/day). Child 6–12 y: 1 tablet (max 6/day).',
    warning_id: 'Minum banyak air. Tidak untuk anak <6 thn.',
    warning_en: 'Drink plenty of water. Not for children <6 y.',
    price: 18000, allergies: [],
  },
  {
    id: 'entrostop', symptoms: ['diarrhea'], ageGroups: ['adult'],
    brand: 'Entrostop', generic_id: 'Attapulgit + Pektin', generic_en: 'Attapulgite + Pectin',
    form_id: 'Tablet', form_en: 'Tablet', emoji: '💊', category: 'bebas',
    dosage_id: '2 tablet setelah tiap BAB cair. Maks 12 tablet/hari.',
    dosage_en: '2 tablets after each loose stool. Max 12 tablets/day.',
    warning_id: 'Tidak untuk diare infeksi berat atau berdarah.',
    warning_en: 'Not for severe infectious or bloody diarrhea.',
    price: 20000, allergies: [],
  },

  /* ══════════════════════════════════════════
     SAKIT PERUT / MAAG — STOMACHACHE
  ══════════════════════════════════════════ */
  {
    id: 'stomach_infant_consult', symptoms: ['stomachache'], ageGroups: ['infant'],
    brand: '—', generic_id: 'Konsultasi Dokter', generic_en: 'Doctor Consultation',
    form_id: 'Konsultasi', form_en: 'Consultation', emoji: '👨‍⚕️', category: 'bebas',
    dosage_id: 'Sakit perut pada bayi memerlukan evaluasi medis.',
    dosage_en: 'Stomach pain in infants requires medical evaluation.',
    warning_id: 'Perhatikan kolik, sembelit, atau gejala lainnya.',
    warning_en: 'Watch for colic, constipation, or other symptoms.',
    price: 0, allergies: [], isConsult: true,
  },
  {
    id: 'mylanta_syrup', symptoms: ['stomachache'], ageGroups: ['child'],
    brand: 'Mylanta Sirup', generic_id: 'Al(OH)₃ + Mg(OH)₂ Sirup', generic_en: 'Al(OH)₃ + Mg(OH)₂ Syrup',
    form_id: 'Sirup', form_en: 'Syrup', emoji: '🧴', category: 'bebas',
    dosage_id: 'Anak 6–12 thn: 5–10 mL 3–4x sehari, di antara waktu makan.',
    dosage_en: 'Child 6–12 y: 5–10 mL 3–4x daily, between meals.',
    warning_id: 'Kocok dulu sebelum digunakan.',
    warning_en: 'Shake well before use.',
    price: 28000, allergies: [],
  },
  {
    id: 'antasida_doen_child', symptoms: ['stomachache'], ageGroups: ['child'],
    brand: 'Antasida DOEN Anak', generic_id: 'Al(OH)₃ + Mg(OH)₂ Generik', generic_en: 'Al(OH)₃ + Mg(OH)₂ Generic',
    form_id: 'Sirup', form_en: 'Syrup', emoji: '🧴', category: 'bebas',
    dosage_id: 'Anak 6–12 thn: 5 mL 3–4x sehari 1 jam setelah makan.',
    dosage_en: 'Child 6–12 y: 5 mL 3–4x daily, 1 hour after meals.',
    warning_id: 'Generik terjangkau. Kocok sebelum digunakan.',
    warning_en: 'Affordable generic. Shake before use.',
    price: 12000, allergies: [],
  },
  {
    id: 'promag', symptoms: ['stomachache'], ageGroups: ['adult'],
    brand: 'Promag', generic_id: 'Hidrotalsit + Simetikon', generic_en: 'Hydrotalcite + Simethicone',
    form_id: 'Tablet Kunyah', form_en: 'Chewable Tablet', emoji: '💊', category: 'bebas',
    dosage_id: '1–2 tablet 4x sehari. Kunyah sebelum ditelan.',
    dosage_en: '1–2 tablets 4x daily. Chew before swallowing.',
    warning_id: 'Untuk maag dan kembung. Tidak untuk konstipasi.',
    warning_en: 'For gastritis and bloating. Not for constipation.',
    price: 18000, allergies: [],
  },
  {
    id: 'mylanta_adult', symptoms: ['stomachache'], ageGroups: ['adult'],
    brand: 'Mylanta Liquid', generic_id: 'Al(OH)₃ + Mg(OH)₂ Cairan', generic_en: 'Al(OH)₃ + Mg(OH)₂ Liquid',
    form_id: 'Cairan', form_en: 'Liquid', emoji: '🫙', category: 'bebas',
    dosage_id: '10–20 mL 3–4x sehari, antara waktu makan dan sebelum tidur.',
    dosage_en: '10–20 mL 3–4x daily, between meals and before bed.',
    warning_id: 'Kocok dulu. Tidak untuk gagal ginjal berat.',
    warning_en: 'Shake well. Not for severe kidney failure.',
    price: 32000, allergies: [],
  },
  {
    id: 'antasida_doen', symptoms: ['stomachache'], ageGroups: ['adult'],
    brand: 'Antasida DOEN', generic_id: 'Al(OH)₃ + Mg(OH)₂ Generik', generic_en: 'Al(OH)₃ + Mg(OH)₂ Generic',
    form_id: 'Tablet Kunyah', form_en: 'Chewable Tablet', emoji: '💊', category: 'bebas',
    dosage_id: '1–2 tablet 3–4x sehari, 1 jam setelah makan.',
    dosage_en: '1–2 tablets 3–4x daily, 1 hour after meals.',
    warning_id: 'Produk generik terjangkau. Efektif untuk maag ringan.',
    warning_en: 'Affordable generic product. Effective for mild gastritis.',
    price: 8000, allergies: [],
  },

  /* ══════════════════════════════════════════
     GATAL / ALERGI KULIT — ITCHING
  ══════════════════════════════════════════ */
  {
    id: 'itch_infant_consult', symptoms: ['itching'], ageGroups: ['infant'],
    brand: '—', generic_id: 'Konsultasi Dokter', generic_en: 'Doctor Consultation',
    form_id: 'Konsultasi', form_en: 'Consultation', emoji: '👨‍⚕️', category: 'bebas',
    dosage_id: 'Alergi kulit pada bayi sebaiknya ditangani oleh dokter.',
    dosage_en: 'Skin allergies in infants should be handled by a doctor.',
    warning_id: 'Identifikasi dan hindari pemicu alergi.',
    warning_en: 'Identify and avoid allergen triggers.',
    price: 0, allergies: [], isConsult: true,
  },
  {
    id: 'ctm_syrup', symptoms: ['itching'], ageGroups: ['child'],
    brand: 'CTM Sirup', generic_id: 'Klorfenamin Maleat Sirup', generic_en: 'Chlorphenamine Maleate Syrup',
    form_id: 'Sirup', form_en: 'Syrup', emoji: '🧴', category: 'bebas_terbatas',
    dosage_id: 'Anak 2–6 thn: 2.5 mL 3–4x/hari. Anak 6–12 thn: 5 mL 3–4x/hari.',
    dosage_en: 'Child 2–6 y: 2.5 mL 3–4x/day. Child 6–12 y: 5 mL 3–4x/day.',
    warning_id: 'Dapat menyebabkan kantuk. Murah dan efektif.',
    warning_en: 'May cause drowsiness. Affordable and effective.',
    price: 12000, allergies: [],
  },
  {
    id: 'hydrocortisone_cream', symptoms: ['itching'], ageGroups: ['child', 'adult'],
    brand: 'Hydrocortisone Cream 1%', generic_id: 'Hidrokortison Krim 1%', generic_en: 'Hydrocortisone Cream 1%',
    form_id: 'Krim', form_en: 'Cream', emoji: '🧴', category: 'bebas_terbatas',
    dosage_id: 'Oleskan tipis 2–3x sehari pada area yang gatal.',
    dosage_en: 'Apply thinly 2–3x daily on itchy area.',
    warning_id: 'Tidak untuk area wajah/selangkangan. Jangan gunakan >7 hari.',
    warning_en: 'Not for face/groin areas. Do not use >7 days.',
    price: 15000, allergies: [],
  },
  {
    id: 'calamine', symptoms: ['itching'], ageGroups: ['child', 'adult'],
    brand: 'Calamine Lotion', generic_id: 'Kalamin + Seng Oksida Losion', generic_en: 'Calamine + Zinc Oxide Lotion',
    form_id: 'Losion', form_en: 'Lotion', emoji: '🧴', category: 'bebas',
    dosage_id: 'Oleskan pada area gatal 3–4x sehari. Kocok dulu.',
    dosage_en: 'Apply on itchy area 3–4x daily. Shake first.',
    warning_id: 'Untuk gatal dan ruam ringan. Tidak untuk kulit luka.',
    warning_en: 'For mild itching and rash. Not for broken skin.',
    price: 18000, allergies: [],
  },
  {
    id: 'cetirizine', symptoms: ['itching', 'cold'], ageGroups: ['adult'],
    brand: 'Zyrtec / Cetirizine 10mg', generic_id: 'Setirizin HCl 10mg', generic_en: 'Cetirizine HCl 10mg',
    form_id: 'Tablet', form_en: 'Tablet', emoji: '💊', category: 'bebas_terbatas',
    dosage_id: '10 mg 1x sehari (lebih baik malam hari).',
    dosage_en: '10 mg once daily (preferably at night).',
    warning_id: 'Antihistamin generasi baru, kurang mengantukkan.',
    warning_en: 'Second-generation antihistamine, less sedating.',
    price: 35000, allergies: [],
  },
  {
    id: 'loratadine', symptoms: ['itching', 'cold'], ageGroups: ['adult'],
    brand: 'Claritin / Loratadine 10mg', generic_id: 'Loratadin 10mg', generic_en: 'Loratadine 10mg',
    form_id: 'Tablet', form_en: 'Tablet', emoji: '💊', category: 'bebas_terbatas',
    dosage_id: '10 mg 1x sehari.',
    dosage_en: '10 mg once daily.',
    warning_id: 'Non-sedating. Aman untuk aktivitas siang hari.',
    warning_en: 'Non-sedating. Safe for daytime activities.',
    price: 30000, allergies: [],
  },

  /* ══════════════════════════════════════════
     NYERI OTOT / SENDI — MUSCLE PAIN
  ══════════════════════════════════════════ */
  {
    id: 'muscle_infant_consult', symptoms: ['musclepain'], ageGroups: ['infant'],
    brand: '—', generic_id: 'Konsultasi Dokter', generic_en: 'Doctor Consultation',
    form_id: 'Konsultasi', form_en: 'Consultation', emoji: '👨‍⚕️', category: 'bebas',
    dosage_id: 'Nyeri otot/sendi pada bayi memerlukan evaluasi medis.',
    dosage_en: 'Muscle/joint pain in infants requires medical evaluation.',
    warning_id: 'Segera konsultasikan ke dokter.',
    warning_en: 'Consult a doctor immediately.',
    price: 0, allergies: [], isConsult: true,
  },
  {
    id: 'counterpain', symptoms: ['musclepain'], ageGroups: ['child', 'adult'],
    brand: 'Counterpain Cool', generic_id: 'Metil Salisilat + Mentol Gel', generic_en: 'Methyl Salicylate + Menthol Gel',
    form_id: 'Gel', form_en: 'Gel', emoji: '🟦', category: 'bebas',
    dosage_id: 'Oleskan pada area nyeri 2–3x sehari. Pijat lembut.',
    dosage_en: 'Apply on painful area 2–3x daily. Massage gently.',
    warning_id: 'Hanya untuk pemakaian luar. Jangan pada kulit luka.',
    warning_en: 'External use only. Do not apply on broken skin.',
    price: 28000, allergies: [],
  },
  {
    id: 'salonpas', symptoms: ['musclepain'], ageGroups: ['child', 'adult'],
    brand: 'Salonpas', generic_id: 'Metil Salisilat + Mentol Koyo', generic_en: 'Methyl Salicylate + Menthol Patch',
    form_id: 'Koyo / Plester', form_en: 'Patch / Plaster', emoji: '🩹', category: 'bebas',
    dosage_id: 'Tempelkan 1 koyo pada area nyeri, ganti setiap 8–12 jam.',
    dosage_en: 'Apply 1 patch on painful area, replace every 8–12 hours.',
    warning_id: 'Tidak untuk kulit luka. Tidak untuk anak <6 thn.',
    warning_en: 'Not on broken skin. Not for children <6 y.',
    price: 18000, allergies: [],
  },
  {
    id: 'rheumacool', symptoms: ['musclepain'], ageGroups: ['adult'],
    brand: 'Rheumacool Gel', generic_id: 'Metil Salisilat + Mentol + Ekalipt Gel', generic_en: 'Methyl Salicylate + Menthol + Eucalyptus Gel',
    form_id: 'Gel', form_en: 'Gel', emoji: '🟦', category: 'bebas',
    dosage_id: 'Oleskan 2–3x sehari pada sendi atau otot yang nyeri.',
    dosage_en: 'Apply 2–3x daily on painful joints or muscles.',
    warning_id: 'Hanya untuk pemakaian luar.',
    warning_en: 'External use only.',
    price: 22000, allergies: [],
  },
];

/** Determine age group from numeric age (years). */
function getAgeGroup(ageYears) {
  const y = parseFloat(ageYears);
  if (y < 2)  return 'infant';
  if (y < 12) return 'child';
  return 'adult';
}

/**
 * Filter medications based on patient data.
 * V2: excludes obat keras (category === 'keras') automatically.
 * Returns deduplicated list sorted by: non-consult first, then price asc.
 */
function getRecommendations(symptoms, ageYears, allergies) {
  const ageGroup = getAgeGroup(ageYears);
  const seen = new Set();
  const results = [];

  for (const symptomId of symptoms) {
    for (const med of MEDICATIONS) {
      if (seen.has(med.id)) continue;
      if (med.category === 'keras') continue;           // V2: filter out obat keras
      if (!med.symptoms.includes(symptomId)) continue;
      if (!med.ageGroups.includes(ageGroup)) continue;
      if (med.allergies.some(a => allergies.includes(a))) continue;

      seen.add(med.id);
      results.push({ ...med, matchedSymptom: symptomId });
    }
  }

  results.sort((a, b) => {
    if (a.isConsult && !b.isConsult) return 1;
    if (!a.isConsult && b.isConsult) return -1;
    return a.price - b.price;
  });

  return results;
}
