import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationComponent } from './accomodation.component';

describe('Accomodation', () => {
  let component: AccomodationComponent;
  let fixture: ComponentFixture<AccomodationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccomodationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccomodationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
