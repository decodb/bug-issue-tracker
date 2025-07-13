import { Component, CUSTOM_ELEMENTS_SCHEMA, input, OnInit, signal } from '@angular/core';
import { ProjectService } from '../../../../../services/projects.service';
import { RouterLink } from '@angular/router';
import { ProjectDevComponent } from "../../../../../components/project-dev/project-dev.component";

@Component({
  selector: 'app-project',
  imports: [RouterLink, ProjectDevComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  project = signal<any>({});
  devs = signal<any>([])
  id = input<string>()

  constructor(private projectsService: ProjectService) {}

  get devsLength() {
    return this.devs().length <= 0
  }

  ngOnInit(): void {
    this.projectsService.getProject(this.id())
      .subscribe({
        next: ({ data }) => {
          this.project.set(data)
        },
        error: (error) => {
          console.log(error)
        }
      })

      this.projectsService.projectsWithDevs(this.id())
        .subscribe({
          next: ({data}) => {
            this.devs.set(data)
          },
          error: (error) => {
            console.log(error)
          }
        })
  }
  
}
