'use strict'

function add(x, y) {
  return parseFloat((((x * 100) + (y * 100)) / 100).toFixed(16));
}

function subtract(x,y) {
  return parseFloat((((x * 100) - (y * 100)) / 100).toFixed(16));
}

function multiply(x,y) {
  return parseFloat((x * y).toFixed(16));
}

function divide(x,y) {
  return parseFloat((x / y).toFixed(16));
}

function percent(x) {
  return x / 100;
}

var calculator = function () {

  return {
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide,
    percent: percent,
  }
}

module.exports = calculator();

