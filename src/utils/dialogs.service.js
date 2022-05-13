export class DialogsService {
  /**
   * 
   * @param {*} type  'success' | 'warning' | 'info' | 'error'
   * @param {*} delay 
   * @returns 
   */
  static notify(msg, type = 'info', delay = 3000) {
    if (!msg) {
      return;
    }

    const notificationId = 'AB5EE3A9CE0994F83D061B1646B5283F';
    const notificaitonStyle = `position:fixed;max-height:400px;overflow:auto;width:300px;left:calc(50% - 150px);top:30px;z-index:10000`;
    const messageStyle = `width:100%;padding:10px 15px;font-size:13px;border-radius:4px;text-align:left;
      position:relative;margin-bottom:10px;animation:fadeleftIn .4s;animation-name: popupAnimation;
      white-space:normal;overflow:auto;word-break: break-word;`;
    const closeButtonStyle = 'position:absolute;right:3px;top:-2px;color:#666;display:inline-block;font-size:18px;font-weight:bold;cursor:pointer;';
    const getMessageStyle = (type) => {
      switch (type) {
        case 'success': return messageStyle + 'color:rgb(69,159,0);background-color:rgb(171,245,171,0.8)';
        case 'warning': return messageStyle + 'color:#9d8a03;background-color:rgb(235,223,136,0.8);';
        case 'info': return messageStyle + 'color:#000;background-color:rgb(227,225,214,0.8);';
        case 'error': return messageStyle + 'color:#f34d4d;background-color:rgb(246,200,200,0.95);';
        default: return messageStyle + 'color:#000;background-color:rgb(227,225,214,0.8);';
      }
    };

    let box = document.getElementById(notificationId);
    if (!box) {
      box = document.createElement('div');
      box.id = notificationId;
      box.style.cssText = notificaitonStyle;
      document.body.appendChild(box);
    }
    
    delay = delay < 1000 ? 1000 : (delay > 60000 ? 60000 : delay);
    const msgBox = document.createElement('div');
    const closeButton = document.createElement('span');
    let autoRemoveTimer = setTimeout(() => {
      try {
        box.removeChild(msgBox);
      } catch(err) {
        console.log(err);
      }
    }, delay);

    msgBox.style.cssText = getMessageStyle(type);
    msgBox.innerText = msg;
    msgBox.onmouseover = () => window.clearTimeout(autoRemoveTimer);
    msgBox.onmouseout = () => {
      autoRemoveTimer = setTimeout(() => {
        try {
          box.removeChild(msgBox);
        } catch(err) {
          console.log(err);
        }
      }, delay);
    };
    closeButton.style.cssText = closeButtonStyle;
    closeButton.innerText = '×';
    closeButton.onclick = () => {
      try {
        window.clearTimeout(autoRemoveTimer);
        box.removeChild(msgBox);
      } catch(err) {
        console.log(err);
      }
    };
    msgBox.appendChild(closeButton);
    box.appendChild(msgBox);
  }
}
