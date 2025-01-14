// Frontend: src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3002/api';

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  addEmployee(profile: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, profile);
  }

  deleteEmployee(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  updateEmployee(id: string, newProfile: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, newProfile);
  }

  // Ajoutez cette méthode si elle manque
  getTasksByEmployee(employeeId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tasks/employee/${employeeId}`);
  }

  // Ajoutez cette méthode dans le service DataService
deleteTask(taskId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/tasks/${taskId}`);
}



updateTask(taskId: number, taskData: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/tasks/${taskId}`, taskData);
}

}