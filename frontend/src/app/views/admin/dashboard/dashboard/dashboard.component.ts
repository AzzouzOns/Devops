import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/views/services/task.service';
import { EmployeeService } from 'src/app/views/services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalEmployees: number = 0;
  totalTasks: number = 0;
  tasksDone: number = 0;
  tasksInProgress: number = 0;
  tasksToDo: number = 0;

  constructor(private router: Router, private taskService: TaskService, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.loadTaskStatistics();
    this.loadEmployeeStatistics();
  }

  loadTaskStatistics(): void {
    this.taskService.getTasks().subscribe(tasks => {
      console.log('Tasks:', tasks);
      this.totalTasks = tasks.length;
      this.tasksDone = tasks.filter(task => task.status.toLowerCase() === 'done').length;
      this.tasksInProgress = tasks.filter(task => task.status.toLowerCase() === 'in_progress').length;
      this.tasksToDo = tasks.filter(task => task.status.toLowerCase() === 'todo').length;
      console.log('Total Tasks:', this.totalTasks); // Log for debugging
      console.log('Tasks Done:', this.tasksDone); // Log for debugging
      console.log('Tasks In Progress:', this.tasksInProgress); // Log for debugging
      console.log('Tasks To Do:', this.tasksToDo); // Log for debugging
    }, error => {
      console.error('Error loading tasks:', error);
    });
  }

  loadEmployeeStatistics(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      console.log('Employees:', employees);
      this.totalEmployees = employees.length;
      console.log('Total Employees:', this.totalEmployees); // Log for debugging
    }, error => {
      console.error('Error loading employees:', error);
    });
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
