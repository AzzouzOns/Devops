import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { TaskStatus } from '../../enums/task-status.enum';
import { HttpErrorResponse } from '@angular/common/http'; 
import { EmployeeLayoutComponent } from 'src/app/layout/employee-layout/employee-layout/employee-layout.component';

@Component({
  selector: 'app-employee-tasks',
  templateUrl: './employee-tasks.component.html',
  styleUrls: ['./employee-tasks.component.css']
})
export class EmployeeTasksComponent implements OnInit {
  tasks: any[] = [];
  messageErr: string = '';
  statusOptions = Object.values(TaskStatus);
  currentPage: number = 1;
  tasksPerPage: number = 10;

  constructor(private taskService: TaskService, private layoutComponent: EmployeeLayoutComponent) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getMyTasks().subscribe(
      (tasks: any[]) => {
        this.tasks = tasks.map(task => ({
          ...task,
          isEditing: false
        }));
        this.layoutComponent.calculateTaskStatistics(this.tasks);
      },
      (error: any) => {
        console.error('Error loading tasks', error);
        this.messageErr = 'Error loading tasks'; // Affiche un message d'erreur si la requête échoue
      }
    );
  }

  onStatusChange(task: any, event: Event): void {
    task.status = (event.target as HTMLSelectElement).value;
  }

  saveTask(task: any): void {
    this.taskService.updateTaskStatus(task.id, task.status).subscribe(
      () => {
        console.log('Task status updated successfully');
        task.isEditing = false;
        this.layoutComponent.calculateTaskStatistics(this.tasks);
      },
      (error) => {
        console.error('Error updating status:', error);
        this.messageErr = 'Error updating status';
      }
    );
  }

  saveAllChanges(): void {
    const tasksToUpdate = this.tasks.filter(task => task.isEditing);
    let updatedCount = 0;

    tasksToUpdate.forEach(task => {
      this.taskService.updateTaskStatus(task.id, task.status).subscribe(
        () => {
          console.log('Task status updated successfully');
          task.isEditing = false;
          updatedCount++;
          if (updatedCount === tasksToUpdate.length) {
            this.layoutComponent.calculateTaskStatistics(this.tasks);
          }
        },
        (error) => {
          console.error('Error updating status:', error);
          this.messageErr = 'Error updating status';
        }
      );
    });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case TaskStatus.TODO:
        return 'status-todo';
      case TaskStatus.IN_PROGRESS:
        return 'status-in-progress';
      case TaskStatus.DONE:
        return 'status-done';
      default:
        return '';
    }
  }

  getPaginatedTasks(): any[] {
    const startIndex = (this.currentPage - 1) * this.tasksPerPage;
    return this.tasks.slice(startIndex, startIndex + this.tasksPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  getTotalPages(): number {
    return Math.ceil(this.tasks.length / this.tasksPerPage);
  }
}
