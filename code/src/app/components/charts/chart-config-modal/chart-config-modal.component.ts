import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-chart-config-modal',
  templateUrl: './chart-config-modal.component.html',
  styleUrls: ['./chart-config-modal.component.css']
})
export class ChartConfigModalComponent {
  @Input() heading = 'Configure Chart';
  @Input() columns: string[] = [];

  // Column field labels
  @Input() col1Label = 'Labels Column';
  @Input() col2Label = 'Values Column';
  @Input() col1Placeholder = 'Select labels';
  @Input() col2Placeholder = 'Select values';

  // Data config (two-way)
  @Input() column1 = '';
  @Output() column1Change = new EventEmitter<string>();

  @Input() column2 = '';
  @Output() column2Change = new EventEmitter<string>();

  @Input() sortType: number = 0;
  @Output() sortTypeChange = new EventEmitter<number>();

  @Input() trimRecords: number = 0;
  @Output() trimRecordsChange = new EventEmitter<number>();

  // Labels config (two-way, text fields update on blur)
  @Input() chartTitle = '';
  @Output() chartTitleChange = new EventEmitter<string>();

  @Input() hasAxisLabels = false;

  @Input() xAxisLabel = '';
  @Output() xAxisLabelChange = new EventEmitter<string>();

  @Input() yAxisLabel = '';
  @Output() yAxisLabelChange = new EventEmitter<string>();

  // Style config
  @Input() hasLegend = true;
  @Input() showLegend = true;
  @Output() showLegendChange = new EventEmitter<boolean>();

  @Input() extraControlsTemplate?: TemplateRef<any>;

  // Events
  @Output() closed = new EventEmitter<void>();
  @Output() configChanged = new EventEmitter<void>();

  // --- Handlers ---

  onColumn1Change(val: string) {
    this.column1 = val;
    this.column1Change.emit(val);
    this.configChanged.emit();
  }

  onColumn2Change(val: string) {
    this.column2 = val;
    this.column2Change.emit(val);
    this.configChanged.emit();
  }

  onSortTypeChange(val: number) {
    this.sortType = val;
    this.sortTypeChange.emit(val);
    this.configChanged.emit();
  }

  onTrimRecordsChange(val: number) {
    this.trimRecords = val;
    this.trimRecordsChange.emit(val);
    this.configChanged.emit();
  }

  onChartTitleBlur() {
    this.chartTitleChange.emit(this.chartTitle);
    this.configChanged.emit();
  }

  onXAxisLabelBlur() {
    this.xAxisLabelChange.emit(this.xAxisLabel);
    this.configChanged.emit();
  }

  onYAxisLabelBlur() {
    this.yAxisLabelChange.emit(this.yAxisLabel);
    this.configChanged.emit();
  }

  onShowLegendChange(val: boolean) {
    this.showLegend = val;
    this.showLegendChange.emit(val);
    this.configChanged.emit();
  }

  close() {
    this.closed.emit();
  }
}
