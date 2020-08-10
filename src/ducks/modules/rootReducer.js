import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import sessions from './sessions';
import activeSessionId from './session';
import activeSessionWorkers from './sessionWorkers';
import deviceSettings from './deviceSettings';
import importProtocol from './importProtocol';
import installedProtocols from './installedProtocols';
import dialogs from './dialogs';
import search from './search';
import ui from './ui';
import update from './update';
import pairedServer from './pairedServer';
import { actionTypes as resetActionTypes } from './reset';

const appReducer = combineReducers({
  router: routerReducer,
  form: formReducer,
  activeSessionId,
  activeSessionWorkers,
  sessions,
  deviceSettings,
  importProtocol,
  installedProtocols,
  dialogs,
  search,
  ui,
  update,
  pairedServer,
});

const rootReducer = (state, action) => {
  let currentState = state;

  if (action.type === resetActionTypes.RESET_STATE) {
    currentState = undefined;
  }

  return appReducer(currentState, action);
};

export default rootReducer;
