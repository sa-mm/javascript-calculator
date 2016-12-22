'use strict';

(function () {
  
//   Model
  var oldArg = "";
  var newArg = "";
  var total = 0;
  var buttonList = [];
  var allClear = false;
  
  function updateNumString (str) {
    oldArg += str;
    console.log("oldArg is now: " + oldArg);
  }

  function getResult() {
    var lastItem = buttonList[buttonList.length - 1];
    console.log("begin of getResult() newArg and oldArg: " + newArg + " & " + oldArg );
    switch (lastItem) {
      case 'plusKey':
        total = (Number(newArg) + Number(oldArg)).toString();
        break;
      case 'minusKey':
        total = (Number(newArg) - Number(oldArg)).toString();
        break;
      case 'dividesKey':
        total = (Number(newArg) / Number(oldArg)).toString();
        break;
      case 'timesKey':
        total = (Number(newArg) * Number(oldArg)).toString();
        break;
    }
  }
  
  var operatorObj = {
    "plusKey": " + ",
    "minusKey": " - ",
    "dividesKey": " / ",
    "timesKey": " * ",
  }

// Controller
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
    "dot": "."
  };
  
  var theParent = document.querySelector("#calcButtons");
  for (var i = 0; i < theParent.children.length; i++) {
      var childElement = theParent.children[i];
      childElement.addEventListener('click', calculate, false);
  }

  function calculate(e) {
      var clickedItem = e.target.id;
      var lastItem = buttonList[buttonList.length -1 ];
      var operators = ["plusKey","minusKey","dividesKey","timesKey"];
    switch (clickedItem) {
      case "plusKey":
      case "minusKey":
      case "dividesKey":
      case "timesKey":
        buttonList.push(clickedItem);
        lastItem = buttonList[buttonList.length - 1]
        console.log("buttonList: " + buttonList);
        if (operators.includes(buttonList[buttonList.length - 2 ])) {
          getResult();
          newArg = total;
          oldArg = "";
          document.getElementById("current").innerHTML = total;
        } else {
          newArg = oldArg;
          oldArg = "";
              document.getElementById("equation").innerHTML = newArg + operatorObj[lastItem] + oldArg;
        }
        console.log(clickedItem + " clicked");
        // buttonList.push(clickedItem);
        break;
      case "clearKey":
        if (allClear == true) {
          total = 0;
          newArg = "";
          buttonList = [];
        } else {
          allClear = true;
          document.getElementById("clearKey").innerHTML = "AC";
        }
        oldArg = "";
        document.getElementById("current").innerHTML = "&nbsp;";
        break;
      case "negKey":
        console.log(typeof oldArg);
        if (oldArg.includes('-') == true) {
          oldArg = oldArg.replace(/^\-/,'');
        } else {
          oldArg = "-" + oldArg;
        }
        document.getElementById("current").innerHTML = oldArg;
        document.getElementById("equation").innerHTML = newArg + (operatorObj[lastItem] || " ") + oldArg;
        allClear = false;
        document.getElementById("clearKey").innerHTML = "C";
        // buttonList.push(clickedItem);
        break;
      case "enterKey":
      case "equalsKey":
        if (lastItem == "equalsKey" || lastItem == "enterKey") {
        // oldArg = '';
        }
        getResult();
        newArg = total;
        // newArg = ''
        oldArg = total;
        buttonList.push(clickedItem);
        console.log("total is now: " + total);
        console.log("buttonList: " + buttonList);
        document.getElementById("current").innerHTML = total;
        break;
      default:
        if (lastItem == "equalsKey" || lastItem == "enterKey") {
        oldArg = '';
        }
        allClear = false;
        document.getElementById("clearKey").innerHTML = "C";
        console.log("lastItem: " + lastItem);
        updateNumString(keyPad[clickedItem]);
        document.getElementById("current").innerHTML = oldArg;
        document.getElementById("equation").innerHTML = newArg + (operatorObj[lastItem] || " ") + oldArg;
    }
    document.getElementById("result").innerHTML = total;
  }
})();

// Adding keyboard support, sort of
$(document).keypress(function(e){
  var numPad = {
    96: "#num0",
    97: "#num1",
    98: "#num2",
    99: "#num3",
    100: "#num4",
    101: "#num5",
    102: "#num6",
    103: "#num7",
    104: "#num8",
    105: "#num9",
    13: "#enterKey",
    107: "#plusKey",
    48: "#num0",
    49: "#num1",
    50: "#num2",
    51: "#num3",
    52: "#num4",
    53: "#num5",
    54: "#num6",
    55: "#num7",
    56: "#num8",
    57: "#num9",
    61: "#equalsKey",
    47: "#dividesKey",
    42: "#timesKey",
    45: "#minusKey",
    43: "#plusKey",
    12: "#clearKey",
    46: "#dot"
  };
  $(numPad[e.which]).click();
});
