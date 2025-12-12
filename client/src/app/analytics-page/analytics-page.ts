import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { IAnalyticsPage } from '../shared/interfaces';
import { Subscription } from 'rxjs';
import { Chart, ChartConfiguration, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

@Component({
  selector: 'app-analytics-page',
  standalone: false,
  templateUrl: './analytics-page.html',
  styleUrl: './analytics-page.scss',
})
export class AnalyticsPage implements AfterViewInit, OnDestroy {
  @ViewChild('gain') gainRef!: ElementRef;
  @ViewChild('order') orderRef!: ElementRef;
  average!: number;
  pending = true;
  aSub!: Subscription;
  private gainChart?: Chart<'line', (number | null)[], string>;
  private orderChart?: Chart<'line', (number | null)[], string>;
  
  private analyticsService = inject(AnalyticsService);
  private cdr = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    const gainConfig: any = {
      label: 'Выручка',
      color: 'rgb(255, 99, 132)'
    };
    
    const orderConfig: any = {
      label: 'Заказы',
      color: 'rgb(54, 162, 235)'
    };

    this.aSub = this.analyticsService.getAnalytics().subscribe((data: IAnalyticsPage) => {
      this.average = data.average;

      gainConfig['labels'] = data.chart.map((item) => item.label);
      gainConfig['data'] = data.chart.map((item) => item.gain);
      
      orderConfig['labels'] = data.chart.map((item) => item.label);
      orderConfig['data'] = data.chart.map((item) => item.order);
      
      gainConfig['labels'].push('01.01.2025')
      gainConfig['labels'].push('01.02.2025')
      gainConfig['data'].push('1500')
      gainConfig['data'].push('700')
      orderConfig['labels'].push('01.01.2025')
      orderConfig['labels'].push('01.02.2025')
      orderConfig['data'].push('8')
      orderConfig['data'].push('2')
      
      const gainCanvas: HTMLCanvasElement = this.gainRef.nativeElement;
      const gainCtx = gainCanvas.getContext('2d');
      
      if (!gainCtx) {
        console.error('Canvas 2D context is not available');
        return;
      }
      
      const orderCanvas: HTMLCanvasElement = this.orderRef.nativeElement;
      const orderCtx = orderCanvas.getContext('2d');
      
      if (!orderCtx) {
        console.error('Canvas 2D context is not available');
        return;
      }
      
      this.gainChart?.destroy();

      const config = createChartConfig({
        labels: gainConfig.labels,
        data: gainConfig.data,
        label: gainConfig.label,
        color: gainConfig.color
      });

      this.gainChart = new Chart(gainCtx, config);
      
      this.orderChart?.destroy();

      const configOrd = createChartConfig({
        labels: orderConfig.labels,
        data: orderConfig.data,
        label: orderConfig.label,
        color: orderConfig.color
      });

      this.orderChart = new Chart(orderCtx, configOrd);

      this.pending = false;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }

    this.gainChart?.destroy();
    this.orderChart?.destroy();
  }

}

interface LineChartArgs {
  labels: string[];
  data: (number | null)[];
  label: string;
  color: string;
}

function createChartConfig(args: LineChartArgs): ChartConfiguration<'line', (number | null)[], string> {
  const { labels, data, label, color } = args;

  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
          stepped: false,
          fill: false
        }
      ]
    }
  };
}
