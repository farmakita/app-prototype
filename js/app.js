'use strict';

/* ─────────────────────────────────────────────
   COURIER DATA (module-level, referenced by ID)
───────────────────────────────────────────── */
const COURIERS = [
  { id: 'jne_reg',      group: 'regular',  name: 'JNE REG',        badge: 'JNE',  price: 15000, est_id: '2–3 hari',  est_en: '2–3 days' },
  { id: 'jnt_reg',      group: 'regular',  name: 'J&T Express',    badge: 'J&T',  price: 13000, est_id: '2–4 hari',  est_en: '2–4 days' },
  { id: 'sicepat_reg',  group: 'regular',  name: 'SiCepat REG',    badge: 'SC',   price: 14000, est_id: '2–3 hari',  est_en: '2–3 days' },
  { id: 'pos',          group: 'regular',  name: 'Pos Indonesia',  badge: 'POS',  price: 10000, est_id: '3–5 hari',  est_en: '3–5 days' },
  { id: 'jne_yes',      group: 'express',  name: 'JNE YES',        badge: 'JNE',  price: 35000, est_id: '1 hari',    est_en: '1 day' },
  { id: 'sicepat_best', group: 'express',  name: 'SiCepat BEST',   badge: 'SC',   price: 32000, est_id: '1 hari',    est_en: '1 day' },
  { id: 'jnt_same',     group: 'express',  name: 'J&T Same Day',   badge: 'J&T',  price: 45000, est_id: 'Hari ini',  est_en: 'Today' },
  { id: 'gosend',       group: 'instant',  name: 'GoSend Instant', badge: '🟢',   price: 25000, est_id: '1–2 jam',   est_en: '1–2 hours' },
  { id: 'grab',         group: 'instant',  name: 'Grab Express',   badge: '🟢',   price: 27000, est_id: '1–2 jam',   est_en: '1–2 hours' },
  { id: 'shopee_inst',  group: 'instant',  name: 'ShopeeExpress',  badge: '🟠',   price: 20000, est_id: '2–3 jam',   est_en: '2–3 hours' },
  { id: 'pickup',       group: 'pickup',   name: 'Ambil Sendiri',  badge: '🏪',   price: 0,     est_id: 'Di Apotek', est_en: 'In-store' },
];

