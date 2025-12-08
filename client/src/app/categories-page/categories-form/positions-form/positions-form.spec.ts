import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsForm } from './positions-form';

describe('PositionsForm', () => {
  let component: PositionsForm;
  let fixture: ComponentFixture<PositionsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PositionsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionsForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
