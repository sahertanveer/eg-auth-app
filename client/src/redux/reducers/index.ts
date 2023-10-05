import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import alertReducer from './alert';

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
});

export default rootReducer;
