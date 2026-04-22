// import { Component, OnInit } from '@angular/core';
// import { FormsModule, NgForm } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ContactService } from '../services/contact.service';
// import { CourseService } from '../services/course.service';
// import { Title } from '@angular/platform-browser';
// @Component({
//   selector: 'app-contactus',
//   standalone: true,
//   imports: [FormsModule, CommonModule],
//   templateUrl: './contactus.component.html',
//   styleUrl: './contactus.component.css',
// })
// export class ContactusComponent implements OnInit {
//   courses: any[] = [];

//   contactData = {
//     name: '',
//     email: '',
//     phone: '',
//     subject: '',
//     message: ''
//   };

//   successMessage: string = '';
//   errorMessage: string = '';

//   constructor(
//     private contactService: ContactService,
//     private courseService: CourseService,
//     private titleService: Title
//   ) {}

//   ngOnInit() {
//     this.titleService.setTitle('Contact Us | Start Your Global Healthcare Career - Flygulf');
//     this.courseService.getActiveCourses().subscribe({
//       next: (courses) => this.courses = courses,
//       error: () => this.courses = []
//     });
//   }

//   onSubmit(form: NgForm) {

//     if (form.invalid) {
//       return;
//     }

//     this.contactService.sendMessage(this.contactData).subscribe({
//       next: (response) => {
//         console.log("Success response:", response);
//         this.successMessage = "Message sent successfully!";
//         this.errorMessage = '';

//         form.resetForm();

//         this.contactData = {
//           name: '',
//           email: '',
//           phone: '',
//           subject: '',
//           message: ''
//         };

//         setTimeout(() => { this.successMessage = ''; }, 3000);
//       },

//       error: (err) => {
//         console.log("Error:", err);
//         // ✅ If status is 200, treat it as success (backend returned non-JSON)
//         if (err.status === 200) {
//           this.successMessage = "Message sent successfully!";
//           this.errorMessage = '';

//           form.resetForm();
//           this.contactData = { name: '', email: '', phone: '', subject: '', message: '' };
//           setTimeout(() => { this.successMessage = ''; }, 3000);
//         } else {
//           this.errorMessage = "Something went wrong!";
//           this.successMessage = '';
//           setTimeout(() => { this.errorMessage = ''; }, 3000);
//         }
//       }
//     });
//   }
// }




import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../services/contact.service';
import { CourseService } from '../services/course.service';
import { Title } from '@angular/platform-browser';

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
    phone: '',
    subject: '',
    message: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private contactService: ContactService,
    private courseService: CourseService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Contact Us | Start Your Global Healthcare Career - Flygulf');
    this.courseService.getActiveCourses().subscribe({
      next: (courses) => this.courses = courses,
      error: () => this.courses = []
    });
  }

  // ✅ Block letters/symbols at keydown level — before they ever appear
  blockNonNumeric(event: KeyboardEvent): void {
    const allowedKeys = [
      'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'
    ];
    // Allow control keys
    if (allowedKeys.includes(event.key)) return;
    // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if (event.ctrlKey || event.metaKey) return;
    // Block anything that is NOT a digit
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  // ✅ Block paste of non-numeric content
  onPhonePaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text') ?? '';
    let digits = pasted.replace(/\D/g, '');
    if (digits.length > 0 && !/^[6-9]/.test(digits)) {
      digits = '';
    }
    digits = digits.substring(0, 10);
    const input = event.target as HTMLInputElement;
    input.value = digits;
    this.contactData.phone = digits;
  }

  // ✅ Final safety net — sanitize on every input event (mobile/autofill)
  sanitizePhone(event: Event): void {
    const input = event.target as HTMLInputElement;

    // Step 1: Strip everything that is NOT a digit
    let cleaned = input.value.replace(/\D/g, '');

    // Step 2: If first digit is not 6, 7, 8, or 9 — wipe it out
    if (cleaned.length > 0 && !/^[6-9]/.test(cleaned)) {
      cleaned = '';
    }

    // Step 3: Allow max 10 digits only
    cleaned = cleaned.substring(0, 10);

    // Step 4: Write back to DOM and model
    input.value = cleaned;
    this.contactData.phone = cleaned;
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
          phone: '',
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
          this.contactData = { name: '', email: '', phone: '', subject: '', message: '' };
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