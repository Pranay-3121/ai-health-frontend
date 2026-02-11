/*
  LANGUAGE SWITCHER (EN / HI / MR)
  -------------------------------
  Changes UI text without breaking CSS
*/

const translations = {
  en: {
    theme: "Theme",
    loginTitle: "AI Health",
    loginSubtitle: "Secure access to your health records",
    emailLabel: "Email address",
    passwordLabel: "Password",
    loginBtn: "Login",
    registerBtn: "Create new account",

    // Dashboard sidebar
    records: "📋 Records",
    analytics: "📊 Analytics",
    reminders: "⏰ Reminders",
    calculators: "🧮 Calculators",
    aiChecker: "🤖 AI Checker",
    logout: "🚪 Logout",

    // Records
    recordsTitle: "Health Records",
    recordsSubtitle: "Keep track of your medical history",
    addRecord: "Add New Record",
    conditionPH: "Condition (e.g., Headache, Fever)",
    medicinePH: "Medicine (e.g., Paracetamol)",
    saveRecord: "💾 Save Record",

    // Analytics
    analyticsTitle: "Health Analytics",
    analyticsSubtitle: "Visual summary of your medical records",
    conditionDist: "📊 Condition Distribution",
    medicineFreq: "💊 Medicine Frequency",

    // Reminders
    remindersTitle: "Medicine Reminders",
    remindersSubtitle: "Never miss your medication",
    setReminder: "Set New Reminder",
    reminderPH: "Medicine name (e.g., Aspirin)",
    setReminderBtn: "⏰ Set Reminder",
    scheduled: "📅 Scheduled Reminders",

    // Calculators
    calcTitle: "Health Calculators",
    calcSubtitle: "Calculate your health metrics",

    // AI
    aiTitle: "🩺 AI Symptom Checker",
    aiSubtitle: "Describe your symptoms and get AI-powered insights",
    symptomPH: "Enter symptoms (e.g., fever, headache, cough)",
    analyzeBtn: "🔍 Analyze Symptoms",

    chatTitle: "💬 AI Health Chat",
    chatSubtitle: "Ask health questions and get instant AI responses",
    chatPH: "Type or speak your health question...",
    voiceBtn: "🎤 Voice",
    clearBtn: "🗑️ Clear",
    stopBtn: "🛑 Stop",
    sendBtn: "Send"
  },

  hi: {
    theme: "थीम",
    loginTitle: "AI Health",
    loginSubtitle: "अपने हेल्थ रिकॉर्ड्स को सुरक्षित रखें",
    emailLabel: "ईमेल",
    passwordLabel: "पासवर्ड",
    loginBtn: "लॉगिन",
    registerBtn: "नया अकाउंट बनाएं",

    records: "📋 रिकॉर्ड्स",
    analytics: "📊 एनालिटिक्स",
    reminders: "⏰ रिमाइंडर",
    calculators: "🧮 कैलकुलेटर",
    aiChecker: "🤖 AI चेक",
    logout: "🚪 लॉगआउट",

    recordsTitle: "हेल्थ रिकॉर्ड्स",
    recordsSubtitle: "अपने मेडिकल रिकॉर्ड्स सेव करें",
    addRecord: "नया रिकॉर्ड जोड़ें",
    conditionPH: "समस्या (जैसे सिरदर्द, बुखार)",
    medicinePH: "दवा (जैसे पैरासिटामोल)",
    saveRecord: "💾 सेव करें",

    analyticsTitle: "हेल्थ एनालिटिक्स",
    analyticsSubtitle: "आपके रिकॉर्ड्स का सारांश",
    conditionDist: "📊 समस्या वितरण",
    medicineFreq: "💊 दवा फ्रीक्वेंसी",

    remindersTitle: "दवा रिमाइंडर",
    remindersSubtitle: "अपनी दवा मिस मत करो",
    setReminder: "नया रिमाइंडर सेट करें",
    reminderPH: "दवा का नाम (जैसे Aspirin)",
    setReminderBtn: "⏰ सेट करें",
    scheduled: "📅 रिमाइंडर सूची",

    calcTitle: "हेल्थ कैलकुलेटर",
    calcSubtitle: "अपनी हेल्थ वैल्यू निकालें",

    aiTitle: "🩺 AI लक्षण जांच",
    aiSubtitle: "लक्षण लिखें और AI से जानकारी लें",
    symptomPH: "लक्षण लिखें (जैसे बुखार, सिरदर्द, खांसी)",
    analyzeBtn: "🔍 जांच करें",

    chatTitle: "💬 AI हेल्थ चैट",
    chatSubtitle: "हेल्थ सवाल पूछें और जवाब पाएं",
    chatPH: "अपना हेल्थ सवाल लिखें या बोलें...",
    voiceBtn: "🎤 बोलें",
    clearBtn: "🗑️ साफ",
    stopBtn: "🛑 रोकें",
    sendBtn: "भेजें"
  },

  mr: {
    theme: "थीम",
    loginTitle: "AI Health",
    loginSubtitle: "तुमचे हेल्थ रेकॉर्ड सुरक्षित ठेवा",
    emailLabel: "ईमेल",
    passwordLabel: "पासवर्ड",
    loginBtn: "लॉगिन",
    registerBtn: "नवीन खाते तयार करा",

    records: "📋 रेकॉर्ड्स",
    analytics: "📊 विश्लेषण",
    reminders: "⏰ रिमाइंडर",
    calculators: "🧮 कॅल्क्युलेटर",
    aiChecker: "🤖 AI तपासणी",
    logout: "🚪 लॉगआउट",

    recordsTitle: "हेल्थ रेकॉर्ड्स",
    recordsSubtitle: "तुमचा मेडिकल इतिहास सेव्ह करा",
    addRecord: "नवीन रेकॉर्ड जोडा",
    conditionPH: "त्रास (उदा. डोकेदुखी, ताप)",
    medicinePH: "औषध (उदा. पॅरासिटामॉल)",
    saveRecord: "💾 सेव्ह करा",

    analyticsTitle: "हेल्थ विश्लेषण",
    analyticsSubtitle: "रेकॉर्ड्सचा सारांश",
    conditionDist: "📊 त्रास वितरण",
    medicineFreq: "💊 औषध वारंवारता",

    remindersTitle: "औषध रिमाइंडर",
    remindersSubtitle: "औषध चुकवू नका",
    setReminder: "नवीन रिमाइंडर सेट करा",
    reminderPH: "औषध नाव (उदा. Aspirin)",
    setReminderBtn: "⏰ सेट करा",
    scheduled: "📅 रिमाइंडर यादी",

    calcTitle: "हेल्थ कॅल्क्युलेटर",
    calcSubtitle: "हेल्थ मोजमाप काढा",

    aiTitle: "🩺 AI लक्षण तपासणी",
    aiSubtitle: "लक्षणे लिहा आणि AI कडून माहिती घ्या",
    symptomPH: "लक्षणे लिहा (उदा. ताप, डोकेदुखी, खोकला)",
    analyzeBtn: "🔍 तपासा",

    chatTitle: "💬 AI हेल्थ चॅट",
    chatSubtitle: "हेल्थ प्रश्न विचारा आणि उत्तर मिळवा",
    chatPH: "तुमचा हेल्थ प्रश्न लिहा किंवा बोला...",
    voiceBtn: "🎤 बोला",
    clearBtn: "🗑️ क्लिअर",
    stopBtn: "🛑 थांबा",
    sendBtn: "पाठवा"
  }
};

