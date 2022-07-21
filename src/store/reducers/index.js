import {combineReducers} from 'redux';
import nim from './nim';
import session from './session';
import msg from './msg';
import user from './user';
import extra from './extra';

export default combineReducers({
  user,
  nim,
  session,
  msg,
  extra,
});
