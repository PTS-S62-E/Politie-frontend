import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StolenVehicleComponent} from './stolen-vehicle.component';

describe('AddStolenVehicleComponent', () => {
  let component: StolenVehicleComponent;
  let fixture: ComponentFixture<StolenVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StolenVehicleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StolenVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
