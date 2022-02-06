import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrdreInterventionComponent } from './list-ordre-intervention.component';

describe('ListOrdreInterventionComponent', () => {
  let component: ListOrdreInterventionComponent;
  let fixture: ComponentFixture<ListOrdreInterventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOrdreInterventionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrdreInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
