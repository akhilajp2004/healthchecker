// ==========================
// RISK MODULE LOGIC (Premium Version)
// ==========================

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("riskForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            calculateRisk();
        });
    }
});

function calculateRisk() {

    let age = parseInt(document.getElementById("age").value);
    let height = parseFloat(document.getElementById("height").value);
    let weight = parseFloat(document.getElementById("weight").value);
    let sleep = parseInt(document.getElementById("sleep").value);
    let medPattern = document.getElementById("medPattern").value;

    let bmi = weight / (height * height);
    let riskPoints = 0;
    let bmiCategory = "";

    // ===== BMI Classification (WHO)
    if (bmi < 18.5) bmiCategory = "Underweight";
    else if (bmi < 25) bmiCategory = "Normal";
    else if (bmi < 30) {
        bmiCategory = "Overweight";
        riskPoints += 1;
    }
    else {
        bmiCategory = "Obese";
        riskPoints += 2;
    }

    // ===== Sleep (General Medicine Guideline: 7–9 hrs ideal)
    if (sleep < 5) riskPoints += 2;
    else if (sleep < 7) riskPoints += 1;

    // ===== Medication Adherence
    const medLabels = {
        ontime: "On time",
        late1: "1–2 hours late",
        late3: "3+ hours late",
        missed: "Frequently missed"
    };

    if (medPattern === "late1") riskPoints += 1;
    if (medPattern === "late3") riskPoints += 2;
    if (medPattern === "missed") riskPoints += 3;

    // ===== Age Risk
    if (age > 60) riskPoints += 2;
    else if (age > 45) riskPoints += 1;

    // ===== Final Classification
    let riskLevel;
    let badgeClass;

    if (riskPoints <= 2) {
        riskLevel = "Low Risk";
        badgeClass = "low";
    }
    else if (riskPoints <= 5) {
        riskLevel = "Moderate Risk";
        badgeClass = "medium";
    }
    else {
        riskLevel = "High Risk";
        badgeClass = "high";
    }

    // ===== Display Results (Cleaner UI)
    document.getElementById("bmiResult").innerText =
        `${bmi.toFixed(2)} (${bmiCategory})`;

    document.getElementById("sleepResult").innerText =
        `${sleep} hours/day`;

    document.getElementById("medResult").innerText =
        medLabels[medPattern];

    document.getElementById("riskResult").innerHTML =
        `<span class="risk-badge ${badgeClass}">${riskLevel}</span>`;

    const resultCard = document.getElementById("resultCard");
    resultCard.style.display = "block";

    // Smooth scroll to results
    resultCard.scrollIntoView({ behavior: "smooth" });

    // Save to Dashboard
    localStorage.setItem("risk", riskLevel);
}

// ==========================
// HABIT TRACKER (Advanced)
// ==========================

function calculateHabit() {

    const habits = [
        "sleep",
        "exercise",
        "water",
        "steps",
        "sunlight",
        "meditation",
        "reading",
        "gratitude",
        "digital"
    ];

    let total = habits.length;
    let done = 0;

    habits.forEach(id => {
        if (document.getElementById(id).checked) done++;
    });

    let baseScore = Math.round((done / total) * 80); // 80% from habits

    // Mood & Energy contribution (20%)
    let mood = parseInt(document.getElementById("mood").value) || 0;
    let energy = parseInt(document.getElementById("energy").value) || 0;

    let wellbeingScore = Math.round(((mood + energy) / 20) * 20);

    let finalScore = baseScore + wellbeingScore;

    if (finalScore > 100) finalScore = 100;

    document.getElementById("progressBar").style.width = finalScore + "%";
    document.getElementById("habitResult").innerText =
        finalScore + "% Lifestyle Score";

    localStorage.setItem("habitToday", finalScore);

    updateStreak(finalScore);
    updateWeekly(finalScore);
}
// ==========================
// STREAK SYSTEM
// ==========================

function updateStreak(percentage) {

    let streak = parseInt(localStorage.getItem("habitStreak")) || 0;
    let lastDate = localStorage.getItem("lastHabitDate");

    let today = new Date().toDateString();

    if (percentage === 100) {
        if (lastDate !== today) {
            streak++;
            localStorage.setItem("habitStreak", streak);
            localStorage.setItem("lastHabitDate", today);
        }
    }

    document.getElementById("streakCount").innerText = streak + " Days";
}

// ==========================
// WEEKLY TRACKING
// ==========================

function updateWeekly(percentage) {

    let weekData = JSON.parse(localStorage.getItem("weeklyHabits")) || [];

    let today = new Date().toDateString();

    if (!weekData.find(d => d.date === today)) {
        weekData.push({ date: today, score: percentage });
    }

    if (weekData.length > 7) weekData.shift();

    localStorage.setItem("weeklyHabits", JSON.stringify(weekData));

    let completedDays = weekData.filter(d => d.score === 100).length;

    document.getElementById("weeklyProgress").innerText =
        completedDays + " / 7 Days";
}

// ==========================
// RESET
// ==========================

function resetHabits() {
    localStorage.removeItem("habitToday");
    localStorage.removeItem("habitStreak");
    localStorage.removeItem("weeklyHabits");
    localStorage.removeItem("lastHabitDate");
    location.reload();
}
// ==========================
// DIET MODULE (Premium)
// ==========================

document.addEventListener("DOMContentLoaded", function () {
    const dietForm = document.getElementById("dietForm");
    if (dietForm) {
        dietForm.addEventListener("submit", function (e) {
            e.preventDefault();
            calculateDiet();
        });
    }
});

function calculateDiet() {

    let vegetables = parseInt(document.getElementById("vegetables").value);
    let fruits = parseInt(document.getElementById("fruits").value);
    let water = parseFloat(document.getElementById("waterIntake").value);
    let junk = parseInt(document.getElementById("junk").value);
    let sugar = document.getElementById("sugar").value;

    let score = 10;

    // General nutrition guidelines
    if ((vegetables + fruits) < 5) score -= 2;
    if (water < 2) score -= 1;

    if (junk > 3) score -= 2;
    else if (junk > 1) score -= 1;

    if (sugar === "moderate") score -= 1;
    if (sugar === "high") score -= 2;

    if (score < 0) score = 0;

    let quality;
    let badgeClass;

    if (score >= 8) {
        quality = "Excellent Diet Quality";
        badgeClass = "low";
    }
    else if (score >= 5) {
        quality = "Moderate Diet Quality";
        badgeClass = "medium";
    }
    else {
        quality = "Poor Diet Quality";
        badgeClass = "high";
    }

    document.getElementById("dietScore").innerHTML =
        `<span class="risk-badge ${badgeClass}">${score}/10</span>`;

    document.getElementById("dietFeedback").innerText =
        quality + ". Improve hydration and reduce processed food intake.";

    document.getElementById("dietResultCard").style.display = "block";

    document.getElementById("dietResultCard").scrollIntoView({
        behavior: "smooth"
    });

    localStorage.setItem("diet", score);
}