import { notification } from "antd";
import type { NotificationArgsProps } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";
type NotificationPlacement = NotificationArgsProps["placement"];

const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    placement: NotificationPlacement = "bottomRight"
  ) => {
    api[type]({
      message,
      placement,
    });
  };

  return { openNotificationWithIcon, contextHolder };
};

export default useNotification;
