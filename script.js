let operator = "";
let previousValue = "";
let currentValue = "";

window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  let clear = document.querySelector("#clear");
  let operators = document.querySelectorAll(".operator");
  let operand = document.querySelectorAll(".operand");
  let decimal = document.querySelector(".decimal");
  let equals = document.querySelector(".equal");

  let previousScreen = document.querySelector(".previous");
  let currentScreen = document.querySelector(".current");

  operand.forEach((number) =>
    number.addEventListener("click", function (e) {
      handleNumber(e.target.textContent);
      currentScreen.textContent = currentValue;
    })
  );

  operators.forEach((op) =>
    op.addEventListener("click", function (e) {
      handleOp(e.target.textContent);
      previousScreen.textContent = previousValue + " " + operator;
      currentScreen.textContent = currentValue;
    })
  );

  clear.addEventListener("click", function () {
    operator = "";
    previousValue = "";
    currentValue = "";
    previousScreen.textContent = currentValue;
    currentScreen.textContent = currentValue;
  });

  equals.addEventListener("click", function () {
    if (previousValue != "" && currentValue != "") {
      calculate();
      previousScreen.textContent = currentValue;
      currentScreen.textContent = "";
    }
  });

  decimal.addEventListener('click',function(){
    addDecimal();
  })
});

function handleNumber(num) {
  if (currentValue.length <= 5) {
    currentValue += num;
  }
}

function handleOp(op) {
  operator = op;
  previousValue = currentValue;
  currentValue = "";
}

function calculate() {
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);

  switch (operator) {
    case "+":
      currentValue = currentValue + previousValue;
      break;
    case "-":
      currentValue = currentValue - previousValue;
      break;
    case "*":
      currentValue = currentValue * previousValue;
      break;
    case "/":
      currentValue = previousValue / currentValue;
      break;
    default:
      break;
  }
  round(currentValue);
}

function round(num) {
  let newVal = Math.round((currentValue + Number.EPSILON) * 100) / 100;
  newVal = newVal.toFixed(5);
  currentValue = newVal;
}

function addDecimal(){
  if(!currentValue.includes('.')){
    currentValue=currentValue+".";
  }
}