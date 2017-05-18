'use strict'

var model = require('../js/model.js');
var calculator = require('../js/calculator.js');
// var view = require('../js/view.js');

var controller = function () {
  var calcModel = model();

  var numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'zero', 'decimal', 'neg'];
  var operators = ['add', 'subtract', 'multiply', 'divide'];

  function keyClicked(key) {
    if (numbers.includes(key)) {
      calcModel.updateNumString(key)
    } else if (operators.includes(key)) {
      calcModel.insertOperator(key)
      calcModel.setTotal(calcModel.getNumString())
      calcModel.resetNumString()
    } else if (key === 'equals') {
      var total = calculate()
      calcModel.setTotal(total)
      calcModel.resetNumString()
    }
  }

  function calculate() {
    var operator = calcModel.lastOperator()
    var a = calcModel.getTotal()
    var b = +calcModel.getNumString()

    switch (operator) {
      case 'add':
        return calculator.add(a, b)
      case 'subtract':
        return calculator.subtract(a, b)
      case 'divide':
        return calculator.divide(a, b)
      case 'multiply':
        return calculator.multiply(a, b)
    }
  }

  return {
    keyClicked: keyClicked,
    calcModel: calcModel,
    calculate: calculate
  }
}

module.exports = controller;

if (typeof document !== 'undefined') {
  var c = controller();

  var theParent = document.querySelector("#calcButtons");
  for (var i = 0; i < theParent.children.length; i++) {
    var childElement = theParent.children[i];
    childElement.addEventListener('click', buttonPress, false);
  }

  function buttonPress(event) {
    var clickedButton = event.target.id;
    console.log(clickedButton);
    c.keyClicked(clickedButton.toString());
  }
}