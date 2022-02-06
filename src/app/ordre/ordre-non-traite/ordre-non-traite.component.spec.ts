import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreNonTraiteComponent } from './ordre-non-traite.component';

describe('OrdreNonTraiteComponent', () => {
  let component: OrdreNonTraiteComponent;
  let fixture: ComponentFixture<OrdreNonTraiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdreNonTraiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdreNonTraiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
