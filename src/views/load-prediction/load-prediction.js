import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import './load-prediction.scss';
import { ChartService } from '../../utils/chart.service';

export const LoadPrediction = () => {
  const [chartButtons, setChartButtons] = useState([
    { name: 'D1组团', selected: true }, { name: 'D2组团' }, { name: 'D3组团' },
    { name: 'D4组团' }, { name: 'D5组团' }, { name: 'D6组团' },
    { name: '公共组团南区' }, { name: '公共组团北区' },
  ]);
  const [chartButtons2, setChartButtons2] = useState([
    { name: 'D1组团', selected: true }, { name: 'D2组团' }, { name: 'D3组团' },
    { name: 'D4组团' }, { name: 'D5组团' }, { name: 'D6组团' },
    { name: '公共组团南区' }, { name: '公共组团北区' },
  ]);

  const selectChartButton = (item) => {
    chartButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setChartButtons([...chartButtons]);
  }

  const selectChartButton2 = (item) => {
    chartButtons2.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setChartButtons2([...chartButtons2]);
  }

  return (
    <div className="load-prediction-view">
      <div className="top-box">
        <div className="box-wrapper">
          <div className="top-left-corner"></div>
          <div className="top-right-corner"></div>
          <div className="bottom-left-corner"></div>
          <div className="bottom-right-corner"></div>
          <div className="box-title-wrapper" style={{ backgroundImage: "url('/assets/images/titleBg.png')" }}>
            <span className="box-title-icon">&#9658;</span>
            <span className="title-text">建筑物逐时负荷统计</span>
          </div>
          <div className="date-button-wrapper" style={{ top: '38px' }}>
            {
              chartButtons.map((item, index) =>
                <span onClick={() => selectChartButton(item)} key={index} className={"date-button" + (item.selected ? " date-button-selected" : "")}>{item.name}</span>)
            }
          </div>
          <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
          legend: {
            show: true,
            top: 6,
            left: 10,
            textStyle: {
              color: '#fff',
              fontSize: 14
            },
            data: ['负荷量', '温度(°C)']
          },
          tooltip: {
            trigger: 'axis'
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
            data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
            axisLine: {
              show: true,
              lineStyle: {
                color: '#6cbcea',
                width: 1,
                type: 'solid'
              }
            }
          },
          yAxis: [{
            name: 'KWH',
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#6cbcea',
                width: 1,
                type: 'solid'
              }
            },
            splitLine: {
              show: false
            }
          },
          {
            type: 'value',
            name: '°C',
            max: 40,
            position: 'right',
            alignTicks: false,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#6cbcea',
                width: 1,
                type: 'solid'
              }
            },
            axisLabel: {
              formatter: '{value} °C'
            },
            splitLine: {
              show: false
            }
          }],
          series: [
            {
              name: '负荷量',
              data: [130, 150, 60, 230, 224, 100, 218, 135, 80, 147, 260, 200, 150, 60,
                230, 224, 100, 218, 135, 80, 147, 260, 200, 100],
              type: 'bar',
              barWidth: 8,
              itemStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(3, 223, 135, .9)' },
                        { offset: 1, color: 'rgba(3, 223, 135, 0)' }
                    ],
                },
                borderRadius: [4, 4, 0, 0]
              }
            },
            {
              name: '温度(°C)',
              yAxisIndex: 1,
              data: [55, 35, 20, 17, 16, 20, 30, 20, 30, 20, 30, 24, 23, 18,
                30, 27, 16, 10, 10, 13, 24, 10, 18, 35],
              type: 'line',
              smooth: true,
              symbolSize: 6,
              itemStyle: {
                normal: {
                }
              }
            }
          ]
        }} />
        </div>
      </div>
      <div className="bottom-box">
        <div className="box-wrapper">
          <div className="top-left-corner"></div>
          <div className="top-right-corner"></div>
          <div className="bottom-left-corner"></div>
          <div className="bottom-right-corner"></div>
          <div className="box-title-wrapper" style={{ backgroundImage: "url('/assets/images/titleBg.png')" }}>
            <span className="box-title-icon">&#9658;</span>
            <span className="title-text" >负荷真实值与预测值对比</span>
          </div>
          <div className="date-button-wrapper" style={{ top: '38px' }}>
            {
              chartButtons2.map((item, index) =>
                <span onClick={() => selectChartButton2(item)} key={index} className={"date-button" + (item.selected ? " date-button-selected" : "")}>{item.name}</span>)
            }
          </div>
          <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={
            ChartService.getLineOptions({
              legend: {
                show: true,
                top: 6,
                left: 10,
                textStyle: {
                  color: '#fff',
                  fontSize: 14
                },
                data: ['真实值', '预测值']
              },
              data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
              series: [
                {
                  name: '真实值',
                  data: [135, 150, 60, 230, 224, 100, 218, 135, 80, 147, 260, 200, 150, 60,
                    230, 224, 100, 218, 135, 80, 147, 260, 200, 100]
                },
                {
                  name: '预测值',
                  data: [150, 35, 80, 47, 160, 100, 50, 60, 50, 60, 30, 124, 60, 118,
                    80, 47, 160, 100, 100, 130, 124, 100, 118, 35]
                }
              ]
            })} />
        </div>
      </div>
    </div>
  );
}
