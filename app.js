const operands = document.querySelectorAll('.operands');
const topOperators = document.querySelectorAll('.top-operators');
const sideOperators = document.querySelectorAll('.side-operators');
const allClear = document.getElementById('allClear');
const output = document.getElementById('output');
const display = document.getElementById('display');
let isFirstNum;
let expression = [];

class Calculator {
    prevNum = '';
    operation = '';

    constructor(currentNum) {
        this.currentNum = currentNum;
        this.clearScreen();
    }

    extraOperations(operation) {
        switch(operation) {
            case 'c':
                this.clearScreen();
                break;
            case 'backspace':
                if (this.currentNum.innerText === '0' || this.currentNum.innerText.length === 0) this.currentNum.innerText = '0', isFirstNum = true
                else {this.currentNum.innerText = this.currentNum.innerText.slice(0, -1)};
                break;
            case '%':
                this.simpleNumMethods('percentage');
                break;
        }
    }

    simpleNumMethods(operation) {
        switch (operation) {
            case 'allClear':
                this.clearScreen();
                break;

            case 'negateNum':
                if(this.currentNum.innerText === '0') return;
                this.currentNum.innerText = parseFloat(-this.currentNum.innerText);
                this.prevNum = this.currentNum.innerText;
                break;

            case 'percentage':
                if(this.currentNum.innerText === '0') return;
                let current = new Decimal(this.currentNum.innerText);
                this.currentNum.innerText = current.dividedBy(100);
                this.prevNum = this.currentNum.innerText;
                break;
        }
    }

    chooseOperation(operation) {
        isFirstNum = true;
        if (expression.length === 2) { this.compute() };
        this.prevNum = this.currentNum.innerText;
        this.operation = operation;
    }
    
    compute() {
        let sum;
        let prev = new Decimal(expression[0]);
        let current = new Decimal(this.currentNum.innerText);

        switch(this.operation) {
            case 'divide':
                sum = prev.dividedBy(current);
                break;
            case 'multiply':
                sum = prev.times(current);
                break;
            case 'minus':
                sum = prev.minus(current);
                break;
            case 'addition':
                sum = prev.plus(current);
                break;
        }
        this.currentNum.innerText = sum;
        this.prevNum = '';
        expression = [];
    }

    clearScreen() {
        this.currentNum.innerText = '0';
        allClear.textContent = 'AC';
        this.prevNum = '';
        isFirstNum = true;
        expression = [];
        output.style.fontSize = '2.8rem';
    }

    displayNum(inputtedNum, isFirstNum) {
        if (this.currentNum.innerText.includes('.') && inputtedNum === '.' && !isFirstNum) return;
        isFirstNum && inputtedNum != '.' ?  this.currentNum.innerText = inputtedNum : this.currentNum.innerText += inputtedNum;
        if (isFirstNum && inputtedNum === '.') {this.currentNum.innerText = '0.'}
        if (this.operation !== '' && this.prevNum !== '') expression.push(this.prevNum, this.operation), this.prevNum = '', output.style.fontSize = '2.8rem';
        if (expression.includes('equals')) expression = [];
        if (output.clientWidth === 213) output.style.fontSize = `calc(${2.2 / (output.textContent.length / 10)}rem)`;
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

document.addEventListener('keydown', e => {
    const inputtedKey = e.key;
    const validKeys = ['1','2','3','4','5','6','7','8','9','0', '.'];
    const operationKeys = ['addition', 'minus', 'divide', 'multiply', 'equals', 'equals'];
    const operations = ['+', '-', '/', '*', '=', 'Enter'];
    const extraOperations = ['c', 'backspace', '%'];
    const operationIndex = operations.indexOf(inputtedKey);

    if (validKeys.includes(inputtedKey)) {
        allClear.textContent = 'C';
        calc.displayNum(inputtedKey, isFirstNum);
        output.textContent != '0' ?  isFirstNum = false : false;
    }
    else if (operationIndex !== -1) {calc.chooseOperation(operationKeys[operationIndex])}
    else if (extraOperations.includes(inputtedKey.toLowerCase())) calc.extraOperations(inputtedKey.toLowerCase());
});