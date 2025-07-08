import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  form = new FormGroup({
    firstName : new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)]
    }),
    lastName : new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)]
    }),
    email : new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password : new FormControl('', {
      validators : [Validators.required, Validators.minLength(6)]
    }),
    confirmPassword : new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    })
  })

  onSubmit() {
    console.log(this.form.value)
    this.form.reset();
  }
}
