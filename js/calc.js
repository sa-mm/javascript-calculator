(function () {
  
//   Model
  var numString = "";
  var oldNumString = "";
  var total = 0;
  var buttonLog = [];
  var clearOrAllClear = false;
  
  function updateNumString (str) {
    numString += str;
    console.log("numString is now: " + numString);
  }

  function getResult() {
    var lastItem = buttonLog[buttonLog.length - 1];
    console.log("begin of getResult() oldNumString and numString: " + oldNumString + " & " + numString );
    switch (lastItem) {
      case 'plusKey':
        total = (Number(oldNumString) + Number(numString)).toString();
        break;
      case 'minusKey':
        total = (Number(oldNumString) - Number(numString)).toString();
        break;
      case 'dividesKey':
        total = (Number(oldNumString) / Number(numString)).toString();
        break;
      case 'timesKey':
        total = (Number(oldNumString) * Number(numString)).toString();
        break;
    }
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
      childElement.addEventListener('click', doSomething, false);
  }

  function doSomething(e) {
      var clickedItem = e.target.id;
      var lastItem = buttonLog[buttonLog.length -1 ];
      var operators = ["plusKey","minusKey","dividesKey","timesKey"];
    switch (clickedItem) {
      case "plusKey":
      case "minusKey":
      case "dividesKey":
      case "timesKey":
        buttonLog.push(clickedItem);
        lastItem = buttonLog[buttonLog.length - 1]
        console.log("buttonLog: " + buttonLog);
        if (operators.includes(buttonLog[buttonLog.length - 2 ])) {
          getResult();
          oldNumString = total;
          numString = "";
          document.getElementById("current").innerHTML = total;
        } else {
          oldNumString = numString;
          numString = "";
              document.getElementById("equation").innerHTML = oldNumString + lastItem + numString;
        }
        console.log(clickedItem + " clicked");
        // buttonLog.push(clickedItem);
        break;
      case "clearKey":
        if (clearOrAllClear == true) {
          total = 0;
          oldNumString = "";
          buttonLog = [];
        } else {
          clearOrAllClear = true;
          document.getElementById("clearKey").innerHTML = "AC";
        }
        numString = "";
        document.getElementById("current").innerHTML = "&nbsp;";
        break;
      case "negKey":
        console.log(typeof numString);
        if (numString.includes('-') == true) {
          numString = numString.replace(/^\-/,'');
        } else {
          numString = "-" + numString;
        }
        document.getElementById("current").innerHTML = numString;
        clearOrAllClear = false;
        document.getElementById("clearKey").innerHTML = "C";
        // buttonLog.push(clickedItem);
        break;
      case "enterKey":
      case "equalsKey":
        getResult();
        oldNumString = total;
        numString = total;
        buttonLog.push(clickedItem);
        console.log("total is now: " + total);
        console.log("buttonLog: " + buttonLog);
        document.getElementById("current").innerHTML = total;
        break;
      default:
        if (lastItem == "equalsKey" || lastItem == "enterKey") {
        numString = '';
        }
        clearOrAllClear = false;
        document.getElementById("clearKey").innerHTML = "C";
        console.log("lastItem: " + lastItem);
        updateNumString(keyPad[clickedItem]);
        document.getElementById("current").innerHTML = numString;
        document.getElementById("equation").innerHTML = oldNumString + lastItem + numString;
    }
    document.getElementById("result").innerHTML = total;
    // document.getElementById("equation").innerHTML = oldNumString + lastItem + numString;
  }
  
  // function updateEquation(oldNumString,operator,numString) {
  //
  //   document.getElementById("equation").innerHTML = oldNumString + operator + numString;
  // }
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