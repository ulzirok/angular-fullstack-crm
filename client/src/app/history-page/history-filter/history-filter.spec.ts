import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryFilter } from './history-filter';

describe('HistoryFilter', () => {
  let component: HistoryFilter;
  let fixture: ComponentFixture<HistoryFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoryFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
