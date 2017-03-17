'use strict'

var model = require('../js/model.js');
var calculator = require('../js/calculator.js');
// var view = require('../js/view.js');

var controller = function () {
  var calcModel = model();

  var numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'neg'];
  var operators = ['+', '-', '*', '/'];

  function keyClicked(key) {
    if (numbers.includes(key)) {
      calcModel.updateNumString(key);
    } else if (operators.includes(key)) {
      if (calcModel.lastKeyClicked === '=') {
        var totalStr = calcModel.getTotal().toString()
        calcModel.updateNumString(totalStr);
      }

      if (calcModel.operatorCount() > 0) {
        calcModel.output.push(calcModel.getNumString());
        calcModel.resetNumString();
        var result = getResult(calcModel.output);
        calcModel.setTotal(+result);
        calcModel.resetOperatorList();
        calcModel.output = [];
        calcModel.output.push(result.toString());
        calcModel.insertOperator(key);
      } else {
        calcModel.output.push(calcModel.getNumString());
        calcModel.resetNumString();
        calcModel.insertOperator(key);
      }
    } else if (key === '%') {
      if (calcModel.lastOperator() !== '') {
        var last = calcModel.output.length - 1;
        var pNum = calcModel.output[last];
        var cNum = +calcModel.getNumString();
        var num = cNum / 100 * pNum;
        calcModel.output.push(num.toString());
        calcModel.resetNumString();
        calcModel.setTotal(num);
      } else {
        calcModel.output.push(calcModel.getNumString());
        calcModel.resetNumString();
        var last = calcModel.output.length - 1;
        var result = calculator.percent(calcModel.output[last]);
        calcModel.setTotal(+result);
        calcModel.output[last] = result.toString();
      }
    } else if (key === 'c') {
      if (calcModel.getAllClear()) {
        calcModel.setTotal(0);
        calcModel.resetNumString();
        calcModel.resetOperatorList();
        calcModel.output = [];
      } else {
        calcModel.resetNumString();
        calcModel.setAllClear();
      }
    } else if (key === '=') {
      calcModel.output.push(calcModel.getNumString());
      calcModel.resetNumString();
      var result = getResult(calcModel.output);
      calcModel.setTotal(+result);
      calcModel.resetOperatorList();
      calcModel.output = [];
    }
    calcModel.lastKeyClicked = key;
  }

  function getResult(arr) {
    return arr.filter(function (str) {
      return str !== '';
    }).reduce(function (pVal, cVal) {
      return calculate(+pVal, +cVal);
    });
  }

  function calculate(x, y) {
    var operator = calcModel.lastOperator();
    var operatorKeyToFunction = {
      '+': calculator.add(x, y),
      '-': calculator.subtract(x, y),
      '*': calculator.multiply(x, y),
      '/': calculator.divide(x, y),
      '%': calculator.percent(x),
    }
    return operatorKeyToFunction[operator];
  }

  return {
    keyClicked: keyClicked,
    calcModel: calcModel,
    calculate: calculate,
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