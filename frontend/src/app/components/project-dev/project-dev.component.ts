import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';

@Component({
  selector: 'app-project-dev',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './project-dev.component.html',
  styleUrl: './project-dev.component.css'
})
export class ProjectDevComponent {
  dev = input.required<any>()
}
