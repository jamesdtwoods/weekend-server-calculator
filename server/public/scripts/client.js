console.log('client.js is sourced!');

getHistory();

function formSubmit(event) {
    event.preventDefault()
  }

// GET calculations request
    // render calculations history
    // render most recent result (if there is one)
        // this returns undefined if no data on start
function getHistory() {
    axios({
        url: '/calculations',
        method: 'GET'
    }).then((response) => {
    let calculations = response.data;
    console.log('expect array of calculations', calculations);
    renderCalculations(calculations);
    })
}

function renderCalculations (calcuations) {
    let recentResult = document.getElementById('recentResult');
    let resultHistory = document.getElementById('resultHistory');
    recentResult.innerHTML = '';
    resultHistory.innerHTML = '';
    for (let i=0; i < calcuations.length; i++){
      console.log('expect one calculation:', calcuations[i]);
      resultHistory.innerHTML += `
        <li>${calcuations[i].numOne} ${calcuations[i].operator} ${calcuations[i].numTwo} = ${calcuations[i].result}</li>
      `
    }
    let lastCalculation = calcuations.slice(-1);
    // let lastCalculation = calcuations[calcuations.length - 1];
    console.log('expect last calculation', lastCalculation);
    recentResult.innerHTML += `${lastCalculation[0].result}`;
}



// POST request on '=' click
    // sends object
    // .then GET function
let operator;
function onAdd() {
    return operator = '+';
}
function onSubtract() {
    return operator = '-';
}
function onMultiply() {
    return operator = '*';
}
function onDivide() {
    return operator = '/';
}
function onEquals() {
    let input = document.getElementById("result").value 
    document.getElementById("result").value = '';
    document.querySelectorAll(".operator").forEach(e => e.disabled = false)
    console.log('expect inputs', input);
    let inputSplit = input.split(" ");
    console.log('array of inputs', inputSplit);
    for (i=0; i < inputSplit.length; i++){
        console.log(inputSplit[i]);
        numOne = inputSplit[0];
        operator = inputSplit[1];
        numTwo = inputSplit[2];
    }
    console.log('expect the inputs', numOne, operator, numTwo);
    let newCalculation = 
        {
        numOne: Number(numOne),
        numTwo: Number(numTwo),
        operator: operator
        };
        console.log('expect calculation object', newCalculation);
    axios({
        method: 'POST',
        url: '/calculations',
        data: newCalculation
    })
    .then((response) => {
        getHistory()
    })
}


// clear button clears the inputs
    // no routes
function onClear() {
    // old calculator 
    // document.getElementById('firstNumber').value = '';
    // document.getElementById('secondNumber').value = '';

    // new calculator
    document.getElementById("result").value = ""
    document.querySelectorAll(".operator").forEach(e => e.disabled = false)
}

// clear history button clears the history
    // sends a delete request to the server
function onClearHistory(){
    axios({
        url: '/calculations',
        method: 'DELETE'
    }).then((response) => {
        getHistory();
    })
}

// display function
 function dis(val) { 
    document.getElementById("result").value += val;
    if (val === ' + ' || val === ' - ' || val === ' * ' || val === ' / ') {
        document.querySelectorAll(".operator").forEach(e => e.disabled = true)
    }
 }
