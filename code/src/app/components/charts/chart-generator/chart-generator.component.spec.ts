import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGeneratorComponent } from './chart-generator.component';

describe('ChartGeneratorComponent', () => {
  let component: ChartGeneratorComponent;
  let fixture: ComponentFixture<ChartGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartGeneratorComponent]
    });
    fixture = TestBed.createComponent(ChartGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
