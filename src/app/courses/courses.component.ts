import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Course {
  id: string;
  title: string;
  shortDesc: string;
  image: string;
  category: string;
  route: string;
}

interface NavCategory {
  label: string;
  icon: string;
  courses: Course[];
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  navCategories: NavCategory[] = [
    {
      label: 'Clinical',
      icon: '🏥',
      courses: [
        { id: 'acls', title: 'ACLS', shortDesc: 'Advanced Cardiovascular Life Support', image: '/images/ACLS.jpg', category: 'Clinical', route: '/acls' },
        { id: 'bls', title: 'BLS', shortDesc: 'Basic Life Support', image: '/images/ACLS.jpg', category: 'Clinical', route: '/bls' },
        { id: 'pals', title: 'PALS', shortDesc: 'Pediatric Advanced Life Support', image: '/images/ACLS.jpg', category: 'Clinical', route: '/pals' },
        { id: 'nrp', title: 'NRP', shortDesc: 'Neonatal Resuscitation Program', image: '/images/ACLS.jpg', category: 'Clinical', route: '/nrp' },
        { id: 'heartsaver', title: 'Heartsaver', shortDesc: 'First Aid CPR AED for non-clinical staff', image: '/images/ACLS.jpg', category: 'Clinical', route: '/heartsaver' },
        { id: 'ecg', title: 'ECG Interpretation', shortDesc: 'Systematic ECG reading for clinicians', image: '/images/ACLS.jpg', category: 'Clinical', route: '/ecg' },
        { id: 'criticalcare', title: 'Critical Care', shortDesc: 'ICU protocols and critical care management', image: '/images/ACLS.jpg', category: 'Clinical', route: '/critical-care' },
      ]
    },
    {
      label: 'Licensing',
      icon: '📋',
      courses: [
        { id: 'dha', title: 'DHA Exam Prep', shortDesc: 'Dubai Health Authority licensing exam', image: '/images/ACLS.jpg', category: 'Licensing', route: '/dha' },
        { id: 'haad', title: 'HAAD / DOH', shortDesc: 'Abu Dhabi healthcare licensing', image: '/images/ACLS.jpg', category: 'Licensing', route: '/haad' },
        { id: 'moh', title: 'MOH Saudi Arabia', shortDesc: 'Saudi Ministry of Health licensing', image: '/images/ACLS.jpg', category: 'Licensing', route: '/moh' },
        { id: 'prometric', title: 'Prometric', shortDesc: 'Gulf-wide prometric licensing exams', image: '/images/ACLS.jpg', category: 'Licensing', route: '/prometric' },
      ]
    },
    {
      label: 'Language',
      icon: '🌍',
      courses: [
        { id: 'oet', title: 'OET', shortDesc: 'Occupational English Test for healthcare', image: '/images/ACLS.jpg', category: 'Language', route: '/oet' },
        { id: 'ielts', title: 'IELTS', shortDesc: 'International English proficiency test', image: '/images/ACLS.jpg', category: 'Language', route: '/ielts' },
      ]
    }
  ];

  allCourses: Course[] = [];

  ngOnInit(): void {
    this.allCourses = this.navCategories.flatMap(nc => nc.courses);
  }

  /** Keep setFilter as a no-op so existing spec tests don't break */
  setFilter(category: string): void {}
}