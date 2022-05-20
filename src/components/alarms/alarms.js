import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Popover, Button } from 'antd';
import './alarms.scss';

export const ComAlarms = ({ items }) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverVisible2, setPopoverVisible2] = useState(false);
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
        <Popover
          content={<div className="popover-button-wrapper">
            <Button type="primary" onClick={() => setPopoverVisible(false)}>确定</Button>
            <Button type="secondary" onClick={() => setPopoverVisible(false)}>取消</Button></div>}
          title="确定要标记为已处理吗？"
          trigger="click"
          visible={popoverVisible}
          onVisibleChange={setPopoverVisible}
        >
        <span className="alarm-status" onClick={() => setPopoverVisible(!popoverVisible)}>待处理</span>
      </Popover>
      </div>
      <div className="alarm-item">
        <span className="alarm-level">严重</span>
        <span className="alarm-content">
          <span className="alarm-time">15:13</span>
          严重警告严重警告严重警告
        </span>
        <Popover
          content={<div className="popover-button-wrapper">
            <Button type="primary" onClick={() => setPopoverVisible2(false)}>确定</Button>
            <Button type="secondary" onClick={() => setPopoverVisible2(false)}>取消</Button></div>}
          title="确定要标记为已处理吗？"
          trigger="click"
          visible={popoverVisible2}
          onVisibleChange={setPopoverVisible2}
        >
        <span className="alarm-status" onClick={() => setPopoverVisible2(!popoverVisible2)}>待处理</span>
      </Popover>
      </div>
      <div className="alarm-item">
        <span className="alarm-level yellow-alarm">重要</span>
        <span className="alarm-content">
          <span className="alarm-time">16:24</span>
          重要通知重要通知重要通知重要通知
        </span>
        <span className="alarm-status alarm-status-solved">处理完毕</span>
      </div>
      <div className="alarm-item">
        <span className="alarm-level yellow-alarm">重要</span>
        <span className="alarm-content">
          <span className="alarm-time">18:45</span>
          重要通知重要通知重要通知
        </span>
        <span className="alarm-status alarm-status-solved">处理完毕</span>
      </div>
    </div>
  );
}

ComAlarms.propTypes = {
  items: PropTypes.any
};