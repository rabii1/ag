import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrdreInterventionComponent } from './view-ordre-intervention.component';

describe('ViewOrdreInterventionComponent', () => {
  let component: ViewOrdreInterventionComponent;
  let fixture: ComponentFixture<ViewOrdreInterventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOrdreInterventionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrdreInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
