/*
  ADVANCED HEALTH CHATBOT - WITH CONVERSATION HISTORY + LANGUAGE SUPPORT
  ---------------------------------------------------------------------
  Maintains context across messages
  Sends selected language to backend so AI replies in that language
*/

// API Configuration - Force production URL for Render deployment
const API_URL = "https://ai-health-backend-ig16.onrender.com";

console.log("🌐 Using API URL:", API_URL);

const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");

// Conversation history
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

  // Sanitize and ensure text is visible
  let safeText = String(text || "").trim();

  if (!safeText) {
    console.warn("⚠️ Empty message received");
    return;
  }

  // Remove markdown formatting artifacts
  safeText = safeText
    .replace(/~~(.*?)~~/g, "$1") // Remove strikethrough
    .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold markdown
    .replace(/\*(.*?)\*/g, "$1") // Remove italic markdown
    .replace(/\[OUT\]/g, "") // Remove [OUT] tags
    .replace(/\[INST\]/g, "") // Remove [INST] tags
    .replace(/<\/?del>/g, ""); // Remove HTML del tags

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

/* ================= SEND MESSAGE WITH HISTORY + LANG ================= */
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
    const selectedLang = getSelectedLang();

    const res = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: msg,
        history: conversationHistory,
        lang: selectedLang
      })
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("📬 Received data:", data);

    removeTyping();

    if (!data.reply || data.reply.trim() === "") {
      addMessage(
        "⚠️ I didn't get a proper response. Please try rephrasing your question.",
        "AI"
      );
      return;
    }

    // Add AI response to history
    conversationHistory.push({
      role: "assistant",
      content: data.reply
    });

    // Keep only last 10 messages (5 exchanges) to prevent token overflow
    if (conversationHistory.length > 10) {
      conversationHistory = conversationHistory.slice(-10);
    }

    addMessage(data.reply, "AI");
    speakAI(data.reply);
  } catch (err) {
    removeTyping();
    console.error("❌ Chat error:", err);
    addMessage(
      "❌ Unable to connect to the AI server. Please try again in a moment.",
      "AI"
    );
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

/* ================= ENTER KEY SUPPORT ================= */
chatInput?.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendChat();
  }
});

/* ================= VOICE INPUT - IMPROVED ACCURACY ================= */
let recognition;
let isListening = false;
let isProcessingVoice = false;
let voiceTranscript = "";
let voiceTimeout = null;
let finalTranscripts = [];

