import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.css']
})
export class StatCardComponent {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() hideDropdown: boolean = false;

  // Modal state
  modalOpen = false;

  // Config
  label = '';
  valueColumn = '';
  aggregation: 'sum' | 'avg' | 'count' | 'min' | 'max' = 'sum';
  prefix = '';
  suffix = '';

  subMetricEnabled = false;
  subMetricColumn = '';
  subMetricAggregation: 'sum' | 'avg' | 'count' | 'min' | 'max' = 'avg';
  subMetricLabel = '';
  subMetricSuffix = '';

  // Computed display values
  displayValue = '—';
  displaySubMetric = '';

  openModal() { this.modalOpen = true; }
  closeModal() { this.modalOpen = false; }

  onValueColumnChange(val: string) {
    this.valueColumn = val;
    if (!this.label) this.label = val;
    this.rebuild();
  }

  onSubMetricColumnChange(val: string) {
    this.subMetricColumn = val;
    if (!this.subMetricLabel) this.subMetricLabel = val;
    this.rebuild();
  }

  aggregate(column: string, agg: string): number | null {
    if (!column || !this.data?.length) return null;
    const values = this.data
      .map(d => Number(d[column]))
      .filter(v => !isNaN(v));
    if (!values.length) return agg === 'count' ? this.data.length : null;

    switch (agg) {
      case 'sum': return values.reduce((a, b) => a + b, 0);
      case 'avg': return values.reduce((a, b) => a + b, 0) / values.length;
      case 'min': return Math.min(...values);
      case 'max': return Math.max(...values);
      case 'count': return this.data.length;
      default: return null;
    }
  }

  formatNumber(n: number): string {
    return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }

  rebuild() {
    const result = this.aggregate(this.valueColumn, this.aggregation);
    this.displayValue = result === null ? '—' : `${this.prefix}${this.formatNumber(result)}${this.suffix}`;

    if (this.subMetricEnabled && this.subMetricColumn) {
      const subResult = this.aggregate(this.subMetricColumn, this.subMetricAggregation);
      this.displaySubMetric = subResult === null ? '' : `${this.formatNumber(subResult)}${this.subMetricSuffix}`;
    } else {
      this.displaySubMetric = '';
    }
  }
}
