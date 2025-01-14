import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AuthAdminLayoutComponent } from './layout/auth-admin-layout/auth-admin-layout.component';
import { RegisterComponent } from './views/shared/register/register.component';
import { RegisterPageComponent } from './views/register-page/register-page.component';
import { EmployeeTasksComponent } from './views/employee-tasks/employee-tasks.component';
import { AuthGuard } from './views/services/auth.guard';


import { EmployeeLayoutComponent } from './layout/employee-layout/employee-layout/employee-layout.component';


const routes: Routes = [
  
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  
    //{ path: 'register', loadChildren: () => import('./views/front/register/register.module').then(m => m.RegisterModule) },
    { path: 'register', component:RegisterPageComponent },


    {
      path: 'employee',
      component: EmployeeLayoutComponent,
      children: [
        { path: 'tasks', component: EmployeeTasksComponent }
      ]
    },

  { path: 'admin', component: AdminLayoutComponent, children: [
    { path: '', loadChildren: () => import('./views/admin/dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'dashboard', loadChildren: () => import('./views/admin/dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'allemployees', loadChildren: () => import('./views/admin/allemployees/allemployees.module').then(m => m.AllemployeesModule) },
    { path: 'addemployee', loadChildren: () => import('./views/admin/addemployee/addemployee.module').then(m => m.AddemployeeModule) },
    { path: 'employeetask/:id', loadChildren: () => import('./views/admin/employeetask/employeetask.module').then(m => m.EmployeetaskModule) },
    { path: 'loginadmin', loadChildren: () => import('./views/admin/loginadmin/loginadmin.module').then(m => m.LoginadminModule) },
    { path: 'addtask/:id', loadChildren: () => import('./views/admin/add-task/add-task.module').then(m => m.AddTaskModule) }

  ]},


  //{ path: 'employee', component: EmployeeLayoutComponent, children: [
    //{ path: 'tasks', component: EmployeeTasksComponent, canActivate: [AuthGuard] },  ]},

  { path: 'admin/login', component: AuthAdminLayoutComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
