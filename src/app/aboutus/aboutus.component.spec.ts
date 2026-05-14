import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './aboutus.component'; // Import the correct class name

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // If it's a standalone component, use 'imports'. 
      // If it's a traditional component, use 'declarations'.
      imports: [AboutComponent] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});