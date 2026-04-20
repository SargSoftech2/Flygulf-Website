import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For structural directives
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-visa',
  imports: [RouterModule],
  templateUrl: './visa.component.html',
  styleUrl: './visa.component.css',
})
export class VisaComponent implements OnInit { // Implemented OnInit

  // Injected Title service into the constructor
  constructor(private titleService: Title) {}

  ngOnInit(): void {
    // Set the professional title for the browser tab
    this.titleService.setTitle('Work & Residency Visa Processing | Medical Migration - Flygulf');
  }

}