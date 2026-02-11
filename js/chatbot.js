/*
  ADVANCED HEALTH CHATBOT - WITH CONVERSATION HISTORY + LANGUAGE SUPPORT
  ---------------------------------------------------------------------
  Maintains context across messages
  Sends selected language to backend so AI replies in that language
*/

const API_URL = "https://ai-health-backend-ig16.onrender.com";

console.log("🌐 Using API URL:", API_URL);

const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");

let conversationHistory = [];

/* ================= LANGUAGE ================= */
function getSelectedLang() {
  return localStorage.getItem("lang") || "en";
}

/* ================= HELPERS ================= */
function addMessage(text, sender = "AI") {
  const div = document.createElement("div");
  div.style.marginBottom = "16px";
  div.style.animation = "fadeIn 0.3s ease";

  let safeText = String(text || "").trim();
  if (!safeText) return;

  safeText = safeText
    .replace(/~~(.*?)~~/g, "$1")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/\[OUT\]/g, "")
    .replace(/\[INST\]/g, "")
    .replace(/<\/?del>/g, "");

  if (sender === "AI") {
    div.innerHTML = `
      <div style="
        background: white;
        padding: 16px 20px;
        border-radius: 16px;
        border-left: 4px solid #2563eb;
        box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        max-width: 85%;
      ">
        <strong style="color: #2563eb; font-size: 14px; display: block; margin-bottom: 8px;">
          AI Assistant
        </strong>
        <div style="color: #0f172a; line-height: 1.6; font-size: 15px;">
          ${safeText.replace(/\n/g, "<br>")}
        </div>
      </div>
    `;
  } else {
    div.innerHTML = `
      <div style="
        background: linear-gradient(135deg, #eef2ff, #dbeafe);
        padding: 14px 18px;
        border-radius: 16px;
        margin-left: auto;
        max-width: 75%;
        box-shadow: 0 2px 6px rgba(37, 99, 235, 0.1);
      ">
        <strong style="color: #1e40af; font-size: 13px; display: block; margin-bottom: 4px;">
          You
        </strong>
        <div style="color: #0f172a; font-size: 15px;">
          ${safeText}
        </div>
      </div>
    `;
  }

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

/* ================= TYPING INDICATOR ================= */
function showTyping() {
  const typingDiv = document.createElement("div");
  typingDiv.id = "typing-indicator";
  typingDiv.innerHTML = `
    <div style="
      padding: 14px 20px;
      background: white;
      border-radius: 16px;
      border-left: 4px solid #06b6d4;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      max-width: 200px;
      display: flex;
      align-items: center;
      gap: 8px;
    ">
      <div style="
        width: 8px;
        height: 8px;
        background: #06b6d4;
        border-radius: 50%;
        animation: pulse 1.5s infinite;
      "></div>
      <span style="color: #64748b; font-size: 14px; font-style: italic;">
        AI is thinking...
      </span>
    </div>
  `;
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
  document.getElementById("typing-indicator")?.remove();
}

/* ================= SEND MESSAGE ================= */
window.sendChat = async function () {
  const msg = chatInput.value.trim();
  if (!msg) return;

  stopSpeaking();
  addMessage(msg, "You");
  chatInput.value = "";

  // Add user msg to history
  conversationHistory.push({ role: "user", content: msg });

  // Limit history to prevent token overflow
  if (conversationHistory.length > 10) {
    conversationHistory = conversationHistory.slice(-10);
  }

  showTyping();

  try {
    const selectedLang = getSelectedLang();

    console.log("📤 Sending:", { msg, selectedLang });

    const res = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: msg,
        history: conversationHistory,
        lang: selectedLang
      })
    });

    const data = await res.json();
    console.log("📬 Received:", data);

    removeTyping();

    if (!data.reply) {
      addMessage("⚠️ No reply received from server.", "AI");
      return;
    }

    // Add AI reply to history
    conversationHistory.push({ role: "assistant", content: data.reply });

    if (conversationHistory.length > 10) {
      conversationHistory = conversationHistory.slice(-10);
    }

    addMessage(data.reply, "AI");
    speakAI(data.reply);
  } catch (err) {
    removeTyping();
    console.error("❌ Chat error:", err);
    addMessage("❌ Unable to connect to AI server.", "AI");
  }
};

/* ================= CLEAR CHAT ================= */
window.clearChat = function () {
  conversationHistory = [];
  chatBox.innerHTML = "";

  const lang = getSelectedLang();

  if (lang === "hi") {
    addMessage("नमस्ते! मैं आपकी हेल्थ में कैसे मदद कर सकता हूँ?", "AI");
  } else if (lang === "mr") {
    addMessage("नमस्कार! मी तुमच्या आरोग्यासाठी कशी मदत करू शकतो?", "AI");
  } else {
    addMessage("Hello! How can I help you with your health today?", "AI");
  }
};

/* ================= ENTER KEY ================= */
chatInput?.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendChat();
  }
});

/* ================= SPEECH OUTPUT ================= */
function speakAI(text) {
  if (!("speechSynthesis" in window)) return;

  const cleanText = text.replace(/<[^>]*>/g, "").replace(/\n/g, " ");
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(cleanText);

  const lang = getSelectedLang();
  if (lang === "hi") utterance.lang = "hi-IN";
  else if (lang === "mr") utterance.lang = "mr-IN";
  else utterance.lang = "en-US";

  utterance.rate = 0.95;
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);
}

window.stopSpeaking = function () {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
};

/* ================= INIT GREETING ================= */
window.addEventListener("load", () => {
  if (chatBox && chatBox.children.length === 0) {
    clearChat();
  }
});
