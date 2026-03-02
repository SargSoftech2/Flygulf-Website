import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // For structural directives
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-coaching',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './coaching.component.html',
  styleUrl: './coaching.component.css',
})
export class CoachingComponent {

}
