import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddStolenVehicleComponent} from './add-stolen-vehicle.component';

describe('AddStolenVehicleComponent', () => {
  let component: AddStolenVehicleComponent;
  let fixture: ComponentFixture<AddStolenVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddStolenVehicleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStolenVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
