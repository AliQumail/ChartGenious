import { Component, Input } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { GlobalConstants } from "../../../global-constants"

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() chartSize: string = "325";
  title = 'ng2-charts-demo';

  chartHeight = GlobalConstants.CHART_HEIGHT;
  chartWidth = GlobalConstants.CHART_WIDTH;

  
  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ];
  public pieChartDatasets = [ {
    data: [ 300, 500, 100 ]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
  }

  column1: number = -1;
  column2: number = -1;

  onChangeLineGraphSelectedColumns(event: any, columnNo: number)
  {
    let value = event.target.value; 
    if (columnNo == 0) this.column1 = value;
    if (columnNo == 1) this.column2 = value;
   
    if (this.column1 != -1 && this.column2 != -1){
        
      let datasets = [
        { data: this.data[this.column2] },
      ]
      this.pieChartLabels = this.data[this.column1];
      this.pieChartDatasets = datasets;
    }
  }
}
