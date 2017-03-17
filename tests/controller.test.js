var test = require('tape');
var controller = require('../js/controller.js');

test('testing new setup', (assert) => {
  var c = controller();
  c.keyClicked('1');
  c.keyClicked('2');
  assert.equal(c.calcModel.getNumString(), '12', 'getNumString() is ' + c.calcModel.getNumString());
  c.keyClicked('+');
  assert.equal(c.calcModel.getNumString(), '', 'getNumString() is ' + c.calcModel.getNumString());
  c.keyClicked('5');
  c.keyClicked('=');
  assert.equal(c.calcModel.getTotal(), 17, 'calculates 12 + 5 correctly');
  assert.end();
});

test('clicking two number keys then the minus sign and another key then the equals sign updates the model', (assert) => {
  var c = controller();
  c.keyClicked('1');
  c.keyClicked('2');
  c.keyClicked('-');
  c.keyClicked('5');
  c.keyClicked('=');
  assert.equal(c.calcModel.getTotal(), 7, 'calculates the total');
  assert.end();
});

test('clicking two number keys then * and another key then the equals sign updates the model', (assert) => {
  var c = controller();
  c.keyClicked('1');
  c.keyClicked('2');
  c.keyClicked('*');
  c.keyClicked('5');
  c.keyClicked('=');
  assert.equal(c.calcModel.getTotal(), 60, 'calculates the total');
  assert.end();
});

test('clicking two number keys then / and another key then the equals sign updates the model', (assert) => {
  var c = controller();
  c.keyClicked('1');
  c.keyClicked('2');
  c.keyClicked('/');
  c.keyClicked('2');
  c.keyClicked('=');
  assert.equal(c.calcModel.getTotal(), 6, 'calculates the total');
  assert.end();
});

test('1,2,+,5,=,+,4,=', (assert) => {
  var c = controller();
  c.keyClicked('1');
  c.keyClicked('2');
  c.keyClicked('+');
  c.keyClicked('5');
  c.keyClicked('=');
  c.keyClicked('+');
  c.keyClicked('4');
  c.keyClicked('=');
  assert.equal(c.calcModel.getTotal(), 21, 'calculates the total');
  assert.end();
});

test('1,2,+,5,=,4,+,1,=', (assert) => {
  var c = controller();
  c.keyClicked('1');
  c.keyClicked('2');
  c.keyClicked('+');
  c.keyClicked('5');
  c.keyClicked('=');
  c.keyClicked('4');
  c.keyClicked('+');
  c.keyClicked('1');
  c.keyClicked('=');
  assert.equal(c.calcModel.getTotal(), 5, 'calculates the total');
  assert.end();
});

test('1,2,+,5,=,4,-,1,=', (assert) => {
  var c = controller();
  c.keyClicked('1');
  c.keyClicked('2');
  c.keyClicked('+');
  c.keyClicked('5');
  c.keyClicked('=');
  c.keyClicked('4');
  c.keyClicked('-');
  c.keyClicked('1');
  c.keyClicked('=');
  assert.equal(c.calcModel.getTotal(), 3, 'calculates the total');
  assert.end();
});

test('1,2,+,5,=,4,/,1,=', (assert) => {
  var c = controller();
  c.keyClicked('1');
  c.keyClicked('2');
  c.keyClicked('+');
  c.keyClicked('5');
  c.keyClicked('=');
  c.keyClicked('4');
  c.keyClicked('/');
  c.keyClicked('1');
  c.keyClicked('=');
  assert.equal(c.calcModel.getTotal(), 4, 'calculates the total');
  assert.end();
});

test('1,2,+,5,=,4,*,1,=', (assert) => {
  var c = controller();
  c.keyClicked('1');
  c.keyClicked('2');
  c.keyClicked('+');
  c.keyClicked('5');
  c.keyClicked('=');
  c.keyClicked('4');
  c.keyClicked('*');
  c.keyClicked('1');
  c.keyClicked('=');
  assert.equal(c.calcModel.getTotal(), 4, 'calculates the total');
  assert.end();
});


