import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0]; // Assuming first sheet
        const worksheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        console.log(excelData); // Here, you can process the extracted data as needed
        this.transformData(excelData);
      };
      reader.readAsArrayBuffer(file);
    }
  }

  transformData(data: any){
    const columnNames = data[0];

// Extract data by column
const columnData = [];
for (let i = 0; i < columnNames.length; i++) {
  const columnName = columnNames[i];
  const columnValues = [];
  for (let j = 1; j < data.length; j++) {
    columnValues.push(data[j][i]);
  }
  columnData.push(columnValues);
}

console.log(columnData);
  }

}
