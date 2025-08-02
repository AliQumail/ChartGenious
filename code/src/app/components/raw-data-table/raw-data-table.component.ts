import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-raw-data-table',
  templateUrl: './raw-data-table.component.html',
  styleUrls: ['./raw-data-table.component.css']
})
export class RawDataTableComponent {

  @Input() data: any;
  @Input() columns: any;
}
