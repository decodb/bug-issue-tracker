import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { OverviewComponent } from './pages/admin/dashboard/overview/overview.component';
import { authGuard } from './guards/authGuard/auth.guard';
import { EmployeeComponent } from './pages/admin/employee/employee.component';
import { DeleteEmployeeComponent } from './pages/admin/dashboard/delete-employee/delete-employee.component';
import { AddEmployeeComponent } from './pages/admin/dashboard/add-employee/add-employee.component';
import { adminGuard } from './guards/adminGuard/admin.guard';

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
        canActivate: [authGuard, adminGuard],
        children: [
            {
                path: 'overview',
                component: OverviewComponent,
                canActivate: [authGuard, adminGuard]
            },
            {
                path: 'employees',
                component: EmployeeComponent,
                canActivate: [authGuard, adminGuard]
            },
            {
                path: 'employee/:id',
                component: EmployeeComponent,
                canActivate: [authGuard, adminGuard]
            },
            {
                path: 'deleteEmployee/:id',
                component:DeleteEmployeeComponent,
                canActivate: [authGuard, adminGuard]
            },
            {
                path: 'addEmployee',
                component: AddEmployeeComponent,
                canActivate: [authGuard, adminGuard]
            }
        ]
    }
];
