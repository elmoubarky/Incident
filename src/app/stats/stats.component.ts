import { Component, OnInit } from '@angular/core';
import { TachesService } from '../taches.service';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  mode;
  barlabel:[];
  labelBar;
  barData;

  constructor(private tacheService:TachesService) { }

  ngOnInit() {
  }

  public barChartOptions = {
    scalesShowVerticalLines : false,
    responsive : true
  };

  public barChartLabels = ['2006','2007','2008','2009','2010','2011','2012'];

  public barChartType = 'bar';

  public barChartLegend = true;


  public barChartData = 
   [
    {data : [65,59,80,81,56,55,40], label: 'Incidents Declares' },
    {data : [28,48,40,19,86,27,90], label: 'Incidents Resolu' },
    {data : [80,50,20,33,78,89,12], label : 'Incidents Non Resolu'}
  ]; 

 /*  onGetLabel(data){
    console.log(data);
    let url = this.tacheService.host2+"/TacheStatsLabel";
    this.tacheService.postRessources(url, data).
    subscribe(data=>{
      this.labelBar=data;
    }),
    err=>{
      console.log(err);
    }
 */
  //}

  /* onGetBar(data){
    console.log(data);
    let url = this.tacheService.host2+"/TacheStatsBar";
    this.tacheService.postRessources(url, data).
    subscribe(data=>{
      this.barData=data;
      
    }),
    err=>{
      console.log(err);
    }

  }

  onRechDate(data){
    this.onGetBar(data);
    this.onGetLabel(data);
    this.mode='bar';
    
  } */



}
