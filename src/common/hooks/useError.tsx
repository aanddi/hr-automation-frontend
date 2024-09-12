import { notification } from 'antd';

interface NotificationProps {
  title: string;

  description: string;

  duration?: number;
}

const openNotification = ({
  duration = 0,

  description,

  title,
}: NotificationProps) => {
  notification.error({ message: title, description, duration });
};

export const useNotifications = () => (args: NotificationProps) => openNotification(args);
