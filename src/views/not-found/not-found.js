import React, { useContext } from 'react';
import { AppContext } from '../../context';
import './not-found.scss';

export const NotFound = () => {
  const { messagesText } = useContext(AppContext);

  return (
    <div className="not-found-view">
      {messagesText.notFound}
    </div>
  );
}
