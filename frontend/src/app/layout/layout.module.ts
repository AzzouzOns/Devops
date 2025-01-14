import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { RouterModule } from '@angular/router';
import { AuthAdminLayoutComponent } from './auth-admin-layout/auth-admin-layout.component';
import { FormsModule } from '@angular/forms';
import { EmployeeLayoutComponent } from './employee-layout/employee-layout/employee-layout.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    AuthAdminLayoutComponent,
    EmployeeLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
    
  ]
})
export class LayoutModule { }
