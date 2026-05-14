import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-guidance',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './guidance.component.html',
  styleUrls: ['./guidance.component.css'],
})
export class GuidanceComponent implements OnInit {

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Medical Career Consultancy | Global Roadmap Guidance - Flygulf');
  }

}