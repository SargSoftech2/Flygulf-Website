import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  VisaComponent } from './visa.component';

describe('Visa', () => {
  let component: VisaComponent;
  let fixture: ComponentFixture<VisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
