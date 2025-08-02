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

  column1: string = "";
  column2: string = ""; 


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

  sortType: number = 0; // No sort is 0, ascending is 1, descending in -1 
  trimRecords = 0; 
  newLength = 0; 
  // Column 1 denotes X axis & Column 2 y axis 
  onChangeSelectColumn(event: any, dropdownNo: number){
    let value = event.target.value; 
    if (dropdownNo == 0) this.column1 = value;
    else if (dropdownNo == 1) this.column2 = value;
    else if (dropdownNo == 2) this.sortType = value;
    else if (dropdownNo == 3) this.trimRecords = value;
    let data : any[] = [];
    let tempData = this.data;
    if (this.column1 != '' && this.column2 != ''){
      tempData = this.sortData(tempData, this.sortType, this.column2);
      if (this.trimRecords == 0) {
        this.newLength = this.data.length; 
      } else {
        this.newLength = this.trimRecords;
      }
      
      tempData.map( (row: any) => {
        data.push({x: row[this.column1], y: row[this.column2]})
      });

      console.log(data);
      
   
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
