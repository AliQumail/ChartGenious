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
  @Input() data: any[] = [];
  @Input() chartSize: string = "325";
  @Input() hideDropdown: boolean = false;

  chartHeight = GlobalConstants.CHART_HEIGHT;
  chartWidth = GlobalConstants.CHART_WIDTH;
  

  noOfCharts : number[] = [1];
   // Line graph
   lineGraphSelectedColumn1: number = -1; 
   lineGraphSelectedColumn2: number = -1; 
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

   // Line graph functions

  addLineChart(){
    this.noOfCharts.push(1)
    console.log(this.noOfCharts);
  }

  onChangeLineGraphSelectedColumns(event: any, columnNo: number){
    console.log("clicked")
    let value = event.target.value; 
    if (columnNo == 0) this.lineGraphSelectedColumn1 = value;
    if (columnNo == 1) this.lineGraphSelectedColumn2 = value;

    if (this.lineGraphSelectedColumn1 != -1 && this.lineGraphSelectedColumn2 != -1){
      this.showLineGraph = true;
      let labels = this.data[this.lineGraphSelectedColumn1];
      let datasets = [
        {
          data: this.data[this.lineGraphSelectedColumn2],
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

      console.log(this.lineChartData);

    }
  }

}
