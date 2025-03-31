import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProjectlistComponent } from './projectlist/projectlist.component';
import { ProjectFormComponent } from './project-form/project-form.component';

export const routes: Routes = [ { path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'projects', component: ProjectlistComponent },
{ path: 'project-form', component: ProjectFormComponent }
];

