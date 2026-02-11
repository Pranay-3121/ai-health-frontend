/*
  LANGUAGE SWITCHER (EN / HI / MR)
  -------------------------------
  - Saves language in localStorage
  - Updates UI text using data-i18n attributes
  - Also updates placeholders
*/

const LANG_KEY = "lang";

const translations = {
  en: {
    theme: "Theme",

    // Auth page
    login_title: "AI Health",
    login_subtitle: "Secure access to your health records",
    email_label: "Email address",
    password_label: "Password",
    login_btn: "Login",
    register_btn: "Create new account",

    // Dashboard sidebar
    records: "📋 Records",
    analytics: "📊 Analytics",
    reminders: "⏰ Reminders",
    calculators: "🧮 Calculators",
    ai_checker: "🤖 AI Checker",
    logout: "🚪 Logout",

    // Records tab
    health_records: "Health Records",
    keep_track: "Keep track of your medical history",
    add_record: "Add New Record",
    condition_ph: "Condition (e.g., Headache, Fever)",
    medicine_ph: "Medicine (e.g., Paracetamol)",
    save_record: "💾 Save Record",

    // Reminders tab
    medicine_reminders: "Medicine Reminders",
    never_miss: "Never miss your medication",
    set_new_reminder: "Set New Reminder",
    reminder_ph: "Medicine name (e.g., Aspirin)",
    set_reminder: "⏰ Set Reminder",
    scheduled_reminders: "📅 Scheduled Reminders",

    // Calculators tab
    health_calculators: "Health Calculators",
    calculate_metrics: "Calculate your health metrics",

    // AI tab
    symptom_checker: "🩺 AI Symptom Checker",
    symptom_sub: "Describe your symptoms and get AI-powered insights",
    symptom_ph: "Enter symptoms (e.g., fever, headache, cough)",
    analyze_symptoms: "🔍 Analyze Symptoms",

    ai_chat: "💬 AI Health Chat",
    chat_sub: "Ask health questions and get instant AI responses",
    chat_ph: "Type or speak your health question...",
    voice: "🎤 Voice",
    clear: "🗑️ Clear",
    stop: "🛑 Stop",
    send: "Send"
  },

  hi: {
    theme: "थीम",

    login_title: "AI Health",
    login_subtitle: "अपने हेल्थ रिकॉर्ड्स में सुरक्षित लॉगिन करें",
    email_label: "ईमेल",
    password_label: "पासवर्ड",
    login_btn: "लॉगिन",
    register_btn: "नया अकाउंट बनाएं",

    records: "📋 रिकॉर्ड्स",
    analytics: "📊 एनालिटिक्स",
    reminders: "⏰ रिमाइंडर",
    calculators: "🧮 कैलकुलेटर",
    ai_checker: "🤖 AI चेकर",
    logout: "🚪 लॉगआउट",

    health_records: "हेल्थ रिकॉर्ड्स",
    keep_track: "अपनी मेडिकल हिस्ट्री ट्रैक करें",
    add_record: "नया रिकॉर्ड जोड़ें",
    condition_ph: "बीमारी (जैसे: सिर दर्द, बुखार)",
    medicine_ph: "दवा (जैसे: पैरासिटामोल)",
    save_record: "💾 रिकॉर्ड सेव करें",

    medicine_reminders: "दवा रिमाइंडर",
    never_miss: "दवा लेना कभी न भूलें",
    set_new_reminder: "नया रिमाइंडर सेट करें",
    reminder_ph: "दवा का नाम (जैसे: एस्पिरिन)",
    set_reminder: "⏰ रिमाइंडर सेट करें",
    scheduled_reminders: "📅 रिमाइंडर लिस्ट",

    health_calculators: "हेल्थ कैलकुलेटर",
    calculate_metrics: "अपने हेल्थ डेटा की गणना करें",

    symptom_checker: "🩺 AI लक्षण चेकर",
    symptom_sub: "लक्षण बताएं और AI से सुझाव पाएं",
    symptom_ph: "लक्षण लिखें (जैसे: बुखार, सिरदर्द, खांसी)",
    analyze_symptoms: "🔍 लक्षण जांचें",

    ai_chat: "💬 AI हेल्थ चैट",
    chat_sub: "हेल्थ सवाल पूछें और AI से जवाब पाएं",
    chat_ph: "अपना हेल्थ सवाल लिखें या बोलें...",
    voice: "🎤 आवाज",
    clear: "🗑️ साफ करें",
    stop: "🛑 रोकें",
    send: "भेजें"
  },

  mr: {
    theme: "थीम",

    login_title: "AI Health",
    login_subtitle: "तुमचे हेल्थ रेकॉर्ड सुरक्षितपणे वापरा",
    email_label: "ईमेल",
    password_label: "पासवर्ड",
    login_btn: "लॉगिन",
    register_btn: "नवीन अकाउंट तयार करा",

    records: "📋 रेकॉर्ड्स",
    analytics: "📊 विश्लेषण",
    reminders: "⏰ रिमाइंडर",
    calculators: "🧮 कॅल्क्युलेटर",
    ai_checker: "🤖 AI चेकर",
    logout: "🚪 लॉगआउट",

    health_records: "हेल्थ रेकॉर्ड्स",
    keep_track: "तुमची मेडिकल हिस्ट्री जतन करा",
    add_record: "नवीन रेकॉर्ड जोडा",
    condition_ph: "आजारीपणा (उदा: डोकेदुखी, ताप)",
    medicine_ph: "औषध (उदा: पॅरासिटामोल)",
    save_record: "💾 रेकॉर्ड सेव करा",

    medicine_reminders: "औषध रिमाइंडर",
    never_miss: "औषध वेळेवर घ्या",
    set_new_reminder: "नवीन रिमाइंडर सेट करा",
    reminder_ph: "औषधाचे नाव (उदा: Aspirin)",
    set_reminder: "⏰ रिमाइंडर सेट करा",
    scheduled_reminders: "📅 रिमाइंडर लिस्ट",

    health_calculators: "हेल्थ कॅल्क्युलेटर",
    calculate_metrics: "तुमचे हेल्थ मोजा",

    symptom_checker: "🩺 AI लक्षण तपासणी",
    symptom_sub: "लक्षणे सांगा आणि AI कडून माहिती मिळवा",
    symptom_ph: "लक्षणे लिहा (उदा: ताप, डोकेदुखी, खोकला)",
    analyze_symptoms: "🔍 लक्षण तपासा",

    ai_chat: "💬 AI हेल्थ चॅट",
    chat_sub: "हेल्थ प्रश्न विचारा आणि AI उत्तर मिळवा",
    chat_ph: "तुमचा हेल्थ प्रश्न लिहा किंवा बोला...",
    voice: "🎤 आवाज",
    clear: "🗑️ क्लिअर",
    stop: "🛑 थांबवा",
    send: "पाठवा"
  }
};

function getLang() {
  return localStorage.getItem(LANG_KEY) || "en";
}

function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
}

function applyLanguage(lang) {
  const dict = translations[lang] || translations.en;

  // update text nodes
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  // update placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) el.setAttribute("placeholder", dict[key]);
  });

  // update HTML lang attr
  document.documentElement.setAttribute("lang", lang);

  console.log("🌍 Language applied:", lang);
}

document.addEventListener("DOMContentLoaded", () => {
  const langSelect = document.getElementById("langSelect");

  const saved = getLang();
  if (langSelect) langSelect.value = saved;

  applyLanguage(saved);

  langSelect?.addEventListener("change", () => {
    const lang = langSelect.value;
    setLang(lang);
    applyLanguage(lang);
  });
});
