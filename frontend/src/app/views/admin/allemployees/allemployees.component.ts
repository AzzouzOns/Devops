import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-allemployees',
  templateUrl: './allemployees.component.html',
  styleUrls: ['./allemployees.component.css']
})
export class AllemployeesComponent implements OnInit {
  dataArray: any[] = [];
  dataEmployee = {
    name: '',
    email: '',
    password: '',
    role: '',
    id: ''
  };
  messageSuccess = '';
  currentPage: number = 1;
  itemsPerPage: number = 7;
  totalItems: number = 0;

  constructor(private ds: DataService, private router: Router) {}

  ngOnInit(): void {
    this.loadAllEmployees();
  }

  loadAllEmployees(): void {
    this.ds.getAllEmployees().subscribe(
      data => {
        console.log('Employees data:', data);
        this.dataArray = data;
        this.totalItems = data.length;
      },
      error => {
        console.error('Error fetching employees', error);
      }
    );
  }

  delete(id: any, i: number): void {
    console.log('Attempting to delete employee with id:', id);
    if (!id) {
      console.error('Employee ID is undefined');
      return;
    }
    this.ds.deleteEmployee(id).subscribe(
      response => {
        console.log('Delete successful:', response);
        this.dataArray.splice(i, 1);
        this.totalItems--;
      },
      error => {
        console.error('Error deleting employee', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
      }
    );
  }

  getdata(name: string, email: string, password: string, role: string, id: string): void {
    this.messageSuccess = '';
    this.dataEmployee = { name, email, password, role, id };
  }

  updatenewemployee(f: any): void {
    const data = f.value;
    this.ds.updateEmployee(this.dataEmployee.id, data).subscribe(
      response => {
        const indexId = this.dataArray.findIndex((obj: any) => obj.id === this.dataEmployee.id);
        this.dataArray[indexId] = { ...this.dataArray[indexId], ...data };
        this.messageSuccess = `Employee ${this.dataArray[indexId].name} updated successfully`;

        // Fermer le modal après la mise à jour
        ($('#exampleModal') as any).modal('hide');
      },
      error => {
        console.error(error.message);
      }
    );
  }

  getTasksByEmployee(employeeId: string): void {
    this.router.navigate(['/admin/employeetask', employeeId]);
  }

  // Pagination methods
  setPage(page: number): void {
    this.currentPage = page;
  }

  get paginatedData(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.dataArray.slice(start, end);
  }

  totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
}
