import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEquipementComponent } from './view-equipement.component';

describe('ViewEquipementComponent', () => {
  let component: ViewEquipementComponent;
  let fixture: ComponentFixture<ViewEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEquipementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
