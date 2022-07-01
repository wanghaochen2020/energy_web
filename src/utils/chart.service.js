export class ChartService {
  static getBarOptions(options) {
    return {
      title: {
        text: options.title || '',
        left: '15',
        top: '8',
        textStyle: {
          color: '#fff',
          fontSize: 14
        }
      },
      // backgroundColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
      //   { offset: 0, color: '#3fc7f3' },
      //   { offset: 1, color: '#420f80' },
      // ]),
      xAxis: {
        type: 'category',
        data: options.category,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#666',
            width: 1,
            type: 'solid'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#666',
            width: 1,
            type: 'solid'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#192f44'],
            width: 1,
            type: 'solid'
          }
        }
      },
      series: (options.series || []).map((item) => {
        return {
          data: item.data,
          type: 'bar',
          barWidth: 8,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(3, 223, 235, .9)' },
                { offset: 1, color: 'rgba(3, 223, 235, 0)' }
              ],
            },
            borderRadius: [4, 4, 0, 0]
          }
        };
      })
    };
  }
}
