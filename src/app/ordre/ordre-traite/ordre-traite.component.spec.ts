import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreTraiteComponent } from './ordre-traite.component';

describe('OrdreTraiteComponent', () => {
  let component: OrdreTraiteComponent;
  let fixture: ComponentFixture<OrdreTraiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdreTraiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdreTraiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
