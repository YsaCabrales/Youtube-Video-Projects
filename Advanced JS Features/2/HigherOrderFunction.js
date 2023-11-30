// Higher Order Function
function calculate(operation, num1, num2) {
    return operation(num1, num2);
  }
  
  // Functions to pass as arguments
  function add(a, b) {
    return a + b;
  }
  
  function multiply(a, b) {
    return a * b;
  }
  
  // Using higher-order function
  const resultAddition = calculate(add, 5, 3);

  console.log(`The result of addition is: ${resultAddition}`);
  
  const resultMultiplication = calculate(multiply, 5, 3);

  console.log(`The result of multiplication is: ${resultMultiplication}`);
  