import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'Student',
    loadComponent: () =>import('../student/student-add.component')
    .then(m => m.StudentComponent)   
  },
  {
    path: 'About',
    loadComponent: () =>import('./about')
    .then(m => m.About)  
  },
  {
    path: 'Home',
    loadComponent: () =>import('./about')
    .then(m => m.About) 
  } 
];
