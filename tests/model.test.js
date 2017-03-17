var test = require('tape');
var model = require('../js/model.js');

test('An empty operator list returns an emptry string', (assert) => {
  var calcModel = model();
  assert.equal(calcModel.lastOperator(), '');
  assert.end();
});

test('You can insert one operator into the operators list and retrieve it', (assert) => {
  var calcModel = model();
  calcModel.insertOperator('+');
  assert.equal(calcModel.lastOperator(), '+');
  assert.end();
});

test('You can insert things into the operators list and retrieve the last inserted', (assert) => {
  var calcModel = model();
  calcModel.insertOperator('+');
  calcModel.insertOperator('-');
  assert.equal(calcModel.lastOperator(), '-');
  assert.end();
});

test('Gets and sets total', (assert) => {
  var calcModel = model();
  calcModel.setTotal(4);
  assert.equal(calcModel.getTotal(), 4);
  assert.end();
});

test('last key clicked at start is empty string', (assert) => {
  var calcModel = model();
  var actual = calcModel.lastKeyClicked;
  var expected = '';
  assert.equal(actual, expected, 'gets and sets last key clicked');
  assert.end();
});

test('Gets and sets lastKeyClicked', (assert) => {
  var calcModel = model();
  calcModel.lastKeyClicked = '=';
  var actual = calcModel.lastKeyClicked;
  var expected = '=';
  assert.equal(actual, expected, 'gets and sets last key clicked');
  assert.end();
});

test('sets lastKeyClicked multiple times', (assert) => {
  var calcModel = model();
  calcModel.lastKeyClicked = '=';
  calcModel.lastKeyClicked = '+';
  calcModel.lastKeyClicked = '1';
  var actual = calcModel.lastKeyClicked;
  var expected = '1';
  assert.equal(actual, expected, 'gets and sets last key clicked');
  assert.end();
});

test('numString', (assert) => {
  var calcModel = model();
  calcModel.updateNumString('1');
  var actual = calcModel.getNumString();
  var expected = '1';
  assert.equal(actual,expected, 'get\'s numString');
  assert.end();
});

test('multiple calls to updateNumString', (assert) => {
  var calcModel = model();
  calcModel.updateNumString('1');
  calcModel.updateNumString('1');
  calcModel.updateNumString('1');
  calcModel.updateNumString('1');
  var actual = calcModel.getNumString();
  var expected = '1111';
  assert.equal(actual,expected, 'get\'s numString');
  assert.end();
});

test('resetNumString works', (assert) => {
  var calcModel = model();
  calcModel.updateNumString('1');
  calcModel.updateNumString('12');
  assert.equal(calcModel.getNumString(),'112');
  calcModel.resetNumString();
  assert.equal(calcModel.getNumString(),'');
  assert.end();
});

test('updateNumString with negatives works', (assert) => {
  var calcModel = model();
  calcModel.updateNumString('1');
  calcModel.updateNumString('neg');
  var actual = calcModel.getNumString();
  var expected = '-1';
  assert.equal(actual,expected,'adding a negation to the string works');
  calcModel.updateNumString('neg');
  actual = calcModel.getNumString();
  expected = '1';
  assert.equal(actual,expected, 'double negation works');
  calcModel.resetNumString();
  calcModel.updateNumString('1');
  calcModel.updateNumString('neg');
  calcModel.updateNumString('3');
  actual = calcModel.getNumString();
  expected = '-13';
  assert.equal(actual,expected,'interspersing a negation works');
  calcModel.resetNumString();
  calcModel.updateNumString('neg');
  actual = calcModel.getNumString();
  expected = '';
  assert.equal(actual,expected,'starting with a negation works');
  assert.end();
});

test('adding zeros works as expected', (assert) => {
  var calcModel = model();
  calcModel.updateNumString('1');
  calcModel.updateNumString('0');
  calcModel.updateNumString('0');
  var actual = calcModel.getNumString();
  var expected = '100';
  assert.equal(actual,expected);
  assert.end();
});

test('operatorCount returns correct count', (assert) => {
  var calcModel = model();
  assert.equal(calcModel.operatorCount(),0);
  calcModel.insertOperator('-');
  assert.equal(calcModel.operatorCount(),1);
  calcModel.insertOperator('+');
  assert.equal(calcModel.operatorCount(),2);
  assert.end();
});

// test('percent sign works with stuff other than addition and subtraction', (assert) => {
//   var calcModel = model();
//   calcModel.updateNumString('7');
//   calcModel.updateNumString('%');
//   var actual = calcModel.getNumString();
//   var expected = '';
// });