import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import deliveryMan from './deliveryMan/reducer';

export default combineReducers({
  auth,
  user,
  deliveryMan,
});
