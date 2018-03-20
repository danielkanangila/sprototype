import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UssdEmulatorComponent } from './ussd-emulator.component';

describe('UssdEmulatorComponent', () => {
  let component: UssdEmulatorComponent;
  let fixture: ComponentFixture<UssdEmulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UssdEmulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UssdEmulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
