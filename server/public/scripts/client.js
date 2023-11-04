console.log('client.js is sourced!');

getHistory();

function formSubmit(event) {
    event.preventDefault()
  }

// GET calculations request
    // render calculations history
    // render most recent result (if there is one)
function getHistory() {
    axios({
        url: '/calculations',
        method: 'GET'
    }).then((response) => {
    let calculations = response.data;
    console.log('expect array of calculations', calculations);
    // renderCalculations(calculations)
    })
}

// function renderCalculations (calcuations) {
//     let recentResult = document.getElementById('recentResult');
//     let resultHistory = document.getElementById('resultHistory');
//     recentResult.innerHTML = '';
//     resultHistory.innerHTML = '';
//     for (let i=0; i < calcuations.length; i++){
//       console.log('expect one calculation:', calcuations[i]);
//       resultHistory.innerHTML += `
//         <li>${calcuations[i]}</li>
//       `
//     }
//     let lastCalculation = calcuations.slice(-1);
//     recentResult.innerHTML += `
//     <li>${lastCalculation.result}</li>
//   `;
// }



// POST request on '=' click
    // sends object
    // .then GET function
let operator;
function onAdd() {
    return operator = 'add';
}
function onSubtract() {
    return operator = 'subtract';
}
function onMultiply() {
    return operator = 'multiply';
}
function onDivide() {
    return operator = 'divide';
}
function onEquals() {
    let firstNumber = document.getElementById('firstNumber').value;
    let secondNumber = document.getElementById('secondNumber').value;
    document.getElementById('firstNumber').value = '';
    document.getElementById('secondNumber').value = '';
    let newCalculation = [
        {
        firstNumber: Number(firstNumber),
        secondNumber: Number(secondNumber),
        operator: operator
        }]
        console.log('expect calculation object', newCalculation);
    // axios({
    //     method: 'POST',
    //     url: '/round',
    //     data: newCalculation
    // })
    // .then((response) => {
    //     // need this in the .then so that getRound only runs when we get a response
    //     getRound()
    // })
}


// clear button clears the inputs
    // no routes
function onClear() {
    document.getElementById('firstNumber').value = '';
    document.getElementById('secondNumber').value = '';
}