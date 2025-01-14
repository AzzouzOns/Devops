import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './loginadmin/loginadmin.component';
import { LoginadminRoutingModule } from './loginadmin-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginadminRoutingModule,
    FormsModule
  ]
})
export class LoginadminModule { }
