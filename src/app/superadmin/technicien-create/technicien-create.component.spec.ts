import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicienCreateComponent } from './technicien-create.component';

describe('TechnicienCreateComponent', () => {
  let component: TechnicienCreateComponent;
  let fixture: ComponentFixture<TechnicienCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicienCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicienCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
