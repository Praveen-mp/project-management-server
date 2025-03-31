import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-form',
  standalone: true,  // Add this if using Standalone Components
  imports: [CommonModule, FormsModule, ReactiveFormsModule], // Add ReactiveFormsModule
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent {
  projectForm: FormGroup;
  editingProjectId: string | null = null;

  constructor(private fb: FormBuilder, private projectService: ProjectService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const project = navigation?.extras.state?.['project'];
    console.log("project from the listing->", project)
    this.projectForm = this.fb.group({
      name: [''],
      description: [''],
      startDate: [''],
      endDate: [''],
      status: [''],
      owner: ['']
    });

    if (project) {
      this.editingProjectId = project._id;
      console.log("editingProject->", this.editingProjectId)
      this.projectForm.patchValue(project);
    }
  }

  saveProject() {
    if (this.editingProjectId) {
      // Update existing project
      this.projectService.updateProject(this.editingProjectId, this.projectForm.value).subscribe(
        response => {
          console.log('Project updated:', response);
          this.router.navigate(['/projects']);
        },
        error => {
          console.error('Error updating project:', error);
        }
      );
    } else {
      // Create new project
      console.log("pro",this.projectForm.value);
      this.projectService.createProject(this.projectForm.value).subscribe(
        response => {
          console.log('Project created:', response);
          this.router.navigate(['/projects']);
        },
        error => {
          console.error('Error creating project:', error);
        }
      );
    }
  }
}
