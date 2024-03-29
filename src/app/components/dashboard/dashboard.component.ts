import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { ChangeDetectorRef } from '@angular/core';
import { faXmark, faPrint, fa2, fa3 } from '@fortawesome/free-solid-svg-icons';
import {faEye} from "@fortawesome/free-regular-svg-icons"; 
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  columns: string[] = [];
  data: any[] = [];
  section : number = 1;
  chartSize = "325";
  hideDropdown: boolean = false; 

  faXmark = faXmark;
  faEye = faEye;
  faPrint = faPrint;
  fa2 = fa2; 
  fa3 = fa3;

  showRawData: boolean = true;

  selectChartCount = {
    line: 0,
    pie: 0,
    scatter: 0,
    bar: 0,
    doughnut: 0,
    polar: 0
  }

  // Line graph
  lineGraphSelectedColumn1: number = -1; 
  lineGraphSelectedColumn2: number = -1; 
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
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;

  displayCharts : string[] = [];
  
  constructor(private route: ActivatedRoute,
    private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const data = history.state.excelData;
      this.data = this.transformData(data);
      
    });
    // Return column names as an array
    if (this.data.length > 0) this.columns = Object.keys(this.data[0]);   
  }

  // transformData(data: any){
  //   this.columns = data[0];
  //   for (let i = 0; i < this.columns.length; i++) {
  //     const columnValues = [];
  //     for (let j = 1; j < data.length; j++) {
  //       columnValues.push(data[j][i]);
  //     }
  //     this.data.push(columnValues);
  //   }
  // }


  onClickViewRawData(){
    this.showRawData = true;
  }

  transformData(data: any) {
    const result = [];
    for (let i = 1; i < data.length; i++) {
      const obj : any = {};
      for (let j = 0; j < data[i].length; j++) {
        obj[data[0][j]] = data[i][j];
      }
      result.push(obj);
    }
    return result;
  }

  onClickChart(typeOfGraph: string){
    this.showRawData = false;
    this.displayCharts.push(typeOfGraph);

    if (typeOfGraph == 'line') this.selectChartCount.line +=1;
    if (typeOfGraph == 'pie') this.selectChartCount.pie +=1;
    if (typeOfGraph == 'polar') this.selectChartCount.polar +=1;
    if (typeOfGraph == 'doughnut') this.selectChartCount.doughnut +=1;
    if (typeOfGraph == 'bar') this.selectChartCount.bar +=1;
    if (typeOfGraph == 'scatter') this.selectChartCount.scatter +=1;
  }
  chartTypeRef: string | null = null;
  viewType : string = "8";
  onClickChangeView(view: number){
    if (view == 1) {
      this.viewType = "24"
      //this.chartSize = "700"
    } else  if (view == 2){
      this.viewType = "12"
      //this.chartSize = "500"
    } else {
      this.viewType = "8"
      //this.chartSize = "325"
    }
    this.chartTypeRef = null; // Reset the chart type
  this.cdr.detectChanges(); // Manually trigger change detection
  }

  // Line graph functions
  onChangeLineGraphSelectedColumns(event: any, columnNo: number){
    let value = event.target.value; 
    if (columnNo == 0) this.lineGraphSelectedColumn1 = value;
    if (columnNo == 1) this.lineGraphSelectedColumn2 = value;

    if (this.lineGraphSelectedColumn1 != -1 && this.lineGraphSelectedColumn2 != -1){
      this.showLineGraph = true;
      let labels = this.data[this.lineGraphSelectedColumn1];
      let datasets = [
        {
          data: this.data[this.lineGraphSelectedColumn2],
          label: 'Series A',
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)'
        }
      ]

      this.lineChartData = { 
        labels: labels,
        datasets: datasets
      }
    }
  }

  onHideBtnClick(){
    if (this.hideDropdown){
      this.hideDropdown = false;    
    } else {
      this.hideDropdown = true;
    }
  }

  handleDelete(idx: number){
    let typeOfGraph = this.displayCharts[idx];
    
    if (typeOfGraph == 'line') this.selectChartCount.line -=1;
    if (typeOfGraph == 'pie') this.selectChartCount.pie -=1;
    if (typeOfGraph == 'polar') this.selectChartCount.polar -=1;
    if (typeOfGraph == 'doughnut') this.selectChartCount.doughnut -=1;
    if (typeOfGraph == 'bar') this.selectChartCount.bar -=1;
    if (typeOfGraph == 'scatter') this.selectChartCount.scatter -=1;
    
    this.displayCharts.splice(idx, 1);
  }

  // onPrint(divName: string){
  //    const printContents: any = document.getElementById(divName)?.innerHTML;
  //    const originalContents = document.body.innerHTML;
  //    document.body.innerHTML = printContents;
  //    window.print();
  //    document.body.innerHTML = originalContents;
  // }

 
}
