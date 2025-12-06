import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsPage } from './analytics-page';

describe('AnalyticsPage', () => {
  let component: AnalyticsPage;
  let fixture: ComponentFixture<AnalyticsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnalyticsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
