import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewComponent {

  // ================= TEXT REVIEWS =================
  reviews = [
    {
      name: 'Rahul Sharma',
      comment: 'Excellent training and very helpful instructors!',
      rating: 5
    },
    {
      name: 'Priya Patil',
      comment: 'Good course content and practical sessions.',
      rating: 4
    },
    {
      name: 'Amit Kulkarni',
      comment: 'Loved the placement support and guidance.',
      rating: 5
    }
  ];

  // ⭐ stars
  stars = [1, 2, 3, 4, 5];


  // ================= SUBSCRIBE =================
  email: string = '';
  subscribed: boolean = false;

  subscribe() {
    if (!this.email || !this.email.includes('@')) {
      alert('Please enter valid email');
      return;
    }

    this.subscribed = true;
    console.log('Subscribed:', this.email);
  }


  // ================= VIDEO REVIEWS (🔥 THIS WAS MISSING) =================
  videos: string[] = [
    'assets/videos/review1.mp4',
    'assets/videos/review2.mp4'
  ];

}  