import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeinterventionUpdateComponent } from './demandeintervention-update.component';

describe('DemandeinterventionUpdateComponent', () => {
  let component: DemandeinterventionUpdateComponent;
  let fixture: ComponentFixture<DemandeinterventionUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeinterventionUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeinterventionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
