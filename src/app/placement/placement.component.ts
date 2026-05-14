import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For structural directives
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-placement',
  imports: [RouterModule],
  templateUrl: './placement.component.html',
  styleUrl: './placement.component.css',
})
export class PlacementComponent implements OnInit { // Implemented OnInit

  constructor(private titleService: Title) {} // Injected Title service

  ngOnInit(): void {
    // Sets the professional text for the browser tab
    this.titleService.setTitle('Global Placement Services | Healthcare Jobs in Gulf & Europe - Flygulf');
  }

}