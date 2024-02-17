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

  onChangeLineGraphSelectedColumns(event: any)
  {
    let [labels, counts] = this.transformValuesForPieChart(this.data[event.target.value])
    this.pieChartLabels = labels; 
    this.pieChartDatasets = [ {
      data: counts
    } ];

  }
  
  transformValuesForPieChart(arr: any[]): [any[], number[]] {
    const uniqueValuesMap = new Map<any, number>();
    for (const item of arr) {
        uniqueValuesMap.set(item, (uniqueValuesMap.get(item) || 0) + 1);
    }
    const uniqueValues: any[] = [];
    const counts: number[] = [];
    for (const [value, count] of uniqueValuesMap) {
        uniqueValues.push(value);
        counts.push(count);
    }
    return [uniqueValues, counts];
  }

}
