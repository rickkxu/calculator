let display = document.querySelector(".display");
let numBtns = document.querySelectorAll(".number");
let opBtns = document.querySelectorAll(".operation");
let equalsBtn = document.querySelector(".evaluation");
let decimalBtn = document.querySelector("#decimal");
let clearBtn = document.querySelector("#clear");
let plusMinusBtn = document.querySelector("#plusminus");
let percentBtn = document.querySelector("#percent");

let num1 = "";
let operation = undefined;
let num2 = "";

setDisplay("0");

numBtns.forEach(button => {
    button.onclick = () => {
        if (setCurrentNum("").length > 8){ 
            return;
        } else if (button.id == "0" && setCurrentNum("") == "0") {
            return;
        } else {
            setDisplay(setCurrentNum(button.id));
        }
    }
})

opBtns.forEach(button => {
    button.onclick = () => {
        if (num1 != "" && num2 != "") {
            setDisplay(evaluate(num1, operation, num2));
        }
        if (num1 != "") {
            operation = button.id;
        }
    }
})

equalsBtn.onclick = () => {
    if (num1 != "" && num2 != "") {
        setDisplay(evaluate(num1, operation, num2));
    }
}

decimalBtn.onclick = () => {
    if (setCurrentNum("") == "") {
        setDisplay(setCurrentNum("0."));
    } else if (!(setCurrentNum("").includes("."))) {
        setDisplay(setCurrentNum("."));
    }
}

clearBtn.onclick = () => {
    num1 = "";
    operation = undefined;
    num2 = "";
    setDisplay("0");
}

plusMinusBtn.onclick = () => {
    if (setCurrentNum("") == "") {
        return;
    } else if (setCurrentNum("") == num1) {
        num1 = (Number(num1) * (-1)).toString();
        setDisplay(num1);
    } else if (setCurrentNum("") == num2) {
        num2 = (Number(num2) * (-1)).toString();
        setDisplay(num2);
    }
}

percentBtn.onclick = () => {
    if (setCurrentNum("") == "") {
        return;
    } else if (setCurrentNum("") == num1) {
        num1 = (Number(num1) * (0.01)).toString();
        setDisplay(num1);
    } else if (setCurrentNum("") == num2) {
        num2 = (Number(num2) * (0.01)).toString();
        setDisplay(num2);
    }
}

function setCurrentNum(value) {
    if (operation == undefined) {
        num1 += value;
        return num1;
    } else {
        num2 += value;
        return num2;
    }
}

function setDisplay(value) {
    let textSize = 120;
    console.log(Number(value).toExponential(3));
    if (value.length > 9){
        display.textContent = Number(value).toExponential(3);
    } else if (value.length > 5){
        textSize = 120-((value.length-5)*10);
        display.style.fontSize = `${textSize}px`;
        display.textContent = value;
    } else {
        display.textContent = value;
    }
    
}

function evaluate(n1, op, n2) {
    if (op == "add") {
        num1 = (Number(n1) + Number(n2)).toString();
    } else if (op == "subtract") {
        num1 = (Number(n1) - Number(n2)).toString();
    } else if (op == "multiply") {
        num1 = (Number(n1) * Number(n2)).toString();
    } else {
        num1 = (Number(n1) / Number(n2)).toString();
    }
    operation = undefined;
    num2 = "";
    return num1;
}

