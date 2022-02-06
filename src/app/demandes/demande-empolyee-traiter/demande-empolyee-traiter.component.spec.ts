import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeEmpolyeeTraiterComponent } from './demande-empolyee-traiter.component';

describe('DemandeEmpolyeeTraiterComponent', () => {
  let component: DemandeEmpolyeeTraiterComponent;
  let fixture: ComponentFixture<DemandeEmpolyeeTraiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeEmpolyeeTraiterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeEmpolyeeTraiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