test('3,=', (assert) => {
  var c = controller();
  var clicks = ['3', '='];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 3, 'calculates 3 =');
  assert.end();
});

test('3,=,4,=', (assert) => {
  var c = controller();
  var clicks = ['3', '=', '4', '='];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 4, 'calculates 3 = 4 =');
  assert.end();
});

test('3,=,4,=,1,+,6,=', (assert) => {
  var c = controller();
  var clicks = ['3', '=', '4', '=', '1', '+', '6', '='];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 7, 'calculates correctly as ' + c.calcModel.getTotal());
  assert.end();
});

test('3,=,+,4,=', (assert) => {
  var c = controller();
  var clicks = ['3', '=', '+', '4', '='];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 7, 'calculates correctly as ' + c.calcModel.getTotal());
  assert.end();
});

test('3,=,-,4,=', (assert) => {
  var c = controller();
  var clicks = ['3', '=', '-', '4', '='];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), -1, 'calculates correctly as ' + c.calcModel.getTotal());
  assert.end();
});

test('3,.,2,=,-,4,= FLOATS!!!', (assert) => {
  var c = controller();
  var clicks = ['3', '.', '2', '=', '-', '4', '='];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), -0.8, 'calculates correctly as ' + c.calcModel.getTotal());
  assert.end();
});

//-3 should never happen
// test('3,=,-3 =', (assert) => {
//   var c = controller();
//   var clicks = ['3','=','-3','='];
//   clicks.forEach(e => {
//     c.keyClicked(e);
//   });
//   assert.equal(c.calcModel.getTotal(), -3, 'calculates 3 = -3 = as ' + c.calcModel.getTotal());
//   assert.end();
// });


test('1,2,+,5,=,7,=,3,4,=', (assert) => {
  var c = controller();
  var clicks = ['1', '2', '+', '5', '=', '7', '=', '3', '4', '='];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 34, 'calculates the total');
  assert.end();
});

test('1,2,+,5,=,7,=,-,3,=', (assert) => {
  var c = controller();
  var clicks = ['1', '2', '+', '5', '=', '7', '=', '-', '3', '='];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 4, 'calculates the total');
  assert.end();
});

test('decimals work fine', (assert) => {
  var c = controller();
  var clicks = ['3', '.', '1', '+', '2', '='];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 5.1);
  assert.end();
});

//equal sign hasn't been pressed yet
test('1,2,+,4,=,8', assert => {
  var c = controller();
  var clicks = ['1', '2', '+', '4', '=', '8'];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 16, 'sets the correct total');
  assert.end();
});

test('negation sign works as expected', (assert) => {
  var c = controller();
  var clicks = ['3', 'neg', '1', '+', '2', '='];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), -29);
  assert.end();
});

test('two negation signs work as expected', (assert) => {
  var c = controller();
  var clicks = ['3', 'neg', '1', '+', '2', 'neg', '='];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), -33);
  assert.end();
});

test('two negation signs and subtraction work as expected', (assert) => {
  var c = controller();
  var clicks = ['3', 'neg', '1', '-', '2', 'neg', '='];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), -29);
  assert.end();
});

// test('percent sign works with stuff other than addition and subtraction', (assert) => {
//   var c = controller();
//   c.keyClicked('7');
//   assert.equal(c.calcModel.getNumString(),'7','numString should be 7');
//   c.keyClicked('%');
//   assert.equal(c.calcModel.getNumString(),'','numString should be empty');
//   var actual = c.calcModel.getTotal();
//   var expected = 0.07;
//   assert.equal(actual,expected,'total is ' + actual, 'total should 0.07');
//   c.keyClicked('4');
//   assert.equal(c.calcModel.getNumString(),'4','numString is now 4');
//   c.keyClicked('*');
//   c.keyClicked('2');
//   c.keyClicked('%');
//   assert.equal(c.calcModel.getTotal(),0.02, 'total correct here');
//   assert.end();
// });

