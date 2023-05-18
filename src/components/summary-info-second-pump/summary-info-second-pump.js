import React from 'react';
import PropTypes from 'prop-types';
import './summary-info-second-pump.scss';

export const ComSummaryInfoSecondPump = ({ items }) => {

  // if (!items) {
  //   return null;
  // }

  return (
    <div className="com-summary-info">
      <div className="main-info-row">
        <span className="main-info">
          <span className="main-info-text">
            总功率
          </span>
          <span className="main-info-number">
            {items.power}
            <span className="number-unit">kW</span>
          </span>
        </span>
        <span className="main-info">
          <span className="main-info-text">
          总用电能耗累计
          </span>
          <span className="main-info-number yellow-color">
            {items.energyCostToday}
            <span className="number-unit">kW・h</span>
          </span>
        </span>
      </div>

      <div className="row-item row-odd">
        <span>室外温度</span>
        <span className="info-number">{items.outTemp} °C</span>
      </div>
      {/* <div className="row-item">
        <span>热分水器温度</span>
        <span className="info-number">66 °C台</span>
      </div>
      <div className="row-item row-odd">
        <span>冷热分水器温度</span>
        <span className="info-number">66 °C台</span>
      </div>
      <div className="row-item">
        <span>冷冻水供回水温度</span>
        <span className="info-number">8/14 °C</span>
      </div> */}
      <div className="row-item row-odd">
        <span>空调热水二次泵实时功率</span>
        <span className="info-number">{items.power}kW</span>
      </div>
    </div>
  );
}

ComSummaryInfoSecondPump.propTypes = {
  items: PropTypes.any
};