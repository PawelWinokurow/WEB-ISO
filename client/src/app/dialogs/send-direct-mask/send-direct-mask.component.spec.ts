import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendDirectMaskComponent } from './send-direct-mask.component';

describe('SendDirectMaskComponent', () => {
  let component: SendDirectMaskComponent;
  let fixture: ComponentFixture<SendDirectMaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendDirectMaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendDirectMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
