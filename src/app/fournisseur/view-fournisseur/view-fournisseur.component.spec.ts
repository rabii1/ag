import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFournisseurComponent } from './view-fournisseur.component';

describe('ViewFournisseurComponent', () => {
  let component: ViewFournisseurComponent;
  let fixture: ComponentFixture<ViewFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFournisseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
