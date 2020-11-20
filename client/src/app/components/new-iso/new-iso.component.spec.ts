import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewISOComponent } from './new-iso.component';

describe('NewISOComponent', () => {
  let component: NewISOComponent;
  let fixture: ComponentFixture<NewISOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewISOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewISOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
