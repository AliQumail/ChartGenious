import { Component, Input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { GlobalConstants } from "../../../global-constants"

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  title = 'ng2-charts-demo';
  @Input() chartSize: string = "325";
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() hideDropdown: boolean = false;

  
 chartHeight = GlobalConstants.CHART_HEIGHT;
 chartWidth = GlobalConstants.CHART_WIDTH;

 column1: number = -1; 
 column2: number = -1; 
 column3: number = -1; 

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  onChangeSelectColumn(event: any, columnNo: number){
    let value = event.target.value; 
    if (columnNo == 0) this.column1 = value;
    if (columnNo == 1) this.column2 = value;
    if (columnNo == 2) this.column3 = value;
   
    if (this.column1 != -1 && this.column2 != -1 && this.column3 != -1){
      let labels = this.data[this.column1];      
      let datasets = [
        { data: this.data[this.column2], label: this.columns[this.column2] },
        { data: this.data[this.column3], label: this.columns[this.column3] }
      ]
      this.barChartData = {
        labels: labels,
        datasets: datasets
      };
    }
    
  }

}
