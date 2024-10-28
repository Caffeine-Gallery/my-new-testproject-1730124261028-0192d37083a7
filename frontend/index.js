import { backend } from 'declarations/backend';

let firstNumber = '';
let secondNumber = '';
let currentOperation = null;
const display = document.getElementById('display');
const loader = document.getElementById('loader');

window.appendToDisplay = (value) => {
    if (currentOperation === null) {
        firstNumber += value;
        display.value = firstNumber;
    } else {
        secondNumber += value;
        display.value = secondNumber;
    }
};

window.setOperation = (operation) => {
    if (firstNumber !== '') {
        currentOperation = operation;
        display.value = '';
    }
};

window.clearDisplay = () => {
    firstNumber = '';
    secondNumber = '';
    currentOperation = null;
    display.value = '';
};

window.calculate = async () => {
    if (firstNumber !== '' && secondNumber !== '' && currentOperation !== null) {
        const num1 = parseFloat(firstNumber);
        const num2 = parseFloat(secondNumber);

        loader.style.display = 'block';

        try {
            let result;
            switch (currentOperation) {
                case '+':
                    result = await backend.add(num1, num2);
                    break;
                case '-':
                    result = await backend.subtract(num1, num2);
                    break;
                case '*':
                    result = await backend.multiply(num1, num2);
                    break;
                case '/':
                    result = await backend.divide(num1, num2);
                    break;
            }
            display.value = result.toString();
            firstNumber = result.toString();
            secondNumber = '';
            currentOperation = null;
        } catch (error) {
            display.value = 'Error';
        } finally {
            loader.style.display = 'none';
        }
    }
};
