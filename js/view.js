// var controller = require('../js/controller.js');

var view = function () {
  // var document = document || '';

  var theParent = document.querySelector("#calcButtons");
  for (var i = 0; i < theParent.children.length; i++) {
    var childElement = theParent.children[i];
    childElement.addEventListener('click', blah, false);
  }

  var key = ''

  function blah(event) {
    var keyPad = {
      "num1": "one",
      "num2": "two",
      "num3": "three",
      "num4": "four",
      "num5": "five",
      "num6": "six",
      "num7": "seven",
      "num8": "eight",
      "num9": "nine",
      "num0": "zero",
      "dot": ".",
      "plusKey": "+",
      "minusKey": "-",
      "timesKey": "*",
      "dividesKey": "/",
      "percentKey": "%",
      "enterKey": "equals",
      "negKey": "neg",
    };
    var clickedButton = event.target.id;
   key = keyPad[clickedButton];
    console.log(key);
    // controller.keyClicked(key);
  }
}

module.exports = view;