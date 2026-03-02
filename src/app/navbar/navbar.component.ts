import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  isCoursesOpen = false;
  isMobileCoursesOpen = false;
  private closeTimeout: any = null;
  courseLinks: any[] = [];

  constructor(private elRef: ElementRef, private courseService: CourseService) {}

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

  closeMenu(): void {
    this.isMenuOpen = false;
    this.isCoursesOpen = false;
    this.isMobileCoursesOpen = false;
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
    this.isCoursesOpen = true;
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isCoursesOpen = false;
      this.isMenuOpen = false;
      this.isMobileCoursesOpen = false;
    }
  }
}