import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthadminService {
  private apiUrl = 'http://localhost:3002/api/auth'; // URL de l'API

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((data: any) => {
        if (data && data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role); // Stocker le rôle dans le localStorage
        }
      })
    );
  }

  register(userData: { name: string, email: string, password: string, role: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }
}
