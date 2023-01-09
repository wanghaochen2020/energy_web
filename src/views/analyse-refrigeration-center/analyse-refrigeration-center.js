import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import './analyse-refrigeration-center.scss';
import { ChartService } from '../../utils/chart.service';
import { EnergyStation } from '../../business/system-layer.service';
import { PAGEDATA } from '../../constants/pageData';

const l = (d, min) => {
  return d && d[min] ? d[min] : 0;
}

export const AnalyseRefrigerationCenter = () => {
  const [loadRateButtons, setLoadRateButton] = useState([
    { name: '日', selected: true }, { name: '月', selected: false }, { name: '年', selected: false }
  ]);
  const [chartDateButtons, setChartDateButtons] = useState([
    { name: '日', selected: true }, { name: '月', selected: false }, { name: '年', selected: false }
  ]);

  let [ColdCarbonDay, setColdCarbonDay] = useState([]);
  let [ColdCarbonMonth, setColdCarbonMonth] = useState([]);
  let [ColdCarbonYear, setColdCarbonYear] = useState([]);
  let [ColdCarbonLastYear, setColdCarbonLastYear] = useState([]);
  let [ColdCarbonToday, setColdCarbonToday] = useState([]);

  useEffect(() => {
    let dayStr = EnergyStation.getDayStr();
    let monthStr = EnergyStation.getMonthStr();
    let yearStr = EnergyStation.getYearStr();
    let lastYearStr = EnergyStation.getLastYearStr();
    EnergyStation.getTable(PAGEDATA.ColdCarbonDay, dayStr).then((res)=> {
      let sum = 0;
      for (let i = 0; i < res.length; i++) { 
        sum += res[i];
      }
      setColdCarbonDay(res);
      setColdCarbonToday(sum.toFixed(2));
    });
    EnergyStation.getTable(PAGEDATA.ColdCarbonMonth, monthStr).then((res)=> {
      setColdCarbonMonth(res);
    });
    EnergyStation.getTable(PAGEDATA.ColdCarbonYear, yearStr).then((res)=> {
      setColdCarbonYear(res);
    });
    EnergyStation.getTable(PAGEDATA.ColdCarbonYear, lastYearStr).then((res)=> {
      setColdCarbonLastYear(res);
    });
  }, []);

  const selectLoadRateButton = (item) => {
    if (item.selected) return;
    loadRateButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setLoadRateButton([...loadRateButtons]);
  }

  const selectChartDateButton = (item) => {
    if (item.selected) return;
    chartDateButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setChartDateButtons([...chartDateButtons]);
  }

  let items = EnergyStation.powerList(ColdCarbonYear, ColdCarbonLastYear)

  return (
    <div className="analyse-refrigeration-center-view">
      <div className="operation-summary">
        <div className="top-info-box" style={{ width: '260px' }}>
          <ReactEcharts
            style={{ width: '260px', height: '260px', margin: 'auto' }}
            option={ChartService.getNewGaugeOptions({ 
              value: 92,
              detail: '今日制冷机平均热效率'
            })} 
          />
        </div>
        <div className="top-info-box" style={{ width: '260px' }}>
          <ReactEcharts
            style={{ width: '260px', height: '260px', margin: 'auto' }}
            option={ChartService.getNewGaugeOptions({ 
              value: 94,
              detail: '今日蓄热水箱平均热效率'
            })} 
          />
        </div>
        <div className="top-info-box" style={{ width: '260px' }}>
          <ReactEcharts
            style={{ width: '260px', height: '260px', margin: 'auto' }}
            option={ChartService.getNewGaugeOptions({ 
              value: 98,
              detail: '今日系统总效率'
            })} 
          />
        </div>
        <div className="top-info-box" style={{ width: '260px' }}>
          <ReactEcharts
            style={{ width: '260px', height: '260px', margin: 'auto' }}
            option={ChartService.getNewGaugeOptions({ 
              value: ColdCarbonToday,
              unit: 'tCO2',
              detail: '今日碳排放量统计'
            })} 
          />
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
              <span className="title-text">制冷机组制冷效率</span>
            </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={
                ChartService.getLineOptions({
                  legend: {
                    show: true,
                    top: 10,
                    right: 12,
                    textStyle: {
                      color: '#fff',
                      fontSize: 14
                    },
                    data: ['1#制冷机组', '2#制冷机组', '3#制冷机组']
                  },
                  xName: '时',
                  yName: '%',
                  data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                  series: [
                    {
                      name: '1#制冷机组',
                      data: [40, 50, 60, 30, 24, 60, 58, 35, 80, 47, 60, 80, 50, 60,
                        30, 24, 50, 48, 55, 80, 47, 60, 80, 90]
                    },
                    {
                      name: '2#制冷机组',
                      data: [48, 35, 80, 47, 60, 80, 50, 60, 50, 60, 30, 54, 60, 68,
                        80, 47, 60, 70, 80, 30, 64, 80, 58, 35]
                    },
                    {
                      name: '3#制冷机组',
                      data: [33, 25, 60, 57, 40, 50, 40, 50, 50, 60, 40, 54, 50, 48,
                        60, 57, 40, 50, 60, 40, 54, 60, 48, 45]
                    }
                  ]
                })} />
          </div>
          <div className="box-wrapper" style={{width: '100%', height: '450px', marginBottom: '10px'}}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">负载率统计</span>
            </div>
            <div className="date-button-wrapper" style={{top: '38px'}}>
              {
                loadRateButtons.map((item, index) =>
                  <span onClick={() => selectLoadRateButton(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={
                ChartService.getBarOptions({
                  yName: '%',
                  category: ['7/12', '7/13', '7/14', '7/15', '7/16', '7/17', '7/18'],
                  series: [
                    {
                      data: [50, 60, 30, 24, 40, 58, 65, 80]
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
              <span className="title-text">碳排放量统计</span>
            </div>
            <div className="date-button-wrapper" style={{top: '38px'}}>
              {
                chartDateButtons.map((item, index) =>
                  <span onClick={() => selectChartDateButton(item)} key={index} className={"date-button" + (item.selected? " date-button-selected" : "")}>{item.name}</span>)
              }
            </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={
                ChartService.getLineOptions({
                  xName: (chartDateButtons[2] && chartDateButtons[2].selected) ? "月"
                  : ((chartDateButtons[1] && chartDateButtons[1].selected) ? "日" : "时"),
                  yName: 't',
                  data: (chartDateButtons[2] && chartDateButtons[2].selected) ? [1, 2, 3, 4, 5, 6, 7 ,8, 9, 10, 11, 12]
                   : ((chartDateButtons[1] && chartDateButtons[1].selected) ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
                   : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]),
                  series: [
                    {
                      data: (chartDateButtons[2] && chartDateButtons[2].selected) ? ColdCarbonYear
                       : ((chartDateButtons[1] && chartDateButtons[1].selected) ? ColdCarbonMonth : ColdCarbonDay)
                    }
                  ]
                })} />
          </div>
          <div className="box-wrapper" style={{width: '100%', height: '450px', marginBottom: '10px'}}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">电量类型碳排占比</span>
            </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={
                {
                  tooltip: {
                    trigger: 'item'
                  },
                  legend: {
                    orient: 'vertical',
                    left: 'right',
                    textStyle: {
                      color: '#fff'
                    }
                  },
                  series: [
                    {
                      type: 'pie',
                      radius: '50%',
                      data: [
                        { value: 59, name: '火电' },
                        { value: 37, name: '绿电' },
                        { value: 4, name: '其它' },
                      ],
                      label: {
                        formatter: '{b}: {c}({d}%)',
                        color: '#fff'
                      }
                    }
                  ]
                }
              } />
          </div>
        </div>
      </div>
      <div className="bottom-box">
        <table className="table-history">
          <thead>
            <tr>
              <th>时间</th>
              <th>制冷站耗能（MWH）</th>
              <th>同比去年同月耗能</th>
              <th>环比上月耗能</th>
              <th>碳排放量（tCO2）</th>
              <th>环比去年同月碳排放量</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
      </div>
    </div>
  );
}
