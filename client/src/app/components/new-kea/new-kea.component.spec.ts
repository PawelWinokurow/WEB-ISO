import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewKEAComponent } from './new-kea.component';

describe('NewKEAComponent', () => {
  let component: NewKEAComponent;
  let fixture: ComponentFixture<NewKEAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewKEAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewKEAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
