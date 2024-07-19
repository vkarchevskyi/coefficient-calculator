import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { CalculatedNumber } from '../../models/calculated-number.model';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-numbers',
  standalone: true,
  imports: [
    FormsModule,
    MatCard,
    MatFormField,
    MatLabel,
    MatCardContent,
    CdkDrag,
    CdkDragHandle,
    CdkDropList,
    MatInputModule,
    MatCheckbox,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './numbers.component.html',
  styleUrl: './numbers.component.scss',
})
export class NumbersComponent {
  @Output() public numberDeleted = new EventEmitter<number>();

  @Input() public numbers: CalculatedNumber[] = [];

  @Input() public showError: boolean = false;

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.numbers, event.previousIndex, event.currentIndex);
  }

  public deleteNumber(index: number) {
    this.numberDeleted.emit(index);
  }
}
