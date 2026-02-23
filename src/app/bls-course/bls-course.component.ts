import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bls-course',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bls-course.component.html',
  styleUrls: ['./bls-course.component.css'],
})
export class BlsCourseComponent {

  /** Currently open FAQ index (-1 = none) */
  openIndex: number = 0;

  /** Course highlight tags shown in the grid */
  courseHighlights = [
    { title: 'Adult BLS',  subtitle: 'Chain of Survival' },
    { title: 'Child BLS',  subtitle: 'Pediatric Care'    },
    { title: 'Infant BLS', subtitle: 'Compressions'      },
    { title: 'Rescue CPR', subtitle: '1 Rescuer Adult'   },
    { title: 'AED',        subtitle: 'AMBU Bag Use'       },
    { title: 'Choking',    subtitle: 'Adult & Infant'     },
  ];

  /** Quick-info items shown in the sidebar */
  courseInfo = [
    { icon: '📅', label: 'Duration',             value: '1 Day (9 AM – 4 PM)'          },
    { icon: '🏅', label: 'Certification',         value: 'AHA Certified'                 },
    { icon: '⏳', label: 'Certificate Validity',  value: '2 Years (Global)'              },
    { icon: '📖', label: 'Study Material',        value: 'BLS Provider Manual Included'  },
    { icon: '💳', label: 'Payment',               value: 'Online or Offline'             },
    { icon: '👥', label: 'Target Audience',       value: 'Health Care Professionals'     },
  ];

  /** Related blog posts shown in the sidebar */
  relatedBlogs = [
    { title: 'Steps of BLS',                          date: 'Feb 18, 2026', link: '/blogs/steps-of-bls'           },
    { title: 'Prone Position CPR *AHA updates*',      date: 'Feb 20, 2026', link: '/blogs/prone-position-cpr'    },
    { title: 'How to do AHA ACLS and PALS Pretest',   date: 'Feb 20, 2026', link: '/blogs/acls-pals-pretest'     },
    { title: 'OET Writing Grammar – Connectors',      date: 'Feb 20, 2026', link: '/blogs/oet-writing-grammar'   },
  ];

  /** FAQ accordion data */
  faqs = [
    {
      question: 'What is the course duration?',
      answer: '<p>1 day (9 am to 4 pm).</p>',
    },
    {
      question: 'Is it AHA certified?',
      answer: '<p><strong>Yes.</strong> This is a fully AHA (American Heart Association) certified BLS course. Upon completion, you receive an internationally recognised AHA certificate.</p>',
    },
    {
      question: 'Who are the instructors?',
      answer: '<p>Course faculties / Instructors. The BLS course will be taught by AHA certified instructors.</p>',
    },
    {
      question: 'What do you teach in BLS?',
      answer: `
        <p><strong>I. Adult BLS</strong></p>
        <ul>
          <li>Adult chain of survival</li>
          <li>Scene safety and Assessment</li>
          <li>Chest Compressions</li>
          <li>Ventilation</li>
          <li>1 Rescuer adult CPR</li>
          <li>AED and AMBU bag</li>
          <li>2 Rescuer adult CPR</li>
        </ul>
        <p><strong>II. Child BLS</strong></p>
        <ul>
          <li>Pediatric Chain of survival</li>
          <li>Chest compressions</li>
          <li>Ventilation</li>
          <li>2 Rescuer Child CPR</li>
        </ul>
        <p><strong>III. Infant BLS</strong></p>
        <ul>
          <li>Infant compressions</li>
          <li>Ventilation</li>
          <li>2 Rescuer infant CPR</li>
        </ul>
        <p><strong>IV.</strong> Respiratory Arrest and rescue breathing</p>
        <p><strong>V.</strong> Adult and Child Choking</p>
        <p><strong>VI.</strong> Infant Choking</p>
      `,
    },
    {
      question: 'Will I get to practice giving CPR?',
      answer: '<p>Yes, BLS emphasis on practical skill development. Charles Institute is dedicated to ensuring quality training, with advanced medical equipment. Equipment which is used for BLS course includes CPR manikins with quality indicator AED trainers, Pocket mask, AMBU bag, etc.</p>',
    },
    {
      question: 'Will I get any course materials like books?',
      answer: '<p>BLS course participants are provided with original BLS provider manuals.</p>',
    },
    {
      question: 'When will I get my certificate?',
      answer: '<p>A printed certificate will be ready in 4 working days after the successful completion of the course. Also, candidates can download pdf from AHA website on the same day itself. Downloadable pdf will be available on the AHA website forever.</p>',
    },
    {
      question: 'How long the certificate is valid for?',
      answer: '<p><strong>2 years.</strong> The BLS certification is valid globally for 2 years from the date of issue.</p>',
    },
    {
      question: 'Can I renew my certificate without attending the course?',
      answer: '<p>Yes. Certificate can be renewed without course participation. But the candidate will need to pass both the theory exam and skill test. You have an option to renew your certificate by attending the course. In that case, the fee charged for you will be less compared to a new course as you don\'t have to purchase any books.</p>',
    },
    {
      question: 'How to become a certified BLS Instructor?',
      answer: '<p>Interested candidates should have IP (Instructor Potential), which is eligibility to become an Instructor. You are evaluated for IP based on your performance during the course. After having obtained IP, you will need to attend an instructor course to become an instructor.</p><p>Instructor card will be issued only after completing the required number of course monitoring, usually 2 or 3.</p>',
    },
    {
      question: 'How do I enroll for the course?',
      answer: '<p>You can enroll by clicking the Enroll button in the sidebar. Our team will get back to you within 24 hours to confirm your enrollment and provide further details about the course schedule.</p>',
    },
    {
      question: 'Do I have to make the payment in advance?',
      answer: '<p><strong>Yes.</strong> You can make the payment online or offline.</p>',
    },
  ];

  /** Toggle FAQ open/close */
  toggleFaq(index: number): void {
    this.openIndex = this.openIndex === index ? -1 : index;
  }

  /** Enroll button handler */
  onEnroll(): void {
    // Navigate to enrollment page or open modal
    console.log('Enroll clicked – wire up your router or modal here');
  }
}