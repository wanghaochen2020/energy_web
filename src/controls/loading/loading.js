import React from 'react';
import PropTypes from 'prop-types';
import './loading.scss';

export const Loading = ({ isFixed }) => {
  return (
    <div className={'ctr-loading' + (isFixed ? ' ctr-loading-fixed' : '')}>
      <img src="../../assets/images/loading.gif" alt="" />
    </div>
  );
};

Loading.propTypes = {
  isFixed: PropTypes.bool
};
