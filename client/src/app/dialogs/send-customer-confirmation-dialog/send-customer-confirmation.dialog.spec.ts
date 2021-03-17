import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCustomerConfirmationDialog } from './send-customer-confirmation.dialog';

describe('SendCustomerConfirmationDialog', () => {
  let component: SendCustomerConfirmationDialog;
  let fixture: ComponentFixture<SendCustomerConfirmationDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendCustomerConfirmationDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendCustomerConfirmationDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
