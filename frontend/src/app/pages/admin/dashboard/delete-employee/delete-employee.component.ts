import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-employee',
  imports: [],
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.css'
})
export class DeleteEmployeeComponent implements OnInit {
  ngOnInit(): void {
    console.log("i am getting rendered. ")
  }
}
