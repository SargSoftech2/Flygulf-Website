import { Component, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {


  isMenuOpen = false;
  isCoursesOpen = false;
  isMobileCoursesOpen = false;
  isServicesOpen = false;
  private closeTimeout: any = null;
  private routerSub!: Subscription;
  courseLinks: any[] = [];

  constructor(private elRef: ElementRef, private courseService: CourseService, private router: Router) {}

  // ── Exact display order for navbar courses ──
  private readonly COURSE_ORDER: string[] = [
    'DOH',
    'MOH',
    'EMT',
    'ACLS',
    'DHA',
    'BLS',
    'PALS',
    'QCHP',    // Qatar Prometric
    'OMSB',    // Oman Prometric
    'KMOH',    // Kuwait Prometric
    'NHRA',    // Bahrain Prometric
    'SCFHS',   // Saudi Prometric
    'OET',
    'IELTS',
    'NCLEX',
    'GERMAN'
  ];

  ngOnInit() {
    this.loadCourses();
    // Close dropdown on every route change
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isCoursesOpen = false;
        this.isMenuOpen = false;
        this.isMobileCoursesOpen = false;
      });
  }

  ngOnDestroy() {
    if (this.routerSub) this.routerSub.unsubscribe();
  }

  loadCourses() {
    this.courseService.getActiveCourses().subscribe({
      next: (courses) => {
        const mapped = courses.map((c: any) => ({
          shortForm: c.shortForm,
          label: c.courseName,
          route: '/course/' + c.shortForm.toLowerCase(),
          iconUrl: c.logoName
            ? `http://localhost:8081/flygulf/api/flygulf/courses/${c.id}/image/logo`
            : null,
          iconEmoji: '📚',
          sortIndex: this.COURSE_ORDER.indexOf(c.shortForm?.toUpperCase())
        }));

        // Sort by defined order — any unknown courses go to end
        this.courseLinks = mapped.sort((a: any, b: any) => {
          const ai = a.sortIndex === -1 ? 999 : a.sortIndex;
          const bi = b.sortIndex === -1 ? 999 : b.sortIndex;
          return ai - bi;
        });
      },
      error: () => this.courseLinks = []
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.isMobileCoursesOpen = false;
    }
  }
  
  toggleServicesDropdown() {
    this.isServicesOpen = !this.isServicesOpen;
    
    // Optional: Close Courses dropdown if Services is opened to avoid overlap
    if (this.isServicesOpen) {
      this.isCoursesOpen = false;
      this.isMobileCoursesOpen = false;
    }
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.isCoursesOpen = false;
    this.isMobileCoursesOpen = false;
    this.isServicesOpen = false;
  }

  toggleCoursesDropdown(): void {
    this.isCoursesOpen = !this.isCoursesOpen;
  }

  closeDropdownOnly(): void {
    this.isCoursesOpen = false;
  }

  openCourses(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
    if (!this.isCoursesOpen) {
      // Scroll page to top when opening dropdown
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    this.isCoursesOpen = true;
    // Reset grid scroll to top
    setTimeout(() => {
      const grid = this.elRef.nativeElement.querySelector('.dropdown-grid');
      if (grid) grid.scrollTop = 0;
    }, 10);
  }

  closeCourses(): void {
    this.closeTimeout = setTimeout(() => {
      this.isCoursesOpen = false;
    }, 150);
  }

  toggleMobileCourses(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.isMobileCoursesOpen = !this.isMobileCoursesOpen;
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isCoursesOpen = false;
      this.isMenuOpen = false;
      this.isMobileCoursesOpen = false;
    }
  }
}