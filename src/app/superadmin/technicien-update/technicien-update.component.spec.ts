import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicienUpdateComponent } from './technicien-update.component';

describe('TechnicienUpdateComponent', () => {
  let component: TechnicienUpdateComponent;
  let fixture: ComponentFixture<TechnicienUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicienUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicienUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
