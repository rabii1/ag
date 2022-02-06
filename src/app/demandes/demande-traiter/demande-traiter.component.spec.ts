import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeTraiterComponent } from './demande-traiter.component';

describe('DemandeTraiterComponent', () => {
  let component: DemandeTraiterComponent;
  let fixture: ComponentFixture<DemandeTraiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeTraiterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeTraiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
