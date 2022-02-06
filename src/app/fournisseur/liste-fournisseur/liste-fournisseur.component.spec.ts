import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFournisseurComponent } from './liste-fournisseur.component';

describe('ListeFournisseurComponent', () => {
  let component: ListeFournisseurComponent;
  let fixture: ComponentFixture<ListeFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeFournisseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
