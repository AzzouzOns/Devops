import { Component } from '@angular/core';
import { AuthadminService } from 'src/app/views/services/authadmin.service'; // Assurez-vous que le chemin est correct
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-admin-layout',
  templateUrl: './auth-admin-layout.component.html',
  styleUrls: ['./auth-admin-layout.component.css']
})
export class AuthAdminLayoutComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authadminService: AuthadminService, private router: Router) {}

  loginadmin(f: any): void {
    const credentials = {
      email: f.value.email,
      password: f.value.password
    };

    this.authadminService.login(credentials).subscribe(
      data => {
        if (data && data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role); 

          if (data.role === 'admin') {
            this.router.navigate(['/admin/allemployees']);
          } else if (data.role === 'employee') {
            this.router.navigate(['/employee/tasks']);
          } else {
            this.errorMessage = 'Unknown role';
          }
        } else {
          this.errorMessage = 'Invalid email or password';
        }
      },
      error => {
        this.errorMessage = 'Invalid email or password';
        console.error('Error logging in', error);
      }
    );
  }
}
