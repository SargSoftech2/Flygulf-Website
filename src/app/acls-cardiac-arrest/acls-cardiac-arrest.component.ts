import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-acls-cardiac-arrest',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './acls-cardiac-arrest.component.html',
  styleUrls: ['./acls-cardiac-arrest.component.css']
})
export class AclsCardiacArrestComponent implements OnInit, AfterViewInit, OnDestroy {
  courseData: any = null;
  loading = true;
  private routeSub!: Subscription;

  bannerImageUrl = '';
  aboutImageUrl  = '';

  private readonly BASE = 'http://localhost:8081/flygulf/api/flygulf/courses';

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private titleService: Title
  ) {}

  overviewChecks: string[] = [
    'AHA Certified Program', 'Simulation Lab Training', 'Expert Instructors',
    'Team Dynamics Focus', 'Hands-on Practice', 'Gulf Career Support'
  ];

  majorConcepts: string[] = [
    'The crucial importance of high-quality cardiopulmonary resuscitation (CPR) to patient survival in all emergency scenarios.',
    'The integration of effective Basic Life Support (BLS) with ACLS interventions for optimal patient care outcomes.',
    'The importance of effective team interaction and communication during resuscitation simulations and real emergencies.'
  ];

  designCards: any[] = [
    { icon: '🎯', isUrl: false, color: 'blue',   title: 'Intended Audience', desc: 'Must be a healthcare provider and current BLS Provider. Ideal for nurses, doctors, paramedics, and allied health professionals seeking Gulf placements.' },
    { icon: '📚', isUrl: false, color: 'orange',  title: 'Student Materials',  desc: 'ACLS Provider Manual included. Algorithm cards provided. Digital resources and practice scenarios accessible immediately post-enrollment.' },
    { icon: '🏅', isUrl: false, color: 'green',   title: 'Certification',       desc: 'AHA-issued ACLS Provider card valid for 2 years. Globally recognized by hospitals and healthcare facilities across the Gulf, USA, and Canada.' }
  ];

  benefits: any[] = [
    { icon: '📋', isUrl: false, title: 'QUALITY TRAINING',    desc: 'We push the boundaries of excellence, delivering the highest standards in clinical coaching by certified instructors with real Gulf hospital experience.' },
    { icon: '🏥', isUrl: false, title: 'TRUSTED NETWORK',     desc: 'Strong partnerships with UAE, Saudi, Oman, Qatar, and Bahrain healthcare institutions and recruitment agencies for direct placement support.' },
    { icon: '⭐', isUrl: false, title: 'TIER LEVEL EXPERTS',  desc: 'Instructors with deep knowledge of Gulf healthcare licensing — many have personally cleared Gulf exams and worked in Gulf facilities.' },
    { icon: '🌍', isUrl: false, title: 'GLOBAL RECOGNITION',  desc: 'Certifications facilitated by FlyGulf are recognized across all major Gulf countries and facilitate career opportunities internationally.' },
    { icon: '🔬', isUrl: false, title: 'INDUSTRY EXPERIENCE', desc: 'Over 10+ years helping healthcare professionals secure Gulf placements across UAE, Saudi Arabia, Oman, Qatar, Bahrain, and Kuwait.' },
    { icon: '💼', isUrl: false, title: 'CAREER SUPPORT',      desc: 'Full Gulf placement support including DataFlow verification, visa guidance, and interview preparation — end-to-end from exam to employment.' }
  ];

  reviews: any[] = [];

  faqs: { q: string; a: string; open: boolean }[] = [
    { q: 'What is ACLS certification?',           a: 'ACLS (Advanced Cardiovascular Life Support) is an AHA-certified clinical training program teaching healthcare providers to recognize and manage cardiac arrest, stroke, and cardiovascular emergencies using advanced techniques.', open: false },
    { q: 'Who should attend ACLS?',               a: 'ACLS is recommended for nurses, doctors, paramedics, and allied health professionals who may respond to cardiovascular emergencies. Candidates must hold a valid BLS certification before attending.', open: false },
    { q: 'How long is the ACLS course?',          a: 'The ACLS Provider Course spans 16 hours across 2 days. It includes classroom instruction, skills practice, simulation scenarios, and a final skills test and written exam to qualify for the certificate.', open: false },
    { q: 'How long is ACLS certification valid?', a: 'AHA ACLS certification is valid for 2 years. After expiry, candidates can take a shorter ACLS Renewal course instead of repeating the full initial certification program.', open: false },
    { q: 'Is ACLS required for Gulf jobs?',       a: 'Yes! AHA-issued ACLS certification is widely required by hospitals in Dubai, Abu Dhabi, Saudi Arabia, Oman, Qatar, and other Gulf countries for clinical roles including ICU, ER, and CCU positions.', open: false },
    { q: 'Which cities offer ACLS training?',     a: 'We offer training in Mumbai, Pune, Nashik, Sangali, and Bhopal. Online preparation classes are also available for candidates across India and internationally.', open: false }
  ];

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const slug = params.get('slug') || 'ACLS';
      this.reviews = [];
      this.loadCourseData(slug);
      window.scrollTo(0, 0);
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) this.routeSub.unsubscribe();
  }

  private loadCourseData(slug: string): void {
    this.loading = true;

    this.courseService.getCourseByShortForm(slug).subscribe({
      next: (course) => {
        if (course) {
          this.courseData = course;
          this.bannerImageUrl = this.courseService.getImageUrl('courses', course.id, 'banner');
          this.aboutImageUrl  = this.courseService.getImageUrl('courses', course.id, 'about');

          // Features
          if (course.features) {
            if (typeof course.features === 'string') {
              this.overviewChecks = (course.features as string)
                .split('|').map((f: string) => f.trim()).filter((f: string) => f.length > 0);
            } else if (Array.isArray(course.features) && course.features.length > 0) {
              this.overviewChecks = course.features;
            }
          }

          // Major concepts
          if (course.overview && course.overview.majorConcepts?.length > 0) {
            this.majorConcepts = course.overview.majorConcepts;
          }

          // Design cards
          if (course.designCards?.length > 0) {
            this.designCards = course.designCards.map((card: any) => ({
              id: card.id,
              icon: card.logoName ? `${this.BASE}/design-cards/${card.id}/image` : (card.logo || '🎯'),
              isUrl: !!card.logoName,
              color: card.colorBackground || '#E3F2FD',
              title: card.title,
              desc: card.description
            }));
          }

          // Benefits
          if (course.benefits?.length > 0) {
            this.benefits = course.benefits.map((b: any) => ({
              id: b.id,
              icon: b.logoName ? `${this.BASE}/benefits/${b.id}/image` : (b.logo || '📋'),
              isUrl: !!b.logoName,
              title: b.title,
              desc: b.description
            }));
          }

          // Load reviews for this course from backend
          this.loadReviews(course.shortForm);
        }

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  ngAfterViewInit(): void {
    // All animations are pure CSS — no JS needed
  }

  // ─────────────────────────────────────────────────────────────────
  // Load reviews from backend
  // Backend: GET /flygulf/api/reviews?search=ACLS
  // When you ran add-all-reviews.sh, each review was created with
  // -F "course=ACLS" (or DHA, DOH etc.)
  // Backend search matches against the "course" field
  // We also filter client-side for exact course match
  // ─────────────────────────────────────────────────────────────────
  private loadReviews(shortForm: string): void {
    this.courseService.getCourseReviews(shortForm).subscribe({
      next: (response: any) => {
        if (response?.success && response?.data?.length > 0) {
          // Filter exactly by course shortForm (backend may return partial matches)
          const filtered = response.data.filter((r: any) =>
            r.course?.toUpperCase() === shortForm.toUpperCase()
          );

          this.reviews = filtered.map((r: any) => ({
            name:       r.name || 'Anonymous',
            initials:   this.getInitials(r.name),
            role:       r.designation || 'Healthcare Professional',
            text:       r.review || r.reviewText || '',
            rating:     r.rating || 5,
            profilePic: r.profilePicName
                          ? this.courseService.getReviewMediaUrl(r.id, 'profilePic')
                          : '',
            videoUrl:   r.videoName
                          ? this.courseService.getReviewMediaUrl(r.id, 'video')
                          : '',
            audioUrl:   r.audioName
                          ? this.courseService.getReviewMediaUrl(r.id, 'audio')
                          : ''
          }));
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.reviews = [];
        this.cdr.detectChanges();
      }
    });
  }

  private getInitials(name: string): string {
    if (!name) return '?';
    return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2);
  }

  getFeaturesList(): string[] {
    if (this.overviewChecks?.length > 0) return this.overviewChecks;
    const raw = this.courseData?.features;
    if (!raw) return [];
    if (Array.isArray(raw)) return raw.filter((v: string) => v?.trim());
    if (typeof raw === 'string') {
      return raw.split('|').map((v: string) => v.trim()).filter((v: string) => v.length > 0);
    }
    return [];
  }

  toggleFaq(index: number): void {
    const wasOpen = this.faqs[index].open;
    this.faqs.forEach(f => (f.open = false));
    if (!wasOpen) this.faqs[index].open = true;
  }

}