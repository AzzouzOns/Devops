import { Component } from '@angular/core';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  errorMessage: string = '';

  constructor(private authadminService: AuthadminService, private router: Router) {}

  register(f: any): void {
    const userData = {
      name: f.value.name,
      email: f.value.email,
      password: f.value.password,
      role: f.value.role
    };

    this.authadminService.register(userData).subscribe(
      data => {
        if (data && data.token) {
          localStorage.setItem('token', data.token);
          if (userData.role === 'admin') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            // Rediriger vers la page d'accueil ou autre page appropriée pour les employés
            this.router.navigate(['/']);
          }
        } else {
          this.errorMessage = 'Registration failed';
        }
      },
      error => {
        this.errorMessage = 'Registration failed';
        console.error('Error registering', error);
      }
    );
  }

}
