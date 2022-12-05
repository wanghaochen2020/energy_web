import React from 'react';
import PropTypes from 'prop-types';
import './summary-info-solar-water.scss';

export const ComSummaryInfoSolarWater = ({ items }) => {

  // if (!items) {
  //   return null;
  // }

  return (
    <div className="com-summary-info">
      <div className="main-info-row">
        <span className="main-info">
          <span className="main-info-number">{items.power}</span>
          <span className="main-info-text">
            总用电能耗累计 (kW・h)
          </span>
        </span>
      </div>

      <div className="row-item row-odd">
        <span>集热器进出口温度</span>
        <span className="info-number">{items.SolarWaterHeatCollecterInT}/{items.SolarWaterHeatCollecterOutT} °C</span>
      </div>
      <div className="row-item">
        <span>太阳能热水加热器温度</span>
        <span className="info-number">{items.SolarWaterJRQT} °C</span>
      </div>
      <div className="row-item row-odd">
        <span>今日总集热量</span>
        <span className="info-number">{items.SolarWaterHeatCollectionToday} J</span>
      </div>
      {/* <div className="row-item">
        <span>冷冻水供回水温度</span>
        <span className="info-number">8/14 °C</span>
      </div> */}
      <div className="row-item row-odd">
        <span>水泵运行数</span>
        <span className="info-number">{items.SolarWaterPumpRunningNum}台</span>
      </div>
    </div>
  );
}

ComSummaryInfoSolarWater.propTypes = {
  items: PropTypes.any
};