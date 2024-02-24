import { Component, Input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { GlobalConstants } from "../../../global-constants"

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent {
  @Input() chartSize: string = "325";
  @Input() columns: string[] = [];
  @Input() data: any[] = [];

  title = 'ng2-charts-demo';

  chartHeight = GlobalConstants.CHART_HEIGHT;
  chartWidth = GlobalConstants.CHART_WIDTH;

  column1: number = -1; 
  column2: number = -1; 

  public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
      { data: [ 350, 450, 100 ], label: 'Series A' },
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };

  onChangeSelectColumn(event: any, columnNo: number){
    let value = event.target.value; 
    if (columnNo == 0) this.column1 = value;
    if (columnNo == 1) this.column2 = value;
   
    if (this.column1 != -1 && this.column2 != -1){
        
      let datasets = [
        { data: this.data[this.column2], label: this.columns[this.column2] },
      ]
      this.doughnutChartLabels = this.data[this.column1];
      this.doughnutChartDatasets = datasets;
    }
    
  }

}
