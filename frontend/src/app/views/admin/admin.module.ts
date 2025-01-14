import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddTaskComponent } from './add-task/add-task.component';
import { EmployeetaskComponent } from './employeetask/employeetask.component';

@NgModule({
  declarations: [
    EmployeetaskComponent,
    // Autres composants ici
  ],
  imports: [
    CommonModule,
    FormsModule,
    // Autres modules ici
  ],
  exports: [
    EmployeetaskComponent,
    // Autres composants exportés ici
  ]
})
export class AdminModule { }
