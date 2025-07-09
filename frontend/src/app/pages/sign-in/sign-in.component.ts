import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, logUser } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  isLoading = signal<boolean>(false);
  showMessage = signal<boolean>(false);
  slideInMessage = signal<boolean>(false);
  responseMessage = signal<string>('');
  errorMessage = signal<string>('');
  showErrorMessage = signal<boolean>(false);

  constructor(private authService: AuthService, private router: Router) {}

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      validators: [Validators.required]
    })
  })

  onSubmit() {
    if (this.form.invalid) {
      return
    }
    
    this.isLoading.set(true)

    const userCredentials : logUser = {
      email: this.form.controls.email.value,
      password: this.form.controls.password.value
    }

    this.authService.loginUser(userCredentials)
      .subscribe({
        next: ({ message }) => {
          console.log(message)
          this.responseMessage.set(message)
          this.showMessage.set(true)
          setTimeout(()=> {
            this.slideInMessage.set(true);
            this.isLoading.set(false);
          }, 1000)

          setTimeout(()=> {
            this.router.navigate(["/"])
          }, 2500)
        },
        error: (error) => {
          const message = error.error?.message || "An unexpected error occurred.";
          this.errorMessage.set(message)
          this.showErrorMessage.set(true)
          setTimeout(()=> {
            this.slideInMessage.set(true);
            this.isLoading.set(false);
          }, 1000)
        }
      })
  }
}
