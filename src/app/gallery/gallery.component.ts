import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent { 
 
  galleryImages = [
    // 1-5: Training & Labs
    { url: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842', alt: 'Nursing Simulation Lab' },
    { url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef', alt: 'Clinical Training' },
    { url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09', alt: 'Modern Hospital Tech' },
    { url: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg', alt: 'Professional Coaching' },
    { url: 'https://images.unsplash.com/photo-1584515933487-779824d29309', alt: 'Medical Team Seminar' },
    
    // 6-10: Student Focus & Study
    { url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514', alt: 'Diagnostic Equipment' },
    { url: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7', alt: 'Classroom Excellence' },
    { url: 'https://images.unsplash.com/photo-1551076805-e1869033e561', alt: 'Surgery Prep' },
    { url: 'https://plus.unsplash.com/premium_photo-1661775566553-f18e9b45b6b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmVtYWxlJTIwZG9jdG9yfGVufDB8fDB8fHww', alt: 'Female Doctor Portrait' },
    { url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d', alt: 'Student Practicing' },

    // 11-15: Advanced Technology
    { url: 'https://images.unsplash.com/photo-1576671081837-49000212a370', alt: 'Medical VR Training' },
    { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b', alt: 'Patient Care Mockup' },
    { url: 'https://images.unsplash.com/photo-1559185590-765cdc663325?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGNvYWNoaW5nJTIwc2Vzc2lvbiUyMG51cnNpbmclMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D', alt: 'Coaching Session' },
    { url: 'https://images.unsplash.com/photo-1766297248027-864589dbd336?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Medical Lab Research' },
    { url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118', alt: 'Digital Health Records' },

    // 16-20: Global Success & Seminars
    { url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528', alt: 'Global Nursing Seminar' },
    { url: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d', alt: 'International Placement' },
    { url: 'https://media.istockphoto.com/id/1496007079/photo/team-of-indian-doctors-standing-standing-at-hospital-healthcare-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=a2axcEO1ZvM2wvTzX_2yjeEmFBcSVzCSWazJt1jth6E=', alt: 'Nurse Group Success' },
    { url: 'https://media.istockphoto.com/id/2224236353/photo/a-person-performs-cpr-chest-compressions-on-a-during-a-training-session-highlighting.webp?a=1&b=1&s=612x612&w=0&k=20&c=Fq0Zyuu5f8jUdkpTXc0SmOARaxTxy8hAjt0W9VLwnws=', alt: 'Success Celebration' },
    { url: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136', alt: 'Professional Workshop' },

    // 21-25: Graduation & New Horizons
    { url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d', alt: 'Graduation Day' },
    { url: 'https://images.unsplash.com/photo-1543269664-76bc3997d9ea', alt: 'Joyful Graduates' },
    { url: 'https://images.unsplash.com/photo-1612888073468-eba93f586761?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaWNhbCUyMGZ1dHVyZXxlbnwwfHwwfHx8MA%3D%3D', alt: 'Medical Future' },
    { url: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed', alt: 'Modern Clinic View' },
    { url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de', alt: 'Clinical Equipment Still Life' }
  ];

  getSizeClass(i: number): string {
    if (i % 6 === 0) return 'size-lg';
    if (i % 3 === 0) return 'size-md';
    return 'size-sm';
  }

  getFloatClass(i: number): string {
    const floats = ['float-1', 'float-2', 'float-3'];
    return floats[i % 3];
  }
  // Inside your GalleryComponent class
getCardType(index: number): string {
  const types = ['type-tall', 'type-short', 'type-med', 'type-short', 'type-tall'];
  return types[index % 5];
}
}// <--- This MUST have a Capital 'G'
