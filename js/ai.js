/*
  AI SYMPTOM CHECKER — STATEFUL + EXPLAINABLE EXPERT SYSTEM
  -------------------------------------------------------
  Hybrid AI (rule-based, session-aware, explainable)
  Informational only — NOT a diagnosis
*/

/* ================= SESSION STATE ================= */

const aiSession = {
  symptoms: [],
  riskScore: 0,
  followUpsAnswered: [],
  lastResults: []
};

/* ================= AUTO-SUGGEST ================= */

const allSymptoms = [
  "fever","fatigue","cough","shortness of breath","chest pain",
  "runny nose","sore throat","sneezing","headache","dizziness",
  "vomit","nausea","diarrhea","stomach pain","acid reflux",
  "rash","itching","swelling","burning urination",
  "frequent urination","body ache","shivering","blurred vision"
];

const symptomInput = document.getElementById("symptom");
const suggestionBox = document.getElementById("symptomSuggestions");

symptomInput.addEventListener("input", () => {
  const value = symptomInput.value.split(",").pop().trim().toLowerCase();
  suggestionBox.innerHTML = "";
  if (!value) return;

  allSymptoms
    .filter(s => s.startsWith(value))
    .slice(0, 6)
    .forEach(sym => {
      const chip = document.createElement("span");
      chip.textContent = sym;
      chip.onclick = () => {
        let parts = symptomInput.value.split(",");
        parts[parts.length - 1] = ` ${sym}`;
        symptomInput.value = parts.join(",").replace(/^,/, "");
        suggestionBox.innerHTML = "";
      };
      suggestionBox.appendChild(chip);
    });
});

/* ================= FOLLOW-UP HANDLER ================= */

window.answerFollowUp = function (yes, weight = 2) {
  aiSession.followUpsAnswered.push({ yes, weight });
  if (yes) aiSession.riskScore += weight;
  renderFinalAssessment();
};

/* ================= MAIN AI ================= */

