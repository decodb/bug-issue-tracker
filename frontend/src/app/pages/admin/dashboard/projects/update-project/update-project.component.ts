import { Component, CUSTOM_ELEMENTS_SCHEMA, input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Project, ProjectService } from '../../../../../services/projects.service';

@Component({
  selector: 'app-update-project',
  imports: [ReactiveFormsModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.css'
})
export class UpdateProjectComponent implements OnInit {
  id = input<string>()

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required]
    }),
    description: new FormControl('', {
      validators: [Validators.required]
    }),
    status: new FormControl('', {
      validators: [Validators.required]
    })
  })

  constructor(private router: Router, private projectsService: ProjectService) {}

  ngOnInit(): void {
    this.projectsService.getProject(this.id())
      .subscribe({
        next: ({ data }) => {

          this.form.patchValue({
            name: data.name,
            description: data.description,
            status: data.status
          });
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

  onSubmit() {
    if(this.form.invalid) { return }

    const projectInfo : Project = {
      name : this.form.controls.name.value,
      description : this.form.controls.description.value,
      status: this.form.controls.status.value
    }

    this.projectsService.updateProject(this.id(), projectInfo)
      .subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error) => {
          console.log(error)
        }
      })
  }
}
