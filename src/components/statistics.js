import {AbstractSmartComponent} from "@/components/abstractSmartComponent.js";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const renderMoneyChart = (moneyCtx, events) => {
  const BAR_HEIGHT = 55;
  moneyCtx.height = BAR_HEIGHT * 6;

  const types = Array.from(new Set(events.map((it) => it.event.toUpperCase())));

  const money = types.map((it) => events.filter((i) => i.event === it.toLowerCase()).map((q) => q.ownPrice).reduce((z, x) => z + x));

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: types,
      datasets: [{
        data: money,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 55,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }

  });

};

// const renderTransportChart = (transportCtx, events) => {

//   return new Chart(transportCtx, {
//     plugins: [ChartDataLabels],
//     type: `horizontalBar`,
//     data: {
//       labels: [`FLY`, `DRIVE`, `RIDE`],
//       datasets: [{
//         data: [4, 2, 1],
//         backgroundColor: `#ffffff`,
//         hoverBackgroundColor: `#ffffff`,
//         anchor: `start`
//       }]
//     },
//     options: {
//       plugins: {
//         datalabels: {
//           font: {
//             size: 13
//           },
//           color: `#000000`,
//           anchor: `end`,
//           align: `start`,
//           formatter: (val) => `${val}x`
//         }
//       },
//       title: {
//         display: true,
//         text: `TRANSPORT`,
//         fontColor: `#000000`,
//         fontSize: 23,
//         position: `left`
//       },
//       scales: {
//         yAxes: [{
//           ticks: {
//             fontColor: `#000000`,
//             padding: 5,
//             fontSize: 13,
//           },
//           gridLines: {
//             display: false,
//             drawBorder: false
//           },
//           barThickness: 44,
//         }],
//         xAxes: [{
//           ticks: {
//             display: false,
//             beginAtZero: true,
//           },
//           gridLines: {
//             display: false,
//             drawBorder: false
//           },
//           minBarLength: 50
//         }],
//       },
//       legend: {
//         display: false
//       },
//       tooltips: {
//         enabled: false,
//       }
//     }
//   });

// };

export class Statistic extends AbstractSmartComponent {
  constructor(pointsModel) {
    super();
    this._pointsModel = pointsModel.getPoints();

    this._moneyChart = null;
    // this._transportChart = null;
    // this._timeSpendChart = null;

    this._renderCharts();
  }

  getTemplate() {
    return (
      `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
    );
  }

  _renderCharts() {
    const element = this.getElement();

    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    // const transportCtx = element.querySelector(`.statistics__chart--transport`);
    // const timeSpendCtx = element.querySelector(`.statistics__chart--time`);

    this._resetCharts();

    this._moneyChart = renderMoneyChart(moneyCtx, this._pointsModel);
    // this._transportChart = renderTransportChart(transportCtx, this._pointsModel);
    // this._timeSpendChart = renderTimeSpendChart(timeSpendCtx, this._pointsModel);
  }

  _resetCharts() {
    if (this._moneyChart) {
      this._moneyChart.destroy();
      this._moneyChart = null;
    }

    // if (this._transportChart) {
    //   this._transportChart.destroy();
    //   this._transportChart = null;
    // }

    // if (this._timeSpendChart) {
    //   this._timeSpendChart.destroy();
    //   this._timeSpendChart = null;
    // }
  }
}
