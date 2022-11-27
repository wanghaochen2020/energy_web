import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import './analyse-solar-water-heater.scss';
import { ChartService } from '../../utils/chart.service';

export const AnalyseSolarWaterHeater = () => {
  const [rateButtons, setRateButtons] = useState([
    { name: '日', selected: true }, { name: '周' }, { name: '月' }, { name: '季' }
  ]);
  const [systemRateButtons, setSystemRateButtons] = useState([
    { name: '日', selected: true }, { name: '周' }, { name: '月' }, { name: '季' }
  ]);
  const [systemRateButtons2, setSystemRateButtons2] = useState([
    { name: '日', selected: true }, { name: '周' }, { name: '月' }, { name: '季' }
  ]);
  const [chartDateButtons, setChartDateButtons] = useState([
    { name: '本日碳排放量', selected: true }, { name: '近七天碳排放量' }, { name: '历史碳排放量' }
  ]);

  const selectRateButton = (item) => {
    rateButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setRateButtons([...rateButtons]);
  }

  const selectSystemRateButtons = (item) => {
    systemRateButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setSystemRateButtons([...systemRateButtons]);
  }

  const selectSystemRateButtons2 = (item) => {
    systemRateButtons2.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setSystemRateButtons2([...systemRateButtons2]);
  }

  return (
    <div className="analyse-solar-water-heater-view">
      <div className="operation-summary">
          <div className="right-info-box">
              <div className="chart-summary">
                <div>同比增长</div>
                <div>25%</div>
                </div>
              <div style={{ textAlign: 'center', width: '400px', height: '210px' }}>
                <ReactEcharts style={{ width: '100%', height: '200px', margin: 'auto' }} option={{
                  tooltip: {
                    trigger: 'item'
                  },
                  series: [
                    {
                      type: 'pie',
                      startAngle: 90,
                      selectedMode: 'single',
                      radius: ['50%', '60%'],
                      data: [
                        { value: 100, name: '上期能耗：40000' }
                      ]
                    },
                    {
                      type: 'pie',
                      startAngle: 20,
                      hoverAnimation: false,
                      radius: ["55%", "70%"],
                      data: [{
                        value: 80,
                        itemStyle: {
                          normal: {
                            color: "rgba(1,218,220,0)"
                          }
                        }
                      },
                      {
                        value: 30,
                        name: '本期能耗：50000',
                        itemStyle: {
                          normal: {
                            color: "rgba(1,218,220,1)"
                          }
                        }
                      },
                      ]
                    }
                  ]
                }} />
              </div>
          </div>
          <div className="top-info-box">
            <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={ChartService.getCircleOptions({
              data: [{ value: 100 }, { value: 80}], startAngle: 240
            })} />
            <div className="number-value">今日太阳能集热效率: 60%</div>
          </div>
          <div className="top-info-box">
            <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={ChartService.getCircleOptions({
              data: [{ value: 100 }, { value: 60}], colors: ['#323891', '#ecf75d'], startAngle: 40
            })}/>
            <div className="number-value">今日太阳能保证率: 70%</div>
          </div>
          <div className="top-info-box">
            <ReactEcharts style={{ width: '120px', height: '120px', margin: 'auto' }} option={ChartService.getCircleOptions({
              data: [{ value: 100 }, { value: 70}], colors: ['#323891', '#45f9b7'], startAngle: 140
            })}/>
            <div className="number-value">今日系统总效率: 70%</div>
          </div>
      </div>
      <div className="top-box">
        <div className="top-left">
          <div className="box-wrapper" style={{width: '100%', height: '450px', marginBottom: '10px'}}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text" style={{marginLeft: '40px'}}>太阳能集热效率</span>
            </div>
            <div className="date-button-wrapper" style={{top: '38px', right: '20px'}}>
              {
                rateButtons.map((item, index) =>
                  <span onClick={() => selectRateButton(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={
                ChartService.getBarOptions({
                  yName: '%',
                  category: ['7/12', '7/13', '7/14', '7/15', '7/16', '7/17', '7/18'],
                  series: [
                    {
                      data: [150, 60, 230, 224, 100, 218, 135, 80]
                    }
                  ]
                })} />
          </div>
        </div>
        <div className="top-right">
          <div className="box-wrapper" style={{width: '100%', height: '450px', marginBottom: '10px'}}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text" style={{marginLeft: '40px'}}>今日碳排放量统计</span>
            </div>
            <div className="date-button-wrapper" style={{top: '38px', right: '20px'}}>
              {
                chartDateButtons.map((item, index) =>
                  <span onClick={() => setChartDateButtons(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={
                ChartService.getLineOptions({
                  legend: {
                    show: true,
                    top: 30,
                    right: 12,
                    textStyle: {
                      color: '#fff',
                      fontSize: 14
                    },
                    data: ['绿电碳排放量', '原煤碳排放量', '天然气碳排放量']
                  },
                  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                  series: [
                    {
                      name: '绿电碳排放量',
                      data: [150, 60, 230, 224, 100, 218, 135, 80, 147, 260, 200, 150, 60,
                        230, 224, 100, 218, 135, 80, 147, 260, 200, 100]
                    },
                    {
                      name: '原煤碳排放量',
                      data: [35, 80, 47, 160, 100, 50, 60, 50, 60, 30, 124, 60, 118,
                        80, 47, 160, 100, 100, 130, 124, 100, 118, 35]
                    },
                    {
                      name: '天然气碳排放量',
                      data: [25, 60, 57, 40, 50, 40, 50, 50, 60, 40, 54, 50, 48,
                        60, 57, 40, 50, 60, 40, 54, 60, 48, 45]
                    }
                  ]
                })} />
          </div>
        </div>
      </div>
      <div className="bottom-box">
        <div className="bottom-left">
          <div className="box-wrapper" style={{width: '100%', height: '450px', marginBottom: '10px'}}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text" style={{marginLeft: '40px'}}>太阳能保证率</span>
            </div>
            <div className="date-button-wrapper" style={{top: '38px', right: '20px'}}>
              {
                systemRateButtons.map((item, index) =>
                  <span onClick={() => selectSystemRateButtons(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={
                ChartService.getBarOptions({
                  category: [1, 2, 3, 4, 5, 6, 7, 8],
                  series: [
                    {
                      data: [150, 60, 230, 224, 100, 218, 135, 80]
                    }
                  ]
                })} />
          </div>
        </div>
        <div className="bottom-right">
          <div className="box-wrapper" style={{width: '100%', height: '450px', marginBottom: '10px'}}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text" style={{marginLeft: '40px'}}>系统总效率</span>
            </div>
            <div className="date-button-wrapper" style={{top: '38px', right: '20px'}}>
              {
                systemRateButtons2.map((item, index) =>
                  <span onClick={() => selectSystemRateButtons2(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={
                ChartService.getBarOptions({
                  category: [1, 2, 3, 4, 5, 6, 7, 8],
                  series: [
                    {
                      data: [150, 60, 230, 224, 100, 218, 135, 80]
                    }
                  ]
                })} />
          </div>
        </div>
      </div>
    </div>
  );
}
