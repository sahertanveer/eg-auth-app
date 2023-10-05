import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeAlert, AlertSelector } from '../../../redux/reducers/alert';
import { notification, Button } from 'antd';
import {
  CheckCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';

const AlertComponent: React.FC = () => {
  const dispatch = useDispatch();
  const alerts = useSelector(AlertSelector);

  useEffect(() => {
    alerts?.forEach((alert: any) => {
      const { id, type, message, url } = alert;

      const icon =
        type === 'success' ? (
          <CheckCircleOutlined style={{ color: '#52c41a' }} />
        ) : type === 'info' ? (
          <InfoCircleOutlined style={{ color: '#1890ff' }} />
        ) : type === 'warning' ? (
          <WarningOutlined style={{ color: '#faad14' }} />
        ) : null;

      const closeBtn = (
        <Button
          type="primary"
          size="small"
          onClick={() => {
            dispatch(removeAlert({ id }));
          }}
        >
          View Details
        </Button>
      );

      notification.open({
        message: icon,
        description: message,
        btn: url ? closeBtn : null,
        key: String(id),
        onClose: () => {
          dispatch(removeAlert({ id }));
        },
      });
    });
  }, [alerts, dispatch]);

  return null;
};

export default AlertComponent;
