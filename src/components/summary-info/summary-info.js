import React from 'react';
import PropTypes from 'prop-types';
import './summary-info.scss';

export const ComSummaryInfo = ({ items }) => {

  // if (!items) {
  //   return null;
  // }

  return (
    <div className="com-summary-info">
      <div className="main-info-row">
        <span className="main-info">
          <span className="main-info-text">
            锅炉总功率（kW）
          </span>
          <span className="main-info-number">
            {items.boilerPower}
            <span className="number-unit">kW</span>
          </span>
        </span>
        <span className="main-info">
          <span className="main-info-text">
            总用电能耗累计（kW·h）
          </span>
          <span className="main-info-number yellow-color">
            {items.powerConsumptionToday}
            <span className="number-unit">kW·h</span>
          </span>
        </span>
      </div>

      <div className="row-item row-odd">
        <span>室外温度</span>
        <span className="info-number">{items.outTemp} °C</span>
      </div>
      <div className="row-item">
        <span>锅炉运行台数</span>
        <span className="info-number">{items.boilerRunningNum}台</span>
      </div>
      <div className="row-item row-odd">
        <span>蓄热水箱运行台数</span>
        <span className="info-number">{items.tankRunningNum}台</span>
      </div>
      {/* <div className="row-item">
        <span>设备温度</span>
        <span className="info-number">25 °C</span>
      </div>
      <div className="row-item row-odd">
        <span>设备供热量</span>
        <span className="info-number">8 GL</span>
      </div> */}
      <div className="row-item">
        <span>今日总供热量</span>
        <span className="info-number">{items.heatSupplyToday} GJ</span>
      </div>
    </div>
  );
}

ComSummaryInfo.propTypes = {
  items: PropTypes.any
};