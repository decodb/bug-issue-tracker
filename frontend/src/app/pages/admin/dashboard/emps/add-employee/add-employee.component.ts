import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Developer, DevelopersService } from '../../../../../services/developer.service';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-add-employee',
  imports: [RouterLink, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

  private devsService = inject(DevelopersService)
  private router = inject(Router);
  errorMessage = signal<string>('')
  showError = signal<boolean>(false);

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required]
    }),
    surname: new FormControl('', {
      validators: [Validators.required]
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      validators: [Validators.required ,Validators.minLength(3)]
    })
  })

  onSubmit() {
    const devInfo : Developer = {
      name: this.form.controls.name.value,
      surname: this.form.controls.surname.value,
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
      role: "role"
    }

    this.devsService.addDeveloper(devInfo)
      .subscribe({
        next: (response) => {
          console.log(response)
          this.router.navigate(['/admin/employees'])
        },
        error: ({ error }) => {
          const { message } = error;
          this.errorMessage.set(message);
          this.showError.set(true)
        }
      })
  }

  navigate() {
    this.router.navigate(['/admin/employees'])
  }
  
}
