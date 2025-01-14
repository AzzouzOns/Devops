import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  name: string = 'Admin';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    localStorage.removeItem('authToken');

    this.router.navigate(['/register']);
  }
}
