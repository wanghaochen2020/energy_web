import React, { useEffect, useState } from 'react';
import { deselectItems, checkPath } from '../../../controls';
import { SystemBusiness } from '../../../business';
import { Link} from "react-router-dom";
import './menus.scss';
// import { useLocation } from 'react-router';

export const Menus = () => {
  const [menus, setMenus] = useState([]);
  // const location = useLocation();

  // useEffect(() => {
  //   deselectItems(menus);
  //   checkPath(location.pathname, menus, null, [], true);
  //   setMenus(menus);
  // }, [location.pathname, menus]);

  useEffect(() => {
    const systemMenus = SystemBusiness.getSystemMenus() || [];
    checkPath(window.location.pathname, systemMenus, null, [], true);
    setMenus(systemMenus);
  }, []);

  const onClickMenu = (menu) => {
    if (!menu.children?.length) {
      deselectItems(menus);
      menu.selected = true;
    }

    if (menu.expanded) {
      menu.expanded = false;
    } else {
      menus.forEach((item) => item.expanded = false);
      menu.expanded = true;
    }
    setMenus([...menus]);
  }

  const onSelectTreeItem = (menu) => {
    deselectItems(menus, false);
    menu.selected = true;
    setMenus([...menus]);
  }

  return (
    <div className="menus-wrapper">
      <div className="menu-top"><i className="fa fa-bars"></i></div>
      <div className="menus-box">
        <div className="menus-container">
          {
            (menus || []).map((menu, index) =>
            <div key={menu.id || index} className="menu-item">
              <div className="menu-item-name" onClick={() => onClickMenu(menu)}>
                <span className={(menu.selected ? 'menu-selected ' : '') + "menu-item-text"} title={menu.name}>
                  <i className={(menu.icon || 'fa fa-folder-o') + " menu-icon"} style={{ color: menu.iconColor || '#677199' }}></i>
                  {menu.url ? <Link to={menu.url}>{menu.name}</Link> : menu.name}
                </span>
                <i className={"fa " + (menu.expanded && menu.children?.length ? 'fa-sort-asc' : 'fa-sort-desc')}></i>
              </div>
              {
                (menu.children || []).length > 0 ?
                  <div className={(menu.expanded ? '' : 'hidden ') + "sub-items"}>
                    {
                      menu.children.map((subMenu, subIndex) => <div
                        key={subIndex}
                        onClick={() => onSelectTreeItem(subMenu)}
                        className={"sub-menu-item" + (subMenu.selected ? ' sub-menu-item-selected' : '')}>
                        <Link to={subMenu.url} >{subMenu.name}</Link>
                      </div>)
                    }
                  </div> : null
              }
            </div>)
          }
        </div>
      </div>
    </div>
  );
}
