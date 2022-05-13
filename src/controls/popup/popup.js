/**
  * position format: vertical-horizontal. e.g. top-left
*/

import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './popup.scss';

export const Popup = ({ children, displayPopup, position, popupContent }) => {
  const slotWrapperId = 'popup-slot-' + new Date().getTime();
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

  return (
    <div className="ctr-popup-menu">
      <div id={slotWrapperId} className="slot-wrapper" onClick={() => onClickSlot()}>
        {children}
      </div>
      {
        showPopup ?
          <div className="popup-content" style={styleObject}>
            {popupContent}
          </div> : null
      }
    </div>
  );
}

Popup.propTypes = {
  children: PropTypes.any,
  displayPopup: PropTypes.bool,
  position: PropTypes.string,
  popupContent: PropTypes.any
};
