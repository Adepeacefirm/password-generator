const slider = document.querySelector(".progress-range");

slider.addEventListener("input", function () {
  const value = this.value;
  const min = this.min;
  const max = this.max;
  const percentage = ((value - min) / (max - min)) * 100;

  this.style.background = `linear-gradient(to right, #1beb33ff ${percentage}%, #ddd ${percentage}%)`;
});

const copyBtn = document.getElementById("copy-btn");
const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("length-value");
const passwordInput = document.getElementById("password");
const generateBtn = document.getElementById("generate-btn");
const copied = document.querySelector(".copied");

function generatePassword() {
  const length = lengthInput.value;
  const includeUppercase = document.getElementById("uppercase").checked;
  const includeLowercase = document.getElementById("lowercase").checked;
  const includeNumbers = document.getElementById("numbers").checked;
  const includeSymbols = document.getElementById("symbols").checked;

  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}<>?/";

  let chars = "";
  if (includeUppercase) chars += uppercase;
  if (includeLowercase) chars += lowercase;
  if (includeNumbers) chars += numbers;
  if (includeSymbols) chars += symbols;

  if (chars === "") {
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  passwordInput.value = password;

  updateStrength(
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols
  );
}

function updateStrength(length, upper, lower, num, sym) {
  const bars = document.querySelectorAll(".bar");
  bars.forEach((bar) => bar.classList.remove("filled"));

  let score = 0;
  if (upper) score++;
  if (lower) score++;
  if (num) score++;
  if (sym) score++;
  if (length > 12) score++;

  const strengthText = document.getElementById("strength-text");

  if (score <= 2) {
    strengthText.textContent = "WEAK";
    for (let i = 0; i < 1; i++) bars[i].classList.add("filled");
  } else if (score === 3) {
    strengthText.textContent = "MEDIUM";
    for (let i = 0; i < 3; i++) bars[i].classList.add("filled");
  } else {
    strengthText.textContent = "STRONG";
    bars.forEach((bar) => bar.classList.add("filled"));
  }
}

lengthInput.addEventListener("input", () => {
  lengthValue.textContent = lengthInput.value;
});

// Generate initial password
generatePassword();

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", () => {
  if (passwordInput.value) {
    navigator.clipboard.writeText(passwordInput.value);
    copied.style.display = "block";
    setTimeout(() => {
      copied.style.display = "none";
    }, 1000);
  }
});
