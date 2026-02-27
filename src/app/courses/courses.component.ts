import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseService } from '../services/course.service';

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
  allCourses: Course[] = [];
  navCategories: NavCategory[] = [];
  loading = true;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    console.log('🔄 Fetching courses...');
    this.courseService.getActiveCourses().subscribe({
      next: (courses) => {
        console.log('✅ Courses loaded:', courses);
        this.allCourses = courses.map(c => ({
          id: c.id.toString(),
          title: c.courseName,
          shortDesc: c.shortDesc,
          image: c.cardImage || '/assets/default-course.jpg',
          category: 'Clinical',
          route: `/course/${c.shortForm.toLowerCase()}`
        })).reverse();
        console.log('📋 Total courses:', this.allCourses.length);
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error loading courses:', err);
        this.loading = false;
      }
    });
  }

  setFilter(category: string): void {}
}