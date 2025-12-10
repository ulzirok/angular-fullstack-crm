import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCategories } from './order-categories';

describe('OrderCategories', () => {
  let component: OrderCategories;
  let fixture: ComponentFixture<OrderCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderCategories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCategories);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
