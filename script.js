
async function startMedia() {
    const statusEl = document.getElementById("mediaStatus");
    const videoEl = document.getElementById("mediaPreview");

    try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            statusEl.innerText = "Media access is not supported in this browser.";
            return;
        }

        statusEl.innerText = "Requesting microphone and camera access...";
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });

        videoEl.srcObject = stream;
        videoEl.style.display = "block";
        statusEl.innerText = "Microphone and camera are active. Please keep this page open.";
    } catch (err) {
        statusEl.innerText = "Permission denied or error: " + err.message;
    }
}

// ========== Age Calculator ==========
function calculateAge() {
    const dobInput = document.getElementById("dob").value;
    if (!dobInput) {
        document.getElementById("ageResult").innerText = "Please select your date of birth.";
        return;
    }

    const birthDate = new Date(dobInput);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    document.getElementById("ageResult").innerText = `You are ${age} years old.`;
}

// ========== Loan Calculator ==========
function calculateLoan() {
    const amount = parseFloat(document.getElementById("loanAmount").value);
    const rate = parseFloat(document.getElementById("interestRate").value) / 100 / 12;
    const years = parseInt(document.getElementById("loanTerm").value, 10);
    const payments = years * 12;

    const x = Math.pow(1 + rate, payments);
    const monthly = (amount * x * rate) / (x - 1);

    if (!isNaN(monthly) && isFinite(monthly)) {
        document.getElementById("loanResult").innerText =
            `Monthly Payment: ₹${monthly.toFixed(2)}`;
    } else {
        document.getElementById("loanResult").innerText = "Please enter valid numbers.";
    }
}

// ========== BMI Calculator ==========
function calculateBMI() {
    const weight = parseFloat(document.getElementById("weight").value);
    const heightCm = parseFloat(document.getElementById("height").value);

    if (!weight || !heightCm) {
        document.getElementById("bmiResult").innerText = "Please enter weight and height.";
        return;
    }

    const heightM = heightCm / 100;
    const bmi = weight / (heightM * heightM);
    document.getElementById("bmiResult").innerText = `Your BMI is: ${bmi.toFixed(2)}`;
}

// ========== Currency Converter (USD → INR) ==========
function convertCurrency() {
    const usd = parseFloat(document.getElementById("usdAmount").value);
    const inrRate = 83; // example fixed rate
    if (!usd && usd !== 0) {
        document.getElementById("currencyResult").innerText = "Enter an amount in USD.";
        return;
    }
    const inr = usd * inrRate;
    document.getElementById("currencyResult").innerText =
        `$${usd} = ₹${inr.toFixed(2)}`;
}

// ========== Quotes Generator ==========
const quotes = [
    "Don't watch the clock; do what it does. Keep going.",
    "The best way to predict the future is to create it.",
    "You miss 100% of the shots you don't take.",
    "Stay hungry, stay foolish.",
    "Do something today that your future self will thank you for."
];

function showQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById("quoteBox").innerText = quotes[randomIndex];


