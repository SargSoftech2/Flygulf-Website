import { Component, ViewChild, ElementRef, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { ReviewService, Review } from '../services/review.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  showPopup: boolean = false;
  courses: any[] = [];
  displayCourses: any[] = [];
  reviews: Review[] = [];

  enquiryData = { name: '', email: '', course: '', message: '' };
  popupData = { name: '', email: '', phone: '', course: '' };
  enquirySuccess = false;
  popupSuccess = false;

  @ViewChild('academySection') academySection!: ElementRef;
  isAcademyVisible: boolean = false;

  @ViewChild('serviceSection') serviceSection!: ElementRef;
  isServiceVisible: boolean = false;

  @ViewChild('reviewSection') reviewSection!: ElementRef;
  isReviewVisible: boolean = false;

constructor(
  private cdr: ChangeDetectorRef,
  private courseService: CourseService,
  private reviewService: ReviewService,
  private titleService: Title,
  private meta: Meta
) {}

  ngOnInit() {

  // SEO FIX: Updated to a longer, comprehensive, keyword-rich title
  this.titleService.setTitle(
    'FlyGulf International Career Academy | Global Healthcare Certification & Training'
  );

  // SEO FIX: Expanded description tag to provide sufficient keyword context for crawlers
  this.meta.updateTag({
    name: 'description',
    content:
      'FlyGulf International Career Academy is a leading healthcare education institute preparing professionals for DHA, MOH, HAAD, NCLEX, ACLS, BLS, PALS, OET, and IELTS. Start your global medical career with expert coaching.'
  });

  this.loadCourses();

    
    // Fetch only 3 text reviews from API safely
    this.reviewService.getAllReviews().subscribe({
      next: (apiReviews) => {
        if (apiReviews && apiReviews.length > 0) {
          const textReviews = apiReviews.filter(r => !r.hasVideo);
          this.reviews = textReviews.slice(0, 3);
        }
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Home: Error fetching reviews:', error);
      }
    });

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

  private readonly COURSE_ORDER = [
    'DOH','MOH','EMT','ACLS','DHA','BLS','PALS',
    'QCHP','OMSB','KMOH','NHRA','SCFHS',
    'OET','IELTS','NCLEX','GERMAN'
  ];

  loadCourses() {
    this.courseService.getActiveCourses().subscribe({
      next: (courses) => {
        if (!courses || !Array.isArray(courses) || courses.length === 0) {
            console.warn('⚠️ No active courses found in the database. Grid will be empty.');
            this.courses = [];
            this.displayCourses = [];
            return; 
        }

        console.log('✅ API successfully returned courses:', courses.length);

        const sorted = courses.slice().sort((a: any, b: any) => {
          const shortA = a.shortForm ? a.shortForm.toUpperCase() : '';
          const shortB = b.shortForm ? b.shortForm.toUpperCase() : '';
          
          const ai = a.sortOrder ?? (this.COURSE_ORDER.indexOf(shortA) + 1 || 9999);
          const bi = b.sortOrder ?? (this.COURSE_ORDER.indexOf(shortB) + 1 || 9999);
          return ai - bi;
        });
        
        this.courses = sorted;
        this.displayCourses = sorted.slice(0, 6);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('❌ Failed to load courses from API:', err); 
        this.courses = [];
        this.displayCourses = [];
      }
    });
  }

  getProfilePicUrl(review: Review): string {
    if (!review || !review.id) return 'images/default-avatar.png';
    return review.hasProfilePic 
      ? this.reviewService.getProfilePicUrl(review.id)
      : 'images/default-avatar.png';
  }

  getStars(rating: number) {
    return Array(rating || 5).fill(0);
  }

  blockNonNumeric(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
    if (allowedKeys.includes(event.key)) return;
    if (event.ctrlKey || event.metaKey) return;
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  onPhonePaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text') ?? '';
    let digits = pasted.replace(/\D/g, '');
    if (digits.length > 0 && !/^[6-9]/.test(digits)) digits = '';
    digits = digits.substring(0, 10);
    const input = event.target as HTMLInputElement;
    input.value = digits;
    this.popupData.phone = digits;
  }

  sanitizePhone(event: Event): void {
    const input = event.target as HTMLInputElement;
    let cleaned = input.value.replace(/\D/g, '');
    if (cleaned.length > 0 && !/^[6-9]/.test(cleaned)) cleaned = '';
    cleaned = cleaned.substring(0, 10);
    input.value = cleaned;
    this.popupData.phone = cleaned;
  }

  onEnquirySubmit(form: NgForm) {
    if (form.invalid) return;
    this.enquirySuccess = true;
    setTimeout(() => {
      this.enquirySuccess = false;
      form.resetForm();
      this.enquiryData = { name: '', email: '', course: '', message: '' };
    }, 3000);
  }

  onPopupSubmit(form: NgForm) {
    if (form.invalid) return;
    this.popupSuccess = true;
    setTimeout(() => {
      this.popupSuccess = false;
      this.showPopup = false;
      form.resetForm();
      this.popupData = { name: '', email: '', phone: '', course: '' };
    }, 2000);
  }
}