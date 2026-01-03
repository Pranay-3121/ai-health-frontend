/*
  HEALTH CALCULATORS
  ------------------
  BMI, Calorie, Water Intake, Blood Pressure
*/

// Water tracking state
let waterGoal = 0;
let waterConsumed = 0;

/* ================= BMI CALCULATOR ================= */
window.calculateBMI = function() {
  const weight = parseFloat(document.getElementById("bmiWeight").value);
  const height = parseFloat(document.getElementById("bmiHeight").value);
  const result = document.getElementById("bmiResult");

  if (!weight || !height || weight <= 0 || height <= 0) {
    result.innerHTML = `
      <div style="padding: 12px; background: #fee2e2; border-radius: 8px; color: #dc2626;">
        ⚠️ Please enter valid weight and height
      </div>
    `;
    return;
  }

  const heightM = height / 100;
  const bmi = (weight / (heightM * heightM)).toFixed(1);

  let category = "";
  let color = "";
  let advice = "";

  if (bmi < 18.5) {
    category = "Underweight";
    color = "#06b6d4";
    advice = "Consider consulting a nutritionist for a healthy weight gain plan.";
  } else if (bmi < 25) {
    category = "Normal";
    color = "#10b981";
    advice = "Great! Maintain your healthy lifestyle.";
  } else if (bmi < 30) {
    category = "Overweight";
    color = "#f59e0b";
    advice = "Consider a balanced diet and regular exercise.";
  } else {
    category = "Obese";
    color = "#ef4444";
    advice = "Consult a healthcare provider for personalized guidance.";
  }

  result.innerHTML = `
    <div style="padding: 20px; background: linear-gradient(135deg, ${color}15, ${color}05); border-radius: 12px; border-left: 4px solid ${color};">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span style="font-size: 14px; color: var(--text-muted);">Your BMI</span>
        <span style="font-size: 32px; font-weight: 700; color: ${color};">${bmi}</span>
      </div>
      <div style="padding: 12px; background: white; border-radius: 8px; margin-bottom: 12px;">
        <div style="font-weight: 600; color: ${color}; margin-bottom: 4px;">${category}</div>
        <div style="font-size: 13px; color: var(--text-muted);">${advice}</div>
      </div>
      <div style="font-size: 12px; color: var(--text-muted);">
        Healthy BMI range: 18.5 - 24.9
      </div>
    </div>
  `;
};

/* ================= CALORIE CALCULATOR ================= */
window.calculateCalories = function() {
  const weight = parseFloat(document.getElementById("calWeight").value);
  const height = parseFloat(document.getElementById("calHeight").value);
  const age = parseInt(document.getElementById("calAge").value);
  const gender = document.getElementById("calGender").value;
  const activity = parseFloat(document.getElementById("calActivity").value);
  const result = document.getElementById("calorieResult");

  if (!weight || !height || !age || !gender) {
    result.innerHTML = `
      <div style="padding: 12px; background: #fee2e2; border-radius: 8px; color: #dc2626;">
        ⚠️ Please fill in all fields
      </div>
    `;
    return;
  }

  // Mifflin-St Jeor Equation
  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const tdee = Math.round(bmr * activity);
  const weightLoss = Math.round(tdee - 500);
  const weightGain = Math.round(tdee + 500);

  result.innerHTML = `
    <div style="padding: 20px; background: linear-gradient(135deg, #fef3c7, #fef9e7); border-radius: 12px; border-left: 4px solid #f59e0b;">
      <div style="margin-bottom: 16px;">
        <div style="font-size: 14px; color: var(--text-muted); margin-bottom: 4px;">Maintenance Calories</div>
        <div style="font-size: 28px; font-weight: 700; color: #f59e0b;">${tdee} cal/day</div>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div style="padding: 12px; background: white; border-radius: 8px;">
          <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 4px;">Weight Loss</div>
          <div style="font-size: 18px; font-weight: 600; color: #ef4444;">${weightLoss} cal</div>
        </div>
        <div style="padding: 12px; background: white; border-radius: 8px;">
          <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 4px;">Weight Gain</div>
          <div style="font-size: 18px; font-weight: 600; color: #10b981;">${weightGain} cal</div>
        </div>
      </div>

      <div style="margin-top: 12px; padding: 12px; background: white; border-radius: 8px; font-size: 13px; color: var(--text-muted);">
        💡 Based on your activity level and goals
      </div>
    </div>
  `;
};

/* ================= WATER INTAKE CALCULATOR ================= */
window.calculateWater = function() {
  const weight = parseFloat(document.getElementById("waterWeight").value);
  const activity = parseInt(document.getElementById("waterActivity").value);
  const result = document.getElementById("waterResult");
  const logger = document.getElementById("waterLogger");

  if (!weight || weight <= 0) {
    result.innerHTML = `
      <div style="padding: 12px; background: #fee2e2; border-radius: 8px; color: #dc2626;">
        ⚠️ Please enter valid weight
      </div>
    `;
    return;
  }

  waterGoal = Math.round(weight * activity);
  waterConsumed = 0;

  result.innerHTML = `
    <div style="padding: 20px; background: linear-gradient(135deg, #cffafe, #ecfeff); border-radius: 12px; border-left: 4px solid #06b6d4;">
      <div style="margin-bottom: 12px;">
        <div style="font-size: 14px; color: var(--text-muted); margin-bottom: 4px;">Daily Water Goal</div>
        <div style="font-size: 28px; font-weight: 700; color: #06b6d4;">${waterGoal} ml</div>
        <div style="font-size: 14px; color: var(--text-muted);">(${(waterGoal / 1000).toFixed(1)} liters)</div>
      </div>
      <div style="padding: 12px; background: white; border-radius: 8px; font-size: 13px; color: var(--text-muted);">
        💧 Approximately ${Math.round(waterGoal / 250)} glasses of water
      </div>
    </div>
  `;

  logger.style.display = "block";
  updateWaterProgress();
};

