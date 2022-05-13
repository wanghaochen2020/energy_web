import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../context';
import './user-profile.scss';

export const ComUserProfile = ({ item }) => {
  const { controlsText } = useContext(AppContext);

  if (!item) {
    return null;
  }

  return (
    <div className="com-user-profile">
      <div className="user-profile">
        <span className="form-label">{controlsText.loginName}：</span>
        <span className="form-value">
          {item.loginName}
        </span>

        <span className="form-label">{controlsText.fullName}：</span>
        <span className="form-value">
          {item.fullName}
        </span>

        <span className="form-label">{controlsText.birthDate}：</span>
        <span className="form-value">
          {item.birthDate}
        </span>

        <span className="form-label">{controlsText.cellphone}：</span>
        <span className="form-value">
          {item.cellphone}
        </span>

        <span className="form-label">{controlsText.email}：</span>
        <span className="form-value">
          {item.email}
        </span>

        <span className="form-label">{controlsText.roles}：</span>
        <span className="form-value">
          {item.roles}
        </span>

        <span className="form-label">{controlsText.remark}：</span>
        <span className="form-value">
          {item.remark}
        </span>
      </div>
    </div>
  );
}

ComUserProfile.propTypes = {
  item: PropTypes.any
};