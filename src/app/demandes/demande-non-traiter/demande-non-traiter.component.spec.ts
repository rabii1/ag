import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeNonTraiterComponent } from './demande-non-traiter.component';

describe('DemandeNonTraiterComponent', () => {
  let component: DemandeNonTraiterComponent;
  let fixture: ComponentFixture<DemandeNonTraiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeNonTraiterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeNonTraiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
