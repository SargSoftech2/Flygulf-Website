import { Component, OnInit } from '@angular/core'; // Added OnInit
import { CommonModule } from '@angular/common'; // For structural directives
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-guidance',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './guidance.component.html',
  styleUrl: './guidance.component.css',
})
export class GuidanceComponent implements OnInit {

constructor(private titleService: Title) {} // Injected the Title service

  ngOnInit(): void {
    // Sets a professional title for the browser tab
    this.titleService.setTitle('Medical Career Consultancy | Global Roadmap Guidance - Flygulf');
  }

}
