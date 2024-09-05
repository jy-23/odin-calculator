// create needed variables
let firstNum = undefined;
let secondNum = undefined;
let operator = undefined;
let prevButton = undefined;

// store html values into variables
displayValue = document.querySelector("#display");
const numButtons = document.querySelectorAll(".num-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const clearButton = document.querySelector("#clear-button");
const deleteButton = document.querySelector("#delete-button");
const equalButton = document.querySelector("#equal-button");
const decimalButton = document.querySelector("#decimal-button");

currOperatorButton = undefined;
newNumStart = true;

// basic math functions
function add(num1,num2) {
    return num1 + num2;
}

function subtract(num1,num2) {
    return num1 - num2;
}

function multiply(num1,num2) {
    return num1*num2;
}

function divide(num1,num2) {
    if (num2 === 0) {
        return "ERROR";
    }
    else return num1 / num2;
}

function operate(operator,num1,num2) {
    if (operator === "+") return add(num1,num2);
    else if (operator === "-") return subtract(num1,num2);
    else if (operator === "*") return multiply(num1,num2);
    else if (operator === "/") return divide(num1,num2);
}

// num clicked on is displayed
numButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        // if enter new num after initial calc, reset all values
        if (prevButton === "equal-button") {
            clear();
            displayValue.textContent = "";
        }
        if (newNumStart) {
            displayValue.textContent = "";
            newNumStart = false;
        }
        // make sure number is no more than 14 digits
        if (displayValue.textContent.length < 13) {
            displayValue.textContent += event.target.textContent;
        }
        
        prevButton = button.getAttribute("class");
    });
});

// operator clicked on is stored in operator variable
operatorButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        // second operator button
        if (displayValue.textContent !== "" && displayValue.textContent !== "ERROR") {
            if (firstNum !== undefined && prevButton === "num-button") {
                secondNum = parseInt(displayValue.textContent);
                calculate();
            }
            else {
                firstNum = parseInt(displayValue.textContent);
            }
            newNumStart = true;
            operator = button.value;
        }
        prevButton = button.getAttribute("class");
    });
});

equalButton.addEventListener("click", (event) => {
    // if first num is not pressed, do nothing
    // if second num is not pressed, second num = first num
    // if operator not pressed, do previous operation
    if (firstNum === undefined) return;
    else if (prevButton === "operator-button") {
        secondNum = firstNum;
    }
    else if (prevButton === "equal-button") {}
    else if (displayValue.textContent !== "" && displayValue.textContent !== "ERROR") {
        secondNum = parseInt(displayValue.textContent);
    }
    calculate();
    newNumStart = true;
    prevButton = equalButton.getAttribute("id");
});

// eventListener for clear button
clearButton.addEventListener("click", (event) => {
    clear();
    displayValue.textContent = "";
    //deSelectOperatorButton();
});

function calculate() {    
    firstNum = operate(operator, firstNum, secondNum);
    answerString = firstNum.toString();
    
    if (answerString.length > 13) {
        if (firstNum <= 9999999999999 && firstNum >= 0.000006) {
            firstNum = parseFloat(answerString.slice(0,13));
        }
        else {
            firstNum = firstNum.toExponential(8);
        }
    }
    displayValue.textContent = firstNum;
    if (firstNum === "ERROR") {
        clear();
    }
}

function clear() {
    firstNum = undefined;
    secondNum = undefined;
    operator = undefined;
    currOperatorButton = undefined;
    newNumStart = true;
    prevButton = undefined;
}