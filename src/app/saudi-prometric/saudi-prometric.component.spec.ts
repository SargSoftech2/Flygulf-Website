import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SaudiPrometricComponent } from './saudi-prometric.component';

describe('SaudiPrometricComponent', () => {
  let component: SaudiPrometricComponent;
  let fixture: ComponentFixture<SaudiPrometricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaudiPrometricComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SaudiPrometricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 steps', () => {
    expect(component.steps.length).toBe(6);
  });

  it('should have 3 certificate types', () => {
    expect(component.certTypes.length).toBe(3);
  });

  it('should have related blogs', () => {
    expect(component.relatedBlogs.length).toBe(4);
  });

  it('first step should show google search', () => {
    expect(component.steps[0].showGoogleSearch).toBe(true);
  });

  it('step 3 should have info points', () => {
    expect(component.steps[2].infoPoints?.length).toBeGreaterThan(0);
  });
});