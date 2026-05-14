import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Step {
  title: string;
  shortTitle: string;
  description?: string;
  showGoogleSearch?: boolean;
  phones?: { time: string; content: string }[];
  infoPoints?: string[];
  image?: string;
}

@Component({
  selector: 'app-saudi-prometric',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './saudi-prometric.component.html',
  styleUrls: ['./saudi-prometric.component.css'],
})
export class SaudiPrometricComponent {

  /** Certificate types shown in sidebar */
  certTypes = [
    { icon: '🫀', name: 'BLS',  desc: 'Basic Life Support'                    },
    { icon: '❤️', name: 'ACLS', desc: 'Advanced Cardiovascular Life Support'  },
    { icon: '👶', name: 'PALS', desc: 'Pediatric Advanced Life Support'        },
  ];

  /** Related blog posts */
  relatedBlogs = [
    { title: 'What is BLS course? Basic Life Support',  date: 'Feb 20, 2026', link: '/bls-course'         },
    { title: 'Steps of BLS',                            date: 'Feb 18, 2026', link: '/blogs/steps-of-bls' },
    { title: 'Prone Position CPR *AHA updates*',        date: 'Feb 20, 2026', link: '/blogs/prone-cpr'    },
    { title: 'How to do AHA ACLS and PALS Pretest',     date: 'Feb 20, 2026', link: '/acls'               },
  ];

