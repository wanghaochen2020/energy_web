import React, { useContext, useState } from 'react';
import { Button, Input } from '../../controls';
import { DialogsService } from '../../utils';
import { UserBusiness, BaseInfoService } from '../../business';
import { AppContext } from '../../context';
import './login.scss';
import { useNavigate } from 'react-router';
import { routeNames } from '../../router';

export const Login = () => {
  const navigate = useNavigate();
  const { controlsText, messagesText } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState(BaseInfoService.getUser()?.loginName || '');

  const login = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    setSubmitted(true);
    UserBusiness.login(userName, password).then((data) => {
      setLoading(false);
      if (data.code !== 200) {
        setSubmitted(false);
        DialogsService.notify(data.msg || data, 'error');
      } else {
        if (window.history.state?.usr?.redirectUrl) {
          // RouterService.replace(window.history.state.usr.redirectUrl);
        } else {
          navigate(routeNames.basicMap);
        }
      }
    }).catch((err) => {
      setLoading(false);
      setSubmitted(false);
      DialogsService.notify(err.msg || err, 'error');
    });
  }

  const reset = () => {
    setUserName('');
    setPassword('');
    setSubmitted(false);
  }

  return (
    <div className="login-view">
      <div className="form-container">
        <div className="form-container-content">
          <div className="slogan">{messagesText.siteName}</div>
          <div className="form-cols-2 login-form">
            <span className="form-label">{controlsText.userName}：</span>
            <span className="form-value">
              <Input
                value={userName}
                changeEvent={(val) => setUserName(val)}
                placeholder={controlsText.userName}
                errorMessage={messagesText.required(controlsText.userName)}
                error={submitted && !userName}></Input>
            </span>
            <span className="form-label">{controlsText.password}：</span>
            <span className="form-value">
              <Input
                type="password"
                value={password}
                changeEvent={(val) => setPassword(val)}
                onEnter={login}
                placeholder={controlsText.password}
                errorMessage={messagesText.required(controlsText.password)}
                error={submitted && !password}></Input>
            </span>
          </div>
          <div className="button-row">
            <Button
              state={loading ? 3 : 1}
              text={controlsText.login}
              clickEvent={() => login()}></Button>
            <Button
              state={loading ? 2 : 1}
              text={controlsText.reset}
              clickEvent={reset}></Button>
          </div>
        </div>
        <div className="form-container-bg"></div>
      </div>
      <div className="copyright">Copyright</div>
    </div>
  );
}
