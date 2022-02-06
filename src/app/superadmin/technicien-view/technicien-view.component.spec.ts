import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicienViewComponent } from './technicien-view.component';

describe('TechnicienViewComponent', () => {
  let component: TechnicienViewComponent;
  let fixture: ComponentFixture<TechnicienViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicienViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicienViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
