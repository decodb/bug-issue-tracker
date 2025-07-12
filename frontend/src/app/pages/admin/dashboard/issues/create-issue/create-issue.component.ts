import { Component, CUSTOM_ELEMENTS_SCHEMA, input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../../../../services/projects.service';
import { Issue, IssuesService } from '../../../../../services/issues.service';


@Component({
  selector: 'app-create-issue',
  imports: [ReactiveFormsModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './create-issue.component.html',
  styleUrl: './create-issue.component.css'
})
export class CreateIssueComponent implements OnInit {
  id = input<string>()
  project = signal<any>({})

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required]
    }),
    description: new FormControl('', {
      validators: [Validators.required]
    }),
    priority: new FormControl('', {
      validators: [Validators.required]
    })
  })

  constructor(private router: Router, private projectsService: ProjectService,
    private route : ActivatedRoute, private issuesService : IssuesService
  ) {}

  ngOnInit(): void {
    this.projectsService.getProject(this.id())
      .subscribe({
        next: ({ data }) => {
          this.project.set(data);
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

  onSubmit() {
    if(this.form.invalid) { return }

    const data : Issue = {
      title : this.form.controls.name.value,
      description : this.form.controls.description.value,
      priority: this.form.controls.priority.value
    }

    this.issuesService.createIssue(data, this.id())
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
