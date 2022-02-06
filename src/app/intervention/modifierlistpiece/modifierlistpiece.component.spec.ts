import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierlistpieceComponent } from './modifierlistpiece.component';

describe('ModifierlistpieceComponent', () => {
  let component: ModifierlistpieceComponent;
  let fixture: ComponentFixture<ModifierlistpieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierlistpieceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierlistpieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
