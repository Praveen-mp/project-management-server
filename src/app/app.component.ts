import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Project-management';
  isAdmin = localStorage.getItem('role') === 'admin';

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
  projects() {
    console.log('hello')
    this.router.navigate(['/projects'])
  }
}
