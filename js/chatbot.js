/*
  ADVANCED HEALTH CHATBOT - WITH HISTORY + LANGUAGE + VOICE
  --------------------------------------------------------
  - Sends selected language to backend
  - Voice input works
  - Voice output speaks in selected language
*/

const API_URL = "https://ai-health-backend-ig16.onrender.com";

const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");

// Conversation history
let conversationHistory = [];

/* ================= LANGUAGE ================= */
function getLang() {
  return localStorage.getItem("lang") || "en";
}

/* ================= HELPERS ================= */
function addMessage(text, sender = "AI") {
  const div = document.createElement("div");
  div.style.marginBottom = "16px";
  div.style.animation = "fadeIn 0.3s ease";

  let safeText = String(text || "").trim();

  if (!safeText) {
    console.warn("⚠️ Empty message received");
    return;
  }

  // Remove markdown formatting artifacts
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
  const indicator = document.getElementById("typing-indicator");
  if (indicator) indicator.remove();
}

/* ================= SEND MESSAGE WITH HISTORY ================= */
window.sendChat = async function () {
  const msg = chatInput.value.trim();
  if (!msg) return;

  stopSpeaking();
  addMessage(msg, "You");
  chatInput.value = "";

  // Add user message to history
  conversationHistory.push({
    role: "user",
    content: msg
  });

  showTyping();

  try {
    const lang = getLang();

    const res = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: msg,
        history: conversationHistory,
        lang: lang
      })
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("📬 Received data:", data);

    removeTyping();

    if (!data.reply || data.reply.trim() === "") {
      addMessage("⚠️ I didn't get a proper response. Please try again.", "AI");
      return;
    }

    // Add AI response to history
    conversationHistory.push({
      role: "assistant",
      content: data.reply
    });

    // Keep only last 10 messages
    if (conversationHistory.length > 10) {
      conversationHistory = conversationHistory.slice(-10);
    }

    addMessage(data.reply, "AI");
    speakAI(data.reply);
  } catch (err) {
    removeTyping();
    console.error("❌ Chat error:", err);
    addMessage("❌ Unable to connect to the AI server. Please try again.", "AI");
  }
};

/* ================= CLEAR CHAT ================= */
window.clearChat = function () {
  conversationHistory = [];
  chatBox.innerHTML = "";

  const lang = getLang();

  if (lang === "hi") {
    addMessage("नमस्ते! मैं आपकी हेल्थ में कैसे मदद कर सकता हूँ?", "AI");
  } else if (lang === "mr") {
    addMessage("नमस्कार! मी तुमच्या आरोग्यासाठी कशी मदत करू शकतो?", "AI");
  } else {
    addMessage("Hello! I'm your AI health assistant. How can I help you today?", "AI");
  }
};

/* ================= ENTER KEY SUPPORT ================= */
chatInput?.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendChat();
  }
});

/* ================= VOICE INPUT ================= */
let recognition;
let isListening = false;
let voiceTranscript = "";
let voiceTimeout = null;
let finalTranscripts = [];

if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 3;

  recognition.onstart = () => {
    isListening = true;
    voiceTranscript = "";
    finalTranscripts = [];

    const voiceBtn = document.querySelector('button[onclick="startVoice()"]');
    if (voiceBtn) {
      voiceBtn.style.background = "#fee2e2";
      voiceBtn.style.color = "#dc2626";
      voiceBtn.textContent = "🛑 Stop & Send";
    }

    chatInput.placeholder = "🎤 Listening...";
    chatInput.style.borderColor = "#ef4444";
    chatInput.style.borderWidth = "2px";
  };

  recognition.onresult = (event) => {
    clearTimeout(voiceTimeout);

    let interimTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      const transcript = result[0].transcript;

      if (result.isFinal) {
        finalTranscripts.push(transcript);
      } else {
        interimTranscript += transcript;
      }
    }

    const fullTranscript =
      finalTranscripts.join(" ") + (interimTranscript ? " " + interimTranscript : "");

    voiceTranscript = fullTranscript.trim();
    chatInput.value = voiceTranscript;

    // Auto-send after 2 seconds silence
    voiceTimeout = setTimeout(() => {
      if (voiceTranscript && isListening) {
        stopVoiceAndSend();
      }
    }, 2000);
  };

  recognition.onerror = (err) => {
    console.error("❌ Voice error:", err.error);
    isListening = false;
    clearTimeout(voiceTimeout);
    resetVoiceButton();

    if (err.error === "not-allowed") {
      alert("Microphone permission denied. Allow mic access in browser.");
    }
  };

  recognition.onend = () => {
    isListening = false;
    clearTimeout(voiceTimeout);
    resetVoiceButton();
  };
}

function resetVoiceButton() {
  const voiceBtn = document.querySelector('button[onclick="startVoice()"]');
  if (voiceBtn) {
    voiceBtn.style.background = "";
    voiceBtn.style.color = "";
    voiceBtn.textContent = "🎤 Voice";
  }

  chatInput.placeholder = "Type or speak your health question...";
  chatInput.style.borderColor = "";
  chatInput.style.borderWidth = "";
}

function stopVoiceAndSend() {
  if (!voiceTranscript.trim()) {
    resetVoiceButton();
    return;
  }

  try {
    recognition.stop();
  } catch (e) {}

  setTimeout(() => {
    sendChat();
    voiceTranscript = "";
    finalTranscripts = [];
  }, 100);
}

/* Start/Stop voice */
window.startVoice = function () {
  if (!recognition) {
    alert("Voice recognition not supported in this browser.\n\nUse Chrome or Edge.");
    return;
  }

  // Set recognition language based on selected language
  const lang = getLang();
  if (lang === "hi") recognition.lang = "hi-IN";
  else if (lang === "mr") recognition.lang = "mr-IN";
  else recognition.lang = "en-US";

  // If already listening, stop and send
  if (isListening) {
    stopVoiceAndSend();
    return;
  }

  try {
    recognition.start();
  } catch (error) {
    console.error("❌ Failed to start:", error);
    try {
      recognition.stop();
      setTimeout(() => recognition.start(), 150);
    } catch (e) {}
  }
};

/* ================= SPEECH OUTPUT ================= */
function speakAI(text) {
  if (!("speechSynthesis" in window)) return;

  const cleanText = text.replace(/<[^>]*>/g, "").replace(/\n/g, " ");
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(cleanText);

  const lang = getLang();
  if (lang === "hi") utterance.lang = "hi-IN";
  else if (lang === "mr") utterance.lang = "mr-IN";
  else utterance.lang = "en-US";

  utterance.rate = 0.95;
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);
}

/* ================= STOP SPEAKING ================= */
window.stopSpeaking = function () {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
};

/* ================= INIT ================= */
window.addEventListener("load", () => {
  if (chatBox && chatBox.children.length === 0) {
    clearChat();
  }
});
