import { Component, CUSTOM_ELEMENTS_SCHEMA, input, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DevelopersService } from '../../../../../services/developer.service';
import { EmployeeComponent } from '../../../../../components/employee/employee.component';

@Component({
  selector: 'app-add-developer',
  imports: [RouterLink, EmployeeComponent, RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './add-developer.component.html',
  styleUrl: './add-developer.component.css'
})
export class AddDeveloperComponent implements OnInit {
  id = input<string>()
  devs = signal<any>([])

  constructor(private devsService: DevelopersService) {}

  get devsLength() {
    return this.devs().length <= 0
  }

  ngOnInit(): void {
    this.devsService.fetchDevelopers()
      .subscribe({
        next: ({ data }) => {
          this.devs.set(data)
        },
        error: (error) => {
          console.log(error)
        }
      })
  }
}
