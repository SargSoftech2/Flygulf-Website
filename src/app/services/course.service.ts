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
    if (type === 'courses' && imageType) {
      return `${this.baseUrl}/courses/${id}/image/${imageType}`;
    }
    return `${this.baseUrl}/courses/${type}/${id}/image`;
  }

  getActiveCourses(): Observable<CourseListItem[]> {
    if (!this.coursesCache$) {
      this.coursesCache$ = this.http.get<ApiResponse<CourseListItem[]>>(`${this.baseUrl}/courses/active`.trim()).pipe(
        map(response => {
          return response.data.map(course => ({
            ...course,
            cardImage: this.getImageUrl('courses', course.id, 'card'),
            bannerImage: this.getImageUrl('courses', course.id, 'banner'),
            logo: this.getImageUrl('courses', course.id, 'logo')
          }));
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
          cardImage: this.getImageUrl('courses', course.id, 'card'),
          bannerImage: this.getImageUrl('courses', course.id, 'banner'),
          logo: this.getImageUrl('courses', course.id, 'logo'),
          aboutImage: this.getImageUrl('courses', course.id, 'about'),
          courseDetailImage: this.getImageUrl('courses', course.id, 'detail'),
          designCards: course.designCards?.map(card => ({
            ...card,
            logo: this.getImageUrl('design-cards', card.id)
          })) || [],
          benefits: course.benefits?.map(benefit => ({
            ...benefit,
            logo: this.getImageUrl('benefits', benefit.id)
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
            cardImage: this.getImageUrl('courses', course.id, 'card'),
            bannerImage: this.getImageUrl('courses', course.id, 'banner'),
            logo: this.getImageUrl('courses', course.id, 'logo'),
            aboutImage: this.getImageUrl('courses', course.id, 'about'),
            courseDetailImage: this.getImageUrl('courses', course.id, 'detail'),
            designCards: course.designCards?.map(card => ({
              ...card,
              logo: this.getImageUrl('design-cards', card.id)
            })) || [],
            benefits: course.benefits?.map(benefit => ({
              ...benefit,
              logo: this.getImageUrl('benefits', benefit.id)
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
