import { Component, Input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { GlobalConstants } from 'src/app/global-constants';
@Component({
  selector: 'app-polar-area-chart',
  templateUrl: './polar-area-chart.component.html',
  styleUrls: ['./polar-area-chart.component.css']
})
export class PolarAreaChartComponent {

  title = 'ng2-charts-demo';
  @Input() chartSize: string = "325";
  @Input() data: any[] = [];
  @Input() columns: string[] = [];
  @Input() hideDropdown: boolean = false;

  chartHeight = GlobalConstants.CHART_HEIGHT;
  chartWidth = GlobalConstants.CHART_WIDTH;

  column1: number = -1;
  column2: number = -1; 
 
  // PolarArea
  public polarAreaChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales' ];
  public polarAreaChartDatasets: ChartConfiguration<'polarArea'>['data']['datasets'] = [
    { data: [ 300, 500, 100, 40, 120 ] }
  ];
  public polarAreaLegend = true;

  public polarAreaOptions: ChartConfiguration<'polarArea'>['options'] = {
    responsive: false,
  };

  // Column 1 denotes X axis & Column 2 y axis 
  onChangeSelectColumn(event: any, columnNo: number){
    let value = event.target.value; 
    if (columnNo == 0) this.column1 = value;
    if (columnNo == 1) this.column2 = value;

    if (this.column1 != -1 && this.column2 != -1){
      this. polarAreaChartLabels = this.data[this.column1];
      this.polarAreaChartDatasets = [
        { data: this.data[this.column2] }
      ];
    }
  }

}
