import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RegisteradminRoutingModule } from './registeradmin-routing.module';
import { RegisteradminComponent } from './registeradmin.component';

@NgModule({
  declarations: [
    RegisteradminComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RegisteradminRoutingModule
  ]
})
export class RegisteradminModule { }
