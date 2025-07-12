import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal } from '@angular/core';
import { IssueComponent } from "../../../../components/issue/issue.component";
import { IssuesService } from '../../../../services/issues.service';

@Component({
  selector: 'app-issues',
  imports: [IssueComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './issues.component.html',
  styleUrl: './issues.component.css'
})
export class IssuesComponent implements OnInit {
  issues = signal<any>([])

  constructor(private issuesService: IssuesService) {}

  ngOnInit(): void {
    this.issuesService.getIssues()
      .subscribe({
        next: ({ data }) => {
          console.log(data)
          this.issues.set(data)
        }, 
        error: (error) => {
          console.log(error)
        }
      })
  }

}
