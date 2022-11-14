import React from 'react';
import PropTypes from 'prop-types';
import './summary-info-refrigeration.scss';

export const ComSummaryInfoRefrigeration = ({ items }) => {

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
            65.86
            <span className="number-unit">km</span>
          </span>
        </span>
        <span className="main-info">
          <span className="main-info-text">
          总用电能耗累计
          </span>
          <span className="main-info-number yellow-color">
            65.86
            <span className="number-unit">km・h</span>
          </span>
        </span>
      </div>

      <div className="row-item row-odd">
        <span>室内温度</span>
        <span className="info-number">25 °C</span>
      </div>
      <div className="row-item">
        <span>制冷机运行台数</span>
        <span className="info-number">3台</span>
      </div>
      <div className="row-item row-odd">
        <span>冷却水供回水温度</span>
        <span className="info-number">35/30 °C</span>
      </div>
      <div className="row-item">
        <span>冷冻水供回水温度</span>
        <span className="info-number">8/14 °C</span>
      </div>
      <div className="row-item row-odd">
        <span>制冷机实时功率</span>
        <span className="info-number">2200kW</span>
      </div>
    </div>
  );
}

ComSummaryInfoRefrigeration.propTypes = {
  items: PropTypes.any
};