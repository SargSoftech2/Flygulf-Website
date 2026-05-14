import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportComponent } from './passport.component';

describe('Passport', () => {
  let component: PassportComponent;
  let fixture: ComponentFixture<PassportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassportComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
