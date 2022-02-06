import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutRegistreComponent } from './layout-registre.component';

describe('LayoutRegistreComponent', () => {
  let component: LayoutRegistreComponent;
  let fixture: ComponentFixture<LayoutRegistreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutRegistreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutRegistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
