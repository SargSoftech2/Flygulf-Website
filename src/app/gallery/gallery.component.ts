import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit { 
  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

 ngOnInit(): void {
    this.titleService.setTitle('Advanced Medical Training Gallery | FlyGulf International Academy');
    
    this.metaService.updateTag({
      name: 'description',
      content: 'Explore FlyGulf International Career Academy’s training gallery. Peek inside our state-of-the-art simulation labs, practical medical workshops, and real student clinical practice.'
    });
  }

  galleryImages: any[] = [
    { url: 'images/gallery1.webp', alt: 'Modern Hospital Tech' },
    { url: 'images/gallery2.jpg', alt: 'Professional Coaching' },
    { url: 'images/gallery4.jpg', alt: 'Classroom Excellence' },
    { url: 'images/gallery13.jpeg', alt: 'Surgery Prep' },
    { url: 'images/gallery12.jpeg', alt: 'Female Doctor Portrait' },
    { url: 'images/gallery8.jpg', alt: 'Medical VR Training' },
    { url: 'images/gallery9.jpg', alt: 'Patient Care Mockup' },
    { url: 'images/gallery10.jpg', alt: 'Patient Care Mockup' },
  ];

  getCardType(index: number): string {
    const types = ['type-tall', 'type-short', 'type-med', 'type-short', 'type-tall'];
    return types[index % 5];
  }

  // Smooth UI Fix: Tracks when an image finishes downloading
  onImageLoad(img: any) {
    img.isLoaded = true;
  }

  trackById(index: number, item: any): number {
    return index; 
  }
}