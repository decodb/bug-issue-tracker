import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProjectCardComponent } from "../../../../components/project-card/project-card.component";
import { ProjectService } from '../../../../services/projects.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-projects',
  imports: [RouterOutlet, RouterLink, ProjectCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  projects = signal<any>([])

  constructor(private projectsService : ProjectService, private authService : AuthService) {}

  ngOnInit(): void {
    this.projectsService.getProjects(this.authService.getCurrentUser().userId)
      .subscribe({
        next: ({ data }) => {
          console.log(data)
          this.projects.set(data)
        },
        error: (error) => {
          console.log(error)
        }
      })
  }
}
