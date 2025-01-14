import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisteradminComponent } from './registeradmin.component';

const routes: Routes = [
  { path: '', component: RegisteradminComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisteradminRoutingModule { }
