import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCustomerConfirmationDialogComponent } from './send-customer-confirmation-dialog.component';

describe('SendCustomerConfirmationDialogComponent', () => {
  let component: SendCustomerConfirmationDialogComponent;
  let fixture: ComponentFixture<SendCustomerConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendCustomerConfirmationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendCustomerConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
