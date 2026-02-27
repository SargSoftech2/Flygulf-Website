import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AclsCardiacArrestComponent } from './acls-cardiac-arrest.component';
import { provideRouter } from '@angular/router';

describe('AclsCardiacArrestComponent', () => {
  let component: AclsCardiacArrestComponent;
  let fixture: ComponentFixture<AclsCardiacArrestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AclsCardiacArrestComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AclsCardiacArrestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load 6 benefit cards', () => {
    expect(component.benefits.length).toBe(6);
  });

  it('should load 6 FAQs all closed by default', () => {
    expect(component.faqs.length).toBe(6);
    expect(component.faqs.every(f => !f.open)).toBeTruthy();
  });

  it('should open a FAQ on toggle', () => {
    component.toggleFaq(0);
    expect(component.faqs[0].open).toBeTruthy();
  });

  it('should close other FAQs when one is opened', () => {
    component.toggleFaq(0);
    component.toggleFaq(1);
    expect(component.faqs[0].open).toBeFalsy();
    expect(component.faqs[1].open).toBeTruthy();
  });

  it('should close an open FAQ on second toggle', () => {
    component.toggleFaq(2);
    component.toggleFaq(2);
    expect(component.faqs[2].open).toBeFalsy();
  });

  it('should load 3 reviews', () => {
    expect(component.reviews.length).toBe(3);
  });

  it('should have 3 default design cards', () => {
    expect(component.designCards.length).toBe(3);
  });

  it('should have 3 default major concepts', () => {
    expect(component.majorConcepts.length).toBe(3);
  });
});