/*
  Medicine Reminder System — NOTIFICATION FIXED & DEBUGGABLE
*/

let reminders = [];

function generateId(medicine, time) {
  return `${medicine}-${time.getTime()}`;
}

function formatTime(date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

window.setReminder = async function () {
  const medicine = reminderText.value.trim();
  const timeValue = reminderTime.value;

  if (!medicine || !timeValue) {
    alert("Please enter medicine name and time");
    return;
  }

  console.log("🔔 Setting reminder…");

  // Permission
  const permission = await Notification.requestPermission();
  console.log("Notification permission:", permission);

  if (permission !== "granted") {
    alert("Notifications are blocked in browser settings");
    return;
  }

  const now = new Date();
  const [h, m] = timeValue.split(":").map(Number);

  const reminderTimeObj = new Date();
  reminderTimeObj.setHours(h, m, 0, 0);

  // Roll over to tomorrow if needed
  if (reminderTimeObj <= now) {
    reminderTimeObj.setDate(reminderTimeObj.getDate() + 1);
  }

  const delay = reminderTimeObj.getTime() - now.getTime();
  console.log("⏱ Delay (ms):", delay);

  const id = generateId(medicine, reminderTimeObj);

  if (reminders.some(r => r.id === id)) {
    alert("This reminder already exists");
    return;
  }

  const reminder = {
    id,
    medicine,
    time: reminderTimeObj,
    timeoutId: null
  };

  reminder.timeoutId = setTimeout(() => {
  // Browser notification
  new Notification("💊 Medicine Reminder", {
    body: `Time to take: ${medicine}`
  });

  // In-app toast (smooth slide-in)
  const toast = document.getElementById("toast");
  document.getElementById("toastMessage").innerText =
    `Time to take: ${medicine}`;

  toast.classList.remove("hidden");

  // Force reflow to restart animation
  void toast.offsetWidth;

  toast.classList.add("show");

  // Auto hide after 6 seconds
  setTimeout(() => {
    closeToast();
  }, 6000);

  removeReminderById(id);
}, delay);



  reminders.push(reminder);
  renderReminders();

  alert(`Reminder set for ${formatTime(reminderTimeObj)}`);
};

function removeReminderById(id) {
  reminders = reminders.filter(r => r.id !== id);
  renderReminders();
}

// In reminders.js, update renderReminders()
function renderReminders() {
  const ul = document.getElementById("remindersUl");
  ul.innerHTML = "";
  if (reminders.length === 0) {
    ul.innerHTML = "<li style='color:var(--text-muted);list-style:none;'>No reminders scheduled yet</li>";
    return;
  }
  reminders.forEach(r => {
    const li = document.createElement("li");
    li.textContent = `💊 ${r.medicine} — ${formatTime(r.time)}`;
    li.style.listStyle = "none";
    li.style.padding = "8px";
    li.style.marginBottom = "6px";
    li.style.background = "#f9fafb";
    li.style.borderRadius = "8px";
    ul.appendChild(li);
  });
}
window.closeInAppAlert = function () {
  document.getElementById("inAppAlert").classList.add("hidden");
};

window.closeToast = function () {
  const toast = document.getElementById("toast");
  toast.classList.remove("show");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 400);
};
