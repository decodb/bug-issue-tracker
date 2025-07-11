import { Component, CUSTOM_ELEMENTS_SCHEMA, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../../../../services/projects.service';

@Component({
  selector: 'app-delete-project',
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './delete-project.component.html',
  styleUrl: './delete-project.component.css'
})
export class DeleteProjectComponent {
  id = input.required<string>()
  constructor(private projectService : ProjectService, private router: Router){}

  onDelete() {
    this.projectService.deleteProject(this.id())
      .subscribe({
        next: (response) => {
          this.router.navigate(["/admin/projects"])
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

  navigate() {
    this.router.navigate(["/admin/projects"])
  }
}
