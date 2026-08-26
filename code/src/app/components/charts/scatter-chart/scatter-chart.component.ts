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
  chartWidth = GlobalConstants.CHART_WIDTH;
  @Input() chartSize: string = "325";
  @Input() chartHeight: string = "";
  @Input() data: any[] = [];
  @Input() columns: string[] = [];
  @Input() hideDropdown: boolean = false;

  get resolvedChartHeight(): string {
    return this.chartHeight || this.chartSize;
  }

  // Modal state
  modalOpen = false;

  // Config
  chartTitle = '';
  xAxisLabel = '';
  yAxisLabel = '';
  pointColor = '#C4862A';
  pointSize = 8;

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
      pointRadius: 8,
      pointBackgroundColor: '#C4862A',
    },
  ];

  public scatterChartOptions: ChartConfiguration<'scatter'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };

  sortType: number = 0;
  trimRecords = 0; 
  newLength = 0; 

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

      let scatterData: any[] = [];
      tempData.slice(0, len).forEach((row: any) => {
        scatterData.push({ x: row[this.column1], y: row[this.column2] });
      });

      this.scatterChartDatasets = [{
        data: scatterData,
        label: this.chartTitle || 'Series A',
        pointRadius: this.pointSize,
        pointBackgroundColor: this.pointColor,
      }];
    }

    this.scatterChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: !!this.chartTitle, text: this.chartTitle, font: { family: "'DM Sans', sans-serif", size: 14 }, color: '#1A1A1A', padding: { bottom: 12 } },
      },
      scales: {
        x: { title: { display: !!this.xAxisLabel, text: this.xAxisLabel, font: { family: "'DM Sans', sans-serif", size: 11 }, color: '#636363' } },
        y: { title: { display: !!this.yAxisLabel, text: this.yAxisLabel, font: { family: "'DM Sans', sans-serif", size: 11 }, color: '#636363' } }
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
