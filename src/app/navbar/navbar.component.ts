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
  private closeTimeout: any = null;

  courseLinks = [
    // Clinical Courses
    { label: 'ACLS', route: '/course/acls', icon: '🫀' },
    { label: 'BLS', route: '/course/bls', icon: '❤️' },
    { label: 'PALS', route: '/course/pals', icon: '👶' },
    { label: 'NRP', route: '/course/nrp', icon: '🍼' },
    { label: 'Heartsaver', route: '/course/heartsaver', icon: '💝' },
    { label: 'ECG Interpretation', route: '/course/ecg', icon: '📊' },
    { label: 'Critical Care', route: '/course/critical-care', icon: '🏥' },
    { label: 'EMT', route: '/course/emt', icon: '🚑' },
    
    // Licensing Exams
    { label: 'DHA Exam Prep', route: '/course/dha', icon: '📋' },
    { label: 'DOH / HAAD', route: '/course/haad', icon: '🏅' },
    { label: 'MOH Saudi Arabia', route: '/course/moh', icon: '🌍' },
    { label: 'Saudi Prometric', route: '/course/saudi-prometric', icon: '🇸🇦' },
    { label: 'Qatar Prometric', route: '/course/qatar-prometric', icon: '🇶🇦' },
    { label: 'Oman Prometric', route: '/course/oman-prometric', icon: '🇴🇲' },
    { label: 'Kuwait Prometric', route: '/course/kuwait-prometric', icon: '🇰🇼' },
    { label: 'Bahrain Prometric', route: '/course/bahrain-prometric', icon: '🇧🇭' },
    
    // Language Tests
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

  // Toggle dropdown without navigating
  toggleCoursesDropdown(): void {
    this.isCoursesOpen = !this.isCoursesOpen;
  }

  // Used by dropdown links — closes dropdown without interfering with router navigation
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
    // Delay closing so mouse can travel into the dropdown panel without it disappearing
    this.closeTimeout = setTimeout(() => {
      this.isCoursesOpen = false;
    }, 150);
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