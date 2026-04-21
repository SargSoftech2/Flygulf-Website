import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface CourseListItem {
  id: number;
  courseName: string;
  shortForm: string;
  shortDesc: string;
  cardImage: string;
  cardImageName?: string;
  bannerImage: string;
  bannerImageName?: string;
  logo: string;
  logoName?: string;
  features: string[];
  courseHours: number;
  intensive: string;
  status: string;
  createdAt: string;
  sortOrder?: number;
}

interface CourseOverview {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  majorConceptHeading: string;
  majorConcepts: string[];
}

interface DesignCard {
  id: number;
  logo: string;
  logoName?: string;
  colorBackground: string;
  title: string;
  description: string;
  sortOrder: number;
}

interface Benefit {
  id: number;
  logo: string;
  logoName?: string;
  title: string;
  description: string;
  sortOrder: number;
}

interface CourseDetail extends CourseListItem {
  aboutTitle: string;
  aboutImage: string;
  aboutImageName?: string;
  aboutTotalExperience: string;
  aboutDescription: string;
  courseDetailTitle: string;
  courseDetailImage: string;
  courseDetailImageName?: string;
  overview: CourseOverview;
  designCards: DesignCard[];
  benefits: Benefit[];
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = environment.apiUrl;
  private coursesCache$: Observable<CourseListItem[]> | null = null;

  constructor(private http: HttpClient) {}

  getImageUrl(type: 'courses' | 'design-cards' | 'benefits', id: number, imageType?: string): string {
    const timestamp = new Date().getTime();
    if (type === 'courses' && imageType) {
      return `${this.baseUrl}/courses/${id}/image/${imageType}?t=${timestamp}`;
    }
    return `${this.baseUrl}/courses/${type}/${id}/image?t=${timestamp}`;
  }

  getCourseReviews(courseShortForm: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8081/flygulf/api/reviews?search=${courseShortForm}`);
  }

  getReviewMediaUrl(reviewId: number, type: 'profilePic' | 'video' | 'audio'): string {
    return `http://localhost:8081/flygulf/api/reviews/${reviewId}/file/${type}`;
  }

  getActiveCourses(): Observable<CourseListItem[]> {
    if (!this.coursesCache$) {
      // Use /active/light for faster loading (no subcourses, no design cards, no benefits)
      this.coursesCache$ = this.http.get<ApiResponse<CourseListItem[]>>(`${this.baseUrl}/courses/active`.trim()).pipe(
        map(response => {
          // Only map essential fields for fast loading
          return response.data.map(course => ({
            id: course.id,
            courseName: course.courseName,
            shortForm: course.shortForm,
            shortDesc: course.shortDesc,
            cardImage: course.cardImageName ? this.getImageUrl('courses', course.id, 'card') : '/images/course.jpg',
            bannerImage: '',
            logo: '',
            cardImageName: course.cardImageName,
            bannerImageName: course.bannerImageName,
            logoName: course.logoName,
            features: [],
            courseHours: course.courseHours || 0,
            intensive: course.intensive || '',
            status: course.status,
            createdAt: course.createdAt,
            sortOrder: course.sortOrder
          }))
          .sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999));
        }),

        shareReplay(1),
        catchError(error => {
          console.error('Error fetching active courses:', error);
          return of([]);
        })
      );
    }
    return this.coursesCache$;
  }

  getCourseById(id: number): Observable<CourseDetail> {
    return this.http.get<ApiResponse<CourseDetail>>(`${this.baseUrl}/courses/${id}`.trim()).pipe(
      map(response => {
        const course = response.data;
        return {
          ...course,
          cardImage: course.cardImageName ? this.getImageUrl('courses', course.id, 'card') : '/images/course.jpg',
          bannerImage: course.bannerImageName ? this.getImageUrl('courses', course.id, 'banner') : '/images/acls-bg.jpg',
          logo: course.logoName ? this.getImageUrl('courses', course.id, 'logo') : '',
          aboutImage: course.aboutImageName ? this.getImageUrl('courses', course.id, 'about') : '',
          courseDetailImage: course.courseDetailImageName ? this.getImageUrl('courses', course.id, 'detail') : '',
          designCards: course.designCards?.map(card => ({
            ...card,
            logo: card.logoName ? this.getImageUrl('design-cards', card.id) : card.logo
          })) || [],
          benefits: course.benefits?.map(benefit => ({
            ...benefit,
            logo: benefit.logoName ? this.getImageUrl('benefits', benefit.id) : benefit.logo
          })) || []
        };
      }),
      catchError(error => {
        console.error(`Error fetching course ${id}:`, error);
        throw error;
      })
    );
  }

  getCourseByShortForm(shortForm: string): Observable<CourseDetail | null> {
    return this.http.get<ApiResponse<CourseDetail>>(`${this.baseUrl}/courses/by-shortform/${shortForm}`.trim()).pipe(
      map(response => {
        if (response?.data) {
          const course = response.data;
          return {
            ...course,
            cardImage: course.cardImageName ? this.getImageUrl('courses', course.id, 'card') : '/images/course.jpg',
            bannerImage: course.bannerImageName ? this.getImageUrl('courses', course.id, 'banner') : '/images/acls-bg.jpg',
            logo: course.logoName ? this.getImageUrl('courses', course.id, 'logo') : '',
            aboutImage: course.aboutImageName ? this.getImageUrl('courses', course.id, 'about') : '',
            courseDetailImage: course.courseDetailImageName ? this.getImageUrl('courses', course.id, 'detail') : '',
            designCards: course.designCards?.map(card => ({
              ...card,
              logo: card.logoName ? this.getImageUrl('design-cards', card.id) : card.logo
            })) || [],
            benefits: course.benefits?.map(benefit => ({
              ...benefit,
              logo: benefit.logoName ? this.getImageUrl('benefits', benefit.id) : benefit.logo
            })) || []
          };
        }
        return null;
      }),
      catchError(() => {
        return this.getActiveCourses().pipe(
          switchMap(courses => {
            const found = courses.find(c => 
              c.shortForm.toUpperCase() === shortForm.toUpperCase() ||
              c.shortForm.toUpperCase().includes(shortForm.toUpperCase())
            );
            return found ? this.getCourseById(found.id) : of(null);
          }),
          catchError(() => of(null))
        );
      })
    );
  }
}
