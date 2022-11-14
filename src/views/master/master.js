import React, { useCallback, useContext, useEffect, useState } from 'react';
import { BaseInfoService } from '../../business';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Menus } from './menus/menus';
import { routeNames } from '../../router';
import { AppContext } from '../../context';
import { PopupMenu } from '../../controls';
import './master.scss';

export const Master = () => {
  const [userMenus, setUserMenus] = useState([]);
  const { controlsText, messagesText } = useContext(AppContext);
  const navigate = useNavigate();

  const init = useCallback(() => {
    setUserMenus([
      {
        name: controlsText.logout, click: () => {
          BaseInfoService.clearToken();
          BaseInfoService.clearAuthorization();
          navigate(routeNames.login);
        }
      }
    ]);
  }, [controlsText, navigate]);

  useEffect(() => {
    init();
  }, [init]);

  return <div className="master-box" style={{backgroundImage: "url('/assets/images/top.png'), url('/assets/images/main_bg.png')"}}>
    <div className="navigation">
      <span className="navigation-title">
        {messagesText.siteName}
      </span>
      <span className="navigation-right">
        <PopupMenu items={userMenus} position="top-right" customClass="popup-wrapper">
          <span className="display-name">{controlsText.demoUserName}</span>
          <i className="fa fa-sort-desc"></i>
        </PopupMenu>
        <img className="icon-head" src={'/assets/images/male.png'} alt="" />
      </span>
    </div>
    <div className="main">
      <div className="main-left">
        <Menus />
      </div>
      <div className="router-view-wrapper">
        <div className="router-view" >
          <Outlet />
        </div>
      </div>
    </div>
  </div>;
}
