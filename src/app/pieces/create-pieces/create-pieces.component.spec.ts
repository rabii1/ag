import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePiecesComponent } from './create-pieces.component';

describe('CreatePiecesComponent', () => {
  let component: CreatePiecesComponent;
  let fixture: ComponentFixture<CreatePiecesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePiecesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
