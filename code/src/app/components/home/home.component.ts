import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router) {}
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
        this.router.navigate(['/dashboard'], { state: { excelData } });
      };
      reader.readAsArrayBuffer(file);
    }
  }

  loadSampleFile() {
    const sampleFilePath = 'assets/countries.csv';

    fetch(sampleFilePath)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], 'sample-data.xlsx', { type: blob.type });
        const mockEvent = { target: { files: [file] } };
        this.onFileChange(mockEvent);
      })
  }
}
