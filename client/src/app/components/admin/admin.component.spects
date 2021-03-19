import { ComponentFixture, TestBed } from '@angular/core/testing';
import { serviceModules, externalModules } from 'src/app/modules/modules';
import { AdminComponent } from './admin.component';


describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      providers: [
        ...serviceModules
      ],
      imports: [
        ...externalModules
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
