// ========== Microphone & Camera Access ==========
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
    statusEl.innerText =
      "Microphone and camera are active. Please keep this page open.";
  } catch (err) {
    statusEl.innerText = "Permission denied or error: " + err.message;
  }
}

// ========== Age Calculator ==========
function calculateAge() {
  const dobInput = document.getElementById("dob").value;
  if (!dobInput) {
    document.getElementById("ageResult").innerText =
      "Please select your date of birth.";
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
  const rate =
    parseFloat(document.getElementById("interestRate").value) / 100 / 12;
  const years = parseInt(document.getElementById("loanTerm").value, 10);
  const payments = years * 12;

  const x = Math.pow(1 + rate, payments);
  const monthly = (amount * x * rate) / (x - 1);

  if (!isNaN(monthly) && isFinite(monthly)) {
    document.getElementById(
      "loanResult"
    ).innerText = `Monthly Payment: ₹${monthly.toFixed(2)}`;
  } else {
    document.getElementById("loanResult").innerText =
      "Please enter valid numbers.";
  }
}

// ========== BMI Calculator ==========
function calculateBMI() {
  const weight = parseFloat(document.getElementById("weight").value);
  const heightCm = parseFloat(document.getElementById("height").value);

  if (!weight || !heightCm) {
    document.getElementById("bmiResult").innerText =
      "Please enter weight and height.";
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);
  document.getElementById(
    "bmiResult"
  ).innerText = `Your BMI is: ${bmi.toFixed(2)}`;
}

// ========== Currency Converter (USD → INR) ==========
function convertCurrency() {
  const usd = parseFloat(document.getElementById("usdAmount").value);
  const inrRate = 83; // example fixed rate
  if (!usd && usd !== 0) {
    document.getElementById("currencyResult").innerText =
      "Enter an amount in USD.";
    return;
  }
  const inr = usd * inrRate;
  document.getElementById(
    "currencyResult"
  ).innerText = `$${usd} = ₹${inr.toFixed(2)}`;
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
}

// ========== Dark Mode ==========
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// ========== Translator ==========
async function translateText() {
  const text = document.getElementById("textToTranslate").value;
  const lang = document.getElementById("targetLang").value;

  if (!text || !lang) {
    document.getElementById("translatedText").innerText =
      "Enter text and target language code.";
    return;
  }

  try {
    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: lang,
        format: "text"
      })
    });

    const data = await res.json();
    document.getElementById(
      "translatedText"
    ).innerText = `Translated: ${data.translatedText}`;
  } catch (error) {
    document.getElementById("translatedText").innerText =
      "Translation failed.";
  }
}

// ========== Recipe Generator (simple text) ==========
function getRecipe() {
  const ingredients = document.getElementById("ingredients").value;
  if (!ingredients) {
    document.getElementById("recipeResult").innerText =
      "Enter some ingredients first.";
    return;
  }

  const fakeRecipe = `Based on: ${ingredients}
Try making a simple stir fry! Sauté your ingredients with garlic, soy sauce, and a dash of oil.`;
  document.getElementById("recipeResult").innerText = fakeRecipe;
}

// ========== Resume Builder with PDF Download ==========
let resumeData = {};

function generateResume() {
  const name = document.getElementById("resName").value.trim();
  const email = document.getElementById("resEmail").value.trim();
  const phone = document.getElementById("resPhone").value.trim();
  const title = document.getElementById("resTitle").value.trim();
  const skills = document.getElementById("resSkills").value.trim();
  const summary = document.getElementById("resSummary").value.trim();
  const experience = document.getElementById("resExperience").value.trim();
  const education = document.getElementById("resEducation").value.trim();
  const photoFile = document.getElementById("resumePhoto").files[0];

  // Store data for PDF download
  resumeData = {
    name,
    email,
    phone,
    title,
    skills,
    summary,
    experience,
    education,
    photo: null
  };

  // Convert photo to base64 if uploaded
  if (photoFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      resumeData.photo = e.target.result;
      displayResumePreview();
    };
    reader.readAsDataURL(photoFile);
  } else {
    displayResumePreview();
  }
}

function displayResumePreview() {
  const {
    name,
    email,
    phone,
    title,
    skills,
    summary,
    experience,
    education,
    photo
  } = resumeData;

  let html = `
    <div style="font-family: Georgia, serif; line-height: 1.6;">
      <div style="display: flex; gap: 20px; margin-bottom: 20px; border-bottom: 2px solid #6200ea; padding-bottom: 15px;">
        ${
          photo
            ? `<img src="${photo}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">`
            : ""
        }
        <div>
          <h2 style="margin: 0; color: #6200ea;">${name}</h2>
          <p style="margin: 5px 0; font-size: 14px; color: #666;">${title}</p>
          <p style="margin: 5px 0; font-size: 12px; color: #999;">${email} | ${phone}</p>
        </div>
      </div>
  `;

  if (summary) {
    html += `
      <div style="margin-bottom: 15px;">
        <h3 style="color: #6200ea; border-bottom: 1px solid #6200ea; padding-bottom: 5px;">Professional Summary</h3>
        <p style="font-size: 13px;">${summary}</p>
      </div>
    `;
  }

  if (skills) {
    html += `
      <div style="margin-bottom: 15px;">
        <h3 style="color: #6200ea; border-bottom: 1px solid #6200ea; padding-bottom: 5px;">Skills</h3>
        <p style="font-size: 13px;">${skills.split(",").map(s => `<span style="background: #f0f0f0; padding: 3px 8px; border-radius: 3px; margin-right: 5px; display: inline-block;">${s.trim()}</span>`).join("")}</p>
      </div>
    `;
  }

  if (experience) {
    html += `
      <div style="margin-bottom: 15px;">
        <h3 style="color: #6200ea; border-bottom: 1px solid #6200ea; padding-bottom: 5px;">Experience</h3>
        <pre style="font-family: Arial; font-size: 12px; white-space: pre-wrap; word-wrap: break-word;">${experience}</pre>
      </div>
    `;
  }

  if (education) {
    html += `
      <div style="margin-bottom: 15px;">
        <h3 style="color: #6200ea; border-bottom: 1px solid #6200ea; padding-bottom: 5px;">Education</h3>
        <pre style="font-family: Arial; font-size: 12px; white-space: pre-wrap; word-wrap: break-word;">${education}</pre>
      </div>
    `;
  }

  html += "</div>";

  document.getElementById("resumePreview").innerHTML = html;
}

function downloadResumePDF() {
  const { name, email, phone, title, skills, summary, experience, education, photo } = resumeData;

  if (!name) {
    alert("Please fill in at least your name.");
    return;
  }

  // Load jsPDF from CDN if not already loaded
  if (typeof jsPDF === "undefined") {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.onload = () => generatePDF();
    document.head.appendChild(script);
  } else {
    generatePDF();
  }

  function generatePDF() {
    const element = document.getElementById("resumePreview");
    const opt = {
      margin: 10,
      filename: `${name.replace(/\s+/g, "_")}_Resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: "portrait", unit: "mm", format: "a4" }
    };

    html2pdf().set(opt).from(element).save();
  }
}




