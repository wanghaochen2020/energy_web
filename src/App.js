import './App.css';
import { useState } from 'react';
import { AppActions, AppContext } from './context';
import { TextService } from './utils';
import { routes } from './router';

function App() {
  const [appState, setAppState] = useState({});
  const [controlsText, setControlsText] = useState(TextService.controls);
  const [messagesText, setMessagesText] = useState(TextService.messages);
  const dispatchEvent = (actionName, payload) => {
    switch (actionName) {
      case AppActions.setLanguage:
        TextService.setLanguage(payload.name, payload.text);
        setControlsText(TextService.controls);
        setMessagesText(TextService.messages);
        return;
      case AppActions.add:
        setAppState({ ...payload });
        return;
      case AppActions.update:
        setAppState([]);
        return;
      default: break;
    }
  }

  return (
    <div className="app-root">
      <AppContext.Provider value={{ ...appState, controlsText, messagesText, dispatchEvent }}>
        {routes}
      </AppContext.Provider>
    </div>
  );
}

export default App;
