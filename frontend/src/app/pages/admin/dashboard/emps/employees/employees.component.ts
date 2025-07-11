import { Component, CUSTOM_ELEMENTS_SCHEMA, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DeveloperComponent } from "../../../../../components/developer/developer.component";
import { DevelopersService } from '../../../../../services/developer.service';

@Component({
  selector: 'app-employees',
  imports: [RouterLink, DeveloperComponent, RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {
  developers = signal<any>([])
  private authService = inject(AuthService);
  private devsService = inject(DevelopersService);
  private destroyRef = inject(DestroyRef);
  isLoading = signal<boolean>(true)

  ngOnInit(): void {
    const subscription = this.devsService.getDataWithToken(this.currentUser.userId)
      .subscribe({
        next: ({ data }) => {
          this.developers.set(data)
          setTimeout(() => {
            this.isLoading.set(false)
          }, 1000)
        },
        error: (error) => {
          console.log(error)
          this.isLoading.set(false)
        }
      })

      this.destroyRef.onDestroy(()=> {
        subscription.unsubscribe();
      });
  }

  get currentUser() {
    return this.authService.getCurrentUser();
  }


}
