import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { deselectItems } from './tree-helper';
import { TreeNode } from './tree-node/tree-node';
import './tree.scss';

export const Tree = ({ items, showCheckbox, theme, selectItem }) => {
  const [nodes, setNodes] = useState(items);

  useEffect(() => {
    setNodes(items);
  }, [items]);

  const onSelectItem = (menu) => {
    deselectItems(nodes || [], false);
    menu.selected = true;
    selectItem && selectItem(menu);
    setNodes(nodes);
  }

  return (
    <div className="ctr-tree">
      <TreeNode
        className="tree-root"
        items={nodes}
        showCheckbox={showCheckbox}
        theme={theme}
        selectItem={(e) => onSelectItem(e)}></TreeNode>
    </div>
  );
}

Tree.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  showCheckbox: PropTypes.bool,
  theme: PropTypes.string,
  selectItem: PropTypes.func
};
