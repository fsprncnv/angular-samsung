import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamsungPayComponent } from './samsung-pay.component';

describe('SamsungPayComponent', () => {
  let component: SamsungPayComponent;
  let fixture: ComponentFixture<SamsungPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SamsungPayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SamsungPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
