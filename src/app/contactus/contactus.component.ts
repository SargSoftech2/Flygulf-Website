import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-contactus',
  imports: [CommonModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css',
})
export class ContactusComponent implements OnInit {
  courses: any[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.getActiveCourses().subscribe({
      next: (courses) => this.courses = courses,
      error: () => this.courses = []
    });
  }
}
