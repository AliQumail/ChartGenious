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
  @Input() hideDropdown: boolean = false;

  title = 'ng2-charts-demo';

  chartHeight = GlobalConstants.CHART_HEIGHT;
  chartWidth = GlobalConstants.CHART_WIDTH;

  column1: string = ''; 
  column2: string = ''; 
  sortType: number = 0; // No sort is 0, ascending is 1, descending in -1 
  trimRecords = 0; 
  newLength = 0; 

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

    let tempData = this.data; 
    if (this.column1 != '' && this.column2 != ''){
      // sort data based on user input
      tempData = this.sortData(tempData, this.sortType, this.column2);
      // show top selected results only based on user input 
      if (this.trimRecords == 0) {
        this.newLength = this.data.length; 
      } else {
        this.newLength = this.trimRecords;
      } 
      let datasets = [
        { data: tempData.slice(0, this.newLength).map( (d: any) => d[this.column2]), 
          label: ''
        },
      ]
      this.doughnutChartLabels = tempData.slice(0, this.newLength).map( (d: any) => d[this.column1]);;
      this.doughnutChartDatasets = datasets;
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
