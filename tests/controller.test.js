var test = require('tape');
var controller = require('../js/controller.js');

test('testing new setup', (assert) => {
  var c = controller();
  c.keyClicked('one');
  c.keyClicked('two');
  assert.equal(c.calcModel.getNumString(), '12', 'getNumString() is ' + c.calcModel.getNumString());
  c.keyClicked('+');
  assert.equal(c.calcModel.getNumString(), '', 'getNumString() is ' + c.calcModel.getNumString());
  c.keyClicked('five');
  c.keyClicked('equals');
  assert.equal(c.calcModel.getTotal(), 17, 'calculates 12 + 5 correctly');
  assert.end();
});

test('clicking two number keys then the minus sign and another key then the equals sign updates the model', (assert) => {
  var c = controller();
  c.keyClicked('one');
  c.keyClicked('two');
  c.keyClicked('-');
  c.keyClicked('five');
  c.keyClicked('equals');
  assert.equal(c.calcModel.getTotal(), 7, 'calculates the total');
  assert.end();
});

test('clicking two number keys then * and another key then the equals sign updates the model', (assert) => {
  var c = controller();
  c.keyClicked('one');
  c.keyClicked('two');
  c.keyClicked('*');
  c.keyClicked('five');
  c.keyClicked('equals');
  assert.equal(c.calcModel.getTotal(), 60, 'calculates the total');
  assert.end();
});

test('clicking two number keys then / and another key then the equals sign updates the model', (assert) => {
  var c = controller();
  c.keyClicked('one');
  c.keyClicked('two');
  c.keyClicked('/');
  c.keyClicked('two');
  c.keyClicked('equals');
  assert.equal(c.calcModel.getTotal(), 6, 'calculates the total');
  assert.end();
});

test('1,2,+,5,=,+,4,=', (assert) => {
  var c = controller();
  c.keyClicked('one');
  c.keyClicked('two');
  c.keyClicked('+');
  c.keyClicked('five');
  c.keyClicked('equals');
  c.keyClicked('+');
  c.keyClicked('four');
  c.keyClicked('equals');
  assert.equal(c.calcModel.getTotal(), 21, 'calculates the total');
  assert.end();
});

test('1,2,+,5,=,4,+,1,=', (assert) => {
  var c = controller();
  c.keyClicked('one');
  c.keyClicked('two');
  c.keyClicked('+');
  c.keyClicked('five');
  c.keyClicked('equals');
  c.keyClicked('four');
  c.keyClicked('+');
  c.keyClicked('one');
  c.keyClicked('equals');
  assert.equal(c.calcModel.getTotal(), 5, 'calculates the total');
  assert.end();
});

test('1,2,+,5,=,4,-,1,=', (assert) => {
  var c = controller();
  c.keyClicked('one');
  c.keyClicked('two');
  c.keyClicked('+');
  c.keyClicked('five');
  c.keyClicked('equals');
  c.keyClicked('four');
  c.keyClicked('-');
  c.keyClicked('one');
  c.keyClicked('equals');
  assert.equal(c.calcModel.getTotal(), 3, 'calculates the total');
  assert.end();
});

test('1,2,+,5,=,4,/,1,=', (assert) => {
  var c = controller();
  c.keyClicked('one');
  c.keyClicked('two');
  c.keyClicked('+');
  c.keyClicked('five');
  c.keyClicked('equals');
  c.keyClicked('four');
  c.keyClicked('/');
  c.keyClicked('one');
  c.keyClicked('equals');
  assert.equal(c.calcModel.getTotal(), 4, 'calculates the total');
  assert.end();
});

test('1,2,+,5,=,4,*,1,=', (assert) => {
  var c = controller();
  c.keyClicked('one');
  c.keyClicked('two');
  c.keyClicked('+');
  c.keyClicked('five');
  c.keyClicked('equals');
  c.keyClicked('four');
  c.keyClicked('*');
  c.keyClicked('one');
  c.keyClicked('equals');
  assert.equal(c.calcModel.getTotal(), 4, 'calculates the total');
  assert.end();
});


