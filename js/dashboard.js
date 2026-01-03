import { auth, db } from "../firebase.js";
import { onAuthStateChanged, signOut } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let uid = null;
let recordsCache = [];
let conditionChart = null;
let medicineChart = null;

/* ================= AUTH ================= */
onAuthStateChanged(auth, user => {
  if (!user) {
    location.href = "index.html";
  } else {
    uid = user.uid;
    loadRecords();
  }
});

/* ================= TAB SWITCH ================= */
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-btn")
      .forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".tab")
      .forEach(t => t.classList.remove("active"));

    const tab = document.getElementById(btn.dataset.tab);
    tab.classList.add("active");

    // Render analytics ONLY when tab is opened
    if (btn.dataset.tab === "analytics") {
      renderAnalytics();
    }
  });
});

/* ================= SAVE RECORD ================= */
window.saveRecord = async () => {
  if (!condition.value || !medicine.value || !date.value) return;

  await addDoc(collection(db, "records"), {
    uid,
    condition: condition.value.trim(),
    medicine: medicine.value.trim(),
    date: date.value
  });

  condition.value = "";
  medicine.value = "";
  date.value = "";

  loadRecords();
};

/* ================= LOAD RECORDS ================= */
async function loadRecords() {
  recordsList.innerHTML = "";
  recordsCache = [];

  const snap = await getDocs(
    query(collection(db, "records"), where("uid", "==", uid))
  );

  if (snap.empty) {
    recordsList.innerHTML = `
      <div class="card">
        <p style="color:var(--text-muted)">No records yet</p>
      </div>
    `;
    return;
  }

  snap.forEach(doc => {
    const r = doc.data();
    recordsCache.push(r);

    recordsList.innerHTML += `
      <div class="card floating">
        <h4>${r.condition}</h4>
        <p>💊 ${r.medicine}</p>
        <small>${r.date}</small>
      </div>
    `;
  });
}

/* ================= ANALYTICS ================= */
function renderAnalytics() {
  const condCount = {};
  const medCount = {};

  recordsCache.forEach(r => {
    condCount[r.condition] = (condCount[r.condition] || 0) + 1;
    medCount[r.medicine] = (medCount[r.medicine] || 0) + 1;
  });

  const condLabels = Object.keys(condCount);
  const condValues = Object.values(condCount);
  const medLabels = Object.keys(medCount);
  const medValues = Object.values(medCount);

  const condCanvas = document.getElementById("conditionChart");
  const medCanvas = document.getElementById("medicineChart");

  if (!condCanvas || !medCanvas) return;

  if (conditionChart) conditionChart.destroy();
  if (medicineChart) medicineChart.destroy();

  if (condLabels.length === 0) {
    condCanvas.parentElement.innerHTML =
      "<p style='color:var(--text-muted)'>No data available</p>";
    medCanvas.parentElement.innerHTML =
      "<p style='color:var(--text-muted)'>No data available</p>";
    return;
  }

  conditionChart = new Chart(condCanvas, {
    type: "doughnut",
    data: {
      labels: condLabels,
      datasets: [{
        data: condValues,
        backgroundColor: [
          "#2563eb", "#06b6d4", "#22c55e",
          "#f59e0b", "#ef4444"
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: "#64748b" } }
      }
    }
  });

  medicineChart = new Chart(medCanvas, {
    type: "bar",
    data: {
      labels: medLabels,
      datasets: [{
        data: medValues,
        backgroundColor: "#2563eb"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: "#64748b" } },
        y: { ticks: { color: "#64748b" } }
      }
    }
  });
}

/* ================= LOGOUT ================= */
window.logout = () =>
  signOut(auth).then(() => location.href = "index.html");
