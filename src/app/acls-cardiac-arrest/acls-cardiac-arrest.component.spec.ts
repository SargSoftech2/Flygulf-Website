import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AclsCardiacArrestComponent } from './acls-cardiac-arrest.component';

describe('AclsCardiacArrestComponent', () => {
  let component: AclsCardiacArrestComponent;
  let fixture: ComponentFixture<AclsCardiacArrestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AclsCardiacArrestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AclsCardiacArrestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});