import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaildemandeNonTraiterComponent } from './detaildemande-non-traiter.component';

describe('DetaildemandeNonTraiterComponent', () => {
  let component: DetaildemandeNonTraiterComponent;
  let fixture: ComponentFixture<DetaildemandeNonTraiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaildemandeNonTraiterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaildemandeNonTraiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
