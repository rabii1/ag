import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEquipementComponent } from './create-equipement.component';

describe('CreateEquipementComponent', () => {
  let component: CreateEquipementComponent;
  let fixture: ComponentFixture<CreateEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEquipementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
