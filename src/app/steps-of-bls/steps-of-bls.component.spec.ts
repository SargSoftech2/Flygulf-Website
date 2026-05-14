
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepsOfBlsComponent } from './steps-of-bls.component'; // Fix: Remove .spec

describe('StepsOfBlsComponent', () => {
  let component: StepsOfBlsComponent;
  let fixture: ComponentFixture<StepsOfBlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepsOfBlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepsOfBlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});