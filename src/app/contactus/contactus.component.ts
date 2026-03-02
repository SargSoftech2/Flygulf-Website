// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-contactus',
//   imports: [],
//   templateUrl: './contactus.component.html',
//   styleUrl: './contactus.component.css',
// })
// export class ContactusComponent {

// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { ContactService } from '../services/contact.service';
// @Component({
//   selector: 'app-contactus',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './contactus.component.html',
//   styleUrl: './contactus.component.css',
// })
// export class ContactusComponent {

//   contactData = {
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   };

//   constructor(private contactService: ContactService) {}

//   // 
  
// onSubmit() {

//   this.contactService.sendMessage(this.contactData)
//     .subscribe({
//       next: () => {

//         alert("Message sent successfully!");

//         // ✅ RESET FORM DATA
//         this.contactData = {
//           name: '',
//           email: '',
//           subject: '',
//           message: ''
//         };

//       },
//       // error: (err: any) => {
//       //   console.error(err);
//       //   alert("Error sending message");
//       // }
//     });

// }
    

   
// }



// import { Component } from '@angular/core';
// import { FormsModule, NgForm } from '@angular/forms';
// import { ContactService } from '../services/contact.service';

// @Component({
//   selector: 'app-contactus',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './contactus.component.html',
//   styleUrl: './contactus.component.css',
// })
// export class ContactusComponent {

//   contactData = {
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   };

//   constructor(private contactService: ContactService) {}

//   onSubmit(form: NgForm) {

//     if (form.invalid) {
//       alert("Please fill all fields!");
//       return;
//     }

//     this.contactService.sendMessage(this.contactData)
//       .subscribe({
//         next: () => {

//           alert("Message sent successfully!");

//           // ✅ Reset entire form properly
//           form.resetForm();

//         },
//         error: (err: any) => {
//           console.error(err);
//           alert("Error sending message");
//         }
//       });
//   }
// }




// import { Component } from '@angular/core';
// import { FormsModule, NgForm } from '@angular/forms';
// import { ContactService } from '../services/contact.service';

// @Component({
//   selector: 'app-contactus',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './contactus.component.html',
//   styleUrl: './contactus.component.css',
// })
// export class ContactusComponent {

//   contactData = {
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   };

//   constructor(private contactService: ContactService) {}

//   onSubmit(form: NgForm) {

//     this.contactService.sendMessage(this.contactData)
//       .subscribe({
//         next: () => {

//           alert("Message sent successfully!");

//           // ✅ THIS LINE CLEARS ALL INPUTS
//           form.resetForm();

//         },
//         error: () => {
//           alert("Error sending message");
//         }
//       });
//   }
// }


import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css',
})
export class ContactusComponent {

  contactData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private contactService: ContactService) {}

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