// test('more percent sign stuff', (assert) => {
//   var c = controller();
//   var clicks = ['4','*','2','%','='];
//   clicks.forEach(function(e) {
//     c.keyClicked(e);
//   });
//   assert.equal(c.calcModel.getTotal(),0.08);
//   assert.end();
// });

// test('more percent sign stuff', (assert) => {
//   var c = controller();
//   var clicks = ['4','*','2','%','=','4','*','2','%','='];
//   clicks.forEach(function(e) {
//     c.keyClicked(e);
//   });
//   assert.equal(c.calcModel.getTotal(),0.08);
//   assert.end();
// });

// test('more percent sign stuff', (assert) => {
//   var c = controller();
//   var clicks = ['7','%','=','4','*','2','%','='];
//   clicks.forEach(function(e) {
//     c.keyClicked(e);
//   });
//   assert.equal(c.calcModel.getTotal(),0.08);
//   assert.end();
// });

// test('more percent sign stuff', (assert) => {
//   var c = controller();
//   var clicks = ['7','%','=','4','/','2','%','='];
//   clicks.forEach(function(e) {
//     c.keyClicked(e);
//   });
//   assert.equal(c.calcModel.getTotal(),200);
//   assert.end();
// });

test('percent sign stuff with addition', (assert) => {
  var c = controller();
  var clicks = ['2', '5', '+', '1', '5', '%', '='];
  clicks.forEach(function (e) {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 28.75);
  assert.end();
});

test('percent sign stuff with subtraction', (assert) => {
  var c = controller();
  var clicks = ['2', '5', '-', '1', '5', '%', '='];
  clicks.forEach(function (e) {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 21.25);
  assert.end();
});

test('percent sign stuff with multiplication', (assert) => {
  var c = controller();
  var clicks = ['2', '5', '*', '1', '5', '%', '='];
  clicks.forEach(function (e) {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 93.75);
  assert.end();
});

test('percent sign stuff with division', (assert) => {
  var c = controller();
  var clicks = ['2', '5', '/', '1', '5', '%', '='];
  clicks.forEach(function (e) {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 6.666666666666667);
  assert.end();
});

test('percent sign stuff with first operand', (assert) => {
  var c = controller();
  var clicks = ['1', '0', '%', '*', '1', '0', '0', '='];
  clicks.forEach(function (e) {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 10);
  c.keyClicked('1');
  c.keyClicked('0');
  c.keyClicked('%');
  assert.equal(c.calcModel.lastOperator(),'','lastOperator is empty string');
  assert.end();
});

test('string of operations without equals sign', (assert) => {
  var c = controller();
  c.keyClicked('1');
  c.keyClicked('+');
  c.keyClicked('2');
  c.keyClicked('+');
  c.keyClicked('3');
  c.keyClicked('=');
  // c.keyClicked('');
  assert.equal(c.calcModel.getTotal(),6);
  assert.end();
});

test('string of operations without equals sign', (assert) => {
  var c = controller();
  c.keyClicked('1');
  c.keyClicked('-');
  c.keyClicked('2');
  c.keyClicked('+');
  c.keyClicked('3');
  c.keyClicked('=');
  // c.keyClicked('');
  assert.equal(c.calcModel.getTotal(),2,'subtraction and addition');
  assert.end();
});

test('string of operations without equals sign', (assert) => {
  var c = controller();
  c.keyClicked('1');
  c.keyClicked('-');
  c.keyClicked('2');
  c.keyClicked('-');
  c.keyClicked('3');
  c.keyClicked('=');
  // c.keyClicked('');
  assert.equal(c.calcModel.getTotal(),-4,'subtraction');
  assert.end();
});