import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalculatedNumber } from './models/number.model';
import { FormsModule } from '@angular/forms';
import { CalculatorService } from './services/calculation.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public readonly initialNumbersQuantity: number = 3;

  public sum: number;
  public numbers: CalculatedNumber[] = [];
  public showError: boolean = false;
  public maxIterations: number = 100000000;
  public precision: number = 0.001;

  public constructor(private calculatorService: CalculatorService) {
    this.sum = 100;
    for (let i = 0; i < this.initialNumbersQuantity; i++) {
      this.addNumber();
    }
  }

  addNumber() {
    this.numbers.push({
      id: this.numbers.length + 1,
      value: 1,
      startSearchFrom: 1,
      isFloat: false,
      result: null,
    });
  }

  removeLastNumber() {
    if (this.numbers.length > 0) {
      this.numbers.pop();
    }
  }

  startCalculation() {
    const nums = this.numbers.map((numberObj) => numberObj.value);
    const floats = this.numbers.map((numberObj) => numberObj.isFloat);
    const startFrom = this.numbers.map(
      (numberObj) => numberObj.startSearchFrom
    );

    const result = this.calculatorService.run(
      nums,
      floats,
      startFrom,
      this.sum,
      this.maxIterations,
      this.precision
    );

    if (result) {
      for (let i = 0; i < result.length; i++) {
        this.numbers[i].result = result[i];
      }
    }

    this.showError = !Boolean(result);
  }
}
