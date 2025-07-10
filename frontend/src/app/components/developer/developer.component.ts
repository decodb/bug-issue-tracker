import { Component, CUSTOM_ELEMENTS_SCHEMA, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-developer',
  imports: [RouterLink, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './developer.component.html',
  styleUrl: './developer.component.css'
})
export class DeveloperComponent {
  devData = input.required<any>();
  managerName = input.required<string>();
  isDropdown = signal<boolean>(false)

  toggleDropdown() {
    this.isDropdown.set(!this.isDropdown());
  }
}
