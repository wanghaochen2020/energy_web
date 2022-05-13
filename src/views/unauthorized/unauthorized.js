import React, { useContext } from 'react';
import { AppContext } from '../../context';
import './unauthorized.scss';

export const Unauthorized = () => {
  const { messagesText } = useContext(AppContext);

  return (
    <div className="unauthorized-view">
      {messagesText.unauthorized}
    </div>
  );
}
