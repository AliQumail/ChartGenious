import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { GlobalConstants } from "../../../global-constants"
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {
  @Input() columns: string[] = [];
  @Input() data: any = [];
  @Input() chartSize: string = "325";
  @Input() chartHeight: string = "";
  @Input() hideDropdown: boolean = false;

  get resolvedChartHeight(): string {
    return this.chartHeight || this.chartSize;
  }

  chartWidth = GlobalConstants.CHART_WIDTH;

  // Modal state
  modalOpen = false;

  // Config: new properties
  chartTitle = '';
  xAxisLabel = '';
  yAxisLabel = '';
  lineColor = '#C4862A';
  showDataPoints = true;
  fillArea = true;
  showLegend = true;
  
   // Line graph
   selectedCol1: string = ""; 
   selectedCol2: string = ""; 
   sortType: number = 0; // No sort is 0, ascending is 1, descending in -1 
   showLineGraph: boolean = false; 
   public lineChartData: ChartConfiguration<'line'>['data'] = {
     labels: [
       'January',
       'February',
       'March',
       'April',
       'May',
       'June',
       'July'
     ],
     datasets: [
       {
         data: [ 65, 59, 80, 81, 56, 55, 40 ],
         label: 'Series A',
         fill: true,
         tension: 0.5,
         borderColor: '#C4862A',
         backgroundColor: 'rgba(196, 134, 42, 0.15)'
       }
     ]
   };
   public lineChartOptions: ChartOptions<'line'> = {
     responsive: true,
     maintainAspectRatio: false
   };
   public lineChartLegend = true;

  trimRecords = 0; 
  newLength = 0; 

  openModal() { this.modalOpen = true; }
  closeModal() { this.modalOpen = false; }

  onSelectDropdown(event: any, dropdownNo: number){
    let value = event.target.value;
    if (dropdownNo == 0)  this.selectedCol1 = value; 
    else if (dropdownNo == 1) this.selectedCol2 = value; 
    else if (dropdownNo == 2) this.sortType = value;
    else if (dropdownNo == 3) this.trimRecords = value;
    this.rebuildChart();
  }

  rebuildChart() {
    if (this.selectedCol1 != '' && this.selectedCol2 != '') {
      let tempData = this.sortData([...this.data], this.sortType, this.selectedCol2);
      const len = this.trimRecords == 0 ? this.data.length : this.trimRecords;
      this.newLength = len;

      const labels = tempData.slice(0, len).map((d: any) => d[this.selectedCol1]);
      const bgColor = this.hexToRgba(this.lineColor, 0.15);

      this.lineChartData = {
        labels: labels,
        datasets: [{
          data: tempData.slice(0, len).map((d: any) => d[this.selectedCol2]),
          label: this.chartTitle || 'Series A',
          fill: this.fillArea,
          tension: 0.5,
          borderColor: this.lineColor,
          backgroundColor: bgColor,
          pointRadius: this.showDataPoints ? 4 : 0,
          pointHoverRadius: this.showDataPoints ? 6 : 0,
        }]
      };
    }

    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: !!this.chartTitle,
          text: this.chartTitle,
          font: { family: "'DM Sans', sans-serif", size: 14 },
          color: '#1A1A1A',
          padding: { bottom: 12 }
        },
        legend: {
          display: this.showLegend
        }
      },
      scales: {
        x: {
          title: {
            display: !!this.xAxisLabel,
            text: this.xAxisLabel,
            font: { family: "'DM Sans', sans-serif", size: 11 },
            color: '#636363'
          }
        },
        y: {
          title: {
            display: !!this.yAxisLabel,
            text: this.yAxisLabel,
            font: { family: "'DM Sans', sans-serif", size: 11 },
            color: '#636363'
          }
        }
      }
    };

    this.lineChartLegend = this.showLegend;
  }

  hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
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
