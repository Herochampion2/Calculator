const display = document.getElementById('result');

function appendNumber(num) {
    if (display.value === 'Error') {
        display.value = '';
    }
    
    // Prevent multiple dots in a single number
    if (num === '.') {
        let parts = display.value.split(/[\+\-\*\/\%]/);
        let lastPart = parts[parts.length - 1];
        if (lastPart.includes('.')) {
            return;
        }
    }
    
    display.value += num;
}

function appendOperator(op) {
    if (display.value === 'Error') {
        display.value = '';
    }
    
    let lastChar = display.value[display.value.length - 1];
    
    // Don't allow operators at the start (except minus)
    if (display.value === '' && op !== '-') {
        return;
    }

    // Replace last operator if another one is pressed
    if (['+', '-', '*', '/', '%'].includes(lastChar)) {
        display.value = display.value.slice(0, -1) + op;
    } else {
        display.value += op;
    }
}

function clearResult() {
    display.value = '';
}

function deleteLast() {
    if (display.value === 'Error') {
        display.value = '';
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function calculateResult() {
    try {
        // Prevent evaluation if the last character is an operator
        let lastChar = display.value[display.value.length - 1];
        if (['+', '-', '*', '/', '%'].includes(lastChar)) {
            display.value = display.value.slice(0, -1);
        }
        
        if (display.value !== '') {
            // Using a more controlled way than eval would be better, but for a simple calculator eval is common.
            // We use Function constructor as a slightly safer alternative to eval.
            display.value = Function('"use strict";return (' + display.value + ')')();
        }
    } catch (error) {
        display.value = 'Error';
    }
}
