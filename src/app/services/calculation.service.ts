import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public run(
    numbers: number[],
    floats: boolean[],
    starts: number[],
    sum: number,
    maxIterations: number,
    precision: number,
  ): number[] | null {
    const limits = numbers.map((number: number) => sum / number);
    const increments = floats.map((float: boolean) => (float ? precision : 1));

    let currentValues = starts.slice(); // Copy of starts to mutate
    let iteration = 0;

    while (iteration < maxIterations) {
      if (this.isSumFound(numbers, currentValues, sum, precision)) {
        return currentValues.map((value: number) => this.round(value, 3));
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
    targetSum: number,
    precision: number,
  ): boolean {
    const currentSum = numbers.reduce(
      (acc: number, coeff: number, index: number) =>
        acc + coeff * currentValues[index],
      0,
    );
    return Math.abs(currentSum - targetSum) < precision;
  }

  private round(value: number, decimals: number): number {
    return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
  }
}
