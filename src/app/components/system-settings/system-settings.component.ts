import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-system-settings',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatLabel,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatInputModule,
    MatCheckbox,
  ],
  templateUrl: './system-settings.component.html',
  styleUrl: './system-settings.component.scss',
})
export class SystemSettingsComponent {
  public maxIterations: number = 100000000;
  public precision: number = 0.001;
  public themeService: ThemeService = inject(ThemeService);
}
