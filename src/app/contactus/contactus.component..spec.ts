// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { Contactus } from './contactus.component';

// describe('Contactus', () => {
//   let component: Contactus;
//   let fixture: ComponentFixture<Contactus>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [Contactus]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(Contactus);
//     component = fixture.componentInstance;
//     await fixture.whenStable();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactusComponent } from './contactus.component';

describe('ContactusComponent', () => {
  let component: ContactusComponent;
  let fixture: ComponentFixture<ContactusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactusComponent] // because standalone
    }).compileComponents();

    fixture = TestBed.createComponent(ContactusComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});