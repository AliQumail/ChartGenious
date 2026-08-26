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
  @Input() chartHeight: string = "";
  @Input() hideDropdown: boolean = false;
  title = 'ng2-charts-demo';

  get resolvedChartHeight(): string {
    return this.chartHeight || this.chartSize;
  }

  chartWidth = GlobalConstants.CHART_WIDTH;

  // Modal state
  modalOpen = false;

  // Config
  chartTitle = '';
  showLegend = true;

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
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
  sortType: number = 0;
  trimRecords = 0; 
  newLength = 0; 

  openModal() { this.modalOpen = true; }
  closeModal() { this.modalOpen = false; }

  onChangeLineGraphSelectedColumns(event: any, dropdownNo: number) {
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

      this.pieChartLabels = tempData.slice(0, len).map((d: any) => d[this.column1]);
      this.pieChartDatasets = [
        { data: tempData.slice(0, len).map((d: any) => d[this.column2]) }
      ];
    }

    this.pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: !!this.chartTitle, text: this.chartTitle, font: { family: "'DM Sans', sans-serif", size: 14 }, color: '#1A1A1A', padding: { bottom: 12 } },
        legend: { display: this.showLegend }
      }
    };
    this.pieChartLegend = this.showLegend;
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
