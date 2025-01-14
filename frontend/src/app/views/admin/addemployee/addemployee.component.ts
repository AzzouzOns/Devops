import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})

export class AddemployeeComponent {
  messageErr = '';

  constructor(private dataService: DataService, private router: Router) {}
  
  addEmployee(form: any): void {
    const employeeData = form.value;
    this.dataService.addEmployee(employeeData).subscribe(
      response => {
        this.router.navigate(['/admin/allemployees']);
      },
      error => {
        this.messageErr = error.error.message;
      }
    );
  }
}
