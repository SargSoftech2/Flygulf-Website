import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent { 
 
  galleryImages = [
    // 1-5: Training & Labs

    { url: 'images/gallery1.JPG', alt: 'Modern Hospital Tech' },
    { url: 'images/gallery2.JPG', alt: 'Professional Coaching' },
    { url: 'images/gallery3.PNG', alt: 'Medical Team Seminar' },
    
    // 6-10: Student Focus & Study
    
    { url: 'images/gallery4.jpeg', alt: 'Classroom Excellence' },
    { url: 'images/gallery13.jpeg', alt: 'Surgery Prep' },
    { url: 'images/gallery12.jpeg', alt: 'Female Doctor Portrait' },


    // 11-15: Advanced Technology
    { url: 'images/gallery8.jpeg', alt: 'Medical VR Training' },
    { url: 'images/gallery9.jpeg', alt: 'Patient Care Mockup' },
    { url: 'images/gallery10.JPG', alt: 'Patient Care Mockup' },
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
