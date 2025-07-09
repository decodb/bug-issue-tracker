import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, regUser } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  message = signal<string>('Hello');
  showMessage = signal<boolean>(false);
  errorMessage = signal<string>('')
  showErrorMessasge = signal<boolean>(false);
  slideInMessage = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  constructor(private router : Router, private authService : AuthService) {}

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

  get isFirstNameInvalid() {
    return this.form.controls.firstName.touched &&
    this.form.controls.firstName.dirty && 
    this.form.controls.firstName.invalid
  }

  get isLastNameInvalid() {
    return this.form.controls.lastName.touched &&
    this.form.controls.lastName.dirty && 
    this.form.controls.lastName.invalid
  }

  get isEmailIvalid() {
    return this.form.controls.email.touched &&
    this.form.controls.email.dirty && 
    this.form.controls.email.invalid
  }

  onSubmit() {
    
    if(this.form.invalid) {
      return;
    }

    this.isLoading.set(true);

    const userCredential : regUser = {
      name: this.form.controls.firstName.value,
      surname: this.form.controls.lastName.value,
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
      role : "manager"
    }

    this.authService.registerUser(userCredential)
      .subscribe({
        next: (res) => {
          console.log(res)
          const { success, message, user } = res;
          this.message.set(message);
          this.showMessage.set(true)
          setTimeout(()=> {
            this.slideInMessage.set(true);
            this.isLoading.set(false);
          }, 1000)

          setTimeout(()=> {
            this.router.navigate(["/sign-in"])
          }, 2500)
        },
        error: (error) => {
          const message = error.error?.message || "An unexpected error occurred.";
          this.errorMessage.set(message)
          this.showErrorMessasge.set(true)
          setTimeout(()=> {
            this.slideInMessage.set(true);
          }, 1000)

          this.isLoading.set(false);
        }
      })
  }
}
