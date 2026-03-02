import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Review {
  id: number;
  name: string;
  mobile: string;
  designation: string;
  course: string;
  review: string;
  rating: number;
  hasProfilePic: boolean;
  hasAudio: boolean;
  hasVideo: boolean;
  profilePicType: string | null;
  audioType: string | null;
  videoType: string | null;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = 'http://localhost:8081/flygulf/api';

  constructor(private http: HttpClient) {}

  getAllReviews(search?: string, rating?: number): Observable<Review[]> {
    let url = `${this.baseUrl}/reviews`;
    const params: string[] = [];
    
    if (search) params.push(`search=${encodeURIComponent(search)}`);
    if (rating) params.push(`rating=${rating}`);
    
    if (params.length > 0) url += `?${params.join('&')}`;

    return this.http.get<ApiResponse<Review[]>>(url).pipe(
      map(response => {
        console.log('Reviews API Response:', response);
        return response.data || [];
      }),
      catchError(error => {
        console.error('Error fetching reviews:', error);
        return of([]);
      })
    );
  }

  getProfilePicUrl(id: number): string {
    return `${this.baseUrl}/reviews/${id}/file/profilePic`;
  }

  getAudioUrl(id: number): string {
    return `${this.baseUrl}/reviews/${id}/file/audio`;
  }

  getVideoUrl(id: number): string {
    return `${this.baseUrl}/reviews/${id}/file/video`;
  }
}
