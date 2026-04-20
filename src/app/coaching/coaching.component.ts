import { Component, OnInit } from '@angular/core'; // Added OnInit
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser'; // Added Title service

@Component({
  selector: 'app-coaching',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './coaching.component.html',
  styleUrl: './coaching.component.css',
})
export class CoachingComponent implements OnInit { // Added 'implements OnInit'

  constructor(private titleService: Title) {} // Injected the Title service

  ngOnInit(): void {
    // This sets the text in the browser tab
    this.titleService.setTitle('Licensing Exam Coaching | Prometric, DHA & MOH Experts - Flygulf');
  }

}