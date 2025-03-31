import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-projectlist',
  imports: [CommonModule, FormsModule],
  templateUrl: './projectlist.component.html',
  styleUrl: './projectlist.component.css'
})
export class ProjectlistComponent {
  projects: any[] = [];
  isAdmin = localStorage.getItem('role') === 'admin';

  constructor(private http: HttpClient, private socket: Socket, private projectservice: ProjectService, private router: Router) {
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
  }

  ngOnInit() {
    this.fetchProjects();
    this.socket.on('project-updated', () => this.fetchProjects());
  }

  fetchProjects() {
    this.projectservice.getProjects().subscribe((project)=>{
        this.projects = project;
    })
  }

  editProject(project: any) {
    console.log("project->",project);
    this.router.navigate(['/project-form'], { state: { project } });
  }

  deleteProject(id: string) {
    if (confirm('Are you sure you want to delete this project?')) { // 🛑 Confirm before deleting
      this.projectservice.deleteProject(id).subscribe(
        () => {
          console.log('Project deleted successfully');
          this.fetchProjects(); // ✅ Refresh project list after delete
        },
        (error) => {
          console.error('Error deleting project:', error); // 🔍 Log any errors
        }
      );
    }
  }

  navigateToForm() {
    // Navigate to form page
    this.router.navigate(['/project-form']);
  }
}
