import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:3002/api/users';

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      tap(data => console.log('Employees:', data)), // Log for debugging
      catchError(this.handleError<any[]>('getEmployees', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Log the error to the console
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }
}
