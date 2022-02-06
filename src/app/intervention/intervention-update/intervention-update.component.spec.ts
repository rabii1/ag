import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionUpdateComponent } from './intervention-update.component';

describe('InterventionUpdateComponent', () => {
  let component: InterventionUpdateComponent;
  let fixture: ComponentFixture<InterventionUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterventionUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
