import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule // Assurez-vous d'importer FormsModule ici
  ],
  exports: [
    RegisterComponent
  ]
})
export class SharedModule { }
