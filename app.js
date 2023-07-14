const operands = document.querySelectorAll('.operands');
const topOperators = document.querySelectorAll('.top-operators');
const sideOperators = document.querySelectorAll('.side-operators');
const allClear = document.getElementById('allClear');
const output = document.getElementById('output');
let isFirstNum;

class Calculator {
    prevNum = '';

    constructor(currentNum) {
        this.currentNum = currentNum;
        this.clearScreen();
        console.log(this)
    }

    simpleNumMethods(operation) {
        switch (operation) {
            case 'allClear':
                this.clearScreen();
                break;

            case 'negateNum':
                if(this.currentNum.innerText === '0') return;
                this.currentNum.innerText = parseFloat(-this.currentNum.innerText);
                break;

            case 'percentage':
                this.currentNum = this.currentNum.innerText / 100;
                break;
        }
    }

    chooseOperation(operation) {
        isFirstNum = true;
        this.prevNum = this.currentNum.innerText;
        console.log(this, operation);
        this.currentNum
    }
    
    compute(operation) {

    }

    clearScreen() {
        this.currentNum.innerText = '0';
        allClear.textContent = 'AC';
        isFirstNum = true;
    }

    displayNum(inputtedNum, isFirstNum) {
        if (this.currentNum.innerText.includes('.') && inputtedNum === '.') return;
        if (isFirstNum && inputtedNum != '.') { this.currentNum.innerText = inputtedNum; }
        else {this.currentNum.innerText += inputtedNum; };
        console.log(this);
    }
}

calc = new Calculator(output);

operands.forEach((num) => {
    num.addEventListener('click', e => {
        allClear.textContent = 'C';
        calc.displayNum(e.target.textContent, isFirstNum);
        if (output.textContent != '0') isFirstNum = false;
    });
});

topOperators.forEach((topOperator) => {
    topOperator.addEventListener('click', e => {
        calc.simpleNumMethods(e.target.id);
    });
});

sideOperators.forEach((sideOperator) => {
    sideOperator.addEventListener('click', e => {
        calc.chooseOperation(e.target.id);
    });
});