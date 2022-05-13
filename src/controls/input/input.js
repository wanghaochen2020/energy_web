import React from 'react';
import PropTypes from 'prop-types';
import './input.scss';

export const Input = ({ value, type, readOnly, placeholder, disabled, error,
  errorMessage, customClass, changeEvent, showClearButton }) => {

  const onInputChange = (event) => {
    changeEvent && changeEvent(event.target.value, event);
  }

  const onEnter = (event) => {
    onEnter && onEnter(event.target.value, event);
  }

  const onClear = (event) => {
    changeEvent && changeEvent('', event);
  }

  return (
    <span className="ctr-input">
      <input
        type={type || 'text'}
        readOnly={Boolean(readOnly)}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        className={['control-input', error ? 'input-error' : '', customClass].join(' ')}
        onKeyUp={(e) => e.keyCode === 13 && onEnter(e)}
        onChange={(e) => onInputChange(e)} />
      {error && errorMessage ?
        <span className="error-message">
          {errorMessage}
        </span>
        : null}
      {
        showClearButton && value ?
          <i className="fa fa-close" onClick={(e) => onClear(e)}></i>
          : null
      }
    </span>
  );
}

Input.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  customClass: PropTypes.string,
  placeholder: PropTypes.string,
  changeEvent: PropTypes.func,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  showClearButton: PropTypes.bool
};
