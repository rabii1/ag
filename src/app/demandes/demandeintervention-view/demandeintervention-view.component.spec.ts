import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeinterventionViewComponent } from './demandeintervention-view.component';

describe('DemandeinterventionViewComponent', () => {
  let component: DemandeinterventionViewComponent;
  let fixture: ComponentFixture<DemandeinterventionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeinterventionViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeinterventionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
