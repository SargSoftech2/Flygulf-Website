import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-services',
  standalone: true, // If you are using standalone components
 imports: [CommonModule, RouterModule],

  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {

  services = [
    { title: 'Document Attestation', icon: '📁', desc: 'Hassle-free preparation and verification of your medical credentials.',route: '/services/documentation' },
    { title: 'Dataflow', icon: '⚙️', desc: 'Primary Source Verification (PSV) management for international licenses.',route: '/data-flow' },
    { title: 'Coaching', icon: '🎓', desc: 'Expert training for Prometric, DHA, MOH, and HAAD exams.',route: '/services/coaching' },
    { title: 'Passport', icon: '🛂', desc: 'Assistance with passport applications and renewal processes.',route: '/services/passport' },
    { title: 'Placement', icon: '💼', desc: 'Connecting you with top-tier healthcare facilities in the Gulf.' ,route: '/services/placement'},
    { title: 'Visa', icon: '✈️', desc: 'Expert handling of work and residency visa documentation.',route: '/services/visa' },
    { title: 'Accommodation', icon: '🏠', desc: 'Finding safe and comfortable living spaces for your relocation.',route: '/services/accomodation' },
    { title: 'Consultancy', icon: '🤝', desc: 'One-on-one guidance for your entire international career path.' ,route: '/services/consultancy'}
  ];
  constructor(private titleService: Title) {}

  ngOnInit(): void {
    // 5. Set the browser tab title
    this.titleService.setTitle('Our Services | Healthcare Career Support & Migration - Flygulf');
  }
} // <--- MAKE SURE THIS SAYS "export class ServicesComponent"
