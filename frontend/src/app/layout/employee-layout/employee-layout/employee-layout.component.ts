import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/views/services/task.service';

@Component({
  selector: 'app-employee-layout',
  templateUrl: './employee-layout.component.html',
  styleUrls: ['./employee-layout.component.css']
})
export class EmployeeLayoutComponent implements OnInit {
  tasksDone: number = 0;
  tasksInProgress: number = 0;
  tasksToDo: number = 0;

  messageCategory: string = 'technical';
  messageContent: string = '';

  constructor(private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTaskStatistics();
  }

  loadTaskStatistics(): void {
    this.taskService.getMyTasks().subscribe(tasks => {
      this.calculateTaskStatistics(tasks);
    });
  }

  calculateTaskStatistics(tasks: any[]): void {
    console.log('Tasks received:', tasks);
    this.tasksDone = tasks.filter(task => task.status.toLowerCase() === 'done').length;
    this.tasksInProgress = tasks.filter(task => task.status.toLowerCase() === 'in_progress').length;
    this.tasksToDo = tasks.filter(task => task.status.toLowerCase() === 'todo').length;

    console.log('Tasks Done:', this.tasksDone);
    console.log('Tasks In Progress:', this.tasksInProgress);
    console.log('Tasks To Do:', this.tasksToDo);
  }

  sendMessage(): void {
    console.log('Message sent:');
    console.log('Category:', this.messageCategory);
    console.log('Content:', this.messageContent);
    this.messageCategory = 'technical';
    this.messageContent = '';
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/register']);
  }
}
