import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreselectionDialogComponent } from './preselection-dialog.component';

describe('PreselectionDialogComponent', () => {
  let component: PreselectionDialogComponent;
  let fixture: ComponentFixture<PreselectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreselectionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreselectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
