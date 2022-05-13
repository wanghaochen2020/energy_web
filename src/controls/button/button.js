/**
 * state:
 *  1. Normal. 2. Disabled. 3. Loading
 */
import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

export const Button = ({ state, clickEvent, type, size, text, customClass }) => {
  const onClick = () => {
    if (state > 1) {
      return;
    }
    clickEvent && clickEvent();
  }

  return (
    <span className="ctr-button">
      <button
        type="button"
        disabled={state > 1 ? true : false}
        className={'btn btn-' + type + ' control-button ' + (size ? 'btn-' + size : '')
          + ' ' + customClass}
        onClick={() => onClick()}>
        <div className={"icon-box" + (state === 3 ? '' : ' hidden')}>
          <img className="icon-loading" src="../../assets/images/loading.gif" alt="" />
        </div>
        {text}
      </button>
    </span>
  );
}

Button.propTypes = {
  state: PropTypes.number,
  size: PropTypes.string,
  customClass: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  clickEvent: PropTypes.func
};
