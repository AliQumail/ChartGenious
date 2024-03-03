import { Component, Input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { GlobalConstants } from "../../../global-constants"

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  title = 'ng2-charts-demo';
  @Input() chartSize: string = "325";
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() hideDropdown: boolean = false;

  
 chartHeight = GlobalConstants.CHART_HEIGHT;
 chartWidth = GlobalConstants.CHART_WIDTH;

 column1: string = ''; 
 column2: string = ''; 
 sortType: number = 0; // No sort is 0, ascending is 1, descending in -1 
 trimRecords = 0; 
 newLength = 0; 


  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

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
      let labels = tempData.slice(0, this.newLength).map( (d: any) => d[this.column1]);     
      let datasets = [
        { data: tempData.slice(0, this.newLength).map( (d: any) => d[this.column2]), 
        },
      ]
      this.barChartData = {
        labels: labels,
        datasets: datasets
      };
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
