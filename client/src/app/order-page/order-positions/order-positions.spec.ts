import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPositions } from './order-positions';

describe('OrderPositions', () => {
  let component: OrderPositions;
  let fixture: ComponentFixture<OrderPositions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderPositions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderPositions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
