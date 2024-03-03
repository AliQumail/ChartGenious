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
  
   // Line graph
   selectedCol1: string = ""; 
   selectedCol2: string = ""; 
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

  trimRecords = 0; 
  newLength = 0; 
  onSelectDropdown(event: any, dropdownNo: number){
    let value = event.target.value;
    if (dropdownNo == 0)  this.selectedCol1 = value; 
    else if (dropdownNo == 1) this.selectedCol2 = value; 
    else if (dropdownNo == 2) this.sortType = value;
    else if (dropdownNo == 3) this.trimRecords = value;

    let tempData = this.data; 
    if (this.selectedCol1 != '' && this.selectedCol2 != ''){
      if (this.sortType != 0) tempData = this.sortData(tempData, this.sortType, this.selectedCol2);
      if (this.trimRecords == 0) {
        this.newLength = this.data.length; 
      } else {
        this.newLength = this.trimRecords;
      }
      let labels = tempData.slice(0, this.newLength).map( (d: any) => d[this.selectedCol1]);
      let datasets = [
      {
        data: tempData.slice(0, this.newLength).map( (d: any) => d[this.selectedCol2]),
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }];

      this.lineChartData = { 
        labels: labels,
        datasets: datasets
      }
    }
  }

  sortData(data: any, sortType: number, columnName: string){
    if (sortType == 1) {
      data.sort((a: any, b: any) => a[columnName] - b[columnName])
    } else if (sortType == -1) {
      data.sort( (a: any, b: any) => b[columnName] - a[columnName]);
    } else {
      data = this.data; 
    }
    return data; 
  }
}
