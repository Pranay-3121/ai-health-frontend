/*
  LANGUAGE SWITCHER (EN / MR / HI)
  -------------------------------
  Updates UI text without breaking CSS
*/

const translations = {
  en: {
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

    // Tabs headings
    healthRecords: "Health Records",
    healthRecordsSub: "Keep track of your medical history",

    analyticsTitle: "Health Analytics",
    analyticsSub: "Visual summary of your medical records",

    remindersTitle: "Medicine Reminders",
    remindersSub: "Never miss your medication",

    calculatorsTitle: "Health Calculators",
    calculatorsSub: "Calculate your health metrics",

    aiTitle: "🩺 AI Symptom Checker",
    aiSub: "Describe your symptoms and get AI-powered insights",

    chatTitle: "💬 AI Health Chat",
    chatSub: "Ask health questions and get instant AI responses"
  },

  hi: {
    loginTitle: "AI Health",
    loginSubtitle: "अपने स्वास्थ्य रिकॉर्ड तक सुरक्षित पहुँच",
    emailLabel: "ईमेल",
    passwordLabel: "पासवर्ड",
    loginBtn: "लॉगिन",
    registerBtn: "नया अकाउंट बनाएं",

    records: "📋 रिकॉर्ड्स",
    analytics: "📊 एनालिटिक्स",
    reminders: "⏰ रिमाइंडर",
    calculators: "🧮 कैलकुलेटर",
    aiChecker: "🤖 AI चेकर",
    logout: "🚪 लॉगआउट",

    healthRecords: "स्वास्थ्य रिकॉर्ड्स",
    healthRecordsSub: "अपने मेडिकल इतिहास को ट्रैक करें",

    analyticsTitle: "स्वास्थ्य एनालिटिक्स",
    analyticsSub: "आपके रिकॉर्ड्स का विज़ुअल सारांश",

    remindersTitle: "दवा रिमाइंडर",
    remindersSub: "अपनी दवा कभी मिस न करें",

    calculatorsTitle: "स्वास्थ्य कैलकुलेटर",
    calculatorsSub: "अपने हेल्थ मेट्रिक्स कैलकुलेट करें",

    aiTitle: "🩺 AI लक्षण चेकर",
    aiSub: "अपने लक्षण बताइए और AI से जानकारी पाइए",

    chatTitle: "💬 AI हेल्थ चैट",
    chatSub: "स्वास्थ्य सवाल पूछिए और तुरंत जवाब पाइए"
  },

  mr: {
    loginTitle: "AI Health",
    loginSubtitle: "तुमच्या हेल्थ रेकॉर्डसाठी सुरक्षित प्रवेश",
    emailLabel: "ईमेल",
    passwordLabel: "पासवर्ड",
    loginBtn: "लॉगिन",
    registerBtn: "नवीन खाते तयार करा",

    records: "📋 रेकॉर्ड्स",
    analytics: "📊 विश्लेषण",
    reminders: "⏰ रिमाइंडर",
    calculators: "🧮 कॅल्क्युलेटर",
    aiChecker: "🤖 AI चेकर",
    logout: "🚪 लॉगआउट",

    healthRecords: "हेल्थ रेकॉर्ड्स",
    healthRecordsSub: "तुमचा मेडिकल इतिहास सेव्ह करा",

    analyticsTitle: "हेल्थ विश्लेषण",
    analyticsSub: "तुमच्या रेकॉर्ड्सचा व्हिज्युअल सारांश",

    remindersTitle: "औषध रिमाइंडर",
    remindersSub: "औषध घेणे विसरू नका",

    calculatorsTitle: "हेल्थ कॅल्क्युलेटर",
    calculatorsSub: "तुमचे हेल्थ मेट्रिक्स काढा",

    aiTitle: "🩺 AI लक्षण तपासणी",
    aiSub: "लक्षणे लिहा आणि AI कडून माहिती घ्या",

    chatTitle: "💬 AI हेल्थ चॅट",
    chatSub: "हेल्थ प्रश्न विचारा आणि लगेच उत्तर मिळवा"
  }
};

// Save language
function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  applyLanguage(lang);
}

function getLanguage() {
  return localStorage.getItem("lang") || "en";
}

function applyLanguage(lang) {
  const t = translations[lang] || translations.en;

  // LOGIN PAGE
  const loginH1 = document.querySelector(".auth-title h1");
  const loginP = document.querySelector(".auth-title p");
  const emailLabel = document.querySelector('label[for="email"]') || document.querySelectorAll(".field label")[0];
  const passLabel = document.querySelector('label[for="password"]') || document.querySelectorAll(".field label")[1];
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");

  if (loginH1) loginH1.textContent = t.loginTitle;
  if (loginP) loginP.textContent = t.loginSubtitle;
  if (emailLabel) emailLabel.textContent = t.emailLabel;
  if (passLabel) passLabel.textContent = t.passwordLabel;
  if (loginBtn) loginBtn.textContent = t.loginBtn;
  if (registerBtn) registerBtn.textContent = t.registerBtn;

  // DASHBOARD SIDEBAR
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

  // DASHBOARD TAB HEADINGS
  const recordsTab = document.getElementById("records");
  const analyticsTab = document.getElementById("analytics");
  const remindersTab = document.getElementById("reminders");
  const calculatorsTab = document.getElementById("calculators");
  const aiTab = document.getElementById("ai");

  if (recordsTab) {
    recordsTab.querySelector("h2").textContent = t.healthRecords;
    recordsTab.querySelector("p").textContent = t.healthRecordsSub;
  }

  if (analyticsTab) {
    analyticsTab.querySelector("h2").textContent = t.analyticsTitle;
    analyticsTab.querySelector("p").textContent = t.analyticsSub;
  }

  if (remindersTab) {
    remindersTab.querySelector("h2").textContent = t.remindersTitle;
    remindersTab.querySelector("p").textContent = t.remindersSub;
  }

  if (calculatorsTab) {
    calculatorsTab.querySelector("h2").textContent = t.calculatorsTitle;
    calculatorsTab.querySelector("p").textContent = t.calculatorsSub;
  }

  if (aiTab) {
    const cards = aiTab.querySelectorAll(".card");
    if (cards[0]) {
      cards[0].querySelector("h2").textContent = t.aiTitle;
      cards[0].querySelector("p").textContent = t.aiSub;
    }
    if (cards[1]) {
      cards[1].querySelector("h2").textContent = t.chatTitle;
      cards[1].querySelector("p").textContent = t.chatSub;
    }
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("langSelect");
  if (!select) return;

  const currentLang = getLanguage();
  select.value = currentLang;
  applyLanguage(currentLang);

  select.addEventListener("change", () => {
    setLanguage(select.value);
  });


});
