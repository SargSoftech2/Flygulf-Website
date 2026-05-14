import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Title } from '@angular/platform-browser';

// Define interface for the raw API course item

// Define interface for raw API course item
interface RawCourse {
  id: number;
  courseName: string;
  shortForm: string;
  shortDesc: string;
  cardImage: string;
  bannerImage: string;
  logo: string;
  sortOrder?: number;
}

// Define interface for frontend course
interface Course {
  id: string;
  title: string;
  shortDesc: string;
  image: string;
  category: string;
  route: string;
  sortOrder?: number;
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
  allCourses$!: Observable<Course[]>;
  loading = true;

  constructor(private courseService: CourseService, private ngZone: NgZone ,
  private titleService: Title){}


  ngOnInit(): void {

    this.titleService.setTitle('All Courses & Certifications | Flygulf Career Academy');
    window.scrollTo(0, 0);
    console.log('🔄 Fetching courses...');
    const COURSE_ORDER = [
      'DOH','MOH','EMT','ACLS','DHA','BLS','PALS',
      'QCHP','OMSB','KMOH','NHRA','SCFHS',
      'OET','IELTS','NCLEX','GERMAN'
    ];
    this.allCourses$ = this.courseService.getActiveCourses().pipe(
      map((courses: RawCourse[]) => {
        const mapped: Course[] = courses
          .slice()
          .sort((a: RawCourse, b: RawCourse) => {
            const ai = a.sortOrder ?? (COURSE_ORDER.indexOf(a.shortForm?.toUpperCase()) + 1 || 9999);
            const bi = b.sortOrder ?? (COURSE_ORDER.indexOf(b.shortForm?.toUpperCase()) + 1 || 9999);
            return ai - bi;
          })
          .map((c: RawCourse) => ({
            id: c.id.toString(),
            title: c.courseName,
            shortDesc: c.shortDesc,
            image: c.cardImage || '/assets/default-course.jpg',
            category: 'Clinical',
            route: `/course/${c.shortForm.toLowerCase()}`,
            sortOrder: c.sortOrder
          }));

        console.log('✅ Courses loaded:', mapped);
        this.loading = false;
        // After data renders, init scroll reveal
        setTimeout(() => this.initCardReveal(), 120);
        return mapped;
      })
    );
  }

  private initCardReveal(): void {
    this.ngZone.runOutsideAngular(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('card-visible');
              observer.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      );
      document.querySelectorAll('.course-card').forEach(card => {
        observer.observe(card);
      });
    });
  }

  scrollToGrid(event: Event): void {
    event.preventDefault();
    const el = document.getElementById('courses-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}