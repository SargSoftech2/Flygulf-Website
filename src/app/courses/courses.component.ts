import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

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
}

// Define interface for frontend course
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
  allCourses$!: Observable<Course[]>;
  loading = true;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    console.log('🔄 Fetching courses...');
    this.allCourses$ = this.courseService.getActiveCourses().pipe(
      map((courses: RawCourse[]) => {
        const mapped: Course[] = courses.map((c: RawCourse) => ({
          id: c.id.toString(),
          title: c.courseName,
          shortDesc: c.shortDesc,
          image: c.cardImage || '/assets/default-course.jpg',
          category: 'Clinical',
          route: `/course/${c.shortForm.toLowerCase()}`
        })).reverse();

        console.log('✅ Courses loaded:', mapped);
        this.loading = false;
        return mapped;
      })
    );
  }
}