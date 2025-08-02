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

  column1: string = "";
  column2: string = ""; 

  sortType: number = 0; // No sort is 0, ascending is 1, descending in -1 
  trimRecords = 0; 
  newLength = 0;
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
  onChangeSelectColumn(event: any, dropdownNo: number){
    let value = event.target.value; 
    if (dropdownNo == 0) this.column1 = value;
    else if (dropdownNo == 1) this.column2 = value;
    else if (dropdownNo == 2) this.sortType = value;
    else if (dropdownNo == 3) this.trimRecords = value;

    let tempData = this.data;
    if (this.column1 != '' && this.column2 != ''){
      tempData = this.sortData(tempData, this.sortType, this.column2);
      if (this.trimRecords == 0) {
        this.newLength = this.data.length; 
      } else {
        this.newLength = this.trimRecords;
      }
      this. polarAreaChartLabels = tempData.slice(0, this.newLength).map( (d: any) => d[this.column1]);
      this.polarAreaChartDatasets = [
        { data: tempData.slice(0, this.newLength).map( (d: any) => d[this.column2]) }
      ];
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
