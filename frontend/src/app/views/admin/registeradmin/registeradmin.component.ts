import { Component } from '@angular/core';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registeradmin',
  templateUrl: './registeradmin.component.html',
  styleUrls: ['./registeradmin.component.css']
})
export class RegisteradminComponent {
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
          this.router.navigate(['/admin/dashboard']);
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
