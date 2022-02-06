import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePiecesComponent } from './update-pieces.component';

describe('UpdatePiecesComponent', () => {
  let component: UpdatePiecesComponent;
  let fixture: ComponentFixture<UpdatePiecesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePiecesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
