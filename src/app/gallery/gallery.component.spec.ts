import { ComponentFixture, TestBed } from '@angular/core/testing';
// 1. Update the import to use Capital G
import { GalleryComponent } from './gallery.component'; 

describe('GalleryComponent', () => {
  // 2. Update the type to Capital G
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 3. Update the imports to Capital G
      imports: [GalleryComponent] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});