if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  recognition = new SpeechRecognition();
  recognition.lang = "en-US"; // Voice input stays English (you can later change)
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 3;

  recognition.onstart = () => {
    isListening = true;
    isProcessingVoice = false;
    voiceTranscript = "";
    finalTranscripts = [];

    const voiceBtn = document.querySelector('button[onclick="startVoice()"]');
    if (voiceBtn) {
      voiceBtn.style.background = "#fee2e2";
      voiceBtn.style.color = "#dc2626";
      voiceBtn.textContent = "🛑 Stop & Send";
    }

    chatInput.placeholder = "🎤 Listening... Speak clearly and wait for me to finish";
    chatInput.style.borderColor = "#ef4444";
    chatInput.style.borderWidth = "2px";
    console.log("🎤 Voice recognition started");
  };

  recognition.onresult = (event) => {
    clearTimeout(voiceTimeout);

    let interimTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      const transcript = result[0].transcript;

      if (result.isFinal) {
        finalTranscripts.push(transcript);
        console.log(
          "✅ Final:",
          transcript,
          "Confidence:",
          (result[0].confidence * 100).toFixed(0) + "%"
        );
      } else {
        interimTranscript += transcript;
        console.log("⏳ Interim:", transcript);
      }
    }

    const fullTranscript =
      finalTranscripts.join(" ") + (interimTranscript ? " " + interimTranscript : "");

    voiceTranscript = fullTranscript.trim();
    chatInput.value = voiceTranscript;

    // Wait 2 seconds of silence before sending
    voiceTimeout = setTimeout(() => {
      if (voiceTranscript && isListening) {
        console.log("📤 Silence detected, sending:", voiceTranscript);
        stopVoiceAndSend();
      }
    }, 2000);
  };

  recognition.onerror = (err) => {
    console.error("❌ Voice error:", err.error);
    isListening = false;
    isProcessingVoice = false;
    clearTimeout(voiceTimeout);

    resetVoiceButton();

    if (err.error === "no-speech") {
      addMessage("⚠️ No speech detected. Please speak clearly and try again.", "AI");
    } else if (err.error === "audio-capture") {
      addMessage("⚠️ Microphone not detected. Please check your microphone settings.", "AI");
    } else if (err.error === "not-allowed") {
      addMessage("⚠️ Microphone permission denied. Please allow microphone access.", "AI");
    } else if (err.error !== "aborted") {
      addMessage("⚠️ Voice recognition error. Please try again.", "AI");
    }
  };

  recognition.onend = () => {
    console.log("🎤 Voice recognition ended");
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

  const lang = getSelectedLang();

  if (lang === "hi") {
    chatInput.placeholder = "अपना हेल्थ सवाल लिखें या बोलें...";
  } else if (lang === "mr") {
    chatInput.placeholder = "तुमचा हेल्थ प्रश्न लिहा किंवा बोला...";
  } else {
    chatInput.placeholder = "Type or speak your health question...";
  }

  chatInput.style.borderColor = "";
  chatInput.style.borderWidth = "";
}

function stopVoiceAndSend() {
  if (!voiceTranscript.trim()) {
    console.log("⚠️ Empty transcript, not sending");
    resetVoiceButton();
    return;
  }

  if (isProcessingVoice) {
    console.log("⚠️ Already processing");
    return;
  }

  isProcessingVoice = true;

  try {
    recognition.stop();
  } catch (e) {
    console.log("Recognition already stopped");
  }

  setTimeout(() => {
    sendChat();
    voiceTranscript = "";
    finalTranscripts = [];
    isProcessingVoice = false;
  }, 100);
}

/* Start/Stop voice */
window.startVoice = function () {
  if (!recognition) {
    alert(
      "Voice recognition not supported in this browser.\n\n✅ Supported:\n• Chrome\n• Edge\n• Safari\n\n❌ Not supported:\n• Firefox"
    );
    return;
  }

  if (isListening) {
    console.log("🛑 User clicked stop - sending now");
    stopVoiceAndSend();
    return;
  }

  console.log("▶️ Starting voice recognition");

  try {
    recognition.start();
  } catch (error) {
    console.error("❌ Failed to start:", error);

    if (error.message && error.message.includes("already")) {
      try {
        recognition.stop();
        setTimeout(() => recognition.start(), 100);
      } catch (e) {
        console.error("Failed to restart:", e);
      }
    }
  }
};

/* ================= SPEECH OUTPUT ================= */
function speakAI(text) {
  if (!("speechSynthesis" in window)) return;

  const cleanText = text.replace(/<[^>]*>/g, "").replace(/\n/g, " ");
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(cleanText);

  // Speak in correct language
  const lang = getSelectedLang();
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

/* ================= INIT GREETING ================= */
window.addEventListener("load", () => {
  if (chatBox && chatBox.children.length === 0) {
    const lang = getSelectedLang();

    if (lang === "hi") {
      addMessage("नमस्ते! मैं आपका AI हेल्थ असिस्टेंट हूँ। मैं आपकी कैसे मदद कर सकता हूँ?", "AI");
    } else if (lang === "mr") {
      addMessage("नमस्कार! मी तुमचा AI हेल्थ असिस्टंट आहे. मी कशी मदत करू शकतो?", "AI");
    } else {
      addMessage("Hello! I'm your AI health assistant. How can I help you today?", "AI");
    }
  }
});