/* ─────────────────────────────────────────────
   STATE
───────────────────────────────────────────── */
const App = {
  state: {
    lang: 'id',
    screen: 'welcome',
    patient: { age: '', weight: '', allergies: [] },
    symptoms: [],
    customSymptoms: '',
    recommendations: [],
    cart: [],          // [{ med, qty }]
    selectedPayment: null,
    paymentSubData: {}, // card/phone extra fields
    deliveryAddress: '',
    selectedDelivery: null,
    orderNumber: null,
    orderTime: null,
    profileLoadedFromStorage: false,
  },

  /* ── helpers ── */
  fmt(n) { return 'Rp\u00a0' + Number(n).toLocaleString('id-ID'); },

  saveProfile() {
    try { localStorage.setItem('apotek_profile', JSON.stringify(this.state.patient)); } catch(e) {}
  },

  loadProfile() {
    try {
      const saved = localStorage.getItem('apotek_profile');
      if (saved) { const p = JSON.parse(saved); if (p && typeof p === 'object') return p; }
    } catch(e) {}
    return null;
  },

  cartTotal() {
    return this.state.cart.reduce((s, i) => s + i.med.price * i.qty, 0);
  },

  cartItemCount() {
    return this.state.cart.reduce((s, i) => s + i.qty, 0);
  },

  navigate(screen) {
    this.state.screen = screen;
    this.render();
    window.scrollTo({ top: 0, behavior: 'instant' });
  },

  toggleLang() {
    this.state.lang = this.state.lang === 'id' ? 'en' : 'id';
    this.render();
  },

  /* ── render entry point ── */
  render() {
    document.getElementById('app').innerHTML = this.buildApp();
    this.bindEvents();
  },

  /* ─────────────────────────────────────────────
     BUILD APP SHELL
  ───────────────────────────────────────────── */
  buildApp() {
    const s = this.state.screen;
    const showHeader = !['welcome', 'searching', 'confirmation'].includes(s);
    const STEP_SCREENS = ['consultation','recommendations','cart','delivery','payment'];
    const stepIdx = s === 'doctorOffer' ? 0 : STEP_SCREENS.indexOf(s);

    return `
      <div id="appWrapper" class="max-w-[430px] mx-auto min-h-screen bg-white flex flex-col relative">

        <!-- HEADER -->
        ${showHeader ? `
        <header class="bg-white border-b border-slate-100 sticky top-0 z-20">
          <div class="flex items-center justify-between px-4 py-3">
            <div class="flex items-center gap-2">
              ${s !== 'confirmation' ? `
                <button id="btnBack" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-teal-50 text-teal-700">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
              ` : ''}
              <div class="flex items-center gap-1.5">
                <div class="w-7 h-7 bg-teal-600 rounded-lg flex items-center justify-center">
                  <span class="text-white text-xs font-black">A</span>
                </div>
                <span class="font-bold text-teal-700">${t('appName')}</span>
              </div>
            </div>
            <button id="btnLang" class="text-xs font-semibold text-teal-700 border border-teal-200 bg-teal-50 px-3 py-1 rounded-full">
              ${t('langToggle')}
            </button>
          </div>
          ${stepIdx >= 0 ? `
          <div class="px-4 pb-3">
            <div class="flex justify-between mb-1.5">
              ${['step1','step2','step3','step4','step5'].map((k,i) => `
                <span class="text-[10px] font-medium ${i <= stepIdx ? 'text-teal-600' : 'text-slate-300'}">${t(k)}</span>
              `).join('')}
            </div>
            <div class="w-full bg-slate-100 rounded-full h-1">
              <div class="bg-teal-500 h-1 rounded-full transition-all duration-500" style="width:${((stepIdx+1)/5*100).toFixed(0)}%"></div>
            </div>
          </div>
          ` : ''}
        </header>
        ` : ''}

        <!-- SCREEN CONTENT -->
        <div class="flex-1 screen-enter">
          ${this.buildScreen(s)}
        </div>

      </div>
    `;
  },

  buildScreen(s) {
    switch (s) {
      case 'welcome':         return this.screenWelcome();
      case 'consultation':    return this.screenConsultation();
      case 'doctorOffer':     return this.screenDoctorOffer();
      case 'searching':       return this.screenSearching();
      case 'recommendations': return this.screenRecommendations();
      case 'cart':            return this.screenCart();
      case 'delivery':        return this.screenDelivery();
      case 'payment':         return this.screenPayment();
      case 'confirmation':    return this.screenConfirmation();
      default:                return this.screenWelcome();
    }
  },

  /* ─────────────────────────────────────────────
     SCREEN: WELCOME
  ───────────────────────────────────────────── */
  screenWelcome() {
    return `
      <div class="flex flex-col min-h-screen bg-gradient-to-b from-teal-600 to-teal-700">

        <!-- Top bar -->
        <div class="flex justify-between items-center px-5 pt-5">
          <div class="flex items-center gap-2">
            <div class="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <span class="text-white text-lg">💊</span>
            </div>
            <span class="text-white font-bold text-xl">${t('appName')}</span>
          </div>
          <button id="btnLang" class="text-xs font-semibold text-teal-700 bg-white px-3 py-1.5 rounded-full">
            ${t('langToggle')}
          </button>
        </div>

        <!-- Hero -->
        <div class="px-5 pt-8 pb-6">
          <p class="text-teal-200 text-sm font-medium mb-1">${t('tagline')}</p>
          <h1 class="text-white text-4xl font-black leading-tight mb-4">${t('welcomeHero')}</h1>
          <p class="text-teal-100 text-sm leading-relaxed">${t('welcomeSubHero')}</p>
        </div>

        <!-- Illustration card -->
        <div class="mx-5 bg-white/15 backdrop-blur rounded-2xl p-4 mb-6">
          <div class="flex justify-around text-center">
            <div>
              <div class="text-3xl mb-1">🩺</div>
              <div class="text-white text-xs font-semibold">${t('feat1')}</div>
              <div class="text-teal-200 text-[10px] mt-0.5">${t('feat1Sub')}</div>
            </div>
            <div class="w-px bg-white/20"></div>
            <div>
              <div class="text-3xl mb-1">💊</div>
              <div class="text-white text-xs font-semibold">${t('feat2')}</div>
              <div class="text-teal-200 text-[10px] mt-0.5">${t('feat2Sub')}</div>
            </div>
            <div class="w-px bg-white/20"></div>
            <div>
              <div class="text-3xl mb-1">🚚</div>
              <div class="text-white text-xs font-semibold">${t('feat3')}</div>
              <div class="text-teal-200 text-[10px] mt-0.5">${t('feat3Sub')}</div>
            </div>
          </div>
        </div>

        <!-- Start button -->
        <div class="mt-auto px-5 pb-10">
          <button id="btnStart"
            class="w-full bg-white text-teal-700 font-bold text-lg py-4 rounded-2xl shadow-xl active:scale-95 transition-transform">
            ${t('startBtn')}
          </button>
          <p class="text-teal-200/70 text-[10px] text-center mt-3">
            ${this.state.lang === 'id'
              ? 'Hanya untuk obat bebas (OTC). Bukan pengganti konsultasi dokter.'
              : 'For OTC medications only. Not a substitute for medical consultation.'}
          </p>
        </div>
      </div>
    `;
  },

  /* ─────────────────────────────────────────────
     SCREEN: DOCTOR OFFER
  ───────────────────────────────────────────── */
  screenDoctorOffer() {
    return `
      <div class="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <div class="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mb-5 text-5xl">🩺</div>
        <h2 class="text-xl font-bold text-slate-800 mb-2">${t('doctorOfferTitle')}</h2>
        <p class="text-sm text-slate-500 mb-2">${t('doctorOfferSub')}</p>
        <p class="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-8">
          ⚠️ ${t('doctorNote')}
        </p>
        <div class="flex flex-col gap-3 w-full max-w-xs">
          <button id="btnDoctorYes"
            class="w-full bg-teal-600 text-white font-bold py-3.5 rounded-xl text-sm active:bg-teal-700 transition-colors">
            ${t('doctorYes')}
          </button>
          <button id="btnDoctorNo"
            class="w-full border-2 border-teal-500 text-teal-600 font-bold py-3.5 rounded-xl text-sm active:bg-teal-50 transition-colors">
            ${t('doctorNo')}
          </button>
        </div>
      </div>

      <!-- Doctor coming soon modal -->
      <div id="doctorModal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
        <div class="bg-white rounded-t-3xl w-full max-w-[430px] p-6 text-center">
          <div class="text-5xl mb-4">🏥</div>
          <h3 class="text-lg font-bold text-slate-800 mb-2">${t('doctorComingTitle')}</h3>
          <p class="text-sm text-slate-500 mb-6">${t('doctorComingSub')}</p>
          <button id="btnDoctorClose"
            class="w-full bg-teal-600 text-white font-bold py-3.5 rounded-xl text-sm">
            ${t('doctorClose')}
          </button>
        </div>
      </div>
    `;
  },

  /* ─────────────────────────────────────────────
     SCREEN: CONSULTATION
  ───────────────────────────────────────────── */
  screenConsultation() {
    const { age, weight, allergies } = this.state.patient;
    const lang = this.state.lang;

    const allergyRows = ALLERGIES.map(a => `
      <label class="flex items-center gap-3 py-2 cursor-pointer">
        <input type="checkbox" class="allergy-cb w-4 h-4 accent-teal-600 rounded" value="${a.id}"
          ${allergies.includes(a.id) ? 'checked' : ''}>
        <span class="text-sm text-slate-700">${lang === 'id' ? a.id_label : a.en_label}</span>
      </label>
    `).join('');

    const symptomChips = SYMPTOMS.map(s => {
      const selected = this.state.symptoms.includes(s.id);
      return `
        <button class="symptom-chip flex flex-col items-center justify-center p-3 rounded-xl border-2 text-center transition-all
          ${selected
            ? 'border-teal-500 bg-teal-50 text-teal-700'
            : 'border-slate-200 bg-white text-slate-600 hover:border-teal-300'}"
          data-symptom="${s.id}">
          <span class="text-2xl mb-1">${s.emoji}</span>
          <span class="text-[11px] font-medium leading-tight">${lang === 'id' ? s.id_label : s.en_label}</span>
        </button>
      `;
    }).join('');

    const profileBanner = this.state.profileLoadedFromStorage ? `
      <div class="bg-teal-50 border border-teal-200 rounded-xl px-4 py-2.5 mb-5 flex items-center gap-2">
        <span class="text-teal-600 text-lg">✓</span>
        <p class="text-xs text-teal-700 font-medium">${t('profileLoaded')}</p>
      </div>
    ` : '';

    return `
      <div class="px-4 pt-5 pb-32">
        <h2 class="text-xl font-bold text-slate-800 mb-1">${t('consultTitle')}</h2>
        <p class="text-sm text-slate-500 mb-4">${t('consultSub')}</p>

        ${profileBanner}

        <!-- Age + Weight -->
        <div class="grid grid-cols-2 gap-3 mb-5">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5">${t('ageLabel')} <span class="text-red-500">*</span></label>
            <input id="inputAge" type="number" min="0" max="120" step="1"
              placeholder="${t('agePlaceholder')}" value="${age}"
              class="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm transition-colors"
              inputmode="numeric">
            <span id="errAge" class="hidden text-red-500 text-xs mt-1">${t('errAge')}</span>
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5">${t('weightLabel')} <span class="text-red-500">*</span></label>
            <input id="inputWeight" type="number" min="1" max="300" step="0.1"
              placeholder="${t('weightPlaceholder')}" value="${weight}"
              class="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm transition-colors"
              inputmode="decimal">
            <span id="errWeight" class="hidden text-red-500 text-xs mt-1">${t('errWeight')}</span>
          </div>
        </div>

        <!-- Allergies -->
        <div class="mb-6">
          <label class="block text-sm font-semibold text-slate-700 mb-2">${t('allergyLabel')}</label>
          <div class="bg-slate-50 rounded-xl px-4 divide-y divide-slate-100">
            <label class="flex items-center gap-3 py-2 cursor-pointer">
              <input type="checkbox" id="cbNoAllergy" class="w-4 h-4 accent-teal-600"
                ${allergies.length === 0 ? 'checked' : ''}>
              <span class="text-sm text-slate-500 italic">${t('noAllergyKnown')}</span>
            </label>
            ${allergyRows}
          </div>
        </div>

        <!-- Symptoms -->
        <div class="mb-4">
          <label class="block text-sm font-semibold text-slate-700 mb-1">${t('symptomsTitle')}</label>
          <p class="text-xs text-slate-400 mb-3">${t('symptomsSub')}</p>
          <span id="errSymptoms" class="hidden text-red-500 text-xs mb-2 block">${t('errSymptoms')}</span>
          <div class="grid grid-cols-3 gap-2">
            ${symptomChips}
          </div>
        </div>

        <!-- Custom symptoms free-text -->
        <div class="mb-4">
          <label class="block text-sm font-semibold text-slate-700 mb-1.5">${t('customSymptomsLabel')}</label>
          <textarea id="inputCustomSymptoms" rows="2"
            placeholder="${t('customSymptomsPlaceholder')}"
            class="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm resize-none transition-colors"
          >${this.state.customSymptoms}</textarea>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="bottom-bar">
        <button id="btnSubmitConsult"
          class="w-full bg-teal-600 text-white font-bold py-3.5 rounded-xl text-sm active:bg-teal-700 transition-colors">
          ${t('submitConsult')}
        </button>
      </div>
    `;
  },

  /* ─────────────────────────────────────────────
     SCREEN: SEARCHING
  ───────────────────────────────────────────── */
  screenSearching() {
    const messages = [
      t('searchSub1'), t('searchSub2'), t('searchSub3'), t('searchSub4')
    ];
    // Auto-advance after 2.8s
    setTimeout(() => {
      if (this.state.screen === 'searching') {
        this.state.recommendations = getRecommendations(
          this.state.symptoms,
          parseFloat(this.state.patient.age),
          this.state.patient.allergies
        );
        this.navigate('recommendations');
      }
    }, 2800);

    // Cycle messages via DOM if still on screen
    let msgIdx = 0;
    const cycleMsg = setInterval(() => {
      const el = document.getElementById('searchMsg');
      if (!el) { clearInterval(cycleMsg); return; }
      msgIdx = (msgIdx + 1) % messages.length;
      el.style.opacity = '0';
      setTimeout(() => {
        if (el) { el.textContent = messages[msgIdx]; el.style.opacity = '1'; }
      }, 200);
    }, 700);

    return `
      <div class="flex flex-col items-center justify-center min-h-screen bg-teal-50 px-6 text-center">
        <div class="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center mb-6">
          <span class="text-5xl">🔍</span>
        </div>
        <h2 class="text-xl font-bold text-teal-800 mb-2">${t('searchTitle')}</h2>
        <p id="searchMsg" class="text-sm text-teal-600 mb-8 transition-opacity duration-200">${messages[0]}</p>

        <div class="dot-pulse mb-6">
          <span></span><span></span><span></span>
        </div>

        <div class="w-64 bg-teal-100 rounded-full h-1.5">
          <div class="bg-teal-500 h-1.5 rounded-full progress-anim"></div>
        </div>
      </div>
    `;
  },

  /* ─────────────────────────────────────────────
     SCREEN: RECOMMENDATIONS
  ───────────────────────────────────────────── */
  screenRecommendations() {
    const { recommendations, patient, symptoms, cart } = this.state;
    const lang = this.state.lang;
    const ageGroup = getAgeGroup(parseFloat(patient.age));
    const ageCatKey = ageGroup === 'infant' ? 'catInfant' : ageGroup === 'child' ? 'catChild' : 'catAdult';

    const cartIds = new Set(cart.map(i => i.med.id));
    const nonConsultCount = recommendations.filter(r => !r.isConsult).length;

    // Patient summary card
    const symptomLabels = symptoms.map(sid => {
      const s = SYMPTOMS.find(x => x.id === sid);
      return s ? `${s.emoji} ${lang === 'id' ? s.id_label : s.en_label}` : sid;
    }).join(', ');

    const customSymptomsSummary = this.state.customSymptoms.trim()
      ? `<div class="text-xs text-slate-400 mt-1 italic">${this.state.customSymptoms.trim()}</div>` : '';

    const patCard = `
      <div class="bg-teal-50 rounded-xl p-4 mb-5 border border-teal-100">
        <p class="text-xs font-bold text-teal-700 uppercase tracking-wide mb-2">${t('patientSummary')}</p>
        <div class="grid grid-cols-3 gap-2 text-center mb-3">
          <div class="bg-white rounded-lg p-2">
            <div class="text-teal-600 font-bold text-lg">${patient.age}</div>
            <div class="text-slate-400 text-[10px]">${t('ageLabel2')} (${t('years')})</div>
          </div>
          <div class="bg-white rounded-lg p-2">
            <div class="text-teal-600 font-bold text-lg">${patient.weight}</div>
            <div class="text-slate-400 text-[10px]">${t('weightLabel2')} (${t('kg')})</div>
          </div>
          <div class="bg-white rounded-lg p-2">
            <div class="text-teal-600 font-bold text-xs leading-tight">${t(ageCatKey).split('(')[0].trim()}</div>
            <div class="text-slate-400 text-[10px]">${t('categoryLabel')}</div>
          </div>
        </div>
        <div class="text-xs text-slate-500">
          <span class="font-medium">${t('symptomsFor')}:</span> ${symptomLabels}
        </div>
        ${customSymptomsSummary}
      </div>
    `;

    // Medication cards
    let medCards = '';
    if (recommendations.length === 0) {
      medCards = `<div class="text-center py-10 text-slate-400">
        <div class="text-4xl mb-2">🤷</div>
        <p class="text-sm">${t('noRec')}</p>
      </div>`;
    } else {
      medCards = recommendations.map(med => {
        if (med.isConsult) {
          return `
            <div class="med-card bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-3">
              <div class="flex items-start gap-3">
                <span class="text-3xl">${med.emoji}</span>
                <div class="flex-1">
                  <p class="font-bold text-amber-800 text-sm mb-1">${t('isConsult')}</p>
                  <p class="text-xs text-amber-700 mb-2">${lang === 'id' ? med.dosage_id : med.dosage_en}</p>
                  <p class="text-xs text-amber-600 bg-amber-100 rounded-lg px-2 py-1">
                    ⚠️ ${lang === 'id' ? med.warning_id : med.warning_en}
                  </p>
                </div>
              </div>
            </div>
          `;
        }
        const inCart = cartIds.has(med.id);
        const catBadge = med.category === 'bebas' ? `<span class="inline-flex items-center gap-1 text-[10px] bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-medium"><span class="w-2 h-2 rounded-full bg-green-500 inline-block"></span>${t('catLabelBebas')}</span>`
          : med.category === 'bebas_terbatas' ? `<span class="inline-flex items-center gap-1 text-[10px] bg-blue-100 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-medium"><span class="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>${t('catLabelBebasTerbatas')}</span>`
          : med.category === 'herbal' ? `<span class="inline-flex items-center gap-1 text-[10px] bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-medium">🌿 ${t('catLabelHerbal')}</span>`
          : '';
        return `
          <div class="med-card bg-white border border-slate-100 rounded-2xl p-4 mb-3 shadow-sm">
            <div class="flex items-start gap-3 mb-3">
              <div class="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <span class="text-2xl">${med.emoji}</span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-bold text-slate-800 text-sm">${med.brand}</p>
                <p class="text-xs text-slate-400">${lang === 'id' ? med.generic_id : med.generic_en}</p>
                <div class="flex flex-wrap gap-1 mt-1">
                  <span class="inline-block text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                    ${lang === 'id' ? med.form_id : med.form_en}
                  </span>
                  ${catBadge}
                </div>
              </div>
              <div class="text-right flex-shrink-0">
                <p class="text-teal-700 font-bold text-sm">${this.fmt(med.price)}</p>
              </div>
            </div>

            <div class="bg-slate-50 rounded-xl p-3 mb-2">
              <p class="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-0.5">${t('dosageTitle')}</p>
              <p class="text-xs text-slate-700">${lang === 'id' ? med.dosage_id : med.dosage_en}</p>
            </div>

            <div class="bg-red-50 rounded-xl p-3 mb-3">
              <p class="text-[10px] font-bold text-red-500 uppercase tracking-wide mb-0.5">${t('warningTitle')}</p>
              <p class="text-xs text-red-700">${lang === 'id' ? med.warning_id : med.warning_en}</p>
            </div>

            <button class="btn-add-cart w-full py-2.5 rounded-xl text-sm font-semibold transition-all
              ${inCart
                ? 'bg-teal-50 text-teal-600 border border-teal-200'
                : 'bg-teal-600 text-white active:bg-teal-700'}"
              data-med-id="${med.id}" ${inCart ? 'disabled' : ''}>
              ${inCart ? t('added') : t('addToCart')}
            </button>
          </div>
        `;
      }).join('');
    }

    // Disclaimer
    const disclaimer = `
      <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-2 mb-4">
        <p class="text-xs font-bold text-blue-700 mb-1">ℹ️ ${t('disclaimerTitle')}</p>
        <p class="text-xs text-blue-600">${t('disclaimer')}</p>
      </div>
    `;

    const cartBadge = cart.length > 0 ? `
      <button id="btnViewCart"
        class="w-full bg-teal-600 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2">
        🛒 ${t('viewCart')} · ${t('cartCount', this.cartItemCount())}
      </button>
    ` : '';

    return `
      <div class="px-4 pt-5 pb-32">
        <h2 class="text-xl font-bold text-slate-800 mb-1">${t('recomTitle')}</h2>
        <p class="text-sm text-slate-500 mb-5">${t('recomSub')}</p>
        ${patCard}
        ${medCards}
        ${disclaimer}
      </div>
      ${cart.length > 0 ? `<div class="bottom-bar">${cartBadge}</div>` : ''}
    `;
  },

  /* ─────────────────────────────────────────────
     SCREEN: CART
  ───────────────────────────────────────────── */
  screenCart() {
    const { cart } = this.state;
    const lang = this.state.lang;

    if (cart.length === 0) {
      return `
        <div class="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
          <div class="text-6xl mb-4">🛒</div>
          <h3 class="text-lg font-bold text-slate-700 mb-1">${t('emptyCart')}</h3>
          <p class="text-sm text-slate-400 mb-6">${t('emptyCartSub')}</p>
          <button id="btnBackToRec" class="bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold text-sm">
            ${t('backToRec')}
          </button>
        </div>
      `;
    }

    const items = cart.map((item, idx) => `
      <div class="flex items-center gap-3 py-4 border-b border-slate-50">
        <div class="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
          ${item.med.emoji}
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-slate-800 text-sm truncate">${item.med.brand}</p>
          <p class="text-xs text-slate-400">${lang === 'id' ? item.med.form_id : item.med.form_en}</p>
          <p class="text-teal-700 font-bold text-sm mt-0.5">${this.fmt(item.med.price)}</p>
        </div>
        <div class="flex items-center gap-1 flex-shrink-0">
          <button class="qty-btn w-7 h-7 bg-slate-100 rounded-lg text-slate-600 font-bold text-sm flex items-center justify-center"
            data-qty-action="dec" data-cart-idx="${idx}">−</button>
          <span class="w-6 text-center text-sm font-bold text-slate-700">${item.qty}</span>
          <button class="qty-btn w-7 h-7 bg-slate-100 rounded-lg text-slate-600 font-bold text-sm flex items-center justify-center"
            data-qty-action="inc" data-cart-idx="${idx}">+</button>
        </div>
        <button class="btn-remove text-slate-300 hover:text-red-400 ml-1 transition-colors" data-cart-idx="${idx}">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    `).join('');

    const subtotal = this.cartTotal();

    return `
      <div class="px-4 pt-5 pb-40">
        <h2 class="text-xl font-bold text-slate-800 mb-5">${t('cartTitle')}</h2>

        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 px-4 mb-5">
          ${items}
        </div>

        <!-- Price summary -->
        <div class="bg-slate-50 rounded-2xl p-4">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm text-slate-500">${t('subtotal')}</span>
            <span class="text-sm font-semibold text-slate-700">${this.fmt(subtotal)}</span>
          </div>
          <div class="flex justify-between items-center pb-3 border-b border-slate-200 mb-3">
            <span class="text-sm text-slate-500">${t('shippingEst')}</span>
            <span class="text-sm text-slate-400 italic">${this.state.lang === 'id' ? 'Ditentukan' : 'TBD'}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="font-bold text-slate-800">${t('total')}</span>
            <span class="font-black text-teal-600 text-lg">${this.fmt(subtotal)}</span>
          </div>
        </div>
      </div>

      <div class="bottom-bar">
        <button id="btnCheckout"
          class="w-full bg-teal-600 text-white font-bold py-3.5 rounded-xl text-sm">
          ${t('checkoutBtn')} · ${this.fmt(subtotal)}
        </button>
      </div>
    `;
  },

  /* ─────────────────────────────────────────────
     SCREEN: PAYMENT & DELIVERY (combined)
  ───────────────────────────────────────────── */
  screenPaymentDelivery() {
    const { selectedPayment, paymentSubData, selectedDelivery, deliveryAddress } = this.state;
    const lang = this.state.lang;
    const isPickup = selectedDelivery?.id === 'pickup';

    /* ── Payment method groups ── */
    const METHOD_GROUPS = [
      { key: 'groupCard',    methods: [{ id: 'credit', icon: '💳', labelKey: 'payCredit', color: 'bg-blue-50' }, { id: 'debit', icon: '🏦', labelKey: 'payDebit', color: 'bg-indigo-50' }] },
      { key: 'groupEwallet', methods: [{ id: 'gopay', icon: '🟢', labelKey: 'payGopay', color: 'bg-green-50' }, { id: 'ovo', icon: '🟣', labelKey: 'payOvo', color: 'bg-purple-50' }, { id: 'dana', icon: '🔵', labelKey: 'payDana', color: 'bg-blue-50' }, { id: 'linkaja', icon: '🔴', labelKey: 'payLinkaja', color: 'bg-red-50' }] },
      { key: 'groupQRIS',    methods: [{ id: 'qris', icon: '📱', labelKey: 'payQRIS', color: 'bg-slate-50' }] },
      { key: 'groupBank',    methods: [{ id: 'bca', icon: '🏛️', labelKey: 'payBca', color: 'bg-blue-50' }, { id: 'bni', icon: '🏛️', labelKey: 'payBni', color: 'bg-amber-50' }, { id: 'bri', icon: '🏛️', labelKey: 'payBri', color: 'bg-sky-50' }] },
    ];

    let subForm = '';
    if (selectedPayment === 'credit' || selectedPayment === 'debit') {
      subForm = `
        <div class="bg-teal-50 rounded-xl p-4 mt-3">
          <div class="mb-3">
            <label class="text-xs font-semibold text-slate-600 block mb-1">${t('cardNumber')}</label>
            <input id="cardNum" type="text" inputmode="numeric" maxlength="19" placeholder="0000 0000 0000 0000"
              value="${paymentSubData.cardNum || ''}" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
          </div>
          <div class="grid grid-cols-2 gap-2 mb-3">
            <div>
              <label class="text-xs font-semibold text-slate-600 block mb-1">${t('cardExpiry')}</label>
              <input id="cardExp" type="text" placeholder="MM/YY" maxlength="5"
                value="${paymentSubData.cardExp || ''}" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-600 block mb-1">${t('cardCVV')}</label>
              <input id="cardCvv" type="password" maxlength="4" placeholder="•••"
                value="${paymentSubData.cardCvv || ''}" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
            </div>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-600 block mb-1">${t('cardName')}</label>
            <input id="cardName" type="text" placeholder="NAMA LENGKAP"
              value="${paymentSubData.cardName || ''}" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm uppercase">
          </div>
        </div>`;
    } else if (['gopay','ovo','dana','linkaja'].includes(selectedPayment)) {
      subForm = `
        <div class="bg-teal-50 rounded-xl p-4 mt-3">
          <label class="text-xs font-semibold text-slate-600 block mb-1">${t('phoneWallet')}</label>
          <input id="phoneWallet" type="tel" inputmode="numeric" placeholder="08xxxxxxxxxx"
            value="${paymentSubData.phone || ''}" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
        </div>`;
    } else if (selectedPayment === 'qris') {
      subForm = `
        <div class="bg-teal-50 rounded-xl p-4 mt-3 flex flex-col items-center">
          <div class="w-40 h-40 bg-white border-2 border-dashed border-teal-300 rounded-xl flex items-center justify-center text-5xl mb-2">📲</div>
          <p class="text-xs text-teal-700 font-medium text-center">
            ${lang === 'id' ? 'Scan kode QR di bawah dengan aplikasi bank atau e-wallet Anda' : 'Scan the QR code below with your bank or e-wallet app'}
          </p>
        </div>`;
    } else if (['bca','bni','bri'].includes(selectedPayment)) {
      const vaNumbers = { bca: '8100 4567 8901', bni: '9881 2345 6789', bri: '1023 4567 8901 2345' };
      subForm = `
        <div class="bg-teal-50 rounded-xl p-4 mt-3">
          <p class="text-xs text-slate-500 mb-2">${lang === 'id' ? 'Nomor Virtual Account:' : 'Virtual Account Number:'}</p>
          <div class="bg-white rounded-lg px-4 py-3 flex items-center justify-between">
            <span class="font-mono font-bold text-slate-800 text-lg tracking-wider">${vaNumbers[selectedPayment]}</span>
            <span class="text-xs text-teal-600 font-medium cursor-pointer">${lang === 'id' ? 'Salin' : 'Copy'}</span>
          </div>
          <p class="text-xs text-slate-400 mt-2">
            ${lang === 'id' ? 'Transfer sebelum 24 jam. Pembayaran otomatis terverifikasi.' : 'Transfer within 24 hours. Payment is automatically verified.'}
          </p>
        </div>`;
    }

    const payGroupsHtml = METHOD_GROUPS.map(group => {
      const cards = group.methods.map(m => `
        <button class="select-card pay-method-btn flex flex-col items-center justify-center p-3 rounded-xl border-2 text-center gap-1
          ${m.color} ${selectedPayment === m.id ? 'selected' : 'border-slate-200'}" data-method="${m.id}">
          <span class="text-2xl">${m.icon}</span>
          <span class="text-xs font-semibold text-slate-700">${t(m.labelKey)}</span>
        </button>`).join('');
      return `
        <div class="mb-4">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">${t(group.key)}</p>
          <div class="grid grid-cols-4 gap-2">${cards}</div>
          ${selectedPayment && group.methods.find(m => m.id === selectedPayment) ? subForm : ''}
        </div>`;
    }).join('');

    /* ── Courier cards ── */
    const buildCourierCard = (c) => {
      const sel = selectedDelivery?.id === c.id;
      const isFree = c.price === 0;
      return `
        <button class="select-card courier-btn w-full flex items-center gap-3 border-2 rounded-xl p-3 text-left transition-all
          ${sel ? 'selected' : 'border-slate-200 bg-white'}" data-courier-id="${c.id}">
          <div class="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
            ${c.badge.length <= 2 ? `<span class="text-xl">${c.badge}</span>` : `<span class="text-[11px] font-black text-teal-700">${c.badge}</span>`}
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-slate-800 text-sm">${c.name}</p>
            <p class="text-xs text-slate-400">${t('estArrival')}: ${lang === 'id' ? c.est_id : c.est_en}</p>
          </div>
          <div class="text-right flex-shrink-0">
            <p class="font-bold text-sm ${sel ? 'text-teal-600' : isFree ? 'text-green-600' : 'text-slate-700'}">
              ${isFree ? (lang === 'id' ? 'Gratis' : 'Free') : this.fmt(c.price)}
            </p>
            ${sel ? '<div class="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center mt-1 ml-auto"><svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div>' : ''}
          </div>
        </button>`;
    };

    const deliveryGroupsHtml = [
      { labelKey: 'regularGroup', couriers: COURIERS.filter(c => c.group === 'regular') },
      { labelKey: 'expressGroup', couriers: COURIERS.filter(c => c.group === 'express') },
      { labelKey: 'instantGroup', couriers: COURIERS.filter(c => c.group === 'instant') },
    ].map(g => `
      <div class="mb-3">
        <p class="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">${t(g.labelKey)}</p>
        <div class="flex flex-col gap-2">${g.couriers.map(buildCourierCard).join('')}</div>
      </div>`).join('');

    const pickupHtml = `
      <div class="mb-3">
        <p class="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">${t('pickupGroup')}</p>
        <div class="flex flex-col gap-2">${buildCourierCard(COURIERS.find(c => c.id === 'pickup'))}</div>
        ${isPickup ? `<p class="text-xs text-slate-400 mt-2 px-1">📍 ${t('pickupNote')}</p>` : ''}
      </div>`;

    /* ── Address + map (hidden for pickup) ── */
    const addressSection = isPickup ? '' : `
      <div class="mb-5">
        <label class="block text-sm font-semibold text-slate-700 mb-2">${t('addressLabel')}</label>
        <div class="mb-3">
          <p class="text-xs text-slate-400 mb-1.5">📍 ${t('mapLabel')}</p>
          <div class="flex gap-2 mb-2">
            <input id="mapSearch" type="text"
              placeholder="${lang === 'id' ? 'Cari nama gedung atau alamat...' : 'Search building name or address...'}"
              class="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm transition-colors">
            <button id="btnMapSearch"
              class="bg-teal-600 text-white px-4 py-2 rounded-xl text-sm font-semibold flex-shrink-0 active:bg-teal-700 transition-colors">
              ${lang === 'id' ? 'Cari' : 'Search'}
            </button>
          </div>
          <div id="mapSearchError" class="hidden text-red-500 text-xs mb-1.5">
            ${lang === 'id' ? 'Lokasi tidak ditemukan. Coba nama yang lebih spesifik.' : 'Location not found. Try a more specific name.'}
          </div>
          <div id="deliveryMap" class="w-full rounded-xl border border-slate-200 overflow-hidden" style="height:200px; z-index:0;"></div>
          <p class="text-[10px] text-slate-400 mt-1">${t('mapHint')}</p>
        </div>
        <textarea id="inputAddress" rows="3"
          placeholder="${t('addressPlaceholder')}"
          class="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm resize-none transition-colors"
        >${deliveryAddress}</textarea>
        <span id="errAddress" class="hidden text-red-500 text-xs mt-1">${t('errAddress')}</span>
      </div>`;

    /* ── Order summary ── */
    const summaryItems = this.state.cart.map(item => `
      <div class="flex justify-between items-center py-1.5">
        <span class="text-xs text-slate-600 truncate max-w-[60%]">${item.med.brand} × ${item.qty}</span>
        <span class="text-xs font-semibold text-slate-700">${this.fmt(item.med.price * item.qty)}</span>
      </div>`).join('');

    const shippingFee = selectedDelivery ? (isPickup ? 0 : selectedDelivery.price) : null;
    const total = this.cartTotal() + (shippingFee || 0);

    return `
      <div class="px-4 pt-5 pb-44">
        <h2 class="text-xl font-bold text-slate-800 mb-1">${t('payDelivTitle')}</h2>
        <p class="text-sm text-slate-500 mb-5">🔒 ${t('payDelivSub')}</p>

        <!-- Order summary -->
        <details class="bg-slate-50 rounded-xl mb-5 overflow-hidden">
          <summary class="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-semibold text-slate-700">
            <span>🧾 ${t('orderSummary')}</span>
            <span class="text-teal-600 font-black">${this.fmt(this.cartTotal())}</span>
          </summary>
          <div class="px-4 pb-3 border-t border-slate-200 pt-2">
            ${summaryItems}
            <div class="flex justify-between items-center pt-2 border-t border-slate-100 mt-1">
              <span class="text-xs font-bold text-slate-700">${t('subtotal')}</span>
              <span class="text-sm font-black text-teal-600">${this.fmt(this.cartTotal())}</span>
            </div>
          </div>
        </details>

        <!-- Payment methods -->
        <p class="text-sm font-bold text-slate-700 mb-3">💳 ${t('payTitle')}</p>
        ${payGroupsHtml}
        <span id="errPayment" class="hidden text-red-500 text-xs block mb-4">${t('selectPayFirst')}</span>

        <!-- Delivery methods -->
        <p class="text-sm font-bold text-slate-700 mb-3">🚚 ${t('delivTitle')}</p>
        ${deliveryGroupsHtml}
        ${pickupHtml}
        <span id="errDelivery" class="hidden text-red-500 text-xs block mb-4">${t('errDelivery')}</span>

        <!-- Address + map -->
        ${addressSection}
      </div>

      <div class="bottom-bar">
        <div class="flex justify-between text-xs text-slate-500 mb-2">
          <span>${t('subtotal')}</span>
          <span class="font-semibold text-slate-700">${this.fmt(this.cartTotal())}</span>
        </div>
        <div class="flex justify-between text-xs text-slate-500 mb-3">
          <span>${t('courierPrice')}</span>
          <span class="font-semibold ${isPickup ? 'text-green-600' : 'text-slate-700'}">
            ${shippingFee === null ? '—' : isPickup ? (lang === 'id' ? 'Gratis' : 'Free') : this.fmt(shippingFee)}
          </span>
        </div>
        <div class="flex justify-between font-bold text-slate-800 mb-3">
          <span>${t('total')}</span>
          <span class="text-teal-600 text-lg">${selectedDelivery ? this.fmt(total) : '—'}</span>
        </div>
        <button id="btnConfirmOrder"
          class="w-full bg-teal-600 text-white font-bold py-3.5 rounded-xl text-sm">
          ${t('confirmOrder')}
        </button>
      </div>
    `;
  },

  /* ─────────────────────────────────────────────
     SCREEN: PAYMENT
  ───────────────────────────────────────────── */
  screenPayment() {
    const { selectedPayment, paymentSubData } = this.state;

    const METHOD_GROUPS = [
      {
        key: 'groupCard',
        methods: [
          { id: 'credit', icon: '💳', labelKey: 'payCredit', color: 'bg-blue-50' },
          { id: 'debit',  icon: '🏦', labelKey: 'payDebit',  color: 'bg-indigo-50' },
        ]
      },
      {
        key: 'groupEwallet',
        methods: [
          { id: 'gopay',   icon: '🟢', labelKey: 'payGopay',   color: 'bg-green-50' },
          { id: 'ovo',     icon: '🟣', labelKey: 'payOvo',     color: 'bg-purple-50' },
          { id: 'dana',    icon: '🔵', labelKey: 'payDana',    color: 'bg-blue-50' },
          { id: 'linkaja', icon: '🔴', labelKey: 'payLinkaja', color: 'bg-red-50' },
        ]
      },
      {
        key: 'groupQRIS',
        methods: [
          { id: 'qris', icon: '📱', labelKey: 'payQRIS', color: 'bg-slate-50' },
        ]
      },
      {
        key: 'groupBank',
        methods: [
          { id: 'bca', icon: '🏛️', labelKey: 'payBca', color: 'bg-blue-50' },
          { id: 'bni', icon: '🏛️', labelKey: 'payBni', color: 'bg-amber-50' },
          { id: 'bri', icon: '🏛️', labelKey: 'payBri', color: 'bg-sky-50' },
        ]
      },
    ];

    // Sub-form based on selected method
    let subForm = '';
    if (selectedPayment === 'credit' || selectedPayment === 'debit') {
      subForm = `
        <div class="bg-teal-50 rounded-xl p-4 mt-3">
          <div class="mb-3">
            <label class="text-xs font-semibold text-slate-600 block mb-1">${t('cardNumber')}</label>
            <input id="cardNum" type="text" inputmode="numeric" maxlength="19" placeholder="0000 0000 0000 0000"
              value="${paymentSubData.cardNum || ''}"
              class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
          </div>
          <div class="grid grid-cols-2 gap-2 mb-3">
            <div>
              <label class="text-xs font-semibold text-slate-600 block mb-1">${t('cardExpiry')}</label>
              <input id="cardExp" type="text" placeholder="MM/YY" maxlength="5"
                value="${paymentSubData.cardExp || ''}"
                class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-600 block mb-1">${t('cardCVV')}</label>
              <input id="cardCvv" type="password" maxlength="4" placeholder="•••"
                value="${paymentSubData.cardCvv || ''}"
                class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
            </div>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-600 block mb-1">${t('cardName')}</label>
            <input id="cardName" type="text" placeholder="NAMA LENGKAP"
              value="${paymentSubData.cardName || ''}"
              class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm uppercase">
          </div>
        </div>
      `;
    } else if (['gopay','ovo','dana','linkaja'].includes(selectedPayment)) {
      subForm = `
        <div class="bg-teal-50 rounded-xl p-4 mt-3">
          <label class="text-xs font-semibold text-slate-600 block mb-1">${t('phoneWallet')}</label>
          <input id="phoneWallet" type="tel" inputmode="numeric" placeholder="08xxxxxxxxxx"
            value="${paymentSubData.phone || ''}"
            class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
        </div>
      `;
    } else if (selectedPayment === 'qris') {
      subForm = `
        <div class="bg-teal-50 rounded-xl p-4 mt-3 flex flex-col items-center">
          <div class="w-40 h-40 bg-white border-2 border-dashed border-teal-300 rounded-xl flex items-center justify-center text-5xl mb-2">
            📲
          </div>
          <p class="text-xs text-teal-700 font-medium text-center">
            ${this.state.lang === 'id'
              ? 'Scan kode QR di bawah dengan aplikasi bank atau e-wallet Anda'
              : 'Scan the QR code below with your bank or e-wallet app'}
          </p>
        </div>
      `;
    } else if (['bca','bni','bri'].includes(selectedPayment)) {
      const vaNumbers = { bca: '8100 4567 8901', bni: '9881 2345 6789', bri: '1023 4567 8901 2345' };
      subForm = `
        <div class="bg-teal-50 rounded-xl p-4 mt-3">
          <p class="text-xs text-slate-500 mb-2">${this.state.lang === 'id' ? 'Nomor Virtual Account:' : 'Virtual Account Number:'}</p>
          <div class="bg-white rounded-lg px-4 py-3 flex items-center justify-between">
            <span class="font-mono font-bold text-slate-800 text-lg tracking-wider">${vaNumbers[selectedPayment]}</span>
            <span class="text-xs text-teal-600 font-medium cursor-pointer">${this.state.lang === 'id' ? 'Salin' : 'Copy'}</span>
          </div>
          <p class="text-xs text-slate-400 mt-2">
            ${this.state.lang === 'id'
              ? 'Transfer sebelum 24 jam. Pembayaran otomatis terverifikasi.'
              : 'Transfer within 24 hours. Payment is automatically verified.'}
          </p>
        </div>
      `;
    }

    const groupsHtml = METHOD_GROUPS.map(group => {
      const cards = group.methods.map(m => `
        <button class="select-card pay-method-btn flex flex-col items-center justify-center p-3 rounded-xl border-2 text-center gap-1
          ${m.color} ${selectedPayment === m.id ? 'selected' : 'border-slate-200'}"
          data-method="${m.id}">
          <span class="text-2xl">${m.icon}</span>
          <span class="text-xs font-semibold text-slate-700">${t(m.labelKey)}</span>
        </button>
      `).join('');
      return `
        <div class="mb-4">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">${t(group.key)}</p>
          <div class="grid grid-cols-4 gap-2">${cards}</div>
          ${selectedPayment && group.methods.find(m => m.id === selectedPayment) ? subForm : ''}
        </div>
      `;
    }).join('');

    // Order summary with shipping
    const { selectedDelivery } = this.state;
    const isPickup = selectedDelivery?.id === 'pickup';
    const shippingFee = selectedDelivery ? (isPickup ? 0 : selectedDelivery.price) : 0;
    const grandTotal = this.cartTotal() + shippingFee;

    const summaryItems = this.state.cart.map(item => `
      <div class="flex justify-between items-center py-1.5">
        <span class="text-xs text-slate-600 truncate max-w-[60%]">${item.med.brand} × ${item.qty}</span>
        <span class="text-xs font-semibold text-slate-700">${this.fmt(item.med.price * item.qty)}</span>
      </div>
    `).join('');

    const lang = this.state.lang;

    return `
      <div class="px-4 pt-5 pb-40">
        <h2 class="text-xl font-bold text-slate-800 mb-1">${t('payTitle')}</h2>
        <p class="text-sm text-slate-500 mb-5">🔒 ${t('paySub')}</p>

        <!-- Order summary with shipping -->
        <div class="bg-slate-50 rounded-xl mb-5 overflow-hidden">
          <details>
            <summary class="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-semibold text-slate-700">
              <span>🧾 ${t('orderSummary')}</span>
              <span class="text-teal-600 font-black">${this.fmt(grandTotal)}</span>
            </summary>
            <div class="px-4 pb-1 border-t border-slate-200 pt-2">
              ${summaryItems}
            </div>
          </details>
          <div class="px-4 pb-3 border-t border-slate-100">
            <div class="flex justify-between items-center py-1.5">
              <span class="text-xs text-slate-500">${t('subtotal')}</span>
              <span class="text-xs font-semibold text-slate-700">${this.fmt(this.cartTotal())}</span>
            </div>
            <div class="flex justify-between items-center py-1.5">
              <span class="text-xs text-slate-500">${t('shippingEst')} ${selectedDelivery ? '(' + selectedDelivery.name + ')' : ''}</span>
              <span class="text-xs font-semibold ${isPickup ? 'text-green-600' : 'text-slate-700'}">
                ${isPickup ? (lang === 'id' ? 'Gratis' : 'Free') : this.fmt(shippingFee)}
              </span>
            </div>
            <div class="flex justify-between items-center pt-2 border-t border-slate-200 mt-1">
              <span class="text-sm font-bold text-slate-800">${t('total')}</span>
              <span class="text-sm font-black text-teal-600">${this.fmt(grandTotal)}</span>
            </div>
          </div>
        </div>

        ${groupsHtml}

        <span id="errPayment" class="hidden text-red-500 text-xs block mb-2">${t('selectPayFirst')}</span>
      </div>

      <div class="bottom-bar">
        <button id="btnPay"
          class="w-full bg-teal-600 text-white font-bold py-3.5 rounded-xl text-sm">
          ${t('payNow')} · ${this.fmt(grandTotal)}
        </button>
      </div>
    `;
  },

  /* ─────────────────────────────────────────────
     SCREEN: DELIVERY
  ───────────────────────────────────────────── */
  screenDelivery() {
    const { selectedDelivery, deliveryAddress } = this.state;
    const lang = this.state.lang;
    const isPickup = selectedDelivery?.id === 'pickup';

    const buildCourierCard = (c) => {
      const sel = selectedDelivery?.id === c.id;
      const isFree = c.price === 0;
      return `
        <button class="select-card courier-btn w-full flex items-center gap-3 border-2 rounded-xl p-3 text-left transition-all
          ${sel ? 'selected' : 'border-slate-200 bg-white'}" data-courier-id="${c.id}">
          <div class="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
            ${c.badge.length <= 2 ? `<span class="text-xl">${c.badge}</span>` : `<span class="text-[11px] font-black text-teal-700">${c.badge}</span>`}
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-slate-800 text-sm">${c.name}</p>
            <p class="text-xs text-slate-400">${t('estArrival')}: ${lang === 'id' ? c.est_id : c.est_en}</p>
          </div>
          <div class="text-right flex-shrink-0">
            <p class="font-bold text-sm ${sel ? 'text-teal-600' : isFree ? 'text-green-600' : 'text-slate-700'}">
              ${isFree ? (lang === 'id' ? 'Gratis' : 'Free') : this.fmt(c.price)}
            </p>
            ${sel ? '<div class="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center mt-1 ml-auto"><svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div>' : ''}
          </div>
        </button>`;
    };

    const groupsHtml = [
      { labelKey: 'regularGroup', couriers: COURIERS.filter(c => c.group === 'regular') },
      { labelKey: 'expressGroup', couriers: COURIERS.filter(c => c.group === 'express') },
      { labelKey: 'instantGroup', couriers: COURIERS.filter(c => c.group === 'instant') },
    ].map(g => `
      <div class="mb-4">
        <p class="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">${t(g.labelKey)}</p>
        <div class="flex flex-col gap-2">${g.couriers.map(buildCourierCard).join('')}</div>
      </div>`).join('');

    const pickupCard = `
      <div class="mb-4">
        <p class="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">${t('pickupGroup')}</p>
        <div class="flex flex-col gap-2">${buildCourierCard(COURIERS.find(c => c.id === 'pickup'))}</div>
        ${isPickup ? `<p class="text-xs text-slate-400 mt-2 px-1">📍 ${t('pickupNote')}</p>` : ''}
      </div>`;

    const addressSection = isPickup ? '' : `
      <div class="mb-5">
        <label class="block text-sm font-semibold text-slate-700 mb-2">${t('addressLabel')}</label>
        <div class="flex gap-2 mb-2">
          <input id="mapSearch" type="text"
            placeholder="${lang === 'id' ? 'Cari nama gedung atau alamat...' : 'Search building name or address...'}"
            class="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm">
          <button id="btnMapSearch"
            class="bg-teal-600 text-white px-4 py-2 rounded-xl text-sm font-semibold flex-shrink-0 active:bg-teal-700">
            ${lang === 'id' ? 'Cari' : 'Search'}
          </button>
        </div>
        <div id="mapSearchError" class="hidden text-red-500 text-xs mb-1.5">
          ${lang === 'id' ? 'Lokasi tidak ditemukan. Coba nama yang lebih spesifik.' : 'Location not found. Try a more specific name.'}
        </div>
        <div id="deliveryMap" class="w-full rounded-xl border border-slate-200 overflow-hidden mb-3" style="height:200px; z-index:0;"></div>
        <textarea id="inputAddress" rows="3"
          placeholder="${t('addressPlaceholder')}"
          class="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm resize-none"
        >${deliveryAddress}</textarea>
        <span id="errAddress" class="hidden text-red-500 text-xs mt-1 block">${t('errAddress')}</span>
      </div>`;

    return `
      <div class="px-4 pt-5 pb-36">
        <h2 class="text-xl font-bold text-slate-800 mb-1">${t('delivTitle')}</h2>
        <p class="text-sm text-slate-500 mb-5">${t('delivSub')}</p>

        ${groupsHtml}
        ${pickupCard}
        <span id="errDelivery" class="hidden text-red-500 text-xs block mb-4">${t('errDelivery')}</span>

        ${addressSection}
      </div>

      <div class="bottom-bar">
        <button id="btnContinueToPayment"
          class="w-full bg-teal-600 text-white font-bold py-3.5 rounded-xl text-sm">
          ${t('continueToPayment')}
        </button>
      </div>
    `;
  },

  /* ─────────────────────────────────────────────
     SCREEN: CONFIRMATION
  ───────────────────────────────────────────── */
  screenConfirmation() {
    const { orderNumber, cart, selectedPayment, selectedDelivery, orderTime, patient } = this.state;
    const lang = this.state.lang;

    const PAY_LABELS = {
      credit: t('payCredit'), debit: t('payDebit'), gopay: t('payGopay'),
      ovo: t('payOvo'), dana: t('payDana'), linkaja: t('payLinkaja'),
      qris: t('payQRIS'), bca: t('payBca'), bni: t('payBni'), bri: t('payBri'),
    };

    const itemList = cart.map(item => `
      <div class="flex justify-between items-center py-1.5">
        <span class="text-sm text-slate-600">${item.med.emoji} ${item.med.brand} × ${item.qty}</span>
        <span class="text-sm font-semibold">${this.fmt(item.med.price * item.qty)}</span>
      </div>
    `).join('');

    const isPickup = selectedDelivery?.id === 'pickup';
    const delivTotal = this.cartTotal() + (isPickup ? 0 : (selectedDelivery?.price || 0));

    const now = orderTime || new Date();
    let arrivalStr;
    if (isPickup) {
      arrivalStr = lang === 'id' ? 'Ambil di Apotek' : 'Pickup In-store';
    } else {
      const days = selectedDelivery?.est_id?.includes('jam') ? 0
                 : selectedDelivery?.est_id?.includes('Hari ini') ? 0
                 : selectedDelivery?.est_id?.includes('1 hari') ? 1
                 : 3;
      const arrivalDate = new Date(now);
      arrivalDate.setDate(arrivalDate.getDate() + days);
      arrivalStr = days === 0
        ? (lang === 'id' ? 'Hari ini' : 'Today')
        : arrivalDate.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', { weekday:'long', day:'numeric', month:'long' });
    }

    return `
      <div class="flex flex-col min-h-screen bg-gradient-to-b from-teal-50 to-white">

        <!-- Top bar -->
        <div class="flex justify-between items-center px-4 py-3 border-b border-slate-100 bg-white">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 bg-teal-600 rounded-lg flex items-center justify-center">
              <span class="text-white text-xs font-black">A</span>
            </div>
            <span class="font-bold text-teal-700">${t('appName')}</span>
          </div>
          <button id="btnLang" class="text-xs font-semibold text-teal-700 border border-teal-200 bg-teal-50 px-3 py-1 rounded-full">
            ${t('langToggle')}
          </button>
        </div>

        <div class="px-4 py-8 text-center">
          <!-- Check animation -->
          <div class="check-anim w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
            </svg>
          </div>

          <h2 class="text-2xl font-black text-slate-800 mb-1">${t('confTitle')}</h2>
          <p class="text-sm text-slate-500 mb-6">${t('confSub')}</p>

          <!-- Order number card -->
          <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 text-left mb-4">
            <div class="flex justify-between items-center mb-3 pb-3 border-b border-slate-100">
              <div>
                <p class="text-xs text-slate-400 mb-0.5">${t('orderNum')}</p>
                <p class="font-black text-slate-800 text-lg tracking-wide font-mono">${orderNumber}</p>
              </div>
              <div class="text-right">
                <p class="text-xs text-slate-400 mb-0.5">${t('estimatedDel')}</p>
                <p class="font-bold text-teal-600 text-sm">${arrivalStr}</p>
              </div>
            </div>

            <p class="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">${t('orderItems')}</p>
            ${itemList}
            <div class="flex justify-between pt-2 border-t border-slate-100 mt-1">
              <span class="font-bold text-slate-700 text-sm">${t('total')}</span>
              <span class="font-black text-teal-600">${this.fmt(delivTotal)}</span>
            </div>

            <div class="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
              <div>
                <p class="text-[10px] text-slate-400 uppercase tracking-wide">${t('payMethod')}</p>
                <p class="text-sm font-semibold text-slate-700">${PAY_LABELS[selectedPayment] || selectedPayment}</p>
              </div>
              <div>
                <p class="text-[10px] text-slate-400 uppercase tracking-wide">${t('delivMethod')}</p>
                <p class="text-sm font-semibold text-slate-700">${selectedDelivery?.name || '—'}</p>
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <button id="btnTrack"
            class="w-full border-2 border-teal-500 text-teal-600 font-bold py-3.5 rounded-xl text-sm mb-3">
            📦 ${t('trackBtn')}
          </button>
          <button id="btnHome"
            class="w-full bg-teal-600 text-white font-bold py-3.5 rounded-xl text-sm">
            ${t('homeBtn')}
          </button>
        </div>

      </div>

      <!-- Track toast -->
      <div id="trackToast" class="hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-sm px-5 py-3 rounded-xl shadow-xl z-50 max-w-xs text-center">
        ${t('trackMsg')}
      </div>
    `;
  },

  /* ─────────────────────────────────────────────
     BIND EVENTS
  ───────────────────────────────────────────── */
  bindEvents() {
    const on = (id, ev, fn) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener(ev, fn.bind(this));
    };
    const onAll = (sel, ev, fn) => {
      document.querySelectorAll(sel).forEach(el => el.addEventListener(ev, fn.bind(this)));
    };

    // Global
    on('btnLang', 'click', this.toggleLang);
    on('btnBack', 'click', this.handleBack);

    switch (this.state.screen) {

      case 'welcome':
        on('btnStart', 'click', () => this.navigate('consultation'));
        break;

      case 'doctorOffer':
        on('btnDoctorYes', 'click', () => {
          const modal = document.getElementById('doctorModal');
          if (modal) modal.classList.remove('hidden');
        });
        on('btnDoctorNo', 'click', () => this.navigate('searching'));
        on('btnDoctorClose', 'click', () => {
          const modal = document.getElementById('doctorModal');
          if (modal) modal.classList.add('hidden');
        });
        break;

      case 'consultation':
        on('btnSubmitConsult', 'click', this.handleSubmitConsult);
        onAll('.symptom-chip', 'click', this.handleSymptomToggle);
        on('cbNoAllergy', 'change', (e) => {
          if (e.target.checked) {
            this.state.patient.allergies = [];
            document.querySelectorAll('.allergy-cb').forEach(cb => cb.checked = false);
          }
        });
        onAll('.allergy-cb', 'change', (e) => {
          const id = e.target.value;
          if (e.target.checked) {
            if (!this.state.patient.allergies.includes(id)) {
              this.state.patient.allergies.push(id);
            }
            const noAlCb = document.getElementById('cbNoAllergy');
            if (noAlCb) noAlCb.checked = false;
          } else {
            this.state.patient.allergies = this.state.patient.allergies.filter(a => a !== id);
          }
        });
        ['inputAge','inputWeight'].forEach(id => {
          on(id, 'input', (e) => {
            const key = id === 'inputAge' ? 'age' : 'weight';
            this.state.patient[key] = e.target.value;
          });
        });
        on('inputCustomSymptoms', 'input', (e) => {
          this.state.customSymptoms = e.target.value;
        });
        break;

      case 'recommendations':
        onAll('.btn-add-cart', 'click', this.handleAddToCart);
        on('btnViewCart', 'click', () => this.navigate('cart'));
        break;

      case 'cart':
        onAll('.qty-btn', 'click', this.handleQtyChange);
        onAll('.btn-remove', 'click', this.handleRemoveItem);
        on('btnCheckout', 'click', () => this.navigate('delivery'));
        on('btnBackToRec', 'click', () => this.navigate('recommendations'));
        break;

      case 'delivery':
        onAll('.courier-btn', 'click', this.handleCourierSelect);
        on('inputAddress', 'input', (e) => { this.state.deliveryAddress = e.target.value; });
        on('btnContinueToPayment', 'click', this.handleConfirmDelivery);
        on('btnMapSearch', 'click', () => this.handleMapSearch());
        on('mapSearch', 'keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); this.handleMapSearch(); } });
        if (this.state.selectedDelivery?.id !== 'pickup') this.initDeliveryMap();
        break;

      case 'payment':
        onAll('.pay-method-btn', 'click', this.handlePaymentSelect);
        on('btnPay', 'click', this.handlePay);
        ['cardNum','cardExp','cardCvv','cardName','phoneWallet'].forEach(fid => {
          on(fid, 'input', (e) => {
            const map = { cardNum:'cardNum', cardExp:'cardExp', cardCvv:'cardCvv', cardName:'cardName', phoneWallet:'phone' };
            this.state.paymentSubData[map[fid]] = e.target.value;
          });
        });
        break;

      case 'confirmation':
        on('btnHome', 'click', () => {
          // Reset everything except persisted profile
          this.state.screen = 'welcome';
          this.state.cart = [];
          this.state.symptoms = [];
          this.state.customSymptoms = '';
          this.state.patient = { age: '', weight: '', allergies: [] };
          this.state.recommendations = [];
          this.state.selectedPayment = null;
          this.state.paymentSubData = {};
          this.state.deliveryAddress = '';
          this.state.selectedDelivery = null;
          this.state.orderNumber = null;
          this.state.profileLoadedFromStorage = false;
          this.navigate('welcome');
        });
        on('btnTrack', 'click', () => {
          const toast = document.getElementById('trackToast');
          if (toast) {
            toast.classList.remove('hidden');
            setTimeout(() => toast.classList.add('hidden'), 3000);
          }
        });
        break;
    }
  },

  /* ─────────────────────────────────────────────
     HANDLERS
  ───────────────────────────────────────────── */
  handleBack() {
    const backMap = {
      consultation: 'welcome',
      doctorOffer: 'consultation',
      recommendations: 'consultation',
      cart: 'recommendations',
      delivery: 'cart',
      payment: 'delivery',
    };
    const dest = backMap[this.state.screen];
    if (dest) this.navigate(dest);
  },

  handleSymptomToggle(e) {
    const btn = e.currentTarget;
    const sid = btn.dataset.symptom;
    if (this.state.symptoms.includes(sid)) {
      this.state.symptoms = this.state.symptoms.filter(s => s !== sid);
      btn.classList.remove('border-teal-500','bg-teal-50','text-teal-700');
      btn.classList.add('border-slate-200','bg-white','text-slate-600');
    } else {
      this.state.symptoms.push(sid);
      btn.classList.add('border-teal-500','bg-teal-50','text-teal-700');
      btn.classList.remove('border-slate-200','bg-white','text-slate-600');
    }
    // Clear error
    const err = document.getElementById('errSymptoms');
    if (err && this.state.symptoms.length > 0) err.classList.add('hidden');
  },

  handleSubmitConsult() {
    const age = parseFloat(this.state.patient.age);
    const weight = parseFloat(this.state.patient.weight);
    let valid = true;

    const showErr = (id, show) => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('hidden', !show);
    };
    const flashBorder = (id, bad) => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.toggle('border-red-400', bad);
        el.classList.toggle('border-slate-200', !bad);
      }
    };

    if (!age || age < 0 || age > 120) {
      showErr('errAge', true); flashBorder('inputAge', true); valid = false;
    } else { showErr('errAge', false); flashBorder('inputAge', false); }

    if (!weight || weight < 1 || weight > 300) {
      showErr('errWeight', true); flashBorder('inputWeight', true); valid = false;
    } else { showErr('errWeight', false); flashBorder('inputWeight', false); }

    if (this.state.symptoms.length === 0) {
      showErr('errSymptoms', true); valid = false;
    } else { showErr('errSymptoms', false); }

    if (!valid) {
      const firstErr = document.querySelector('#errAge:not(.hidden), #errWeight:not(.hidden), #errSymptoms:not(.hidden)');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    this.saveProfile();
    this.navigate('doctorOffer');
  },

  handleAddToCart(e) {
    const btn = e.currentTarget;
    const medId = btn.dataset.medId;
    const med = this.state.recommendations.find(r => r.id === medId);
    if (!med) return;

    const existing = this.state.cart.find(i => i.med.id === medId);
    if (existing) { existing.qty += 1; }
    else { this.state.cart.push({ med, qty: 1 }); }

    btn.textContent = t('added');
    btn.disabled = true;
    btn.classList.replace('bg-teal-600','bg-teal-50');
    btn.classList.replace('text-white','text-teal-600');
    btn.classList.add('border','border-teal-200');

    // Update or add cart button
    const existing_btn = document.getElementById('btnViewCart');
    if (!existing_btn) {
      const bar = document.createElement('div');
      bar.className = 'bottom-bar';
      bar.innerHTML = `<button id="btnViewCart"
        class="w-full bg-teal-600 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2">
        🛒 ${t('viewCart')} · ${t('cartCount', this.cartItemCount())}
      </button>`;
      const appDiv = document.getElementById('appWrapper');
      if (appDiv) appDiv.appendChild(bar);
      document.getElementById('btnViewCart')?.addEventListener('click', () => this.navigate('cart'));
    } else {
      existing_btn.textContent = `🛒 ${t('viewCart')} · ${t('cartCount', this.cartItemCount())}`;
    }
  },

  handleQtyChange(e) {
    const btn = e.currentTarget;
    const action = btn.dataset.qtyAction;
    const idx = parseInt(btn.dataset.cartIdx);
    if (isNaN(idx)) return;

    if (action === 'inc') {
      this.state.cart[idx].qty += 1;
    } else {
      this.state.cart[idx].qty -= 1;
      if (this.state.cart[idx].qty <= 0) {
        this.state.cart.splice(idx, 1);
      }
    }
    this.render();
  },

  handleRemoveItem(e) {
    const idx = parseInt(e.currentTarget.dataset.cartIdx);
    if (!isNaN(idx)) {
      this.state.cart.splice(idx, 1);
      this.render();
    }
  },

  handlePaymentSelect(e) {
    const btn = e.currentTarget;
    this.state.selectedPayment = btn.dataset.method;
    this.state.paymentSubData = {};
    document.getElementById('errPayment')?.classList.add('hidden');
    this.render();
  },

  handleConfirmDelivery() {
    let valid = true;
    const isPickup = this.state.selectedDelivery?.id === 'pickup';

    if (!this.state.selectedDelivery) {
      document.getElementById('errDelivery')?.classList.remove('hidden');
      valid = false;
    } else {
      document.getElementById('errDelivery')?.classList.add('hidden');
    }

    if (!isPickup && !this.state.deliveryAddress.trim()) {
      document.getElementById('errAddress')?.classList.remove('hidden');
      valid = false;
    } else {
      document.getElementById('errAddress')?.classList.add('hidden');
    }

    if (!valid) {
      const firstErr = document.querySelector('#errDelivery:not(.hidden), #errAddress:not(.hidden)');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    this.navigate('payment');
  },

  handlePay() {
    if (!this.state.selectedPayment) {
      document.getElementById('errPayment')?.classList.remove('hidden');
      return;
    }
    const btn = document.getElementById('btnPay');
    if (btn) {
      btn.textContent = t('processingPay');
      btn.disabled = true;
      btn.classList.add('opacity-75');
    }
    setTimeout(() => this.handleConfirmOrder(), 1500);
  },

  handleCourierSelect(e) {
    const courierId = e.currentTarget.dataset.courierId;
    const courier = COURIERS.find(c => c.id === courierId);
    if (courier) {
      this.state.selectedDelivery = courier;
      this.render();
    }
  },

  handleConfirmOrder() {

    // Generate order number
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let num = 'APK-';
    for (let i = 0; i < 8; i++) num += chars[Math.floor(Math.random() * chars.length)];
    this.state.orderNumber = num;
    this.state.orderTime = new Date();

    const btn = document.getElementById('btnConfirmOrder');
    if (btn) { btn.textContent = '⏳'; btn.disabled = true; }
    setTimeout(() => this.navigate('confirmation'), 800);
  },

  initDeliveryMap() {
    const container = document.getElementById('deliveryMap');
    if (!container || typeof L === 'undefined') return;
    if (this._map) { this._map.remove(); this._map = null; this._mapMarker = null; }

    const jakarta = [-6.2088, 106.8456];
    this._map = L.map('deliveryMap', { zoomControl: true }).setView(jakarta, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(this._map);

    this._mapMarker = null;
    this._map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      if (this._mapMarker) { this._mapMarker.setLatLng(e.latlng); }
      else { this._mapMarker = L.marker(e.latlng).addTo(this._map); }
      const addrEl = document.getElementById('inputAddress');
      if (addrEl && !addrEl.value.trim()) {
        addrEl.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        this.state.deliveryAddress = addrEl.value;
      }
    });
  },

  handleMapSearch() {
    const input = document.getElementById('mapSearch');
    const errEl = document.getElementById('mapSearchError');
    const btn = document.getElementById('btnMapSearch');
    const query = input?.value.trim();
    if (!query || !this._map) return;

    if (errEl) errEl.classList.add('hidden');
    if (btn) { btn.textContent = '…'; btn.disabled = true; }

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&countrycodes=id`;
    fetch(url, { headers: { 'Accept-Language': 'id', 'User-Agent': 'ApoMutiara/1.0' } })
      .then(r => r.json())
      .then(results => {
        if (btn) { btn.textContent = this.state.lang === 'id' ? 'Cari' : 'Search'; btn.disabled = false; }
        if (!results.length) {
          if (errEl) errEl.classList.remove('hidden');
          return;
        }
        const { lat, lon, display_name } = results[0];
        const latlng = [parseFloat(lat), parseFloat(lon)];
        this._map.setView(latlng, 17);
        if (this._mapMarker) { this._mapMarker.setLatLng(latlng); }
        else { this._mapMarker = L.marker(latlng).addTo(this._map); }
        this._mapMarker.bindPopup(display_name).openPopup();
        const addrEl = document.getElementById('inputAddress');
        if (addrEl) {
          addrEl.value = display_name;
          this.state.deliveryAddress = display_name;
        }
      })
      .catch(() => {
        if (btn) { btn.textContent = this.state.lang === 'id' ? 'Cari' : 'Search'; btn.disabled = false; }
        if (errEl) errEl.classList.remove('hidden');
      });
  },
};

/* ─────────────────────────────────────────────
   BOOT
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const saved = App.loadProfile();
  if (saved) {
    App.state.patient = saved;
    App.state.profileLoadedFromStorage = true;
  }
  App.render();
});
