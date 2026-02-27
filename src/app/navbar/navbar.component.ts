import { Component, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuOpen = false;
  isCoursesOpen = false;
  isMobileCoursesOpen = false;

  courseLinks = [
    { label: 'ACLS', route: '/course/acls', icon: '🫀' },
    { label: 'BLS', route: '/course/bls', icon: '❤️' },
    { label: 'PALS', route: '/course/pals', icon: '👶' },
    { label: 'NRP', route: '/course/nrp', icon: '🏥' },
    { label: 'DHA Exam Prep', route: '/course/dha', icon: '📋' },
    { label: 'HAAD / DOH', route: '/course/haad', icon: '🏅' },
    { label: 'MOH Saudi Arabia', route: '/course/moh', icon: '🌍' },
    { label: 'OET', route: '/course/oet', icon: '📝' },
    { label: 'IELTS', route: '/course/ielts', icon: '🎓' },
  ];

  constructor(private elRef: ElementRef) {}

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

  openCourses(): void {
    this.isCoursesOpen = true;
  }

  closeCourses(): void {
    this.isCoursesOpen = false;
  }

  toggleMobileCourses(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.isMobileCoursesOpen = !this.isMobileCoursesOpen;
  }

  // ✅ FIX: Only close dropdown when clicking OUTSIDE the navbar element
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isCoursesOpen = false;
      this.isMenuOpen = false;
      this.isMobileCoursesOpen = false;
    }
  }
}