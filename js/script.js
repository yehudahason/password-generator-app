const lengthRange = document.getElementById("lengthRange");
const lengthValue = document.getElementById("lengthValue");
const generateBtn = document.querySelector(".generate-btn");

generateBtn.addEventListener("click", () => {
  const options = getOptions();
  console.log(options);
});
const options = {
  uppercase: document.getElementById("uppercase"),
  lowercase: document.getElementById("lowercase"),
  numbers: document.getElementById("numbers"),
  symbols: document.getElementById("symbols"),
};

// update number when slider moves
lengthRange.addEventListener("input", () => {
  lengthValue.textContent = lengthRange.value;
});

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
