import { Component, CUSTOM_ELEMENTS_SCHEMA, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../../../../services/projects.service';
import { DevelopersService } from '../../../../../services/developer.service';

@Component({
  selector: 'app-confirm-add-dev',
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './confirm-add-dev.component.html',
  styleUrl: './confirm-add-dev.component.css'
})
export class ConfirmAddDevComponent implements OnInit {
  id = input<string>();
  devId = input<string>();
  dev = signal<any>({});
  successMessage = signal<string>('')
  showMessage = signal<boolean>(false);

  constructor(private projectsService: ProjectService, private devsService: DevelopersService) {}

  ngOnInit(): void {
    this.devsService.fetchDeveloperById(this.devId())
      .subscribe({
        next: ({ data }) => {
          this.dev.set(data)
        }, 
        error: (error) => {
          console.log(error)
        }
      })
  }

  add() {
    this.projectsService.addDevToProject(this.id(), this.devId())
      .subscribe({
        next: ({ message }) => {
          this.successMessage.set(message);
          console.log(message)
          this.showMessage.set(true)
        },
        error: (error) => {
          console.log(error)
        }
      })
  }
}
