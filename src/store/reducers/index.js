import {combineReducers} from 'redux';
import nim from './nim';
import session from './session';
import msg from './msg';

export default combineReducers({
  nim,
  session,
  msg,
});
