import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrdreComponent } from './create-ordre.component';

describe('CreateOrdreComponent', () => {
  let component: CreateOrdreComponent;
  let fixture: ComponentFixture<CreateOrdreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrdreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrdreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
