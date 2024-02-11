import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


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
  lineGraphSelectedColumn1: number = 0; 
  lineGraphSelectedColumn2: number = 0; 
  showLineGraph: boolean = false; 
  
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
    let value = event.target.value; 
    if (columnNo == 0) this.lineGraphSelectedColumn1 = value;
    if (columnNo == 1) this.lineGraphSelectedColumn2 = value;

    if (this.lineGraphSelectedColumn1 != 0 && this.lineGraphSelectedColumn2 != 0){
      this.showLineGraph = true; 
    }
  }
}
