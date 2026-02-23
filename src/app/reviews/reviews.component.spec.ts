import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewsComponent } from './reviews.component'; // Ensure this import matches

describe('ReviewsComponent', () => {
  let component: ReviewsComponent; // Changed from Reviews
  let fixture: ComponentFixture<ReviewsComponent>; // Changed from Reviews

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewsComponent] // Changed from Reviews
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsComponent); // Changed from Reviews
    component = fixture.componentInstance;
    fixture.detectChanges(); // Use detectChanges() instead of whenStable() for basic creation test
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});