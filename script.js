let screenNum = document.querySelector('.screenNum');
let screenOp = document.querySelector('.screenOp');
let numButtons = document.querySelectorAll('.numero');
let opButtons = document.querySelectorAll('.operando');
let equal = document.getElementById('equal');
let firstInput = "";
let secondInput = "";
let operand = "";
let dotted = false;
let result = "";
let clearAll = document.getElementById("clear-all-button");
let clearLast = document.getElementById("clear-last-button");

document.addEventListener("keydown", handleKeyboardInput);

function handleKeyboardInput(e){
    e.preventDefault()
    if(e.shiftKey){
        if(e.which == 55){
            return document.getElementById("divide").click();
        }else if(e.which == 171){
            return document.getElementById("times").click()
        }
    }else if(e.shiftKey == false && (e.which == 171 || e.which == 173)){
        if(e.which == 171){
            return document.getElementById("add").click();
        }else{
            return document.getElementById("subtract").click();
        }
    }else{
    let key = document.querySelector(`[data-key="${e.keyCode}"]`);//hasta aca seleccionamos el button
    return key.click(); //le hacemos click, lo que dispara el evento de abajo nashe
    }
}

//si apretamos enter sobre uno de los botones de numero hace el equal, pero tambien le concatena el numero al final

numButtons.forEach((button) => button.addEventListener("click", addNum));

function addNum(e){
        if(e.target.value=="." && dotted==false){
            screenNum.innerHTML += e.target.value;
            dotted = true;
        } else if(dotted == true && e.target.value == "."){
            return screenNum.innerHTML;
        } else{
            screenNum.innerHTML += e.target.value;
        }
}

opButtons.forEach((button) => button.addEventListener("click", addOp));

function addOp(e){
    if(firstInput != ""){
        secondInput = screenNum.innerHTML;
        if(operand == "/" && secondInput == 0){
            alert("ERROR YOU CANT DIVIDE BY 0");
            screenNum.innerHTML = "";
            screenOp.innerHTML = "";
            firstInput = "";
            secondInput = "";
            operand = "";
        }
        screenNum.innerHTML = Math.round(operate(firstInput, secondInput, operand) * 1000) / 1000;
        result = screenNum.innerHTML;
        secondInput = "";
        operand = "";
    }
    operand = e.target.value;
    firstInput = screenNum.innerHTML;
    dotted = false;
    screenOp.innerHTML = firstInput + operand;
    screenNum.innerHTML = "";
}

clearAll.addEventListener("click", clearAllF)

function clearAllF(){
    screenNum.innerHTML = "";
    screenOp.innerHTML = "";
    firstInput = "";
    secondInput = "";
    operand = "";
    dotted = false;
}

clearLast.addEventListener("click", clearLastF)

function clearLastF(){
    if(screenNum.innerHTML.charAt(screenNum.innerHTML.length - 1) == "." && result != screenNum.innerHTML){
    dotted = false;
    screenNum.innerHTML = screenNum.innerHTML.slice(0, -1);
    }else if(result != screenNum.innerHTML){
    screenNum.innerHTML = screenNum.innerHTML.slice(0, -1);
}else{
    return screenNum.innerHTML;
}
}

equal.addEventListener("click", handleEqual);

function handleEqual(){
    if(screenNum.innerHTML == "") return screenNum.innerHTML;
    secondInput = screenNum.innerHTML;
    if(operand == "/" && secondInput == 0){
        alert("ERROR YOU CANT DIVIDE BY 0");
        screenNum.innerHTML = "";
        screenOp.innerHTML = "";
        firstInput = "";
        secondInput = "";
        operand = "";
    }
    screenNum.innerHTML = Math.round(operate(firstInput, secondInput, operand) * 1000) / 1000
    screenOp.innerHTML = firstInput + operand + secondInput + "=";
    result = screenNum.innerHTML;
    firstInput = "";
    secondInput = "";
    operand = ""; 
}

function add(a, b){
    return a + b;
}
function subtract(a, b){
    return a - b;
}
function times(a, b){
    return (a * b);
}
function divide(a, b){
    return (a / b);
}
function operate(a, b, op){
    a = Number(a)
    b = Number(b)
    switch(op){
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return times(a, b);
        case '/':
            if(b === 0) return null
            else return divide(a, b);
        default:
            return null;    
    }
}