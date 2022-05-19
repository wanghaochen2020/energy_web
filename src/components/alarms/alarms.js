import React from 'react';
import PropTypes from 'prop-types';
import './alarms.scss';

export const ComAlarms = ({ items }) => {

  // if (!items) {
  //   return null;
  // }

  return (
    <div className="com-alarms">
      <div className="alarm-item">
        <span className="alarm-level">严重</span>
        <span className="alarm-content">
          <span className="alarm-time">13:26</span>
          严重警告严重警告严重警告
        </span>
        <span className="alarm-status">待处理</span>
      </div>
      <div className="alarm-item">
        <span className="alarm-level">严重</span>
        <span className="alarm-content">
          <span className="alarm-time">15:13</span>
          严重警告严重警告严重警告
        </span>
        <span className="alarm-status">待处理</span>
      </div>
      <div className="alarm-item">
        <span className="alarm-level yellow-alarm">重要</span>
        <span className="alarm-content">
          <span className="alarm-time">16:24</span>
          重要通知重要通知重要通知重要通知
        </span>
        <span className="alarm-status">待处理</span>
      </div>
      <div className="alarm-item">
        <span className="alarm-level yellow-alarm">重要</span>
        <span className="alarm-content">
          <span className="alarm-time">18:45</span>
          重要通知重要通知重要通知
        </span>
        <span className="alarm-status">待处理</span>
      </div>
    </div>
  );
}

ComAlarms.propTypes = {
  items: PropTypes.any
};