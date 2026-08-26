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
  @Input() chartHeight: string = "";
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() hideDropdown: boolean = false;

  title = 'ng2-charts-demo';

  chartWidth = GlobalConstants.CHART_WIDTH;

  get resolvedChartHeight(): string {
    return this.chartHeight || this.chartSize;
  }

  // Modal state
  modalOpen = false;

  // Config
  chartTitle = '';
  showLegend = true;

  column1: string = ''; 
  column2: string = ''; 
  sortType: number = 0;
  trimRecords = 0; 
  newLength = 0; 

  public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
      { data: [ 350, 450, 100 ], label: 'Series A' },
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };

  openModal() { this.modalOpen = true; }
  closeModal() { this.modalOpen = false; }

  onChangeSelectColumn(event: any, columnNo: number){
    let value = event.target.value; 
    if (columnNo == 0) this.column1 = value;
    if (columnNo == 1) this.column2 = value;
    if (columnNo == 2) this.sortType = value;
    if (columnNo == 3) this.trimRecords = value;
    this.rebuildChart();
  }

  rebuildChart() {
    if (this.column1 != '' && this.column2 != '') {
      let tempData = this.sortData([...this.data], this.sortType, this.column2);
      const len = this.trimRecords == 0 ? this.data.length : this.trimRecords;
      this.newLength = len;

      this.doughnutChartLabels = tempData.slice(0, len).map((d: any) => d[this.column1]);
      this.doughnutChartDatasets = [
        { data: tempData.slice(0, len).map((d: any) => d[this.column2]), label: this.chartTitle || '' }
      ];
    }

    this.doughnutChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: !!this.chartTitle, text: this.chartTitle, font: { family: "'DM Sans', sans-serif", size: 14 }, color: '#1A1A1A', padding: { bottom: 12 } },
        legend: { display: this.showLegend }
      }
    };
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
