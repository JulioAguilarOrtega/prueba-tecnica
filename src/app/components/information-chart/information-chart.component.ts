import { Component, input, SimpleChanges } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-information-chart',
  imports: [HighchartsChartModule],
  templateUrl: './information-chart.component.html',
  styleUrl: './information-chart.component.scss'
})
export class InformationChartComponent {
  public title = input<string>();
  public dataChart = input<any>();
  public Highcharts = Highcharts;
  protected chartOptions: any = {};

  /**
   * listen changes on dataChart input to update data in highchart 
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataChart']) {
      this.chartOptions = {
        chart: {
          type: 'column',
          backgroundColor: 'transparent',
        },
        credits: { enabled: false },
        title: {
          text: `${this.title()} population`
        },
        legend: {
          enabled: false
        },
        yAxis: {
          title: {
              text: ''
          }
  
      },
        xAxis: {
          type: 'category'
        },
        series: this.getSeries()
      };
    };
  }

  private getSeries = () => {
    let series: Array<any> = [];
    this.dataChart()?.forEach((elem: any) => {
      series.push({
        name: elem.name.common || elem.name,
        y: elem.totalPopulation || elem.population
      })
    });
    const dataSeries = [{
      data: series
    }]
    return dataSeries;
  }
}