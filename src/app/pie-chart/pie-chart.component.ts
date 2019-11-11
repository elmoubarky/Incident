import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public pieChartLabels = ['Sales Q1','Sales Q2','Sales Q3','Sales Q4','Sales Q5'];

  public pieChartType = 'pie';

  public pieChartData = [120,150,180,90,65];

}
