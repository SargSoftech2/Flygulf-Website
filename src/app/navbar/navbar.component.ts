import { Component, HostListener } from '@angular/core';
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
    { label: 'ACLS', route: '/acls', icon: '🫀' },
    { label: 'BLS', route: '/bls', icon: '❤️' },
    { label: 'PALS', route: '/pals', icon: '👶' },
    { label: 'NRP', route: '/nrp', icon: '🏥' },
    { label: 'DHA Exam Prep', route: '/dha', icon: '📋' },
    { label: 'HAAD / DOH', route: '/haad', icon: '🏅' },
    { label: 'MOH Saudi Arabia', route: '/moh', icon: '🌍' },
    { label: 'OET', route: '/oet', icon: '📝' },
    { label: 'IELTS', route: '/ielts', icon: '🎓' },
  ];

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

  @HostListener('document:click')
  onDocumentClick(): void {
    this.isCoursesOpen = false;
  }
}