import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public run(
    numbers: number[],
    floats: boolean[],
    starts: number[],
    sum: number
  ) {
    const limits = numbers.map((number: any) => sum / number);
    const increments = floats.map((float: any) => (float ? 0.001 : 1));

    let currentValues = starts.slice(); // Copy of starts to mutate
    let maxIterations = 100000000; // Set a maximum number of iterations to avoid infinite loops
    let iteration = 0;

    while (iteration < maxIterations) {
      if (this.isSumFound(numbers, currentValues, sum)) {
        return currentValues.map((v: any) => this.round(v, 3));
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

  private isSumFound(
    numbers: number[],
    currentValues: number[],
    targetSum: number
  ) {
    const currentSum = numbers.reduce(
      (acc: any, coeff: any, index: any) => acc + coeff * currentValues[index],
      0
    );
    return Math.abs(currentSum - targetSum) < 0.001;
  }

  private round(value: number, decimals: number) {
    return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
  }
}
