const upperCaseinput = document.getElementById("upperCase");
const lowerCaseinput = document.getElementById("lowerCase");
const incNumbers = document.getElementById("incNumbers");
const incSymbols = document.getElementById("incSymbols");
const rangeValue = document.getElementById("rangeValue");
const randompass = document.querySelector(".randompass");
const myRange = document.getElementById("myRange");
const generaBtn = document.querySelector(".Generate");
const passLevel = document.getElementById("passlevel");

const faCopy = document.querySelector(".fa-copy");

faCopy.addEventListener("click", () => {
  const textaArea = document.createElement("textarea");
  const password = randompass.innerText;

  if (!password) {
    return;
  }

  textaArea.value = password;
  document.body.appendChild(textaArea);
  textaArea.select();
  document.execCommand("copy");
  textaArea.remove();
  const notyf = new Notyf();
  notyf.success({
    message: `Copy ${password}`,
    duration: 1500,

    position: {
      x: "center",
      y: "top",
    },
  });
});

const randomFunc = {
  lower: getrandomLower,
  upper: getrandomUpper,
  number: getRandomNumber,
  symbols: getSymbol,
};

function getrandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getrandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

generaBtn.addEventListener("click", () => {
  faCopy.style.display = "flex";
  const length = +myRange.value;
  const hasLower = lowerCaseinput.checked;
  const hasUpper = upperCaseinput.checked;
  const hasNumber = incNumbers.checked;
  const hasSymbols = incSymbols.checked;

  randompass.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbols,
    length
  );
});

function generatePassword(lower, upper, number, symbols, length) {
  let generatePass = "";

  const typesCount = lower + upper + number + symbols;
  const typesArr = [{ lower }, { upper }, { number }, { symbols }].filter(
    (type) => Object.values(type)[0]
  );

  if (typesCount === 0) {
    randompass.innerText = "Verify a condition!";
    randompass.style.color = "red";
    faCopy.style.display = "none";
    setTimeout(() => {
      randompass.innerText = "P4$5W0rD!";
      randompass.style.color = "#a4ffaf";
    }, 1500);
    return randompass.textContent;
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatePass += randomFunc[funcName]();
    });
  }
  const finalPass = generatePass.slice(0, length);

  return finalPass;
}

function updateValue() {
  var range = document.getElementById("myRange");
  var value = range.value;
  document.getElementById("rangeValue").innerText = value;

  const li1 = document.querySelector(".levelInput ul li:nth-child(1)");
  const li2 = document.querySelector(".levelInput ul li:nth-child(2)");
  const li3 = document.querySelector(".levelInput ul li:nth-child(3)");
  const li4 = document.querySelector(".levelInput ul li:nth-child(4)");
  console.log(li4);

  if (value < 5) {
    li1.style.backgroundColor = "#8ccb35";
    li2.style.backgroundColor = "";
    li3.style.backgroundColor = "";
    li4.style.backgroundColor = "";
  } else if (value >= 5 && value < 15) {
    li1.style.backgroundColor = "#e1a91a";
    li2.style.backgroundColor = "#e1a91a";
    li3.style.backgroundColor = "";
    li4.style.backgroundColor = "";
  } else if (value > 16) {
    li1.style.backgroundColor = "red";
    li2.style.backgroundColor = "red";
    li3.style.backgroundColor = "red";
    li4.style.backgroundColor = "red";
  } else if (value >= 15) {
    li1.style.backgroundColor = "red";
    li2.style.backgroundColor = "red";
    li3.style.backgroundColor = "red";
  }
}

document.getElementById("myRange").addEventListener("input", updateValue);

const range = document.getElementById("myRange");

range.addEventListener("input", () => {
  if ("vibrate" in navigator) {
    navigator.vibrate(50);
  }
});
