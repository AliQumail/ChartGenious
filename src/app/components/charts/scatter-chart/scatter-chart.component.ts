import { Component, Input } from '@angular/core';
import { ChartConfiguration, ScatterDataPoint } from 'chart.js';
import { GlobalConstants } from 'src/app/global-constants';
@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.css']
})
export class ScatterChartComponent {
  title = 'ng2-charts-demo';
  chartHeight = GlobalConstants.CHART_HEIGHT;
  chartWidth = GlobalConstants.CHART_WIDTH;
  @Input() chartSize: string = "325";
  @Input() data: any[] = [];
  @Input() columns: string[] = [];
  @Input() hideDropdown: boolean = false;
  column1: number = -1;
  column2: number = -1; 


  public scatterChartDatasets: ChartConfiguration<'scatter'>['data']['datasets'] = [
    {
      data: [
        { x: 1, y: 1 },
        { x: 2, y: 3 },
        { x: 3, y: -2 },
        { x: 4, y: 4 },
        { x: 5, y: -3},
      ],
      label: 'Series A',
      pointRadius: 10,
    },
  ];

  public scatterChartOptions: ChartConfiguration<'scatter'>['options'] = {
    responsive: false,
  };

  // Column 1 denotes X axis & Column 2 y axis 
  onChangeSelectColumn(event: any, columnNo: number){
    let value = event.target.value; 
    if (columnNo == 0) this.column1 = value;
    if (columnNo == 1) this.column2 = value;
    let data = [];
    if (this.column1 != -1 && this.column2 != -1){
      let colLen = this.data[this.column1].length;
      for ( let i = 0; i< colLen ; i++ ){ 
        data.push(
          { x: this.data[this.column1][i], 
            y: this.data[this.column2][i]
          }
        )
      }
    }
    // 
    let results = [
      {
        data: data,
        label: 'Series A',
        pointRadius: 10,
      }
    ]
    this.scatterChartDatasets = results;
  }
}
