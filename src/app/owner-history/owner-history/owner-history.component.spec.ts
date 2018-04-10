import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OwnerHistoryComponent} from './owner-history.component';

describe('OwnerHistoryComponent', () => {
  let component: OwnerHistoryComponent;
  let fixture: ComponentFixture<OwnerHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerHistoryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
