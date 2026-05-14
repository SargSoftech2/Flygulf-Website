import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogsComponent } from './blogs.component'; // Update this import

describe('BlogsComponent', () => {
  let component: BlogsComponent;
  let fixture: ComponentFixture<BlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogsComponent] // Update this
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});