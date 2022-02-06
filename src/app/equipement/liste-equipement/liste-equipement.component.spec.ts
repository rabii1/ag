import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEquipementComponent } from './liste-equipement.component';

describe('ListeEquipementComponent', () => {
  let component: ListeEquipementComponent;
  let fixture: ComponentFixture<ListeEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeEquipementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
