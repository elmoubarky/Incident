import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaunotChartComponent } from './daunot-chart.component';

describe('DaunotChartComponent', () => {
  let component: DaunotChartComponent;
  let fixture: ComponentFixture<DaunotChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaunotChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaunotChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
