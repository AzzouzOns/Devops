import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllemployeesRoutingModule } from './allemployees-routing.module';
import { AllemployeesComponent } from './allemployees.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AllemployeesComponent
  ],
  imports: [
    CommonModule,
    AllemployeesRoutingModule,
    FormsModule
  ]
})
export class AllemployeesModule { }
