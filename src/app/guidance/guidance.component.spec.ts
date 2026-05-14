import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidanceComponent } from './guidance.component';

describe('Guidance', () => {
  let component: GuidanceComponent;
  let fixture: ComponentFixture<GuidanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuidanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuidanceComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
