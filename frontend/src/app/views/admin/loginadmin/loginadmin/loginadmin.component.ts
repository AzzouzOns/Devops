import { Component } from '@angular/core';
import { AuthadminService } from '../../../services/authadmin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginComponent {
  constructor(private authadminService: AuthadminService, private router: Router) {}

  loginadmin(form: any) {
    this.authadminService.login(form.value).subscribe(response => {
      const token = response.token;
      localStorage.setItem('token', token);
  
      const role = response.user.role;
      if (role === 'admin') {
        this.router.navigate(['/admin/allemployees']);
      } else {
        // Handle employee login
      }
    }, error => {
      // Handle login error
    });
  }
}
