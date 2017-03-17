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
      "num1": "1",
      "num2": "2",
      "num3": "3",
      "num4": "4",
      "num5": "5",
      "num6": "6",
      "num7": "7",
      "num8": "8",
      "num9": "9",
      "num0": "0",
      "dot": ".",
      "plusKey": "+",
      "minusKey": "-",
      "timesKey": "*",
      "dividesKey": "/",
      "percentKey": "%",
      "enterKey": "=",
      "negKey": "neg",
    };
    var clickedButton = event.target.id;
   key = keyPad[clickedButton];
    console.log(key);
    // controller.keyClicked(key);
  }
}

module.exports = view;