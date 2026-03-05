import { Component, OnInit } from '@angular/core'; // 1. Add OnInit here
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser'; // 2. Add this Title import

@Component({
  selector: 'app-accomodation',
  standalone: true, // Ensuring it's marked as standalone if not already
  imports: [CommonModule, RouterModule],
  templateUrl: './accomodation.component.html',
  styleUrl: './accomodation.component.css',
})
export class AccomodationComponent implements OnInit { // 3. Add 'implements OnInit'

  // 4. Inject the Title service in the constructor
  constructor(private titleService: Title) {}

  ngOnInit() {
    // 5. Set the title for the browser tab
    this.titleService.setTitle('Accommodation Services | Healthcare Relocation Support - Flygulf');
  }

}