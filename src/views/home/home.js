import React, { useEffect, useState } from 'react';
import { SystemBusiness } from '../../business';
import { StringService } from '../../utils';
import './home.scss';

export const Home = () => {
  const [readMeContent, setReadMeContent] = useState([]);

  useEffect(() => {
    getReadMe();
  }, []);

  const getReadMe = () => {
    SystemBusiness.getReadMe().then((data) => {
      setReadMeContent(StringService.markDownToHTML(data));
    });
  }

  return (
    <div className="home-view">
      <div className="content-wrapper">
        {
          readMeContent.map((item, index) =>
            <div dangerouslySetInnerHTML={{ __html: item }} key={index}></div>
          )
        }
      </div>
    </div>
  );
}
