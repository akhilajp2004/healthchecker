// ==========================
// RISK MODULE LOGIC
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

    // ===== BMI Classification (WHO standard)
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

    // ===== Sleep Evaluation (General Medicine Reference)
    if (sleep < 5) riskPoints += 2;
    else if (sleep < 7) riskPoints += 1;

    // ===== Medication Adherence
    if (medPattern === "late1") riskPoints += 1;
    if (medPattern === "late3") riskPoints += 2;
    if (medPattern === "missed") riskPoints += 3;

    // ===== Age Risk Factor
    if (age > 45) riskPoints += 1;
    if (age > 60) riskPoints += 2;

    // ===== Final Classification
    let riskLevel;
    let riskColor;

    if (riskPoints <= 2) {
        riskLevel = "Low Risk";
        riskColor = "green";
    }
    else if (riskPoints <= 5) {
        riskLevel = "Moderate Risk";
        riskColor = "orange";
    }
    else {
        riskLevel = "High Risk";
        riskColor = "red";
    }

    // ===== Display Results
    document.getElementById("bmiResult").innerHTML =
        `BMI: ${bmi.toFixed(2)} (${bmiCategory})`;

    document.getElementById("sleepResult").innerHTML =
        `Sleep: ${sleep} hours/day`;

    document.getElementById("medResult").innerHTML =
        `Medication Adherence: ${medPattern}`;

    document.getElementById("riskResult").innerHTML =
        `Overall Risk Level: <strong style="color:${riskColor}">${riskLevel}</strong>`;

    document.getElementById("resultCard").style.display = "block";

    // Save to Dashboard
    localStorage.setItem("risk", riskLevel);
}



// ==========================
// Habit Tracker Function
// ==========================
function calculateHabit() {

    let total = 3;
    let done = 0;

    if (document.getElementById("sleep").checked) done++;
    if (document.getElementById("exercise").checked) done++;
    if (document.getElementById("water").checked) done++;

    let percentage = Math.round((done / total) * 100);

    // Update progress bar
    document.getElementById("progressBar").style.width = percentage + "%";

    let message = "";

    if (percentage === 100)
        message = "Excellent consistency! 🔥";
    else if (percentage >= 60)
        message = "Good job! Keep improving 💪";
    else
        message = "Try to complete more habits tomorrow 👍";

    document.getElementById("habitResult").innerText =
        percentage + "% - " + message;

    localStorage.setItem("habit", percentage);
}

// ==========================
// DIET MODULE LOGIC
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

    // Vegetable & fruit guidelines (≥5 combined servings ideal)
    if ((vegetables + fruits) < 5) score -= 2;

    // Water guideline (~2L/day)
    if (water < 2) score -= 1;

    // Junk frequency
    if (junk > 3) score -= 2;
    else if (junk > 1) score -= 1;

    // Sugar intake
    if (sugar === "moderate") score -= 1;
    if (sugar === "high") score -= 2;

    if (score < 0) score = 0;

    let quality;
    let color;

    if (score >= 8) {
        quality = "Excellent Diet Quality";
        color = "green";
    }
    else if (score >= 5) {
        quality = "Moderate Diet Quality";
        color = "orange";
    }
    else {
        quality = "Poor Diet Quality";
        color = "red";
    }

    document.getElementById("dietScore").innerHTML =
        `Diet Score: <strong style="color:${color}">${score}/10</strong>`;

    document.getElementById("dietFeedback").innerHTML =
        `${quality}. Consider improving hydration and reducing processed food intake.`;

    document.getElementById("dietResultCard").style.display = "block";

    // Save to dashboard
    localStorage.setItem("diet", score);
}