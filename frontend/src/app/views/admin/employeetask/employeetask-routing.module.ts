import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeetaskComponent } from './employeetask.component';

const routes: Routes = [
  {path:'',component:EmployeetaskComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeetaskRoutingModule { }
