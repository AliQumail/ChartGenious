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
  @Input() chartHeight: string = "";
  @Input() data: any[] = [];
  @Input() columns: string[] = [];
  @Input() hideDropdown: boolean = false;

  chartWidth = GlobalConstants.CHART_WIDTH;

  get resolvedChartHeight(): string {
    return this.chartHeight || this.chartSize;
  }

  // Modal state
  modalOpen = false;

  // Config
  chartTitle = '';
  showLegendFlag = true;

  column1: string = "";
  column2: string = ""; 

  sortType: number = 0;
  trimRecords = 0; 
  newLength = 0;

  public polarAreaChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales' ];
  public polarAreaChartDatasets: ChartConfiguration<'polarArea'>['data']['datasets'] = [
    { data: [ 300, 500, 100, 40, 120 ] }
  ];
  public polarAreaLegend = true;

  public polarAreaOptions: ChartConfiguration<'polarArea'>['options'] = {
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

      this.polarAreaChartLabels = tempData.slice(0, len).map((d: any) => d[this.column1]);
      this.polarAreaChartDatasets = [
        { data: tempData.slice(0, len).map((d: any) => d[this.column2]) }
      ];
    }

    this.polarAreaOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: !!this.chartTitle, text: this.chartTitle, font: { family: "'DM Sans', sans-serif", size: 14 }, color: '#1A1A1A', padding: { bottom: 12 } },
        legend: { display: this.showLegendFlag }
      }
    };
    this.polarAreaLegend = this.showLegendFlag;
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
