/**
  * position format: vertical-horizontal. e.g. top-left
*/

import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './popup-menu.scss';

export const PopupMenu = ({ children, displayPopup, items, position, customClass }) => {
  const slotWrapperId = 'popup-menu-slot-' + new Date().getTime();
  const [showPopup, setShowPopup] = useState(displayPopup);
  const [styleObject, setStyleObject] = useState({});

  const updatePosition = useCallback(() => {
    setTimeout(() => {
      const slot = document.getElementById(slotWrapperId) || {};
      const popupPosition = (position || getAutoPosition()).split('-');
      setStyleObject({
        [popupPosition[0] || 'top']: (slot.offsetHeight + 3) + 'px',
        [popupPosition[1] || 'left']: 0
      });
    });
  }, [position, slotWrapperId]);

  useEffect(() => {
    updatePosition();
    document.body.addEventListener('click', onClickBody.bind(this));

    return () => {
      document.body.removeEventListener('click', onClickBody);
    }
  }, [updatePosition]);

  // TODO: calculate the best position
  const getAutoPosition = () => {
    return 'top-left';
  };

  const onClickSlot = () => {
    // execute after body click propagation
    if (!showPopup) {
      setTimeout(() => {
        setShowPopup(true);
      });
    }
  };

  const onClickBody = () => {
    setShowPopup(false);
  };

  const menus = (items || []).map((item, index) =>
    <div className="list-item" key={index}
      onClick={(e) => item.click && item.click(e)}>
      {
        item.url ? <Link to={item.url} className="list-item-text">{item.name}</Link> :
          <span className="list-item-text">{item.name}</span>
      }
    </div>
  );

  return (
    <div className="ctr-popup-menu">
      <div id={slotWrapperId} className={['slot-wrapper', customClass].join(' ')} onClick={() => onClickSlot()}>
        {children}
      </div>
      {
        showPopup ?
          <div className="list-wrapper" style={styleObject}>
            {menus}
          </div> : null
      }
    </div>
  );
}

PopupMenu.propTypes = {
  children: PropTypes.any,
  displayPopup: PropTypes.bool,
  position: PropTypes.string,
  customClass: PropTypes.string,
  items: PropTypes.any
};
