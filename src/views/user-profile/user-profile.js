import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ComUserProfile } from '../../components';
import { Loading } from '../../controls';
import { BaseInfoService, UserBusiness } from '../../business';
import { DialogsService } from '../../utils';
import { AppContext } from '../../context';
import './user-profile.scss';

export const UserProfile = () => {
  const { messagesText } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState();

  const getUserProfile = useCallback(() => {
    setLoading(true);

    const localUser = BaseInfoService.getUser();
    if (localUser) {
      UserBusiness.get(localUser.userId).then((user) => {
        setLoading(false);
        setUserInfo(user);
      }).catch(err => {
        setLoading(false);
        DialogsService.notify(err, 'error');
      });
    } else {
      DialogsService.notify(messagesText.invalidParameters, 'error');
      setLoading(false);
    }
  }, [messagesText]);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  return (
    <div className="user-profile-view">
      {
        loading ? <Loading isFixed={true}></Loading> :
          <ComUserProfile className="user-profile" item={userInfo}></ComUserProfile>
      }
    </div>
  );
}
