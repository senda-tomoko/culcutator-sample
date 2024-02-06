class Calculator {
    static OPERATORS = ["+", "-", "*", "/"];
    static MULTIPLY_OPERATOR = "*";
    static DIVISION_OPERATOR = "/";
    static DECIMAL_POINT = ".";
  }
  
  function selectNumber(number) {
    if (display.innerHTML == "0" || display.innerHTML == "00") {
      return display.innerHTML = number;
    }
  
    display.innerHTML += number;
  }
  
  function addNumber() {
    if (isLastCharOperator() || isLastCharDecimalPoint()) return;
  
    display.innerHTML += " + ";
  }
  
  function subtractNumber() {
    if (isLastCharOperator() || isLastCharDecimalPoint()) return;
  
    display.innerHTML += " - ";
  }
  
  function multiplyNumber() {
    if (isLastCharOperator() || isLastCharDecimalPoint()) return;
  
    display.innerHTML += " * ";
  }
  
  function divideNumber() {
    if (isLastCharOperator() || isLastCharDecimalPoint()) return;
  
    display.innerHTML += " / ";
  }
  
  function addDecimalPoint() {
    if (isLastCharOperator() || isLastCharDecimalPoint()) return;
  
    if (isCurrentNumberDecimal()) return;
  
    display.innerHTML += ".";
  }
  
  function clearNumber() {
    display.innerHTML = "0";
  }
  
  function calcNumber() {
    let calculation = display.innerHTML;
  
    // 演算子以外を抽出する
    const operandList = calculation.replace(/ /g, "").split(/\+|\-|\*|\//);
  
    // 小数のみを抽出する
    const decimals = operandList.filter(function(number) {
      return number.includes(Calculator.DECIMAL_POINT);
    })
  
    // 小数点が存在する場合には、一度整数に直した上で、計算後に小数へ戻す（※仕様上、小数のままでは有効桁数が増えてしまうため）
    if (!!decimals.length) {
      // 小数が存在する場合には、それぞれの小数点の位置を抽出する
      const decimalPointPositions = decimals.map(function (decimal) {
        return (decimal.length -1) - decimal.lastIndexOf('.');
      })
  
      // 抽出したものの中で最大のもの（=小数点以下の桁数が多いもの）を抽出する
      let maxDecimalPointPosition = Math.max(...decimalPointPositions);
  
      // 計算式を数字と演算子に分割する
      const splitCalculation = display.innerHTML.split(" ");
  
      for (let i = 0; i < operandList.length; i++) {
        let index = splitCalculation.indexOf(operandList[i]);
  
        splitCalculation[index] = operandList[i] * (10 ** maxDecimalPointPosition);
      }
  
      // 掛け算/割り算の回数を計算する
      const multiplyCount = splitCalculation.filter(val => val === Calculator.MULTIPLY_OPERATOR).length;
      const divisionCount = splitCalculation.filter(val => val === Calculator.DIVISION_OPERATOR).length;
  
      // 掛け算/割り算の時には、その回数分だけ桁上げがされてしまっているため
      maxDecimalPointPosition = maxDecimalPointPosition + multiplyCount - divisionCount;
  
      display.innerHTML = eval(splitCalculation.join('')) / (10 ** maxDecimalPointPosition);
    } else {
      // 計算を実行し、それを表示する
      display.innerHTML = eval(calculation);
    }
  }
  
  // 最後が演算子で終わっているかどうかを判定する関数
  function isLastCharOperator() {
    const lastChar = display.innerHTML.replace(/ /g, "").slice(-1);
    return Calculator.OPERATORS.includes(lastChar);
  }
  
  // 最後が小数点で終わっているかどうかを判定する関数
  function isLastCharDecimalPoint() {
    const lastChar = display.innerHTML.replace(/ /g, "").slice(-1);
    return lastChar === Calculator.DECIMAL_POINT;
  }
  
  // 入力中の数字に小数点が含まれているかどうかを判定する関数
  function isCurrentNumberDecimal() {
    const currentNumber = display.innerHTML.replace(/ /g, "").split(/\+|\-|\*|\//).slice(-1)[0];
    return currentNumber.includes(Calculator.DECIMAL_POINT);
  }
  
  const display = document.getElementById("js-display");
  
  // 電卓オブジェクトをインスタンス化
  const calculator = new Calculator();