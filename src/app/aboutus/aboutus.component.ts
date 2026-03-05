import { Component, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css',
})
export class AboutComponent implements AfterViewInit {
  
  @ViewChild('reviewSection') reviewSection!: ElementRef;
  @ViewChild('reviewsContainer') reviewsContainer!: ElementRef;
  isReviewVisible: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    const options = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === this.reviewSection?.nativeElement) {
            this.isReviewVisible = true;
          }
          entry.target.classList.add('active');
          this.cdr.detectChanges();
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (this.reviewSection) observer.observe(this.reviewSection.nativeElement);

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      observer.observe(el);
    });
  }

 
  
}