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
  isMobileServicesOpen = false;

  private closeTimeout: any = null;
  private closeServicesTimeout: any = null;
  private routerSub!: Subscription;
  courseLinks: any[] = [];

  serviceLinks = [
    { title: 'Documentation', icon: '📁', desc: 'Credential preparation & verification',     route: '/services/documentation' },
    { title: 'Dataflow',      icon: '⚙️',  desc: 'Primary Source Verification (PSV)',         route: '/data-flow' },
    { title: 'Coaching',      icon: '🎓', desc: 'Prometric, DHA, MOH & HAAD exam training', route: '/services/coaching' },
    { title: 'Passport',      icon: '🛂', desc: 'Passport application & renewal',            route: '/services/passport' },
    { title: 'Placement',     icon: '💼', desc: 'Top Gulf healthcare connections',           route: '/services/placement' },
    { title: 'Visa',          icon: '✈️',  desc: 'Work & residency visa documentation',       route: '/services/visa' },
    { title: 'Accommodation', icon: '🏠', desc: 'Safe & comfortable relocation housing',     route: '/services/accomodation' },
    { title: 'Consultancy',   icon: '🤝', desc: 'One-on-one international career guidance',  route: '/services/consultancy' }
  ];

  constructor(private elRef: ElementRef, private courseService: CourseService, private router: Router) {}

  private readonly COURSE_ORDER: string[] = [
    'DOH','MOH','EMT','ACLS','DHA','BLS','PALS',
    'QCHP','OMSB','KMOH','NHRA','SCFHS',
    'OET','IELTS','NCLEX','GERMAN'
  ];

  ngOnInit() {
    this.loadCourses();
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isCoursesOpen = false;
        this.isServicesOpen = false;
        this.isMenuOpen = false;
        this.isMobileCoursesOpen = false;
        this.isMobileServicesOpen = false;
      });
  }

  ngOnDestroy() { if (this.routerSub) this.routerSub.unsubscribe(); }

  loadCourses() {
    this.courseService.getActiveCourses().subscribe({
      next: (courses) => {
        this.courseLinks = courses
          .slice()
          .sort((a: any, b: any) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999))
          .map((c: any) => ({
            shortForm: c.shortForm,
            label: c.courseName,
            route: '/course/' + c.shortForm.toLowerCase(),
            iconUrl: c.logoName ? `http://localhost:8081/flygulf/api/flygulf/courses/${c.id}/image/logo` : null,
            iconEmoji: '📚'
          }));
      },
      error: () => this.courseLinks = []
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) { this.isMobileCoursesOpen = false; this.isMobileServicesOpen = false; }
  }

  closeMenu(): void {
    this.isMenuOpen = false; this.isCoursesOpen = false; this.isServicesOpen = false;
    this.isMobileCoursesOpen = false; this.isMobileServicesOpen = false;
  }

  scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

  // ── Courses ──
  toggleCoursesDropdown(): void { this.isCoursesOpen = !this.isCoursesOpen; this.isServicesOpen = false; }
  closeDropdownOnly(): void { this.isCoursesOpen = false; }
  openCourses(): void {
    if (this.closeTimeout) { clearTimeout(this.closeTimeout); this.closeTimeout = null; }
    this.isCoursesOpen = true; this.isServicesOpen = false;
  }
  closeCourses(): void { this.closeTimeout = setTimeout(() => { this.isCoursesOpen = false; }, 150); }
  toggleMobileCourses(event: Event): void {
    event.preventDefault(); event.stopPropagation();
    this.isMobileCoursesOpen = !this.isMobileCoursesOpen;
    if (this.isMobileCoursesOpen) this.isMobileServicesOpen = false;
  }

  // ── Services ──
  toggleServicesDropdown(): void { this.isServicesOpen = !this.isServicesOpen; this.isCoursesOpen = false; }
  closeServicesOnly(): void { this.isServicesOpen = false; }
  openServices(): void {
    if (this.closeServicesTimeout) { clearTimeout(this.closeServicesTimeout); this.closeServicesTimeout = null; }
    this.isServicesOpen = true; this.isCoursesOpen = false;
  }
  closeServices(): void { this.closeServicesTimeout = setTimeout(() => { this.isServicesOpen = false; }, 150); }
  toggleMobileServices(event: Event): void {
    event.preventDefault(); event.stopPropagation();
    this.isMobileServicesOpen = !this.isMobileServicesOpen;
    if (this.isMobileServicesOpen) this.isMobileCoursesOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isCoursesOpen = false; this.isServicesOpen = false;
      this.isMenuOpen = false; this.isMobileCoursesOpen = false; this.isMobileServicesOpen = false;
    }
  }
}