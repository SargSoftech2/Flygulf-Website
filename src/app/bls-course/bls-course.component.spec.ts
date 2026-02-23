import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BlsCourseComponent } from './bls-course.component';

describe('BlsCourseComponent', () => {
  let component: BlsCourseComponent;
  let fixture: ComponentFixture<BlsCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlsCourseComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BlsCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct number of FAQs', () => {
    expect(component.faqs.length).toBe(12);
  });

  it('should open first FAQ by default', () => {
    expect(component.openIndex).toBe(0);
  });

  it('should toggle FAQ open', () => {
    component.toggleFaq(2);
    expect(component.openIndex).toBe(2);
  });

  it('should close FAQ when toggled again', () => {
    component.toggleFaq(2);
    component.toggleFaq(2);
    expect(component.openIndex).toBe(-1);
  });

  it('should have course highlights', () => {
    expect(component.courseHighlights.length).toBe(6);
  });

  it('should have related blogs', () => {
    expect(component.relatedBlogs.length).toBe(4);
  });
});