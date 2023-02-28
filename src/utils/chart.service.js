export class ChartService {
  static getLineOptions(options) {
    const colors = ['#03e9eb','#aaf62a', '#b993ff', '#37f137', '#ff93d9', '#81b9fb', '#fdcf44', '#fd6b44'];

    return {
      legend: {
        show: true,
        left: 'center',
        icon: 'circle',
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 30,
        itemStyle: {
          shadowColor: 'rgba(255, 255, 255, 1)',
          shadowBlur: 6, 
        },
        padding: [20, 10],
        textStyle: {
          color: '#ddd',
          fontSize: 14,
          rich: {
            a: { verticleAlign: 'middle' }
          }
        },
        data: (options.legend && options.legend.data) ? options.legend.data : [],
        ...options.legend
      },
      grid: {
        top: 50,
        right: 40,
        left: 50,
        bottom: 70
      },
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
        nameTextStyle: {
          color: '#03dfeb'
        },
        data: options.data || [],
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, .4)',
            width: 1,
            type: 'solid'
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#ccc'
          }
        }
      },
      yAxis: {
        type: 'value',
        name: options.yName || '',
        nameTextStyle: {
          color: '#03dfeb'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, .4)',
            width: 1,
            type: 'solid'
          }
        },
        splitLine: {
          lineStyle: {
            type: 'dotted',
            color: 'rgba(255, 255, 255, .2)'
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#ccc'
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
      grid: {
        top: 50,
        right: 40,
        left: 50,
        bottom: 70
      },
      // backgroundColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
      //   { offset: 0, color: '#3fc7f3' },
      //   { offset: 1, color: '#420f80' },
      // ]),
      xAxis: {
        type: 'category',
        name: options.xName || '',
        nameTextStyle: {
          color: '#03dfeb'
        },
        data: options.category,
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, .4)',
            width: 1,
            type: 'solid'
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#ccc'
          }
        }
      },
      yAxis: {
        type: 'value',
        name: options.yName || '',
        nameTextStyle: {
          color: '#03dfeb'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, .4)',
            width: 1,
            type: 'solid'
          }
        },
        splitLine: {
          lineStyle: {
            type: 'dotted',
            color: 'rgba(255, 255, 255, .2)'
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#ccc'
          }
        }
      },
      series: (options.series || []).map((item) => {
        return {
          data: item.data,
          type: 'bar',
          barWidth: 10,
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

  static getPieOptions(options) {
    const colors = ['#323891', options.itemColor || '#03dfeb'];
    return {
      title: {
        text: '{value|' + (options.title || '') + '}' + (options.unwrap ? '' : '\n') + '{unit|' + (options.unit || '') + '}',
        show: true,
        zlevel: 0,
        top: options.titleTop || 38,
        left: 'center',
        textStyle: {
          color: options.titleColor || '#03dfeb',
          textShadowColor: options.titleColor || '#03dfeb',
          textShadowBlur: 6,
          rich: {
            value: {
              fontSize: 28,
              fontWeight: 'bold',
              lineHeight: 34,
            },
            unit: {
              fontSize: 12,
              lineHeight: 12,
            },
          },
        },
        subtext: options.subTitle,
        subtextStyle: {
          color: '#ddd',
          lineHeight: 20,
        }
      },
      tooltip: {
        show: false
      },
      series: [
        {
          type: 'pie',
          radius: options.radius || ['85%', '95%'],
          startAngle: options.startAngle || 360,
          hoverAnimation: false,
          labelLine: {
            normal: {
              show: false
            }
          },
          data: (options.data || []).map((item, index) => ({
            value: item.value, name: index === 0 ? 'full' : 'rate',
            label: { normal: { show: false } },
            itemStyle: {
              color: (options.colors || colors)[index],
              shadowColor: index !== 0 ? (options.colors || colors)[index] : 'transparent',
              shadowBlur: 6
            }
          }))
        },
        {
          type: 'pie',
          radius: ['72%', '75%'],
          hoverAnimation: false,
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: 100,
              label: { normal: { show: false } },
              itemStyle: { color: '#3e46b1' }
            }
          ]
        }
      ]
    };
  }

  static getNewPieOptions(options) {
    return {
      title: {
        text: options.title || '0',
        subtext: options.subTitle || '总数',
        left: 'center',
        top: 'middle',
        textStyle: {
          color: '#03dfeb',
          fontSize: 26,
          fontWeight: 'normal'
        },
        subtextStyle: {
          color: '#ccc',
          fontSize: 14,
        }
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        show: true,
        left: 'center',
        top: 10,
        icon: 'circle',
        orient: 'horizontal',
        itemWidth: 8,
        itemHeight: 8,
        textStyle: {
          color: '#ccc',
          fontSize: 12,
          rich: {
            a: { verticleAlign: 'middle' }
          }
        }
      },
      color: [
        {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#03dfeb' },
            { offset: 0.5, color: '#03dfeb' },
            { offset: 1, color: 'orange' }
          ]
        },
        {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'red' },
            { offset: 0.5, color: 'orange' },
            { offset: 1, color: 'orange' }
          ]
        },
        {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#03dfeb' },
            { offset: 0.5, color: 'red' },
            { offset: 1, color: 'red' }
          ]
        }
      ],
      series: [
        {
          name: options.name || '',
          type: 'pie',
          radius: ['45%', '70%'],
          top: 26,
          label: {
            show: true,
            color: '#fff',
            formatter: '{b}: {c|{c}}  {d|[{d}%]}',
            fontSize: 12,
            rich: {
              b: {
                color: '#03dfeb'
              },
              c: {
                color: '#03dfeb',
                fontSize: 20,
                textShadowColor: '#03dfeb',
                textShadowBlur: 4,
              },
              d: {
                color: '#03dfeb',
                fontSize: 10,
                opacity: 0.8
              }
            }
          },
          data: options.data || [],
          itemStyle: {
            borderRadius: 4,
            borderColor: 'rgba(255, 255, 255, .4)',
            borderWidth: 2,
            shadowColor: '#03dfeb',
            shadowBlur: 4
          },
        }
      ]
    }
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

  static getNewGaugeOptions(options = {}) {
    let config = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 100,
          splitNumber: 100,
          itemStyle: {
            color: options.itemColor || '#03dfeb',
            shadowColor: options.itemColor || '#03dfeb',
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0
          },
          progress: {
            show: true,
            roundCap: true,
            width: 10
          },
          pointer: {
            show: false
          },
          axisLine: {
            roundCap: true,
            lineStyle: {
              width: 10,
              color: options.lineColor || [[1, '#00378e']]
            }
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            length: 1,
            lineStyle: {
              width: 1,
              color: '#fff'
            }
          },
          axisLabel: {
            show: false
          },
          title: {
            show: false
          },
          detail: {
            borderRadius: 4,
            offsetCenter: [0, '-20%'],
            valueAnimation: true,
            formatter: function (value) {
              return '{value|' + value.toFixed(0) + '}{unit|' + (options.unit || '%') + '}\n{detail|' + (options.detail || '') + '}';
            },
            rich: {
              value: {
                fontSize: 28,
                fontWeight: 'bold',
                color: options.numberColor || '#03dfeb'
              },
              unit: {
                fontSize: 18,
                color: options.numberColor || '#03dfeb',
                padding: [0, 0, -4, 2]
              },
              detail: {
                fontSize: 12,
                color: options.detailColor || '#d1d1d1'
              }
            }
          },
          data: [
            {
              value: options.value || 0
            }
          ]
        }
      ]
    }

    return config;
  }
}
