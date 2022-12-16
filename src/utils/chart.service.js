export class ChartService {
  static getLineOptions(options) {
    const colors = ['#03e9eb','#aaf62a', '#b993ff', '#37f137', '#ff93d9', '#81b9fb', '#fdcf44', '#fd6b44'];

    return {
      legend: options.legend || {},
      title: {
        text: '',
        left: '15',
        top: '8',
        textStyle: {
          color: '#fff',
          fontSize: 14
        }
      },
      xAxis: {
        type: 'category',
        name: options.xName || '',
        data: options.data || [],
        axisLine: {
          show: true,
          lineStyle: {
            color: '#fff',
            width: 1,
            type: 'solid'
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#ffffff'
          }
        }
      },
      yAxis: {
        type: 'value',
        name: options.yName || '',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#fff',
            width: 1,
            type: 'solid'
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: ['#192f44'],
            width: 1,
            type: 'solid'
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#ffffff'
          }
        }
      },
      series: (options.series || []).map((item, index) => {
        return {
          name: item.name || '',
          data: item.data,
          type: 'line',
          smooth: true,
          symbolSize: item.symbolSize === undefined ? 6 : item.symbolSize,
          itemStyle: {
            normal: {
              color: item.color || colors[index]
            }
          },
          areaStyle: item.areaStyle || undefined
        };
      })
    };
  }

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
            color: '#ffffff',
            width: 1,
            type: 'solid'
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#ffffff'
          }
        }
      },
      yAxis: {
        type: 'value',
        name: options.yName || '',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ffffff',
            width: 1,
            type: 'solid'
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: ['#192f44'],
            width: 1,
            type: 'solid'
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#ffffff'
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

  static getCircleOptions(options) {
    const colors = ['#323891', '#33d7ea'];
    return {
      tooltip: {
        show: false
      },
      series: [
        {
          type: 'pie',
          radius: options.radius || ['80%', '100%'],
          startAngle: options.startAngle || 360,
          hoverAnimation: false,
          labelLine: {
            normal: {
              show: false
            }
          },
          data: (options.data || []).map((item, index) =>
          ({
            value: item.value, name: index === 0 ? 'full' : 'rate',
            label: { normal: { show: false } },
            itemStyle: { color: (options.colors || colors)[index] }
          })
          )
        }
      ]
    };
  }

  static getGaugeOptions(options = {}) {
    let defaultFormatter = (val) => val;
    let config = {
      series: [
        {
          type: 'gauge',
          axisLine: {
            lineStyle: {
              width: 10,
              color: options.lineColor || [
                [options.value / 100 || 0.7, '#37a2da'],
                [options.range2 || 1, '#67e0e3']
                // [1, '#fd666d']
              ]
            }
          },
          pointer: {
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            distance: -30,
            length: 8,
            lineStyle: {
              color: '#fff',
              width: 0
            }
          },
          splitLine: {
            distance: -30,
            length: 30,
            lineStyle: {
              color: '#fff',
              width: 0
            }
          },
          axisLabel: {
            color: 'auto',
            distance: 18,
            fontSize: 11,
            formatter: options.axisLabelFormatter || defaultFormatter
          },
          detail: {
            valueAnimation: true,
            formatter: '{value}' + (options.unit ? options.unit : ''),
            color: 'auto',
            offsetCenter: [0, '30%'],
            fontSize: 16
          },
          data: [
            {
              value: options.value || 0
            }
          ]
        }
      ]
    }

    if (options.startAngle || options.startAngle === 0) {
      config.series[0].startAngle = options.startAngle;
    }
    if (options.endAngle || options.endAngle === 0) {
      config.series[0].endAngle = options.endAngle;
    }
    if (options.min || options.min === 0) {
      config.series[0].min = options.min;
    }
    if (options.max || options.max === 0) {
      config.series[0].max = options.max;
    }
    if (options.splitNumber) {
      config.series[0].splitNumber = options.splitNumber;
    }

    return config;
  }
}
