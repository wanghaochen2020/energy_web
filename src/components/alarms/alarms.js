import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Popover, Button } from 'antd';
import './alarms.scss';

export const ComAlarms = ({ items }) => {
  // if (!items) {
  //   return null;
  // }

  const [data, setData] = useState([
    // {
    //   order: 1,
    //   name: '智能设备1',
    //   type: '故障',
    //   time: '2022-07-24',
    //   status: '未处理'
    // },
    // {
    //   order: 2,
    //   name: '智能设备2',
    //   type: '故障',
    //   time: '2022-07-24',
    //   status: '未处理'
    // },
    // {
    //   order: 3,
    //   name: '智能设备3',
    //   type: '故障',
    //   time: '2022-07-24',
    //   status: '已处理'
    // },
    // {
    //   order: 4,
    //   name: '智能设备4',
    //   type: '故障',
    //   time: '2022-07-24',
    //   status: '未处理'
    // },
    // {
    //   order: 5,
    //   name: '智能设备5',
    //   type: '故障',
    //   time: '2022-07-24',
    //   status: '已处理'
    // },
    // {
    //   order: 6,
    //   name: '智能设备6',
    //   type: '故障',
    //   time: '2022-07-24',
    //   status: '已处理'
    // }
  ]);

  useEffect(() => {
    if (!items || !items.length) return
    let newList = []
    for (let i = 0;i<items.length;i++) {
      newList[i] = {}
      newList[i].order = i+1
      newList[i].name = items[i].name
      newList[i].type = items[i].type
      newList[i].time = items[i].time
      newList[i].status = items[i].state === 1 ? "已处理":"未处理"
    }
    setData(newList)
  }, [items])

  const setPopoverVisible = (item, val, status) => {
    item.popoverVisible = val;
    if (status) {
      item.status = status;
    }
    setData([...data]);
  };

  const title = <thead><tr className="alarm-title">
    <th>序号</th>
    <th>名称</th>
    <th>异常类型</th>
    <th>故障时间</th>
    <th>状态</th>
  </tr></thead>

  const rows = <tbody>{data.map((item, index) => 
    <tr key={index} className={index%2===0?'row-odd':''}>
      <td>{item.order}</td>
      <td>{item.name}</td>
      <td>{item.type}</td>
      <td>{item.time}</td>
      {item.status === '已处理' ? <td><span className="alarm-resolved">{item.status}</span></td>:
        <td>
          <Popover
            content={<div className="popover-button-wrapper">
              <Button type="primary" onClick={() => setPopoverVisible(item, false, '已处理')}>确定</Button>
              <Button type="secondary" onClick={() => setPopoverVisible(item, false)}>取消</Button></div>}
            title="确定要标记为已处理吗？"
            trigger="click"
            visible={item.popoverVisible}
            onVisibleChange={(val) => setPopoverVisible(item, val)}
          >
          <span className="alarm-unresolved" onClick={() => setPopoverVisible(item, !item.popoverVisible)}>待处理</span>
        </Popover></td>}
    </tr>
  )}</tbody>;

  return (
    <div className="com-alarms">
      <table className="table-alarms">
        {title}
        {rows}
      </table>
    </div>
  );
}

ComAlarms.propTypes = {
  items: PropTypes.any
};