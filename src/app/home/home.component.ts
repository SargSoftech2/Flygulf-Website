import { Component, ViewChild, ElementRef, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  showPopup: boolean = false;
  courses: any[] = [];
  displayCourses: any[] = [];

  @ViewChild('academySection') academySection!: ElementRef;
  isAcademyVisible: boolean = false;

  @ViewChild('serviceSection') serviceSection!: ElementRef;
  isServiceVisible: boolean = false;

  @ViewChild('reviewSection') reviewSection!: ElementRef;
  isReviewVisible: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private courseService: CourseService) {}

  ngOnInit() {
    this.loadCourses();
    setTimeout(() => {
      this.showPopup = true;
      this.cdr.detectChanges();
    }, 7000);
  }

  ngAfterViewInit() {
    const options = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === this.academySection?.nativeElement) this.isAcademyVisible = true;
          if (entry.target === this.serviceSection?.nativeElement) this.isServiceVisible = true;
          if (entry.target === this.reviewSection?.nativeElement) this.isReviewVisible = true;
          
          this.cdr.detectChanges();
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (this.academySection) observer.observe(this.academySection.nativeElement);
    if (this.serviceSection) observer.observe(this.serviceSection.nativeElement);
    if (this.reviewSection) observer.observe(this.reviewSection.nativeElement);
  }

  closePopup() {
    this.showPopup = false;
  }

  scrollReviews(container: HTMLElement, direction: number) {
    const scrollAmount = 375;
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  }

  loadCourses() {
    this.courseService.getActiveCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.displayCourses = courses.slice(0, 6);
      },
      error: () => {
        this.courses = [];
        this.displayCourses = [];
      }
    });
  }
}