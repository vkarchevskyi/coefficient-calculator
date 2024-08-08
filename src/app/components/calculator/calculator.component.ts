import { Component, OnInit, ViewChild } from '@angular/core';
import { SystemSettingsComponent } from '../system-settings/system-settings.component';
import { CalculatorService } from '../../services/calculation.service';
import { NumbersComponent } from '../numbers/numbers.component';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { CalculatedNumber } from '../../models/calculated-number.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    NumbersComponent,
    FormsModule,
    MatIcon,
    MatFormField,
    MatLabel,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    SystemSettingsComponent,
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent {
  @ViewChild(SystemSettingsComponent) systemSettings!: SystemSettingsComponent;

  // Add local storage
  // Fix issue with one number
  public readonly initialNumbersQuantity: number = 3;
  public numbers: CalculatedNumber[] = [];
  public sum: number;
  public showError: boolean = false;

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

  removeNumber(selectedIndex: number) {
    this.numbers = this.numbers.filter((_, index) => index !== selectedIndex);
  }

  startCalculation() {
    const nums = this.numbers.map((numberObj) => numberObj.value);
    const floats = this.numbers.map((numberObj) => numberObj.isFloat);
    const startFrom = this.numbers.map(
      (numberObj) => numberObj.startSearchFrom,
    );

    const result = this.calculatorService.run(
      nums,
      floats,
      startFrom,
      this.sum,
      this.systemSettings.maxIterations,
      this.systemSettings.precision,
    );

    if (result) {
      for (let i = 0; i < result.length; i++) {
        this.numbers[i].result = result[i];
      }
    }

    this.showError = !Boolean(result);
  }
}
