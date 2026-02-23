import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OetConnectorsComponent } from './oet-connectors.component';

describe('OetConnectors', () => {
  let component: OetConnectorsComponent;
  let fixture: ComponentFixture<OetConnectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OetConnectorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OetConnectorsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
