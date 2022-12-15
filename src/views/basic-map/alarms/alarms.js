import React, { useState } from 'react';
import './alarms.scss';

export const Alarms = (data) => {
  data = data.data;
  const title = <thead><tr className="alarm-title">
    <th>序号</th>
    <th>事件名称</th>
    <th>状态</th>
  </tr></thead>

  const rows = <tbody>{data && data.map((item, index) => 
    <tr key={index} className={index%2===0?'row-odd':''}>
      <td>{index}</td>
      <td>{item.name}</td>
      <td><span className={item.state === 1 ? "alarm-resolved" : "alarm-unresolved"}>{item.state === 1 ? "已处理":"未处理"}</span></td>
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
