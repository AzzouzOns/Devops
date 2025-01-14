import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employeetask',
  templateUrl: './employeetask.component.html',
  styleUrls: ['./employeetask.component.css']
})
export class EmployeetaskComponent implements OnInit {
  id: string = '';
  tasks: any[] = [];
  paginatedTasks: any[] = [];
  currentPage = 1;
  itemsPerPage = 8;
  messageErr = '';
  showModal = false;
  isEditing = false;
  selectedTask: any = {};

  constructor(private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.loadTasks();
    });
  }

  loadTasks(): void {
    this.taskService.getTasksByEmployee(this.id).subscribe(
      (response: any[]) => {
        this.tasks = response;
        this.updatePaginatedTasks();
      },
      (err: HttpErrorResponse) => {
        this.messageErr = "This employee has no tasks";
      }
    );
  }

  updatePaginatedTasks(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTasks = this.tasks.slice(startIndex, endIndex);
  }

  setPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.updatePaginatedTasks();
  }

  totalPages(): number {
    return Math.ceil(this.tasks.length / this.itemsPerPage);
  }

  getStatusClass(status: string): string {
    console.log('Status received:', status); 
    switch (status.toLowerCase()) {
      case 'to do':
      case 'todo': 
        return 'status-todo';
      case 'in progress':
      case 'in_progress': 
        return 'status-in-progress';
      case 'done':
        return 'status-done';
      default:
        return '';
    }
  }
  
  
  
  

  deleteTask(taskId: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe(
        () => {
          this.loadTasks();
          console.log('Task deleted successfully');
        },
        (err: HttpErrorResponse) => {
          console.error('Error deleting task', err);
        }
      );
    }
  }

  editTask(task: any): void {
    this.selectedTask = { ...task };
    this.isEditing = true;
    this.showModal = true;
  }

  openAddTaskModal(): void {
    this.selectedTask = {};
    this.isEditing = false;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.isEditing = false;
    this.selectedTask = {};
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    if (this.isEditing) {
      this.taskService.updateTaskForAdmin(this.selectedTask.id, this.selectedTask).subscribe(
        (response: any) => {
          console.log('Task updated successfully', response);
          this.loadTasks();
          this.closeModal();

          // Déplacez la tâche mise à jour en tête de liste
          this.tasks = this.tasks.filter(task => task.id !== this.selectedTask.id);
          this.tasks.unshift(this.selectedTask);
        },
        (error: any) => {
          console.error('Error updating task', error);
        }
      );
    } else {
      // Ajoutez l'ID de l'employé à selectedTask si ce n'est pas déjà fait
      this.selectedTask.employeeId = this.id;

      console.log('Task to add:', this.selectedTask); // Log pour débogage

      this.taskService.addTask(this.selectedTask).subscribe(
        (response: any) => {
          console.log('Task added successfully', response);
          this.loadTasks();
          this.closeModal();
        },
        (error: any) => {
          console.error('Error adding task', error);
          this.messageErr = 'Failed to add task';
        }
      );
    }
  }
}
