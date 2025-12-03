// import { Component, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'about-root',
//   templateUrl: './about.html',
//   styleUrl: './about.component.css', // Better to have a specific CSS file
//   imports: [CommonModule, FormsModule] 
// })
// export class About {
  
// }

import { Component } from '@angular/core';

@Component({
  selector: 'about-root',
  templateUrl: './about.html',
  styleUrl: '../app.css'
  // Remove the 'imports' property
})
export class About {
  
}