function getLang() {
  return localStorage.getItem("lang") || "en";
}

function setLang(lang) {
  localStorage.setItem("lang", lang);
  applyLang(lang);
}

function applyLang(lang) {
  const t = translations[lang] || translations.en;

  // Theme label
  const themeLabel = document.querySelector(".theme-toggle-label");
  if (themeLabel) themeLabel.textContent = t.theme;

  // Login page
  const authTitleH1 = document.querySelector(".auth-title h1");
  const authTitleP = document.querySelector(".auth-title p");
  if (authTitleH1) authTitleH1.textContent = t.loginTitle;
  if (authTitleP) authTitleP.textContent = t.loginSubtitle;

  // Login labels
  const labels = document.querySelectorAll(".field label");
  if (labels.length >= 2) {
    labels[0].textContent = t.emailLabel;
    labels[1].textContent = t.passwordLabel;
  }

  // Login buttons
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  if (loginBtn) loginBtn.textContent = t.loginBtn;
  if (registerBtn) registerBtn.textContent = t.registerBtn;

  // Dashboard sidebar buttons
  const navBtns = document.querySelectorAll(".nav-btn");
  if (navBtns.length >= 5) {
    navBtns[0].textContent = t.records;
    navBtns[1].textContent = t.analytics;
    navBtns[2].textContent = t.reminders;
    navBtns[3].textContent = t.calculators;
    navBtns[4].textContent = t.aiChecker;
  }

  const logoutBtn = document.querySelector(".logout-btn");
  if (logoutBtn) logoutBtn.textContent = t.logout;

  // Records tab
  const recordsTab = document.getElementById("records");
  if (recordsTab) {
    recordsTab.querySelector("h2").textContent = t.recordsTitle;
    recordsTab.querySelector("p").textContent = t.recordsSubtitle;

    const inputs = recordsTab.querySelectorAll("input");
    if (inputs.length >= 2) {
      inputs[0].placeholder = t.conditionPH;
      inputs[1].placeholder = t.medicinePH;
    }

    const saveBtn = recordsTab.querySelector("button.primary");
    if (saveBtn) saveBtn.textContent = t.saveRecord;
  }

  // Analytics tab
  const analyticsTab = document.getElementById("analytics");
  if (analyticsTab) {
    analyticsTab.querySelector("h2").textContent = t.analyticsTitle;
    analyticsTab.querySelector("p").textContent = t.analyticsSubtitle;

    const cards = analyticsTab.querySelectorAll(".card h3");
    if (cards.length >= 2) {
      cards[0].textContent = t.conditionDist;
      cards[1].textContent = t.medicineFreq;
    }
  }

  // Reminders tab
  const remindersTab = document.getElementById("reminders");
  if (remindersTab) {
    remindersTab.querySelector("h2").textContent = t.remindersTitle;
    remindersTab.querySelector("p").textContent = t.remindersSubtitle;

    const reminderInput = document.getElementById("reminderText");
    if (reminderInput) reminderInput.placeholder = t.reminderPH;

    const reminderBtn = remindersTab.querySelector("button.primary");
    if (reminderBtn) reminderBtn.textContent = t.setReminderBtn;
  }

  // Calculators tab
  const calcTab = document.getElementById("calculators");
  if (calcTab) {
    calcTab.querySelector("h2").textContent = t.calcTitle;
    calcTab.querySelector("p").textContent = t.calcSubtitle;
  }

  // AI tab
  const aiTab = document.getElementById("ai");
  if (aiTab) {
    const cards = aiTab.querySelectorAll(".card");
    if (cards.length >= 2) {
      // Symptom checker card
      const h2_1 = cards[0].querySelector("h2");
      const p_1 = cards[0].querySelector("p");
      if (h2_1) h2_1.textContent = t.aiTitle;
      if (p_1) p_1.textContent = t.aiSubtitle;

      const symptomInput = document.getElementById("symptom");
      if (symptomInput) symptomInput.placeholder = t.symptomPH;

      const analyzeBtn = cards[0].querySelector("button.primary");
      if (analyzeBtn) analyzeBtn.textContent = t.analyzeBtn;

      // Chat card
      const h2_2 = cards[1].querySelector("h2");
      const p_2 = cards[1].querySelector("p");
      if (h2_2) h2_2.textContent = t.chatTitle;
      if (p_2) p_2.textContent = t.chatSubtitle;

      const chatPH = document.getElementById("chatInput");
      if (chatPH) chatPH.placeholder = t.chatPH;

      const chatBtns = cards[1].querySelectorAll("button");
      if (chatBtns.length >= 5) {
        chatBtns[0].textContent = t.voiceBtn;
        chatBtns[1].textContent = t.clearBtn;
        chatBtns[2].textContent = t.stopBtn;
        chatBtns[4].textContent = t.sendBtn;
      }
    }
  }
}

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("langSelect");
  const saved = getLang();

  if (select) {
    select.value = saved;

    select.addEventListener("change", () => {
      setLang(select.value);

      // Reset chat greeting after language change
      if (typeof window.clearChat === "function") {
        window.clearChat();
      }
    });
  }

  applyLang(saved);
});
