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