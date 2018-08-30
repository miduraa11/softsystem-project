import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDeleteObjectComponent } from './admin-panel-delete-object.component';

describe('AdminDeleteObjectComponent', () => {
  let component: AdminDeleteObjectComponent;
  let fixture: ComponentFixture<AdminDeleteObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDeleteObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeleteObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
