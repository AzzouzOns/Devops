// src/app/views/admin/add-task/add-task.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddTaskComponent } from './add-task.component';

@NgModule({
  declarations: [AddTaskComponent], 
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [AddTaskComponent] 
})
export class AddTaskModule { }
