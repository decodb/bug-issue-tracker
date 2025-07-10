import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { OverviewComponent } from './pages/admin/dashboard/overview/overview.component';
import { authGuard } from './guards/authGuard/auth.guard';
import { EmployeeComponent } from './pages/admin/dashboard/employee/employee.component';
import { DeleteEmployeeComponent } from './pages/admin/dashboard/delete-employee/delete-employee.component';
import { AddEmployeeComponent } from './pages/admin/dashboard/add-employee/add-employee.component';
import { adminGuard } from './guards/adminGuard/admin.guard';
import { EmployeesComponent } from './pages/admin/dashboard/employees/employees.component';

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
                        path: ':id', // View single employee
                        component: EmployeeComponent
                    },
                    {
                        path: ':id/delete', // Delete employee
                        component: DeleteEmployeeComponent
                    },
                    {
                        path: 'add', // Add new employee (consistent path)
                        component: AddEmployeeComponent
                    }
                ]
            }
        ]
    }
];
