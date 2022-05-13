import React, { useContext, useState } from 'react';
import { Button, Input } from '../../controls';
import { UserBusiness } from '../../business';
import { DialogsService } from '../../utils';
import './password.scss';
import { AppContext } from '../../context';

export const Password = () => {
  const { controlsText, messagesText } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [originalPassword, setOriginalPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const onSave = () => {
    setLoading(true);
    setSubmitted(true);
    UserBusiness.modifyPassword(originalPassword, newPassword, passwordConfirm).then(() => {
      setLoading(false);
      setSubmitted(false);
      onReset();
      DialogsService.notify(messagesText.succeeded, 'success');
    }).catch(err => {
      setLoading(false);
      DialogsService.notify(err.message || err, 'error');
    });
  }

  const onReset = () => {
    setOriginalPassword('');
    setNewPassword('');
    setPasswordConfirm('');
    setSubmitted(false);
  }

  return (
    <div className="password-view">
      <div className="form-wrapper">
        <div className="form-password">
          <span className="form-label">{controlsText.originalPassword}：</span>
          <span className="form-value">
            <Input
              type="password"
              changeEvent={(val) => setOriginalPassword(val)}
              placeholder={controlsText.originalPassword}
              errorMessage={messagesText.required(controlsText.originalPassword)}
              error={submitted && !originalPassword}></Input>
          </span>
          <span className="form-label">{controlsText.newPassword}：</span>
          <span className="form-value">
            <Input
              type="password"
              onChange={(val) => setNewPassword(val)}
              placeholder={controlsText.newPassword}
              errorMessage={messagesText.required(controlsText.newPassword)}
              error={submitted && !newPassword}></Input>
          </span>
          <span className="form-label">{controlsText.passwordConfirm}：</span>
          <span className="form-value">
            <Input
              type="password"
              onChange={(val) => setPasswordConfirm(val)}
              onEnter={onSave}
              placeholder={controlsText.passwordConfirm}
              errorMessage={messagesText.required(controlsText.passwordConfirm)}
              error={submitted && !passwordConfirm}></Input>
          </span>
        </div>
        <div className="button-row">
          <Button
            state={loading ? 3 : 1}
            text={controlsText.save}
            clickEvent={onSave}></Button>
          <Button
            type="secondary"
            text={controlsText.reset}
            clickEvent={onReset}></Button>
        </div>
      </div>
    </div>
  );
}
