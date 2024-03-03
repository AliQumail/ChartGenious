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
  @Input() hideDropdown: boolean = false;
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

  column1: string = '';
  column2: string = '';
  sortType: number = 0; // No sort is 0, ascending is 1, descending in -1 
  trimRecords = 0; 
  newLength = 0; 

  onChangeLineGraphSelectedColumns(event: any, dropdownNo: number)
  {
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
        
      let datasets = [
        { data: tempData.slice(0, this.newLength).map( (d: any) => d[this.column2]) },
      ]
      this.pieChartLabels = tempData.slice(0, this.newLength).map( (d: any) => d[this.column1])
      this.pieChartDatasets = datasets;
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
