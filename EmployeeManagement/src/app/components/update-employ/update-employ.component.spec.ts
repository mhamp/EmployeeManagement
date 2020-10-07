import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployComponent } from './update-employ.component';

describe('UpdateEmployComponent', () => {
  let component: UpdateEmployComponent;
  let fixture: ComponentFixture<UpdateEmployComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEmployComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmployComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
