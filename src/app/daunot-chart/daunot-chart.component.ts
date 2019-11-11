import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daunot-chart',
  templateUrl: './daunot-chart.component.html',
  styleUrls: ['./daunot-chart.component.css']
})
export class DaunotChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public daughnutChartLabels = ['Sales Q1','Sales Q2','Sales Q3','Sales Q4','Sales Q5'];

  public daughnutChartType = 'doughnut';

  public daughnutChartData = [120,150,180,90,65];

}
