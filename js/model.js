'use strict'

var model = function () {
  var operatorList = []
  var total = 0
  var lastKeyClicked = ''
  var output = []
  var numString = ''
  var allClear = false

  function insertOperator(operator) {
    operatorList.push(operator)
  }

  function lastOperator() {
    var last,
      len

    len = operatorList.length
    last = operatorList[len - 1] || ''
    return last
  }

  function operatorCount() {
    return operatorList.length
  }

  function updateNumString(str) {
    allClear = false
    if (str === 'neg') {
      if (numString.startsWith('-')) {
        numString = numString.slice(1)
      } else if (numString === '0' || numString === '') {
        numString = ''
      } else {
        numString = '-' + numString
      }
    } else if (str === '0' && (numString === '' || numString === '0')) {
      numString = '0'
    } else if (str === '.') {
      if (!numString.includes('.')) {
        numString += str
      }
    } else {
      numString += str
    }
    updateView(numString)
  }

  function getNumString() {
    return numString
  }

  function resetNumString() {
    numString = ''
  }

  function resetOperatorList() {
    operatorList = []
  }

  function setTotal(num) {
    total = num
    updateView(total.toString())
  }

  function getTotal() {
    return total
  }

  function setAllClear() {
    allClear = true
    updateView(numString)
  }

  function getAllClear() {
    return allClear
  }

  function updateView(str) {
    if (typeof document !== 'undefined') {
      if (!allClear) {
        document.getElementById('clear').innerText = 'C'
      } else {
        // then it's AC
        document.getElementById('clear').innerText = 'AC'
      }
      if (str === '') {
        str = '0'
      } else if (str.length > 13) {
        str = str.slice(0, 13) + '…'
      }
      document.getElementById('display').innerText = str
    }
  }

  return {
    insertOperator: insertOperator,
    lastOperator: lastOperator,
    operatorCount: operatorCount,
    lastKeyClicked: lastKeyClicked,
    setTotal: setTotal,
    getTotal: getTotal,
    output: output,
    numString: numString,
    updateNumString: updateNumString,
    getNumString: getNumString,
    resetNumString: resetNumString,
    resetOperatorList: resetOperatorList,
    setAllClear: setAllClear,
    getAllClear: getAllClear
  }
}

module.exports = model