test('3,=', (assert) => {
  var c = controller();
  var clicks = ['three', 'equals'];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 3, 'calculates 3 =');
  assert.end();
});

test('3,=,4,=', (assert) => {
  var c = controller();
  var clicks = ['three', 'equals', 'four', 'equals'];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 4, 'calculates 3 = 4 =');
  assert.end();
});

test('3,=,4,=,1,+,6,=', (assert) => {
  var c = controller();
  var clicks = ['three', 'equals', 'four', 'equals', 'one', '+', 'six', 'equals'];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 7, 'calculates correctly as ' + c.calcModel.getTotal());
  assert.end();
});

test('3,=,+,4,=', (assert) => {
  var c = controller();
  var clicks = ['three', 'equals', '+', 'four', 'equals'];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 7, 'calculates correctly as ' + c.calcModel.getTotal());
  assert.end();
});

test('3,=,-,4,=', (assert) => {
  var c = controller();
  var clicks = ['three', 'equals', '-', 'four', 'equals'];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), -1, 'calculates correctly as ' + c.calcModel.getTotal());
  assert.end();
});

test('3,.,2,=,-,4,= FLOATS!!!', (assert) => {
  var c = controller();
  var clicks = ['three', '.', 'two', 'equals', '-', 'four', 'equals'];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), -0.8, 'calculates correctly as ' + c.calcModel.getTotal());
  assert.end();
});

//-3 should never happen
// test('3,=,-3 =', (assert) => {
//   var c = controller();
//   var clicks = ['three','equals','-3','equals'];
//   clicks.forEach(e => {
//     c.keyClicked(e);
//   });
//   assert.equal(c.calcModel.getTotal(), -3, 'calculates 3 = -3 = as ' + c.calcModel.getTotal());
//   assert.end();
// });


test('1,2,+,5,=,7,=,3,4,=', (assert) => {
  var c = controller();
  var clicks = ['one', 'two', '+', 'five', 'equals', 'seven', 'equals', 'three', 'four', 'equals'];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 34, 'calculates the total');
  assert.end();
});

test('1,2,+,5,=,7,=,-,3,=', (assert) => {
  var c = controller();
  var clicks = ['one', 'two', '+', 'five', 'equals', 'seven', 'equals', '-', 'three', 'equals'];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 4, 'calculates the total');
  assert.end();
});

test('decimals work fine', (assert) => {
  var c = controller();
  var clicks = ['three', '.', 'one', '+', 'two', 'equals'];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 5.1);
  assert.end();
});

//equal sign hasn't been pressed yet
test('1,2,+,4,=,8', assert => {
  var c = controller();
  var clicks = ['one', 'two', '+', 'four', 'equals', 'eight'];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 16, 'sets the correct total');
  assert.end();
});

test('negation sign works as expected', (assert) => {
  var c = controller();
  var clicks = ['three', 'neg', 'one', '+', 'two', 'equals'];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), -29);
  assert.end();
});

test('two negation signs work as expected', (assert) => {
  var c = controller();
  var clicks = ['three', 'neg', 'one', '+', 'two', 'neg', 'equals'];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), -33);
  assert.end();
});

test('two negation signs and subtraction work as expected', (assert) => {
  var c = controller();
  var clicks = ['three', 'neg', 'one', '-', 'two', 'neg', 'equals'];
  clicks.forEach(e => {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), -29);
  assert.end();
});

// test('percent sign works with stuff other than addition and subtraction', (assert) => {
//   var c = controller();
//   c.keyClicked('seven');
//   assert.equal(c.calcModel.getNumString(),'seven','numString should be 7');
//   c.keyClicked('%');
//   assert.equal(c.calcModel.getNumString(),'','numString should be empty');
//   var actual = c.calcModel.getTotal();
//   var expected = 0.07;
//   assert.equal(actual,expected,'total is ' + actual, 'total should 0.07');
//   c.keyClicked('four');
//   assert.equal(c.calcModel.getNumString(),'four','numString is now 4');
//   c.keyClicked('*');
//   c.keyClicked('two');
//   c.keyClicked('%');
//   assert.equal(c.calcModel.getTotal(),0.02, 'total correct here');
//   assert.end();
// });

