import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Project, ProjectService } from '../../../../../services/projects.service';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-create-project',
  imports: [RouterLink, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
  private projectsService = inject(ProjectService);
  private authService = inject(AuthService);

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
  });

  onSubmit() {
    if(this.form.invalid) { return }

    const projectInfo : Project = {
      name: this.form.controls.name.value,
      description: this.form.controls.description.value,
      status: this.form.controls.status.value
    }

    this.projectsService.createProject(projectInfo)
        .subscribe({
          next: (response) => {
            console.log(response)
          },
          error: (error) => {
            console.log(error)
            console.log(this.authService.getCurrentUser().id)
          }
        })
    }

}
