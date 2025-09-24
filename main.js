const display = document.getElementById('result')
const history = document.getElementById('hist')
document.getElementById('btn1').onclick = function(){add(btn1.textContent)}
document.getElementById('btn2').onclick = function(){add(btn2.textContent)}
document.getElementById('btn3').onclick = function(){add(btn3.textContent)}
document.getElementById('btn4').onclick = function(){add(btn4.textContent)}
document.getElementById('btn5').onclick = function(){add(btn5.textContent)}
document.getElementById('btn6').onclick = function(){add(btn6.textContent)}
document.getElementById('btn7').onclick = function(){add(btn7.textContent)}
document.getElementById('btn8').onclick = function(){add(btn8.textContent)}
document.getElementById('btn9').onclick = function(){add(btn9.textContent)}
document.getElementById('btn0').onclick = function(){add(btn0.textContent)}
document.getElementById('btnDot').onclick = function(){addD(btnDot.textContent)}
document.getElementById('btnResult').onclick = function(){complute()}
document.getElementById('btnLeft').onclick = function(){addS(btnLeft.textContent)}
document.getElementById('btnRight').onclick = function(){addS(btnRight.textContent)}
document.getElementById('btnPlus').onclick = function(){addP(btnPlus.textContent)}
document.getElementById('btnMinus').onclick = function(){addP(btnMinus.textContent)}
document.getElementById('btnBack').onclick = function(){back()}
document.getElementById('btnC').onclick = function(){deleteC()}
document.getElementById('btnDel').onclick = function(){addP(btnDel.textContent)}
document.getElementById('btnCom').onclick = function(){addP(btnCom.textContent)}

let compluteN = false

function add(value){
    if(display.textContent === 0){
        display.textContent = value
    }else display.textContent += value
}

function complute(){
    
    try{
        let pole = display.textContent
        let result = eval(pole);
    if(result !== result){
    throw new console.error("ошибка вычислений");
    }
    display.textContent = result
    compluteN = true
    history.textContent = "история: " + pole + " = " + result 
    }catch(e){
        alert("произошла ошибка, поле ввода было очищено")
        display.textContent = "0"
}
}

function deleteC(){
    display.textContent = 0
    complute--
    if(compluteN == false){
    history.textContent = "история: 0"
    }else compluteN = false
}

function back(){
    let size = display.textContent.length
    if(size !== 1){
        display.textContent = display.textContent.slice(0, length - 1)
    } else if(display.textContent !== 0){
        display.textContent = 0
    }
}

let open = 0

function addS(value){   
    if(value == ")"){
        if(open == 0){
            return;
        }
        open--
        display.textContent += value
    }

    if(value == "("){
        open++
        display.textContent += value
    }
}

function addP(value){
    let operator = display.textContent.slice(-1)
    if('+-*/'.includes(value) && '+-*/'.includes(operator)){
        display.textContent = display.textContent.slice(0, length - 1) + value
    }else display.textContent += value
}

function addD(value){
    let last = display.textContent.slice(-1)
    if('.'.includes(value) == '.'.includes(last)){
        console.log(last)
    }else display.textContent += value
}