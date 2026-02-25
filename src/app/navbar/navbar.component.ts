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
    { label: 'ACLS',               route: '/acls',              icon: '🫀' },
    { label: 'BLS',                route: '/bls',               icon: '❤️' },
    { label: 'PALS',               route: '/pals',              icon: '👶' },
    { label: 'EMT',                route: '/emt',               icon: '🚑' },
    { label: 'DHA Exam Prep',      route: '/dha',               icon: '📋' },
    { label: 'DOH / HAAD',         route: '/doh',               icon: '🏅' },
    { label: 'MOH Saudi Arabia',   route: '/moh',               icon: '🌍' },
    { label: 'Qatar Prometric',    route: '/qatar-prometric',   icon: '🇶🇦' },
    { label: 'Oman Prometric',     route: '/oman-prometric',    icon: '🇴🇲' },
    { label: 'Kuwait Prometric',   route: '/kuwait-prometric',  icon: '🇰🇼' },
    { label: 'Bahrain Prometric',  route: '/bahrain-prometric', icon: '🇧🇭' },
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