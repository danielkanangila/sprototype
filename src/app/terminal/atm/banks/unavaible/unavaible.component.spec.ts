import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnavaibleComponent } from './unavaible.component';

describe('UnavaibleComponent', () => {
  let component: UnavaibleComponent;
  let fixture: ComponentFixture<UnavaibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnavaibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnavaibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
