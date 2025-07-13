import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { OverviewComponent } from './pages/admin/dashboard/overview/overview.component';
import { authGuard } from './guards/authGuard/auth.guard';
import { DeleteEmployeeComponent } from './pages/admin/dashboard/emps/delete-employee/delete-employee.component';
import { AddEmployeeComponent } from './pages/admin/dashboard/emps/add-employee/add-employee.component';
import { adminGuard } from './guards/adminGuard/admin.guard';
import { EmployeesComponent } from './pages/admin/dashboard/emps/employees/employees.component';
import { ProjectsComponent } from './pages/admin/dashboard/projects/projects.component';
import { CreateProjectComponent } from './pages/admin/dashboard/projects/create-project/create-project.component';
import { ProjectComponent } from './pages/admin/dashboard/projects/project/project.component';
import { UpdateProjectComponent } from './pages/admin/dashboard/projects/update-project/update-project.component';
import { DeleteProjectComponent } from './pages/admin/dashboard/projects/delete-project/delete-project.component';
import { CreateIssueComponent } from './pages/admin/dashboard/issues/create-issue/create-issue.component';
import { IssuesComponent } from './pages/admin/dashboard/issues/issues.component';
import { UpdateIssueComponent } from './pages/admin/dashboard/issues/update-issue/update-issue.component';
import { AddDeveloperComponent } from './pages/admin/dashboard/projects/add-developer/add-developer.component';
import { ConfirmAddDevComponent } from './pages/admin/dashboard/projects/confirm-add-dev/confirm-add-dev.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    },
    {
        path: 'sign-in',
        component: SignInComponent
    },
    {
        path: 'admin',
        component: DashboardComponent,
        canActivate: [authGuard, adminGuard], // Guards apply to all children
        children: [
            {
                path: 'overview',
                component: OverviewComponent
            },
            {
                path: 'employees',
                component: EmployeesComponent,
                children: [
                    {
                        path: 'add', // Add new employee (consistent path)
                        component: AddEmployeeComponent
                    },
                    {
                        path: ':id/delete', // Delete employee
                        component: DeleteEmployeeComponent
                    }
                ]
            },
            {
                path: 'projects',
                component: ProjectsComponent,
                canActivate: [authGuard, adminGuard],
                children: [
                    {
                        path: 'create-project',
                        component: CreateProjectComponent
                    }, 
                    {
                        path: ':id',
                        component: ProjectComponent,
                        children: [
                            {
                                path: 'devs',
                                component: AddDeveloperComponent,
                                children: [
                                    {
                                        path: ':devId',
                                        component: ConfirmAddDevComponent
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: ':id/update',
                        component: UpdateProjectComponent,
                        children: [
                            {
                                path: 'createIssue',
                                component: CreateIssueComponent
                            }
                        ]
                    },
                    {
                        path: ':id/delete',
                        component: DeleteProjectComponent
                    }
                ]
            },
            {
                path: 'issues',
                component: IssuesComponent,
                canActivate: [authGuard, adminGuard],
                children: [
                    {
                        path: ':id/update',
                        component: UpdateIssueComponent
                    }
                ]
            }
        ]
    }
];
