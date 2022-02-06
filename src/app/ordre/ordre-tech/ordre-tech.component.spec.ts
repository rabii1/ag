import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreTechComponent } from './ordre-tech.component';

describe('OrdreTechComponent', () => {
  let component: OrdreTechComponent;
  let fixture: ComponentFixture<OrdreTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdreTechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdreTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
