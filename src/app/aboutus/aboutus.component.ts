import { Component, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css',
})
export class AboutComponent implements OnInit, AfterViewInit {
  
  @ViewChild('reviewSection') reviewSection!: ElementRef;
  @ViewChild('reviewsContainer') reviewsContainer!: ElementRef;
  isReviewVisible: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private titleService: Title,
    private meta: Meta
  ) {}
  
  ngOnInit() {
    // SEO FIX: Made title entirely unique from the homepage and strictly targeted
    this.titleService.setTitle(
      'About Us - FlyGulf International Career Academy | Healthcare Training'
    );

    // SEO FIX: Expanded description for better keyword targeting and distinctness
    this.meta.updateTag({
      name: 'description',
      content:
        'Discover FlyGulf International Career Academy. We specialize in global medical training, AHA-certified courses, and international placement for ambitious healthcare professionals.'
    });
  }

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