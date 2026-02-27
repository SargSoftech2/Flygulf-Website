import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Subscription } from 'rxjs';

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

  // ── Pre-built image URL strings (instant, no async wait) ──
  bannerImageUrl = '';
  aboutImageUrl  = '';

  // ── Backend base URL — change port if needed ──
  private readonly BASE = 'http://localhost:8082/api/flygulf/courses';

  constructor(private courseService: CourseService, private route: ActivatedRoute) {}

  /* ── Overview checks (default → replaced by API) ── */
  overviewChecks: string[] = [
    'AHA Certified Program',
    'Simulation Lab Training',
    'Expert Instructors',
    'Team Dynamics Focus',
    'Hands-on Practice',
    'Gulf Career Support'
  ];

  /* ── 3 major concepts (default → replaced by API) ── */
  majorConcepts: string[] = [
    'The crucial importance of high-quality cardiopulmonary resuscitation (CPR) to patient survival in all emergency scenarios.',
    'The integration of effective Basic Life Support (BLS) with ACLS interventions for optimal patient care outcomes.',
    'The importance of effective team interaction and communication during resuscitation simulations and real emergencies.'
  ];

  /* ── Design cards (default → replaced by API) ── */
  designCards: any[] = [
    { icon: '🎯', isUrl: false, color: 'blue',   title: 'Intended Audience', desc: 'Must be a healthcare provider and current BLS Provider. Ideal for nurses, doctors, paramedics, and allied health professionals seeking Gulf placements.' },
    { icon: '📚', isUrl: false, color: 'orange',  title: 'Student Materials',  desc: 'ACLS Provider Manual included. Algorithm cards provided. Digital resources and practice scenarios accessible immediately post-enrollment.' },
    { icon: '🏅', isUrl: false, color: 'green',   title: 'Certification',       desc: 'AHA-issued ACLS Provider card valid for 2 years. Globally recognized by hospitals and healthcare facilities across the Gulf, USA, and Canada.' }
  ];

  /* ── Benefits (default → replaced by API) ── */
  benefits: any[] = [
    { icon: '📋', isUrl: false, title: 'Quality Training',    desc: 'We push the boundaries of excellence, delivering the highest standards in BLS, ACLS, and PALS coaching by certified AHA instructors.' },
    { icon: '🏥', isUrl: false, title: 'Affiliate to AHA',    desc: 'Officially affiliated with the American Heart Association. Your certification carries the highest level of global credibility.' },
    { icon: '⭐', isUrl: false, title: 'Tier Level Experts',  desc: 'Our team members are experts in life-saving courses, helping you gain in-depth knowledge in their respective clinical fields.' },
    { icon: '🌍', isUrl: false, title: 'Global Recognition',  desc: 'AHA certifications are recognized in hospitals and healthcare institutions across the Gulf, USA, Canada, and Australia.' },
    { icon: '🔬', isUrl: false, title: 'Industry Experience', desc: 'Over 10+ years of healthcare training experience with 5000+ professionals successfully certified and placed.' },
    { icon: '💼', isUrl: false, title: 'Career Support',      desc: 'End-to-end job placement, DataFlow verification, visa guidance, and interview preparation — all included.' }
  ];

  /* ── Reviews (hardcoded — not in backend) ── */
  reviews = [
    { initials: 'V', name: 'Vaishnavi P.',  role: 'DHA Professional, Dubai',     text: 'Knowledgeable instructor, very thorough, personable, and comprehensive course curriculum. I look forward to renewing with FlyGulf. Highly recommend for ACLS certification!' },
    { initials: 'P', name: 'Prasenjeet S.', role: 'MOH Saudi Arabia',            text: "FlyGulf stands above the rest for ACLS Coaching. I am fully satisfied and won't hesitate to recommend this institute to anyone pursuing a healthcare career in the Gulf." },
    { initials: 'R', name: 'Prasad K.',     role: 'Critical Care Nurse, Abu Dhabi', text: 'The ACLS training was highly practical. The simulation lab was realistic and the instructors were incredibly supportive. I gained so much confidence in my clinical skills here.' }
  ];

  /* ── FAQs (hardcoded) ── */
  faqs: { q: string; a: string; open: boolean }[] = [
    { q: 'What is ACLS certification?',       a: 'ACLS (Advanced Cardiovascular Life Support) is an AHA-certified clinical training program teaching healthcare providers to recognize and manage cardiac arrest, stroke, and cardiovascular emergencies using advanced techniques.', open: false },
    { q: 'Who should attend ACLS?',           a: 'ACLS is recommended for nurses, doctors, paramedics, and allied health professionals who may respond to cardiovascular emergencies. Candidates must hold a valid BLS certification before attending.', open: false },
    { q: 'How long is the ACLS course?',      a: 'The ACLS Provider Course spans 16 hours across 2 days. It includes classroom instruction, skills practice, simulation scenarios, and a final skills test and written exam to qualify for the certificate.', open: false },
    { q: 'How long is ACLS certification valid?', a: 'AHA ACLS certification is valid for 2 years. After expiry, candidates can take a shorter ACLS Renewal course instead of repeating the full initial certification program.', open: false },
    { q: 'Is ACLS required for Gulf jobs?',   a: 'Yes! AHA-issued ACLS certification is widely required by hospitals in Dubai, Abu Dhabi, Saudi Arabia, Oman, Qatar, and other Gulf countries for clinical roles including ICU, ER, and CCU positions.', open: false },
    { q: 'Which cities offer ACLS training?', a: 'We offer ACLS training in Mumbai, Pune, Kollam, Trivandrum, and Thiruvalla. Online ACLS preparation classes are also available for candidates across India and internationally.', open: false }
  ];

  /* ═══════════════════════════════ LIFECYCLE ═══════════════════════════════ */

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const slug = params.get('slug') || 'ACLS';
      this.loadCourseData(slug);
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) this.routeSub.unsubscribe();
  }

  /* ═══════════════════════════════ DATA LOAD ═══════════════════════════════
     KEY FIXES FOR SPEED:
     1. Image URLs are built as plain strings immediately — no Base64, no blob
     2. No unnecessary subscribe nesting
     3. Defaults shown instantly; API data overlays when ready
  ══════════════════════════════════════════════════════════════════════════ */
  private loadCourseData(slug: string): void {
    this.loading = true;

    this.courseService.getCourseByShortForm(slug).subscribe({
      next: (course) => {
        if (course) {
          this.courseData = course;

          // Build image URLs immediately as plain URL strings
          // These load in parallel in the browser — much faster than Base64
          this.bannerImageUrl = `${this.BASE}/${course.id}/image/banner`;
          this.aboutImageUrl  = `${this.BASE}/${course.id}/image/about`;

          // Features → overview checks
          if (course.features?.length > 0) {
            this.overviewChecks = course.features;
          }

          // Major concepts from overview
          if (course.overview?.majorConcepts?.length > 0) {
            this.majorConcepts = course.overview.majorConcepts;
          }

          // Design cards
          if (course.designCards?.length > 0) {
            this.designCards = course.designCards.map((card: any) => ({
              id:    card.id,
              icon:  card.logoName ? `${this.BASE}/design-cards/${card.id}/image` : (card.logo || '🎯'),
              isUrl: !!card.logoName,
              color: card.colorBackground || '#E3F2FD',
              title: card.title,
              desc:  card.description
            }));
          }

          // Benefits
          if (course.benefits?.length > 0) {
            this.benefits = course.benefits.map((b: any) => ({
              id:    b.id,
              icon:  b.logoName ? `${this.BASE}/benefits/${b.id}/image` : (b.logo || '📋'),
              isUrl: !!b.logoName,
              title: b.title,
              desc:  b.description
            }));
          }
        }

        // Stop loading — show page immediately (default data still shows if no course)
        this.loading = false;
      },
      error: () => {
        // Graceful fallback — show page with default hardcoded data
        this.loading = false;
      }
    });
  }

  ngAfterViewInit(): void {
    this.initScrollReveal();
  }

  /* ── FAQ toggle ── */
  toggleFaq(index: number): void {
    const wasOpen = this.faqs[index].open;
    this.faqs.forEach(f => (f.open = false));
    if (!wasOpen) this.faqs[index].open = true;
  }

  /* ── Scroll reveal ── */
  private initScrollReveal(): void {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll(
      '.ov-grid, .cd-grid, .ben-card, .rev-card, .faq-item, .enroll-box, .cta-band-inner'
    ).forEach(el => {
      el.classList.add('reveal-target');
      observer.observe(el);
    });
  }
}