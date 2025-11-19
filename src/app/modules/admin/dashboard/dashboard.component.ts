import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexStroke,
  ApexPlotOptions,
  ApexResponsive,
  ApexNonAxisChartSeries,
  ChartComponent,
  NgApexchartsModule,
  ApexLegend
} from 'ng-apexcharts';
import { CommonModule } from '@angular/common';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis?: ApexXAxis;
  title?: ApexTitleSubtitle;
  dataLabels?: ApexDataLabels;
  stroke?: ApexStroke;
  plotOptions?: ApexPlotOptions;
  labels?: string[];
  responsive?: ApexResponsive[];
};

export type totalPointsByGw = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
    plotOptions: ApexPlotOptions;
    colors: string[];
};


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [NgApexchartsModule, CommonModule]
})
export class DashboardComponent implements OnInit{
  @ViewChild("chart") chart!: ChartComponent;


  isClicked = true;
  isClicked1 = true;
  isClicked2 = true;
  isClicked3 = true;




categories: string[] = Array.from({ length: 38 }, (_, i) => `GW${i + 1}`);
data: number[] = Array.from({ length: 38 }, (_, i) => Number((Math.random()*100).toFixed(0)));



public guessesChart: ChartOptions = {
    series: [
        { name: "Correct Guesses", data: [3, 5, 8, 6, 9, 12, 15] },
        { name: "Wrong Guesses", data: [2, 3, 4, 5, 3, 6, 4] }
      ],
      chart: { type: "line", height: 300 },
      xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
      title: { text: "Guesses Over the Week", align: "center" },
      stroke: { curve: "smooth" }

}

public topUsersChart: ChartOptions = {
     series: [
        { name: "Points", data: [120, 110, 95, 85, 75] }
      ],
      chart: { type: "bar", height: 300 },
      xaxis: { categories: ["Alice", "Bob", "Charlie", "Diana", "Ethan"] },
      title: { text: "Top Users", align: "center" },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 8
        }
      },
      dataLabels: { enabled: false }

}

public winRatioChart: ChartOptions = {
      series: [65, 25, 10],
      chart: { type: "pie", height: 300 },
      labels: ["Correct", "Wrong", "Pending"],
      title: { text: "Win Ratio", align: "center" },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { width: 250 },
            legend: { position: "bottom" }
          }
        }
      ]
}

public totalPointByGw: totalPointsByGw = {
    plotOptions: {
            bar: { horizontal: true, distributed: true },
        },
        series: [
            {
                name: 'Sales',
                data: this.data,
            },
        ],
        chart: {
            type: 'bar',
            height: 200,
        },
        title: {
            text: '',
            floating: true,
        },
        xaxis: {
            categories: this.categories
        },
        dataLabels: {
            enabled: false,
        },
        colors: ['#b8843a', '#3E74B7'],


}


  constructor() {
    // Line Chart - guesses over time

    // Bar Chart - top users
  

    // Pie Chart - win ratio
   
    
  }

  ngOnInit() {
    console.log(this.data);
    
  }
}
