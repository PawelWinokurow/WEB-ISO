import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SendMaskConfirmationDialogComponent } from '../send-mask-confirmation-dialog/send-mask-confirmation-dialog.component';


describe('SendMaskConfirmationDialogComponent', () => {
  let component: SendMaskConfirmationDialogComponent;
  let fixture: ComponentFixture<SendMaskConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendMaskConfirmationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMaskConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
