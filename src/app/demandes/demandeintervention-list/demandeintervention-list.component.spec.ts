import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeinterventionListComponent } from './demandeintervention-list.component';

describe('DemandeinterventionListComponent', () => {
  let component: DemandeinterventionListComponent;
  let fixture: ComponentFixture<DemandeinterventionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeinterventionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeinterventionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
