const lengthRange = document.getElementById("lengthRange");
const lengthValue = document.getElementById("lengthValue");
const generateBtn = document.querySelector(".generate-btn");
const stateEl = document.querySelector(".state");
const copiedEl = document.querySelector(".copied");
const copyBtn = document.querySelector(".copy-btn");
const options = {
  uppercase: document.getElementById("uppercase"),
  lowercase: document.getElementById("lowercase"),
  numbers: document.getElementById("numbers"),
  symbols: document.getElementById("symbols"),
};

const states = ["TOO WEAK!", "WEAK", "MEDIUM", "STRONG"];

// Initialize length value on page load
lengthValue.textContent = lengthRange.value;

// add event listeners to options to update strength on change
Object.values(options).forEach((value) => {
  value.addEventListener("input", setStrength);
});

// update number when slider moves
lengthRange.addEventListener("input", () => {
  lengthValue.textContent = lengthRange.value;
  setStrength();
});

generateBtn.addEventListener("click", () => {
  const strength = setStrength();
  if (strength === -1) {
    return;
  } else {
    const password = generatePassword();
    setPasswordDisplay(password);
  }
});

// calculate strength based on options
function calculateStrength() {
  const optionsCount =
    Number(options.uppercase.checked) +
    Number(options.lowercase.checked) +
    Number(options.numbers.checked) +
    Number(options.symbols.checked);
  console.log(optionsCount);
  if (optionsCount === 0) {
    return -1; // No options selected
  } else if (optionsCount === 1 || lengthRange.value < 6) {
    return 0; // TOO WEAK
  } else if (optionsCount === 2 || lengthRange.value < 8) {
    return 1; // WEEK
  } else if (optionsCount === 3 || lengthRange.value < 12) {
    return 2; // MEDIUM
  } else {
    return 3; // STRONG
  }
}

// read options anytime you need them
function getOptions() {
  return {
    length: Number(lengthRange.value),
    uppercase: options.uppercase.checked,
    lowercase: options.lowercase.checked,
    numbers: options.numbers.checked,
    symbols: options.symbols.checked,
  };
}

function generatePassword() {
  const opts = getOptions();
  let charset = "";
  if (opts.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (opts.lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
  if (opts.numbers) charset += "0123456789";
  if (opts.symbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  let password = "";
  for (let i = 0; i < opts.length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

copyBtn.addEventListener("click", () => {
  const password = document.querySelector(".password").textContent;
  copyToClipboard(password);
});

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    () => {
      setCopiedDisplay(true);
      setTimeout(() => {
        setCopiedDisplay(false);
      }, 2000);
    },
    (err) => {
      alert("Failed to copy password: ", err);
    }
  );
}

function setPasswordDisplay(password) {
  const passwordDisplay = document.querySelector(".password");
  passwordDisplay.textContent = password;
  passwordDisplay.style.color = "white";
}

function setCopiedDisplay(set) {
  if (set) {
    copiedEl.innerHTML = "COPIED";
  } else {
    copiedEl.innerHTML = "";
  }
}
// set strength display
function setStrength() {
  const strength = calculateStrength();
  if (strength === -1) {
    alert("Please select at least one option");
    return -1;
  } else {
    updateStrengthState(strength);
    updateStrengthBars(strength);
    return strength;
  }
}
// update strength functions
function updateStrengthState(strength) {
  stateEl.textContent = states[strength];
}
function updateStrengthBars(strength) {
  const bars = document.querySelector(".bars");
  bars.className = `bars state${strength}`;
}
