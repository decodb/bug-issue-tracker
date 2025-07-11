import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DevelopersService } from '../../../../services/developer.service';

@Component({
  selector: 'app-delete-employee',
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.css'
})
export class DeleteEmployeeComponent implements OnInit {
  id = input.required<string>();
  devName = signal<string>('');
  devSurname = signal<string>('');

  constructor(private devsService : DevelopersService, private router : Router) {}
  
  ngOnInit(): void {
    this.devsService.fetchDeveloperById(this.id())
      .subscribe({
        next: ({ data }) => {
          const { name, surname } = data;
          this.devName.set(name);
          this.devSurname.set(surname);
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

  deleteDev() {
    this.devsService.deleteDeveloperById(this.id())
      .subscribe({
        next: (respose) => {
          console.log(respose);
          this.router.navigate(['/admin/employees'])
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

  navigate() {
    this.router.navigate(['/admin/employees'])
  }
}
