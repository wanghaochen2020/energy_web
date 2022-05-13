import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { setCheckStatus } from '../tree-helper';
import { Link } from 'react-router-dom';
import './tree-node.scss';

export const TreeNode = ({ items, selectItem, theme, showCheckbox }) => {
  const [nodes, setNodes] = useState(items);

  useEffect(() => {
    setNodes(items);
  }, [items]);

  const onSelectItem = (menu) => {
    selectItem && selectItem(menu);
  }

  const onExpand = (menu, expanded) => {
    menu.expanded = expanded;
    setNodes([...nodes]);
  }

  const onCheckItem = (item) => {
    item.checked = !item.checked;
    setCheckStatus(item.children, item.checked);
    setNodes(nodes);
  }

  const renderNodes = (nodes || []).map((item, index) =>
    <div key={item.id || index}
      className="ctr-tree-node">
      <div className={'ctr-tree-node-name theme-' + theme}>
        {
          (item.children || []).length > 0 ?
            <span className="ctr-tree-node-icon">
              {
                item.expanded ? <i onClick={() => onExpand(item, false)} className="fa fa-minus-square-o expand-icon"></i>
                  : <i onClick={() => onExpand(item, true)} className="fa fa-plus-square-o expand-icon"></i>
              }
            </span> : null
        }
        <span className={(item.selected ? 'ctr-tree-node-name-selected ' : '') + 'ctr-tree-node-name-item'}>
          <span className={!item.children?.length ? 'leaf-with-parent' : ''}>
            {showCheckbox ?
              <input checked={item.checked || false} onClick={() => onCheckItem(item)}
                onChange={() => { }}
                className="node-checkbox" type="checkbox" />
              : null}
            <span className="ctr-tree-node-name-text" onClick={() => onSelectItem(item)}>
              {
                !item.url ? <span className="node-text-wrapper">{item.name}</span> :
                  <Link to={item.url} className="node-text-wrapper">
                    {item.name}
                  </Link>
              }
            </span>
          </span>
        </span>
      </div>
      {
        (item.children || []).length > 0 ?
          <span className={item.expanded ? '' : 'hidden'}>
            <TreeNode items={item.children} showCheckbox={showCheckbox}
              selectItem={(e) => onSelectItem(e)} parentNode={item}></TreeNode>
          </span> : null
      }
    </div>
  );

  return (
    <div className="ctr-tree-child">
      {renderNodes}
    </div>
  );
};

TreeNode.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  showCheckbox: PropTypes.bool,
  theme: PropTypes.string,
  selectItem: PropTypes.func
};
