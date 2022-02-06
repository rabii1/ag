import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionCreateComponent } from './intervention-create.component';

describe('InterventionCreateComponent', () => {
  let component: InterventionCreateComponent;
  let fixture: ComponentFixture<InterventionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterventionCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
