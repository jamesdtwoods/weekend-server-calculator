const express = require('express');
const app = express();
let PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = []


// Here's a wonderful place to make some routes:

// GET /calculations
  // sends the array of calcuations
app.get('/calculations', (req, res) => {
  console.log('GET/calculations is getting requeset')
  console.log('GET/calculations req.body:', req.body)
  console.log('expect array of calculations', calculations);
  res.send(calculations);
});


// POST /calculations
  // does the math, pushes to array
  // sends 201
  app.post('/calculations', (req, res) => {
    console.log('POST /calculations is getting requeset')
    console.log('POST /calculations req.body:', req.body)
    let newCalculation = req.body;
    if (newCalculation.operator === '+'){
      newCalculation.result = Number(newCalculation.numOne) + Number(newCalculation.numTwo);
      calculations.push(newCalculation);
    } else if (newCalculation.operator === '-'){
      newCalculation.result = Number(newCalculation.numOne) - Number(newCalculation.numTwo);
      calculations.push(newCalculation);
    } else if (newCalculation.operator === '*'){
      newCalculation.result = Number(newCalculation.numOne) * Number(newCalculation.numTwo);
      calculations.push(newCalculation);
    } else if (newCalculation.operator === '/'){
      newCalculation.result = Number(newCalculation.numOne) / Number(newCalculation.numTwo);
      calculations.push(newCalculation);
    }
    console.log('expect calculation inputs', calculations);
    res.sendStatus(201)
  });


// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