  /** Step-by-step guide data */
  steps: Step[] = [
    {
      title: 'In google, type AHA atlas login',
      shortTitle: 'Google AHA Atlas Login',
      description:
        'If you face any issues in login, Please chat with me on WhatsApp by ' +
        '<a href="https://wa.me/919961905415" target="_blank">clicking here.</a>',
      showGoogleSearch: true,
    },
    {
      title: 'Click on the top page and then go to sign in / sign up',
      shortTitle: 'Sign In / Sign Up',
      phones: [
        {
          time: '2:54 PM',
          content: `
            <div style="background:#f1f1f1;border-radius:8px;padding:6px 8px;margin-bottom:6px;font-size:0.65rem;display:flex;align-items:center;gap:4px;">
              <span style="color:#4285F4;font-weight:700;">G</span> aha atlas login 🎤
            </div>
            <div style="border:2px solid #1a73e8;border-radius:4px;padding:4px 6px;background:#e8f0fe;font-size:0.65rem;font-weight:700;color:#1a73e8;">
              ▶ Atlas - AHA
            </div>
            <div style="font-size:0.58rem;color:#555;margin-top:4px;line-height:1.4;">
              Looking for an AHA course near you?
            </div>
          `,
        },
        {
          time: '2:54 PM',
          content: `
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
              <div style="display:flex;align-items:center;gap:4px;">
                <span style="color:#e00;font-size:0.9rem;">❤</span>
                <span style="font-size:0.65rem;font-weight:700;">Atlas</span>
              </div>
              <div style="border:2px solid #00bcd4;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;">☰</div>
            </div>
            <div style="font-size:0.7rem;font-weight:700;color:#111;">Looking for a class<br>Find it Here</div>
            <div style="font-size:0.6rem;color:#555;margin-top:4px;">Enter your location to find a class</div>
          `,
        },
        {
          time: '2:55 PM',
          content: `
            <div style="display:flex;align-items:center;gap:4px;margin-bottom:10px;">
              <span style="color:#e00;font-size:0.9rem;">❤</span>
              <span style="font-size:0.65rem;font-weight:700;">Atlas</span>
            </div>
            <div style="border:2px solid #1a73e8;border-radius:6px;padding:6px 8px;font-size:0.68rem;color:#1a73e8;font-weight:600;background:#e8f0fe;margin-bottom:6px;">
              🔒 Sign In / Sign Up
            </div>
            <div style="font-size:0.65rem;color:#444;margin-bottom:4px;">Find A Class</div>
            <div style="font-size:0.65rem;color:#444;margin-bottom:4px;">Classes ›</div>
            <div style="font-size:0.65rem;color:#444;">Help & Support ›</div>
          `,
        },
      ],
    },
    {
      title: 'Enter the User name and Password',
      shortTitle: 'Enter Credentials',
      phones: [
        {
          time: '2:55 PM',
          content: `
            <div style="font-size:0.68rem;font-weight:700;color:#111;margin-bottom:4px;">Sign In or Create an Account</div>
            <div style="font-size:0.6rem;color:#777;margin-bottom:8px;">*indicates a required field</div>
            <div style="font-size:0.65rem;color:#333;margin-bottom:2px;">Username / Email:*</div>
            <div style="border:2px solid #1a73e8;border-radius:4px;padding:4px 6px;font-size:0.65rem;color:#1a73e8;font-weight:700;margin-bottom:6px;">Your Email</div>
            <div style="font-size:0.65rem;color:#333;margin-bottom:2px;">Password:*</div>
            <div style="border:2px solid #1a73e8;border-radius:4px;padding:4px 6px;font-size:0.65rem;color:#1a73e8;font-weight:700;margin-bottom:2px;">Your Password</div>
            <div style="font-size:0.58rem;color:#1a73e8;margin-bottom:8px;">Forgot Password?</div>
            <div style="background:#e00;color:white;border-radius:4px;padding:5px;font-size:0.65rem;text-align:center;font-weight:700;">Sign In</div>
          `,
        },
      ],
      infoPoints: [
        'The password to be entered is the same as the one set on the pretest website.',
        'If You don\'t remember the password, you can reset it by clicking on Forgot Password.',
        'If You have taken the course from Charles Institute, Your password can be Charles123',
      ],
    },
    {
      title: 'Fill in the additional details if asked',
      shortTitle: 'Fill Additional Details',
      phones: [
        {
          time: '2:59 PM',
          content: `
            <div style="font-size:0.68rem;font-weight:700;color:#111;margin-bottom:4px;">Complete Your Registration</div>
            <div style="font-size:0.6rem;color:#555;margin-bottom:8px;line-height:1.4;">Keep your contact number current so we can verify your account.</div>
            <div style="font-size:0.63rem;color:#333;margin-bottom:2px;">Mobile Number:*</div>
            <div style="border:1px solid #ccc;border-radius:4px;padding:4px 6px;font-size:0.6rem;color:#999;margin-bottom:8px;">🇺🇸 000 000 0000</div>
            <div style="display:flex;gap:8px;">
              <div style="background:#e00;color:white;border-radius:4px;padding:4px 8px;font-size:0.6rem;font-weight:700;">Save</div>
              <div style="border:1px solid #ccc;border-radius:4px;padding:4px 8px;font-size:0.6rem;color:#555;">Skip ↑</div>
            </div>
          `,
        },
        {
          time: '2:59 PM',
          content: `
            <div style="font-size:0.68rem;font-weight:700;color:#111;margin-bottom:6px;">CONFIRM SKIP</div>
            <div style="font-size:0.6rem;color:#555;margin-bottom:8px;line-height:1.4;">We strongly recommend adding a mobile number.</div>
            <div style="display:flex;flex-direction:column;gap:4px;">
              <div style="border:1px solid #ccc;border-radius:4px;padding:4px;font-size:0.6rem;text-align:center;color:#333;">Close</div>
              <div style="border:1px solid #ccc;border-radius:4px;padding:4px;font-size:0.6rem;text-align:center;color:#333;">Don't Ask Again</div>
              <div style="background:#333;color:white;border-radius:4px;padding:4px;font-size:0.6rem;text-align:center;">Skip For Now ↓</div>
            </div>
          `,
        },
        {
          time: '3:01 PM',
          content: `
            <div style="font-size:0.65rem;font-weight:700;color:#111;margin-bottom:4px;">Additional Information</div>
            <div style="font-size:0.6rem;color:#555;margin-bottom:4px;">Preferred Language</div>
            <div style="border:1px solid #ccc;border-radius:3px;padding:3px 5px;font-size:0.58rem;margin-bottom:4px;">English ×</div>
            <div style="font-size:0.6rem;color:#555;margin-bottom:2px;">Country/Area</div>
            <div style="border:1px solid #ccc;border-radius:3px;padding:3px 5px;font-size:0.58rem;margin-bottom:6px;">India ×</div>
            <div style="background:#e00;color:white;border-radius:4px;padding:4px;font-size:0.6rem;text-align:center;font-weight:700;">Submit ↑</div>
          `,
        },
      ],
    },
    {
      title: 'My account page will open. Scroll down and click on Ecard',
      shortTitle: 'Click on Ecard',
      phones: [
        {
          time: '3:03 PM',
          content: `
            <div style="background:#4CAF50;color:white;border-radius:4px;padding:2px 6px;font-size:0.6rem;font-weight:700;display:inline-block;margin-bottom:4px;">Active</div>
            <div style="font-size:0.65rem;font-weight:700;color:#111;margin-bottom:6px;">Advanced Cardiovascular Life Support Course</div>
            <div style="font-size:0.58rem;color:#1a73e8;margin-bottom:2px;">ECARD CODE: 225621888182</div>
            <div style="font-size:0.58rem;color:#333;margin-bottom:1px;">NAME: Jincymol Joseph</div>
            <div style="font-size:0.58rem;color:#333;margin-bottom:1px;">TRAINING CENTER: Charles Institute</div>
            <div style="font-size:0.58rem;color:#333;margin-bottom:6px;">COURSE DATE: 1/11/2022</div>
            <div style="font-size:0.58rem;color:#333;margin-bottom:4px;">SELECT TO VIEW ECARD:</div>
            <div style="border:1px solid #ccc;border-radius:3px;padding:3px 5px;font-size:0.58rem;margin-bottom:4px;">Full Size eCard - English ▾</div>
            <div style="background:#e00;color:white;border-radius:4px;padding:3px 8px;font-size:0.6rem;font-weight:700;display:inline-block;">VIEW ↑</div>
          `,
        },
        {
          time: '3:03 PM',
          content: `
            <div style="background:#4CAF50;color:white;border-radius:4px;padding:2px 6px;font-size:0.6rem;font-weight:700;display:inline-block;margin-bottom:4px;">Active</div>
            <div style="font-size:0.62rem;font-weight:700;color:#111;margin-bottom:4px;">Advanced Cardiovascular Life Support Course</div>
            <div style="font-size:0.58rem;color:#1a73e8;margin-bottom:4px;">ECARD CODE: 225621888182</div>
            <div style="border:1px solid #ccc;border-radius:3px;padding:3px 5px;font-size:0.58rem;margin-bottom:2px;background:#f5f5f5;">Full Size eCard - English</div>
            <div style="border:1px solid #1a73e8;border-radius:3px;padding:3px 5px;font-size:0.58rem;margin-bottom:2px;background:#e8f0fe;color:#1a73e8;">✓ Wallet Size eCard - English</div>
          `,
        },
        {
          time: '3:03 PM',
          content: `
            <div style="font-size:0.6rem;color:#555;margin-bottom:6px;text-align:center;">1 of 1</div>
            <div style="border:1px solid #ddd;border-radius:6px;padding:8px;background:#fff8f8;">
              <div style="font-size:0.55rem;color:#e00;font-weight:700;margin-bottom:2px;">ADVANCED CARDIOVASCULAR LIFE SUPPORT</div>
              <div style="font-size:0.65rem;font-weight:800;color:#e00;">ACLS</div>
              <div style="font-size:0.5rem;color:#555;margin-top:2px;">Provider</div>
              <div style="font-size:0.48rem;color:#333;margin-top:4px;line-height:1.4;">Has successfully completed the cognitive and skills evaluations...</div>
            </div>
          `,
        },
        {
          time: '3:05 PM',
          content: `
            <div style="font-size:0.6rem;color:#555;margin-bottom:6px;text-align:center;">1 of 1</div>
            <div style="border:2px solid #e00;border-radius:6px;padding:8px;background:#fff8f8;">
              <div style="font-size:0.5rem;color:#e00;font-weight:700;text-align:center;margin-bottom:2px;">ADVANCED CARDIOVASCULAR LIFE SUPPORT</div>
              <div style="display:flex;align-items:center;gap:4px;margin-bottom:4px;">
                <div style="font-size:0.65rem;font-weight:800;color:#e00;">ACLS<br><span style="font-size:0.5rem;font-weight:400;">Provider</span></div>
                <span style="color:#e00;font-size:0.9rem;">❤</span>
              </div>
              <div style="font-size:0.48rem;color:#333;line-height:1.4;">Jincymol Joseph<br>Charles Institute<br>Issue Date: 1/11/2022<br>Renewal: 01/2024</div>
            </div>
          `,
        },
      ],
    },
    {
      title: 'Save your AHA E card for future use. You can get it printed if required.',
      shortTitle: 'Save & Print E Card',
      description:
        'Once you view the eCard, you can download it as a PDF and save it for future reference. ' +
        'The certificate will show your name, course date, training center, and renewal date. ' +
        'You can also get it printed if required.',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80',
    },
  ];

  /** Scroll to a step (for sidebar quick nav) */
  scrollToStep(index: number): void {
    const stepCards = document.querySelectorAll('.step-card');
    if (stepCards[index]) {
      stepCards[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}