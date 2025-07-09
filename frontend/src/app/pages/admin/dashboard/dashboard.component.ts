import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private authService = inject(AuthService);

  get currentUser() {
    return this.authService.getCurrentUser();
  }
}
