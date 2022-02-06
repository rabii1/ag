import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeinterventionCreateComponent } from './demandeintervention-create.component';

describe('DemandeinterventionCreateComponent', () => {
  let component: DemandeinterventionCreateComponent;
  let fixture: ComponentFixture<DemandeinterventionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeinterventionCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeinterventionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
