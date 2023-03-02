import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import './allocation-result.scss';
import { ChartService } from '../../utils/chart.service';
import { Allocation } from '../../business/allocation';

export const AllocationResult = () => {
  const [chartButtons, setChartButtons] = useState([]);
  const [loadRateButtons, setLoadRateButton] = useState([]);
  const [chartDateButtons, setChartDateButtons] = useState([]);

  const [energySaving, setEnergySaving] = useState([]);
  const [runningCost, setRunningCost] = useState([]);
  const [carbonEmission, setCarbonEmission] = useState([]);

  const [x1, setX1] = useState([]);
  const [x2, setX2] = useState([]);
  const [x3, setX3] = useState([]);

  useEffect(() => {
    setChartButtons([
      { name: '电锅炉', selected: true }, { name: '蓄热水箱' }, { name: '能源站系统' }
    ]);
    setLoadRateButton([
      { name: '日', selected: true }, { name: '周' }, { name: '月' }, { name: '季' }
    ]);
    setChartDateButtons([
      { name: '今日', selected: true }, { name: '近七天' }, { name: '历史' }
    ]);

    Allocation.getEnergySaving().then((res)=> {
      setEnergySaving(res.data)
      setX1(res.x轴)
    });
    Allocation.getRunningCost().then((res)=> {
      setRunningCost(res.data)
      setX2(res.x轴)
    });
    Allocation.getCarbonEmission().then((res)=> {
      setCarbonEmission(res.data)
      setX3(res.x轴)
    });


  }, []);

  const selectChartButton = (item) => {
    chartButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setChartButtons([...chartButtons]);
  }

  const selectLoadRateButton = (item) => {
    loadRateButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setLoadRateButton([...loadRateButtons]);
  }

  const selectChartDateButton = (item) => {
    chartDateButtons.slice().forEach(button => {
      button.selected = false;
    });

    item.selected = true;
    setChartDateButtons([...chartButtons]);
  }

  return (
    <div className="allocation-result-view">
      <div className="top-box" style={{paddingRight: '0'}}>
        <div className="box-wrapper" style={{marginRight: '0'}}>
            <div className="top-left-corner"></div>
            <div className="top-right-corner"></div>
            <div className="bottom-left-corner"></div>
            <div className="bottom-right-corner"></div>
            <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
              <span className="box-title-icon">&#9658;</span>
              <span className="title-text">节约能耗</span>
            </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={{
                title: {
                  text: '',
                  left: '15',
                  top: '8',
                  textStyle: {
                    color: '#fff',
                    fontSize: 14
                  }
                },
                // backgroundColor: '#080a27',
                xAxis: {
                  type: 'category',
                  data: x1,
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#ffffff',
                      width: 1,
                      type: 'solid'
                    }
                  }
                },
                yAxis: {
                  type: 'value',
                  name: 'kw∙h',
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#ffffff',
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
                series: [
                  {
                    data: energySaving,
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
                  }
                ]
              }} />
        </div>
      </div>
      <div className="top-box">
        <div className="top-left">
            <div className="box-wrapper">
              <div className="top-left-corner"></div>
              <div className="top-right-corner"></div>
              <div className="bottom-left-corner"></div>
              <div className="bottom-right-corner"></div>
              <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
                <span className="box-title-icon">&#9658;</span>
                <span className="title-text">运行费用</span>
              </div>
              <ReactEcharts style={{ width: '100%', height: '450px' }} option={
                ChartService.getBarOptions({
                  yName: '费用(元)',
                  category: x2,
                  series: [
                    {
                      data: runningCost
                    }
                  ]
                })} />
          </div>
        </div>
        <div className="top-right">
            <div className="box-wrapper">
              <div className="top-left-corner"></div>
              <div className="top-right-corner"></div>
              <div className="bottom-left-corner"></div>
              <div className="bottom-right-corner"></div>
              <div className="box-title-wrapper" style={{backgroundImage: "url('/assets/images/titleBg.png')"}}>
                <span className="box-title-icon">&#9658;</span>
                <span className="title-text">减少碳排放</span>
              </div>
              <ReactEcharts style={{ width: '100%', height: '450px', margin: 'auto' }} option={
                ChartService.getLineOptions({
                  yName: 'kg',
                  data: x3,
                  series: [
                    {
                      data: carbonEmission
                    }
                  ]
                })} />
          </div>
        </div>
      </div>
    </div>
  );
}
