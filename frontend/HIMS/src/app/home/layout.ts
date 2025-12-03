import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'layout-root',
  imports: [RouterOutlet, CommonModule,FormsModule],
  templateUrl: './layout.html',
  styleUrl: './layout.component.css',
  
})
export class LayoutComponent{

}
