import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  columns: string[] = [];
  data: any[] = [];
  section : number = 1;

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

  
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const data = history.state.excelData;
      this.transformData(data);
    });

    console.log(this.columns)
    console.log(this.data);
  }

  transformData(data: any){
    this.columns = data[0];
    for (let i = 0; i < this.columns.length; i++) {
      const columnValues = [];
      for (let j = 1; j < data.length; j++) {
        columnValues.push(data[j][i]);
      }
      this.data.push(columnValues);
    }
  }

  handleSection(sectionNo: number){
    this.section = sectionNo;
  }

  // Line graph functions
  onChangeLineGraphSelectedColumns(event: any, columnNo: number){
    console.log("clicked")
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

      console.log(this.lineChartData);

    }
  }
}
