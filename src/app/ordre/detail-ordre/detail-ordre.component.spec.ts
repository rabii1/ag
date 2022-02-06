import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOrdreComponent } from './detail-ordre.component';

describe('DetailOrdreComponent', () => {
  let component: DetailOrdreComponent;
  let fixture: ComponentFixture<DetailOrdreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailOrdreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailOrdreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
