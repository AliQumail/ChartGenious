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
  @Input() chartHeight: string = "";
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() hideDropdown: boolean = false;

  get resolvedChartHeight(): string {
    return this.chartHeight || this.chartSize;
  }

  chartWidth = GlobalConstants.CHART_WIDTH;

  // Modal state
  modalOpen = false;

  // Config
  chartTitle = '';
  xAxisLabel = '';
  yAxisLabel = '';
  barColor = '#C4862A';
  showLegend = true;

  column1: string = ''; 
  column2: string = ''; 
  sortType: number = 0;
  trimRecords = 0; 
  newLength = 0; 

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A', backgroundColor: '#C4862A' },
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };

  openModal() { this.modalOpen = true; }
  closeModal() { this.modalOpen = false; }

  onChangeSelectColumn(event: any, dropdownNo: number){
    let value = event.target.value; 
    if (dropdownNo == 0) this.column1 = value;
    else if (dropdownNo == 1) this.column2 = value;
    else if (dropdownNo == 2) this.sortType = value;
    else if (dropdownNo == 3) this.trimRecords = value;
    this.rebuildChart();
  }

  rebuildChart() {
    if (this.column1 != '' && this.column2 != '') {
      let tempData = this.sortData([...this.data], this.sortType, this.column2);
      const len = this.trimRecords == 0 ? this.data.length : this.trimRecords;
      this.newLength = len;

      this.barChartData = {
        labels: tempData.slice(0, len).map((d: any) => d[this.column1]),
        datasets: [{
          data: tempData.slice(0, len).map((d: any) => d[this.column2]),
          label: this.chartTitle || 'Series A',
          backgroundColor: this.barColor,
        }]
      };
    }

    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: !!this.chartTitle, text: this.chartTitle, font: { family: "'DM Sans', sans-serif", size: 14 }, color: '#1A1A1A', padding: { bottom: 12 } },
        legend: { display: this.showLegend }
      },
      scales: {
        x: { title: { display: !!this.xAxisLabel, text: this.xAxisLabel, font: { family: "'DM Sans', sans-serif", size: 11 }, color: '#636363' } },
        y: { title: { display: !!this.yAxisLabel, text: this.yAxisLabel, font: { family: "'DM Sans', sans-serif", size: 11 }, color: '#636363' } }
      }
    };
    this.barChartLegend = this.showLegend;
  }

  sortData(data: any, sortType: number, columnName: string){
    if (sortType == 1) {
      data.sort((a: any, b: any) => a[columnName] - b[columnName])
    } else if (sortType == -1) {
      data.sort( (a: any, b: any) => b[columnName] - a[columnName]);
    } else {
      data = [...this.data]; 
    }
    return data; 
  }
}
