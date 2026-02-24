import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-acls-cardiac-arrest',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './acls-cardiac-arrest.component.html',
  styleUrls: ['./acls-cardiac-arrest.component.css']
})
export class AclsCardiacArrestComponent implements OnInit, AfterViewInit {

  /* ── Overview check items ── */
  overviewChecks = [
    'AHA Certified Program',
    'Simulation Lab Training',
    'Expert Instructors',
    'Team Dynamics Focus',
    'Hands-on Practice',
    'Gulf Career Support'
  ];

  /* ── 3 major concepts ── */
  majorConcepts = [
    'The crucial importance of high-quality cardiopulmonary resuscitation (CPR) to patient survival in all emergency scenarios.',
    'The integration of effective Basic Life Support (BLS) with ACLS interventions for optimal patient care outcomes.',
    'The importance of effective team interaction and communication during resuscitation simulations and real emergencies.'
  ];

  /* ── Design section cards ── */
  designCards = [
    {
      icon: '🎯',
      color: 'blue',
      title: 'Intended Audience',
      desc: 'Must be a healthcare provider and current BLS Provider. Ideal for nurses, doctors, paramedics, and allied health professionals seeking Gulf placements.'
    },
    {
      icon: '📚',
      color: 'orange',
      title: 'Student Materials',
      desc: 'ACLS Provider Manual included. Algorithm cards provided. Digital resources and practice scenarios accessible immediately post-enrollment.'
    },
    {
      icon: '🏅',
      color: 'green',
      title: 'Certification',
      desc: 'AHA-issued ACLS Provider card valid for 2 years. Globally recognized by hospitals and healthcare facilities across the Gulf, USA, and Canada.'
    }
  ];

  /* ── Course contents ── */
  courseContents = [
    'Science of resuscitation',
    'Brady arrhythmia',
    'High quality BLS review',
    'Tachy arrhythmias',
    'Systematic approach',
    'Cardiac Arrest',
    'ACS Management',
    'Post arrest care',
    'Acute Ischemic Stroke',
    'Intra osseous access',
    'ECG & Pharmacology',
    'Megacode',
    'Airway skills'
  ];

  /* ── Benefits ── */
  benefits = [
    {
      icon: '📋',
      title: 'Quality Training',
      desc: 'We push the boundaries of excellence in everything we do, delivering the highest standards in BLS, ACLS, and PALS coaching.'
    },
    {
      icon: '🏥',
      title: 'Affiliate to AHA',
      desc: 'Officially affiliated with the American Heart Association. Your certification carries the highest level of global credibility.'
    },
    {
      icon: '⭐',
      title: 'Tier Level Experts',
      desc: 'Our team members are experts in life-saving courses, helping you gain in-depth knowledge in their respective clinical fields.'
    },
    {
      icon: '🌍',
      title: 'Global Recognition',
      desc: 'AHA certifications are recognized in hospitals and healthcare institutions across the Gulf, USA, Canada, and Australia.'
    },
    {
      icon: '🔬',
      title: 'Industry Experience',
      desc: 'Over 10+ years of healthcare training experience with 5000+ professionals successfully certified and placed.'
    },
    {
      icon: '💼',
      title: 'Career Support',
      desc: 'End-to-end job placement, DataFlow verification, visa guidance, and interview preparation — all included.'
    }
  ];

  /* ── Reviews ── */
  reviews = [
    {
      initials: 'V',
      name: 'Vaishnavi P.',
      role: 'DHA Professional, Dubai',
      text: 'Knowledgeable instructor, very thorough, personable, and comprehensive course curriculum. I look forward to renewing with FlyGulf. Highly recommend for ACLS certification!'
    },
    {
      initials: 'P',
      name: 'Prasenjeet S.',
      role: 'MOH Saudi Arabia',
      text: 'FlyGulf stands above the rest for ACLS Coaching. I am fully satisfied and won\'t hesitate to recommend this institute to anyone pursuing a healthcare career in the Gulf.'
    },
    {
      initials: 'R',
      name: 'Prasad K.',
      role: 'Critical Care Nurse, Abu Dhabi',
      text: 'The ACLS training was highly practical. The simulation lab was realistic and the instructors were incredibly supportive. I gained so much confidence in my clinical skills here.'
    }
  ];

  /* ── FAQs ── */
  faqs: { q: string; a: string; open: boolean }[] = [
    {
      q: 'What is ACLS certification?',
      a: 'ACLS (Advanced Cardiovascular Life Support) is an AHA-certified clinical training program teaching healthcare providers to recognize and manage cardiac arrest, stroke, and cardiovascular emergencies using advanced techniques.',
      open: false
    },
    {
      q: 'Who should attend ACLS?',
      a: 'ACLS is recommended for nurses, doctors, paramedics, and allied health professionals who may respond to cardiovascular emergencies. Candidates must hold a valid BLS certification before attending.',
      open: false
    },
    {
      q: 'How long is the ACLS course?',
      a: 'The ACLS Provider Course spans 16 hours across 2 days. It includes classroom instruction, skills practice, simulation scenarios, and a final skills test and written exam to qualify for the certificate.',
      open: false
    },
    {
      q: 'How long is ACLS certification valid?',
      a: 'AHA ACLS certification is valid for 2 years. After expiry, candidates can take a shorter ACLS Renewal course instead of repeating the full initial certification program.',
      open: false
    },
    {
      q: 'Is ACLS required for Gulf jobs?',
      a: 'Yes! AHA-issued ACLS certification is widely required by hospitals in Dubai, Abu Dhabi, Saudi Arabia, Oman, Qatar, and other Gulf countries for clinical roles including ICU, ER, and CCU positions.',
      open: false
    },
    {
      q: 'Which cities offer ACLS training?',
      a: 'We offer ACLS training in Mumbai, Pune, Kollam, Trivandrum, and Thiruvalla. Online ACLS preparation classes are also available for candidates across India and internationally.',
      open: false
    }
  ];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initScrollReveal();
  }

  /* ── FAQ toggle ── */
  toggleFaq(index: number): void {
    const wasOpen = this.faqs[index].open;
    this.faqs.forEach(f => (f.open = false));
    if (!wasOpen) this.faqs[index].open = true;
  }

  /* ── Scroll-triggered fade-in ── */
  private initScrollReveal(): void {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll(
      '.ov-grid, .cd-grid, .ct-grid, .ben-card, .rev-card, .faq-item, .enroll-box, .cta-band-inner'
    ).forEach(el => {
      el.classList.add('reveal-target');
      observer.observe(el);
    });
  }
}