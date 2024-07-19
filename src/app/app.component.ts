import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalculatedNumber } from './models/number.model';
import { FormsModule } from '@angular/forms';
import { CalculatorService } from './services/calculation.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public readonly title: string = 'Coefficient calculator';

  numberQuantity: number = 3;
  numbers: CalculatedNumber[] = [];
  sum: number = 123;
  result: string = '';

  public constructor(private calculatorService: CalculatorService) {}

  ngOnInit() {
    this.updateNumbers();
  }

  updateNumbers() {
    this.numbers = Array.from({ length: this.numberQuantity }, (_, index) => ({
      id: index + 1,
      value: 1,
      startSearchFrom: 1,
      isFloat: false,
    }));
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
      this.sum
    );

    if (!result) {
      this.result = 'Не знайдено :(';
    } else {
      this.result = result
        .map((coefficient: any) => `<div>${coefficient}</div>`)
        .join('');
    }
  }
}
