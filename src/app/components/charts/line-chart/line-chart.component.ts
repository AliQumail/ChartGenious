import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { GlobalConstants } from "../../../global-constants"
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {
  @Input() columns: string[] = [];
  @Input() data: any = [];
  @Input() chartSize: string = "325";
  @Input() hideDropdown: boolean = false;

  chartHeight = GlobalConstants.CHART_HEIGHT;
  chartWidth = GlobalConstants.CHART_WIDTH;
  

  noOfCharts : number[] = [1];
   // Line graph
   selectedCol1: number = -1; 
   selectedCol2: number = -1; 
   sortType: number = 0; // No sort is 0, ascending is 1, descending in -1 
   showLineGraph: boolean = false; 
   public lineChartData: ChartConfiguration<'line'>['data'] = {
     labels: [
       'January',
       'February',
       'March',
       'April',
       'May',
       'June',
       'July'
     ],
     datasets: [
       {
         data: [ 65, 59, 80, 81, 56, 55, 40 ],
         label: 'Series A',
         fill: true,
         tension: 0.5,
         borderColor: 'black',
         backgroundColor: 'rgba(255,0,0,0.3)'
       }
     ]
   };
   public lineChartOptions: ChartOptions<'line'> = {
     responsive: false
   };
   public lineChartLegend = true;

  onSelectColumn(event: any, selectNo: number){
    console.log(this.data[0]);
    let colName = event.target.colName; 
    if (selectNo == 0)  this.selectedCol1 = colName 
    else if (selectNo == 1) this.selectedCol2 = colName
    else if (selectNo == 2) this.sortType = colName

    if (this.selectedCol1 != -1 && this.selectedCol2 != -1){
      // if (this.sortType != 0 ) this.sortData(this.sortType, this.selectedCol2); 
      this.showLineGraph = true;
      let labels = this.data[this.selectedCol1];
      let datasets = [
        {
          data: this.data[this.selectedCol2],
          label: 'Series A',
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)'
        }
      ]

      this.lineChartData = { 
        labels: labels,
        datasets: datasets
      }
    }
  }

  sortData(sortType: number, colToSortIdx: any){

  }
}
