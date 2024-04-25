function calculate(numbers, floats, starts, sum) {
  const limits = numbers.map((number) => sum / number);
  const increments = floats.map((float) => (float ? 0.001 : 1));

  let currentValues = starts.slice(); // Copy of starts to mutate
  let maxIterations = 100000000; // Set a maximum number of iterations to avoid infinite loops
  let iteration = 0;

  while (iteration < maxIterations) {
    if (isSumFound(numbers, currentValues, sum)) {
      return currentValues.map((v) => round(v, 3));
    }

    // Increment the coefficients
    for (let i = 0; i < numbers.length; i++) {
      currentValues[i] += increments[i];
      if (currentValues[i] < limits[i]) {
        break; // Break if within the limit, continue incrementing
      } else if (i < numbers.length - 1) {
        currentValues[i] = starts[i]; // Reset and carry the increment to the next coefficient
      } else {
        return null; // Return null if all possible combinations are exhausted
      }
    }
    iteration++;
  }

  return null; // Safety return in case of reaching max iterations
}

function isSumFound(numbers, currentValues, targetSum) {
  const currentSum = numbers.reduce(
    (acc, coeff, index) => acc + coeff * currentValues[index],
    0
  );
  return Math.abs(currentSum - targetSum) < 0.001;
}

function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}
