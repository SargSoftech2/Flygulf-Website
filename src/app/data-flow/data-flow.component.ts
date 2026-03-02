import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // For structural directives
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-data-flow',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './data-flow.component.html',
  styleUrls: ['./data-flow.component.css']
})
export class DataFlowComponent implements AfterViewInit {

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    const observerOptions = {
      threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once animated, stop observing this element
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Grab all elements with reveal classes and observe them
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-fade');
    revealElements.forEach(el => observer.observe(el));
  }
}