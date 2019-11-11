import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css']
})
export class RadarChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

   public radarChartLabels = ['Q1','Q2','Q3','Q4','Q5'];

  public radarChartType = 'radar';

  public radarChartData = [
    {data : [120,150,180,110,65], label : '2017'},
    {data : [90,150,200,120,90], label : '2018'},
    {data : [200,50,20,190,300], label : '2019'}
    ];

}
