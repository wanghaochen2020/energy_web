import React, { useState } from 'react';
import './alarms.scss';

export const Alarms = () => {
  const [data] = useState([
    {
      order: 1,
      name: '智能设备1',
      type: '故障',
      time: '2022-07-24',
      status: '严重'
    },
    {
      order: 2,
      name: '故障情况2',
      status: '严重'
    },
    {
      order: 3,
      name: '故障情况3',
      status: '严重'
    },
    {
      order: 4,
      name: '故障情况4',
      status: '严重'
    },
    {
      order: 5,
      name: '故障情况5',
      status: '严重'
    },
    {
      order: 6,
      name: '故障情况6',
      status: '严重'
    }
  ]);

  const title = <thead><tr className="alarm-title">
    <th>序号</th>
    <th>事件名称</th>
    <th>严重状态</th>
  </tr></thead>

  const rows = <tbody>{data.map((item, index) => 
    <tr key={index} className={index%2===0?'row-odd':''}>
      <td>{item.order}</td>
      <td>{item.name}</td>
      <td><span className="alarm-unresolved">严重</span></td>
    </tr>
  )}</tbody>;

  return (
    <div className="com-basic-map-alarms">
      <table className="table-alarms">
        {title}
        {rows}
      </table>
    </div>
  );
}