window.logWater = function(amount) {
  waterConsumed += amount;
  if (waterConsumed > waterGoal) waterConsumed = waterGoal;
  updateWaterProgress();
};

function updateWaterProgress() {
  const progress = document.getElementById("waterProgress");
  const bar = document.getElementById("waterBar");
  
  const percentage = Math.min(100, (waterConsumed / waterGoal) * 100);
  
  progress.textContent = `${waterConsumed} / ${waterGoal} ml`;
  bar.style.width = `${percentage}%`;

  if (percentage >= 100) {
    progress.parentElement.parentElement.style.background = "linear-gradient(135deg, #d1fae5, #ecfdf5)";
    progress.style.color = "#10b981";
    setTimeout(() => {
      alert("🎉 Congratulations! You've reached your daily water goal!");
    }, 300);
  }
}

/* ================= BLOOD PRESSURE TRACKER ================= */
let bpReadings = [];

window.trackBloodPressure = function() {
  const systolic = parseInt(document.getElementById("bpSystolic").value);
  const diastolic = parseInt(document.getElementById("bpDiastolic").value);
  const pulse = parseInt(document.getElementById("bpPulse").value);
  const result = document.getElementById("bpResult");

  if (!systolic || !diastolic || !pulse) {
    result.innerHTML = `
      <div style="padding: 12px; background: #fee2e2; border-radius: 8px; color: #dc2626;">
        ⚠️ Please enter all values
      </div>
    `;
    return;
  }

  let category = "";
  let color = "";
  let advice = "";

  if (systolic < 120 && diastolic < 80) {
    category = "Normal";
    color = "#10b981";
    advice = "Your blood pressure is in a healthy range.";
  } else if (systolic < 130 && diastolic < 80) {
    category = "Elevated";
    color = "#f59e0b";
    advice = "Consider lifestyle changes to prevent hypertension.";
  } else if (systolic < 140 || diastolic < 90) {
    category = "High BP Stage 1";
    color = "#f59e0b";
    advice = "Consult your doctor about lifestyle changes or medication.";
  } else if (systolic < 180 || diastolic < 120) {
    category = "High BP Stage 2";
    color = "#ef4444";
    advice = "See your doctor soon for treatment options.";
  } else {
    category = "Hypertensive Crisis";
    color = "#dc2626";
    advice = "⚠️ Seek immediate medical attention!";
  }

  // Add to history
  bpReadings.unshift({
    systolic,
    diastolic,
    pulse,
    category,
    color,
    timestamp: new Date().toLocaleString()
  });

  if (bpReadings.length > 5) bpReadings.pop();

  result.innerHTML = `
    <div style="padding: 20px; background: linear-gradient(135deg, ${color}15, ${color}05); border-radius: 12px; border-left: 4px solid ${color};">
      <div style="margin-bottom: 16px;">
        <div style="font-size: 14px; color: var(--text-muted); margin-bottom: 8px;">Latest Reading</div>
        <div style="display: flex; gap: 16px; align-items: center;">
          <div>
            <div style="font-size: 32px; font-weight: 700; color: ${color};">${systolic}/${diastolic}</div>
            <div style="font-size: 13px; color: var(--text-muted);">mmHg</div>
          </div>
          <div style="padding: 12px; background: white; border-radius: 8px;">
            <div style="font-size: 24px; font-weight: 600; color: #06b6d4;">${pulse}</div>
            <div style="font-size: 12px; color: var(--text-muted);">bpm</div>
          </div>
        </div>
      </div>
      <div style="padding: 12px; background: white; border-radius: 8px; margin-bottom: 8px;">
        <div style="font-weight: 600; color: ${color}; margin-bottom: 4px;">${category}</div>
        <div style="font-size: 13px; color: var(--text-muted);">${advice}</div>
      </div>
    </div>
  `;

  renderBPHistory();
};

function renderBPHistory() {
  const history = document.getElementById("bpHistory");
  
  if (bpReadings.length === 0) return;

  let html = `
    <div style="padding: 16px; background: var(--bg-main); border-radius: 12px;">
      <h4 style="margin-bottom: 12px; font-size: 15px;">Recent Readings</h4>
  `;

  bpReadings.forEach((reading, index) => {
    html += `
      <div style="padding: 12px; background: white; border-radius: 8px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-weight: 600; color: ${reading.color};">${reading.systolic}/${reading.diastolic}</div>
          <div style="font-size: 12px; color: var(--text-muted);">${reading.timestamp}</div>
        </div>
        <div style="font-size: 13px; padding: 4px 12px; background: ${reading.color}15; color: ${reading.color}; border-radius: 6px;">
          ${reading.category}
        </div>
      </div>
    `;
  });

  html += `</div>`;
  history.innerHTML = html;
}