import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFlowComponent } from './data-flow.component';

describe('DataFlow', () => {
  let component: DataFlowComponent;
  let fixture: ComponentFixture<DataFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataFlowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataFlowComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
