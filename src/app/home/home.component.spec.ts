import { ComponentFixture, TestBed } from '@angular/core/testing';

// 1. The import name must match the class name exactly
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  // 2. Change 'Home' to 'HomeComponent'
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 3. Use 'HomeComponent' here
      imports: [HomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});