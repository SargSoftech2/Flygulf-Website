import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { provideRouter } from '@angular/router'; // Required for routerLink testing

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideRouter([]) // Provides a mock router so routerLink doesn't break tests
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Triggers initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the brand name FLYGULF', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.logo-main')?.textContent).toContain('FLY');
    expect(compiled.querySelector('.logo-alt')?.textContent).toContain('GULF');
  });

  it('should have a link to the Home page', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const homeLink = compiled.querySelector('a[routerLink="/"]');
    expect(homeLink).toBeTruthy();
  });
});