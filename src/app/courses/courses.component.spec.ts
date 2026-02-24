import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { provideRouter } from '@angular/router';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all 13 courses', () => {
    expect(component.allCourses.length).toBe(13);
  });

  it('should filter correctly', () => {
    component.setFilter('Clinical');
    expect(component.filteredCourses.every(c => c.category === 'Clinical')).toBeTruthy();
  });
});