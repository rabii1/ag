import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeEmployeeComponent } from './demande-employee.component';

describe('DemandeEmployeeComponent', () => {
  let component: DemandeEmployeeComponent;
  let fixture: ComponentFixture<DemandeEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
