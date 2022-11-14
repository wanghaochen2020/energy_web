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
            热量总功率
          </span>
          <span className="main-info-number">
            65.86
            <span className="number-unit">km</span>
          </span>
        </span>
        <span className="main-info">
          <span className="main-info-text">
            锅炉总功率
          </span>
          <span className="main-info-number yellow-color">
            65.86
            <span className="number-unit">km</span>
          </span>
        </span>
      </div>

      <div className="row-item row-odd">
        <span>室外温度</span>
        <span className="info-number">10 °C</span>
      </div>
      <div className="row-item">
        <span>锅炉运行台数</span>
        <span className="info-number">3台</span>
      </div>
      <div className="row-item row-odd">
        <span>蓄热水箱运行台数</span>
        <span className="info-number">5台</span>
      </div>
      <div className="row-item">
        <span>设备温度</span>
        <span className="info-number">25 °C</span>
      </div>
      <div className="row-item row-odd">
        <span>设备供热量</span>
        <span className="info-number">8 GL</span>
      </div>
      <div className="row-item">
        <span>总供热量</span>
        <span className="info-number">200 GL</span>
      </div>
    </div>
  );
}

ComSummaryInfo.propTypes = {
  items: PropTypes.any
};