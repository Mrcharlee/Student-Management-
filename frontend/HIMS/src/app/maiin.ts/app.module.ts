import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { About } from './about';

const routes: Routes = [
  { path: '', component: About }
];

@NgModule({
  // declarations: [About],  // remove — About is standalone
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    About // import the standalone component here
  ]
})
export class AboutModule {}