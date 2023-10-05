import type { NotificationPlacement } from 'antd/es/notification/interface';

export interface IAlertProps {
  duration?: number;
  placement?: NotificationPlacement;
}

export enum AuthErrors {
  LogOut = 'Session Expired, Loging Out!',
  LoginNeeded = 'Previous Session Expired, Please login Again!',
}

export interface IAlert {
  id?: string;
  place?: string;
  message?: string;
  type?: string;
  color?: string;
  timeout?: number;
  url?: string;
}
