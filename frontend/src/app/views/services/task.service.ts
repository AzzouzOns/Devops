import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3002/api/tasks'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) {}

  private getToken(): string {
    return localStorage.getItem('token') || ''; // Assurez-vous que le token est bien stocké dans localStorage
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
  }

  getTasksByEmployee(employeeId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employee/${employeeId}`, {
      headers: this.getAuthHeaders()
    });
  }

  updateTaskForAdmin(taskId: number, taskData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${taskId}`, taskData, {
      headers: this.getAuthHeaders()
    });
  }

  updateTaskStatus(taskId: number, newStatus: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${taskId}/status`, { status: newStatus }, {
      headers: this.getAuthHeaders()
    });
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`, {
      headers: this.getAuthHeaders()
    });
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/`, task, {
      headers: this.getAuthHeaders()
    });
  }

  getMyTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/my-tasks`, {
      headers: this.getAuthHeaders()
    });
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(data => console.log('Tasks:', data)), // Log for debugging
      catchError(this.handleError<any[]>('getTasks', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Log the error to the console
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }
}