window.checkSymptom = function () {

  const result = document.getElementById("result");
  const raw = symptomInput.value.trim();

  if (!raw) {
    result.innerHTML = "<p>Please enter symptoms.</p>";
    return;
  }

  /* ---------- AI THINKING UI ---------- */

  result.innerHTML = `
    <div class="card">
      <h3>AI Analysis</h3>
      <p>Analyzing symptoms and medical patterns...</p>
      <div style="margin-top:12px;height:6px;background:#e5e7eb;border-radius:4px;overflow:hidden;">
        <div style="width:40%;height:100%;background:#2563eb;animation: aiLoad 1.2s infinite;"></div>
      </div>
    </div>
  `;

  /* ---------- DELAY FOR AI FEEL ---------- */

  setTimeout(() => {

    /* ---------- RESET SESSION ---------- */

    aiSession.symptoms = [];
    aiSession.riskScore = 0;
    aiSession.followUpsAnswered = [];
    aiSession.lastResults = [];

    const synonyms = {
      tired: "fatigue",
      exhausted: "fatigue",
      vomiting: "vomit",
      breathlessness: "shortness of breath",
      stomachache: "stomach pain",
      loosemotion: "diarrhea",
      feverish: "fever"
    };

    aiSession.symptoms = raw
      .toLowerCase()
      .split(",")
      .map(s => s.trim())
      .filter(Boolean)
      .map(s => synonyms[s] || s);

    const conditions = [
      {
        name: "Respiratory Infection",
        symptoms: ["cough","shortness of breath","chest pain","fever"],
        severity: "High",
        advice: "Seek medical attention."
      },
      {
        name: "Influenza (Flu)",
        symptoms: ["fever","body ache","fatigue","headache"],
        severity: "Medium",
        advice: "Rest and hydration."
      },
      {
        name: "Food Poisoning",
        symptoms: ["vomit","diarrhea","stomach pain"],
        severity: "Medium",
        advice: "Oral rehydration."
      }
    ];

    let results = [];

    conditions.forEach(c => {
      const matched = c.symptoms.filter(s =>
        aiSession.symptoms.includes(s)
      );

      if (matched.length > 0) {
        aiSession.riskScore += matched.length;
        results.push({
          ...c,
          matched,
          confidence: Math.min(90, 50 + matched.length * 10)
        });
      }
    });

    if (!results.length) {
      result.innerHTML = `
        <div class="card">
          <h3>AI Analysis</h3>
          <p>No clear symptom pattern detected.</p>
        </div>
      `;
      return;
    }

    results.sort((a, b) => b.confidence - a.confidence);
    aiSession.lastResults = results;

    /* ---------- FOLLOW-UP LOGIC ---------- */

    let followUp = null;

    if (aiSession.symptoms.includes("fever")) {
      followUp = { question: "Has the fever lasted more than 3 days?", weight: 2 };
    } else if (aiSession.symptoms.includes("cough")) {
      followUp = { question: "Are you experiencing chest tightness or breathing difficulty?", weight: 3 };
    } else if (aiSession.symptoms.includes("vomit")) {
      followUp = { question: "Are you unable to keep fluids down?", weight: 2 };
    }

    /* ---------- OUTPUT ---------- */

    let html = `
      <div class="card">
        <h3>AI Health Analysis</h3>
        <p style="color:var(--text-muted)">
          AI confidence is based on symptom overlap and severity weighting.
        </p>
    `;

    results.forEach(r => {
      html += `
        <div style="margin-top:14px;padding:14px;background:#f9fafb;border-left:4px solid #2563eb;">
          <strong>${r.name}</strong>
          <div class="confidence-text">
            AI Confidence: ${r.confidence}%
          </div>
          <small>Matched symptoms: ${r.matched.join(", ")}</small><br>
          Advice: ${r.advice}
        </div>
      `;
    });

    if (followUp) {
      html += `
        <div style="margin-top:18px;padding:14px;background:#eef2ff;border-radius:12px;">
          <strong>Follow-up question:</strong>
          <p>${followUp.question}</p>
          <button onclick="answerFollowUp(true, ${followUp.weight})">Yes</button>
          <button onclick="answerFollowUp(false)">No</button>
        </div>
      `;
    }

    html += `
        <button style="margin-top:16px" onclick="explainWhy()">Why this result?</button>
        <p style="margin-top:16px;font-size:13px;color:var(--text-muted)">
          ⚠️ Informational only. Not a medical diagnosis.
        </p>
      </div>
    `;

    result.innerHTML = html;

  }, 1200);
};

/* ================= EXPLAIN-WHY MODE ================= */

window.explainWhy = function () {
  const result = document.getElementById("result");

  result.innerHTML += `
    <div style="margin-top:18px;padding:16px;background:#f1f5f9;border-radius:14px;">
      <h4>Why this result?</h4>

      <p><strong>Entered symptoms:</strong><br>
        ${aiSession.symptoms.join(", ")}
      </p>

      <p><strong>Risk score calculation:</strong></p>
      <ul>
        ${aiSession.followUpsAnswered.map(f =>
          `<li>Follow-up: ${f.yes ? "Yes" : "No"} (+${f.yes ? f.weight : 0})</li>`
        ).join("") || "<li>No follow-up answered</li>"}
      </ul>

      <p><strong>Condition matching:</strong></p>
      <ul>
        ${aiSession.lastResults.map(r =>
          `<li>${r.name}: ${r.matched.join(", ")}</li>`
        ).join("")}
      </ul>
    </div>
  `;
};

/* ================= FINAL ASSESSMENT ================= */

function renderFinalAssessment() {
  const result = document.getElementById("result");

  let triage =
    aiSession.riskScore >= 6
      ? "🔴 Consult Doctor"
      : aiSession.riskScore >= 3
      ? "🟡 Monitor"
      : "🟢 Self-care";

  result.innerHTML += `
    <div style="margin-top:18px;padding:14px;background:#ecfeff;border-left:4px solid #06b6d4;">
      <strong>Updated Assessment:</strong><br>
      Risk Score: ${aiSession.riskScore}<br>
      Triage Recommendation: <b>${triage}</b>
    </div>
  `;
}
