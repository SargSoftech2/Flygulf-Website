import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../services/contact.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css',
})
export class ContactusComponent implements OnInit {
  courses: any[] = [];

  contactData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private contactService: ContactService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.courseService.getActiveCourses().subscribe({
      next: (courses) => this.courses = courses,
      error: () => this.courses = []
    });
  }

  onSubmit(form: NgForm) {

    if (form.invalid) {
      return;
    }

    this.contactService.sendMessage(this.contactData).subscribe({
      next: (response) => {
        console.log("Success response:", response);
        this.successMessage = "Message sent successfully!";
        this.errorMessage = '';

        form.resetForm();

        this.contactData = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };

        setTimeout(() => { this.successMessage = ''; }, 3000);
      },

      error: (err) => {
        console.log("Error:", err);
        // ✅ If status is 200, treat it as success (backend returned non-JSON)
        if (err.status === 200) {
          this.successMessage = "Message sent successfully!";
          this.errorMessage = '';

          form.resetForm();
          this.contactData = { name: '', email: '', subject: '', message: '' };
          setTimeout(() => { this.successMessage = ''; }, 3000);
        } else {
          this.errorMessage = "Something went wrong!";
          this.successMessage = '';
          setTimeout(() => { this.errorMessage = ''; }, 3000);
        }
      }
    });
  }
}
