import { combineReducers } from '@reduxjs/toolkit';

import user from './userSlice';
import auth from './authSlice';

const rootReducers = combineReducers({
  user,
  auth,
});

export default rootReducers;
