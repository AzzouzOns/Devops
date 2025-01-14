import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthadminService } from '../services/authadmin.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  registrationSuccess: boolean = false; // Ajout d'une variable pour suivre le succès de l'inscription
  errorMessage: string = ''; // Ajout d'une variable pour les messages d'erreur

  constructor(private authadminService: AuthadminService) {}

  register(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Please fill out all fields correctly.';
      return;
    }

    const { name, email, password, role } = form.value;
    this.authadminService.register({ name, email, password, role }).subscribe(
      response => {
        // Gérer le succès de l'inscription
        this.registrationSuccess = true;
        this.errorMessage = ''; // Réinitialiser le message d'erreur
        console.log('Registration successful', response);
      },
      error => {
        // Gérer l'erreur d'inscription
        this.registrationSuccess = false;
        this.errorMessage = 'Registration failed. Please try again.';
        console.error('Registration error', error);
      }
    );
  }
}
