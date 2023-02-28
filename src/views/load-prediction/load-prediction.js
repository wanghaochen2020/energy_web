import React, { useEffect,useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import './load-prediction.scss';
import { ChartService } from '../../utils/chart.service';
import { LoadPredict } from '../../business/loadPredict';

export const LoadPrediction = () => {
  const [chartDateButtons, setChartDateButtons] = useState([
    { name: '日', selected: true }, { name: '月' }, { name: '年' }
  ]);
  const [chartDateButtons2, setChartDateButtons2] = useState([
    { name: '日', selected: true }, { name: '月' }, { name: '年' }
  ]);
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
  const [realLoad1, setRealLoad1] = useState([]);
  const [x1, setX1] = useState([]);
  const [temp, setTemp] = useState([]);
  const [realLoad2, setRealLoad2] = useState([]);
  const [x2, setX2] = useState([]);
  const [predictLoad, setPredictLoad] = useState([]);

  const selectDateChartButtons = (item) => {
    chartDateButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setChartDateButtons([...chartDateButtons]);
  }

  const selectDateChartButtons2 = (item) => {
    chartDateButtons2.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setChartDateButtons2([...chartDateButtons2]);
  }

  const selectChartButton = (item) => {
    chartButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    //console.log(item.name)
    //LoadPredict.getLoadStatistic(item.name)
    LoadPredict.getLoadStatistic(item.name).then((res)=> {
      setX1(res.x轴)
      setRealLoad1(res.负荷量)
      setTemp(res.温度)
    });

    setChartButtons([...chartButtons]);
  }

  const selectChartButton2 = (item) => {
    chartButtons2.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;

    LoadPredict.getComparison(item.name).then((res)=> {
      setX2(res.x轴)
      setRealLoad2(res.真实值)
      setPredictLoad(res.预测值)
    });

    setChartButtons2([...chartButtons2]);
  }

  useEffect(() => {
    LoadPredict.getLoadStatistic('D1组团').then((res)=> {
      setX1(res.x轴)
      setRealLoad1(res.负荷量)
      setTemp(res.温度)
    });

    LoadPredict.getComparison('D1组团').then((res)=> {
      setX2(res.x轴)
      setRealLoad2(res.真实值)
      setPredictLoad(res.预测值)
    });
  }, []);

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
              chartDateButtons.map((item, index) =>
                <span onClick={() => selectDateChartButtons(item)} key={index} className={"date-button" + (item.selected ? " date-button-selected" : "")}>{item.name}</span>)
            }
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
            data: x1,
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
              data: realLoad1,
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
              data: temp,
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
              chartDateButtons2.map((item, index) =>
                <span onClick={() => selectDateChartButtons2(item)} key={index} className={"date-button" + (item.selected ? " date-button-selected" : "")}>{item.name}</span>)
            }
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
              data: x2,
              series: [
                {
                  name: '真实值',
                  data: realLoad2
                },
                {
                  name: '预测值',
                  data: predictLoad
                }
              ]
            })} />
        </div>
      </div>
    </div>
  );
}