// test('more percent sign stuff', (assert) => {
//   var c = controller();
//   var clicks = ['four','*','two','%','equals'];
//   clicks.forEach(function(e) {
//     c.keyClicked(e);
//   });
//   assert.equal(c.calcModel.getTotal(),0.08);
//   assert.end();
// });

// test('more percent sign stuff', (assert) => {
//   var c = controller();
//   var clicks = ['four','*','two','%','equals','four','*','two','%','equals'];
//   clicks.forEach(function(e) {
//     c.keyClicked(e);
//   });
//   assert.equal(c.calcModel.getTotal(),0.08);
//   assert.end();
// });

// test('more percent sign stuff', (assert) => {
//   var c = controller();
//   var clicks = ['seven','%','equals','four','*','two','%','equals'];
//   clicks.forEach(function(e) {
//     c.keyClicked(e);
//   });
//   assert.equal(c.calcModel.getTotal(),0.08);
//   assert.end();
// });

// test('more percent sign stuff', (assert) => {
//   var c = controller();
//   var clicks = ['seven','%','equals','four','/','two','%','equals'];
//   clicks.forEach(function(e) {
//     c.keyClicked(e);
//   });
//   assert.equal(c.calcModel.getTotal(),200);
//   assert.end();
// });

test('percent sign stuff with addition', (assert) => {
  var c = controller();
  var clicks = ['two', 'five', '+', 'one', 'five', '%', 'equals'];
  clicks.forEach(function (e) {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 28.75);
  assert.end();
});

test('percent sign stuff with subtraction', (assert) => {
  var c = controller();
  var clicks = ['two', 'five', '-', 'one', 'five', '%', 'equals'];
  clicks.forEach(function (e) {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 21.25);
  assert.end();
});

test('percent sign stuff with multiplication', (assert) => {
  var c = controller();
  var clicks = ['two', 'five', '*', 'one', 'five', '%', 'equals'];
  clicks.forEach(function (e) {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 93.75);
  assert.end();
});

test('percent sign stuff with division', (assert) => {
  var c = controller();
  var clicks = ['two', 'five', '/', 'one', 'five', '%', 'equals'];
  clicks.forEach(function (e) {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 6.666666666666667);
  assert.end();
});

test('percent sign stuff with first operand', (assert) => {
  var c = controller();
  var clicks = ['one', 'zero', '%', '*', 'one', 'zero', 'zero', 'equals'];
  clicks.forEach(function (e) {
    c.keyClicked(e);
  });
  assert.equal(c.calcModel.getTotal(), 10);
  c.keyClicked('one');
  c.keyClicked('zero');
  c.keyClicked('%');
  assert.equal(c.calcModel.lastOperator(),'','lastOperator is empty string');
  assert.end();
});

test('string of operations without equals sign', (assert) => {
  var c = controller();
  c.keyClicked('one');
  c.keyClicked('+');
  c.keyClicked('two');
  c.keyClicked('+');
  c.keyClicked('three');
  c.keyClicked('equals');
  // c.keyClicked('');
  assert.equal(c.calcModel.getTotal(),6);
  assert.end();
});

test('string of operations without equals sign', (assert) => {
  var c = controller();
  c.keyClicked('one');
  c.keyClicked('-');
  c.keyClicked('two');
  c.keyClicked('+');
  c.keyClicked('three');
  c.keyClicked('equals');
  // c.keyClicked('');
  assert.equal(c.calcModel.getTotal(),2,'subtraction and addition');
  assert.end();
});

test('string of operations without equals sign', (assert) => {
  var c = controller();
  c.keyClicked('one');
  c.keyClicked('-');
  c.keyClicked('two');
  c.keyClicked('-');
  c.keyClicked('three');
  c.keyClicked('equals');
  // c.keyClicked('');
  assert.equal(c.calcModel.getTotal(),-4,'subtraction');
  assert.end();
});