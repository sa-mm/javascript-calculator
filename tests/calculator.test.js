var test = require('tape');
var calc = require('../js/calculator');

test('addition test', (assert) => {
  assert.equal(calc.add(41,-2),39, 'Add negative numbers');
  assert.equal(calc.add(-2,3),1, 'Adds more negative numbers correctly');
  assert.equal(calc.add(1.2,3.6),4.8, 'Adds decimals correctly');
  assert.end();
});

test('subtraction test', (assert) => {
  const actual = calc.subtract(2,-3);
  const expected = 5;
  assert.equal(actual,expected, 'Given two numbers it should subtract them correctly');
  assert.end();
});

test('multiplication', (assert) => {
  assert.equal(calc.multiply(4,5), 20, 'Multiplies two positive numbers');
  assert.end();
});

test('division test', (assert) => {
  assert.equal(calc.divide(6,3), 2, 'Divides two positive numbers correctly');
  assert.end();
});

test('division test', (assert) => {
  assert.equal(calc.divide(3,1), 3/1, 'Divides two positive numbers correctly with fraction');
  assert.end();
});

test('division test', (assert) => {
  assert.equal(calc.divide(-6,-3), 2, 'Divides two negative numbers correctly');
  assert.end();
});

test('percent test', (assert) => {
  assert.equal(calc.percent(7), 0.07, 'Gets 7 percent');
  assert.end();
})
//add float tests

