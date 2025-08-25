import { CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, message, Modal, Spin, Tag } from "antd";
import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import {
  useDeleteAllNotificationsMutation,
  useGetNotificationQuery,
  useReadNotificationMutation
} from '../features/notification/notification';
import { baseURL } from "../utils/BaseURL";

const { confirm } = Modal;

const NotificationPopup = () => {
  const path = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const socketRef = useRef(null);

  const {
    data: notifications,
    refetch,
    isLoading
  } = useGetNotificationQuery();

  const [readNotification] = useReadNotificationMutation();
  const [delelteNotification, { isLoading: deleteLoading }] = useDeleteAllNotificationsMutation();

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(baseURL);

    socketRef.current.on("connect", () => {
      console.log("Connected to notification server");
    });

    const handleNewNotification = (notification) => {
      console.log("New notification received:", notification);
      refetch();
    };

    // Listen for notifications
    socketRef.current.on(
      `notification::${localStorage.getItem("adminLoginId")}`,
      handleNewNotification
    );

    return () => {
      if (socketRef.current) {
        socketRef.current.off("connect");
        socketRef.current.off(
          `notification::${localStorage.getItem("adminLoginId")}`,
          handleNewNotification
        );
        socketRef.current.disconnect();
      }
    };
  }, [refetch]);

  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading]);

  const handleNotificationClick = async (notification) => {
    try {
      if (!notification.read) {
        await readNotification(notification._id).unwrap();
      }
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await readAllNotifications().unwrap();
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete all notifications?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete All',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        handleDeleteAllNotification();
      },
      onCancel() {
        console.log('Cancelled delete all notifications');
      },
    });
  };

  const handleDeleteAllNotification = async () => {
    try {
      const response = await delelteNotification().unwrap()
      console.log(response)
      message.success(response.data.message)
    } catch (error) {
      console.log(error.message)
      message.error(error?.data?.message)
    }
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return "Just now";
    const bangladeshTime = moment(timestamp).add(6, 'hours');
    return bangladeshTime.fromNow();
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "ALERT":
        return "red";
      case "INFO":
        return "blue";
      case "SUCCESS":
        return "green";
      default:
        return "gray";
    }
  };

  // Calculate unread count
  const unreadCount = notifications?.data?.filter(notif => !notif.read).length || 0;

  return (
    <div className="flex items-center justify-between pt-10">

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="w-full p-10 bg-white border border-gray-200 rounded-xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg leading-[26px]">Notifications</h3>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button size="small" type="link" onClick={handleMarkAllAsRead}>
                Mark all as read
              </Button>
            )}
            {
              notifications?.length > 0 && <Button
                size="small"
                danger
                onClick={showDeleteConfirm}
                loading={deleteLoading}
              >
                Delete All Notifications
              </Button>
            }
          </div>
        </div>

        <div className="w-full cursor-pointer">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <Spin size="default" />
            </div>
          ) : !notifications?.data || notifications.data.length === 0 ? (
            <div className="text-center text-gray-500">
              <div className="flex justify-center">
                <img
                  src={"/images/notification.png"}
                  width={100}
                  height={100}
                  alt="Notification Icon"
                />
              </div>
              <h3 className="font-bold text-lg leading-[26px] pb-[5px]">
                There's no notifications
              </h3>
              <p className="pb-[5px]">
                Your notifications will appear on this page.
              </p>
            </div>
          ) : (
            notifications.data.map((notif, index) => (
              <div
                key={notif._id || index}
                className={`flex items-start p-3 transition duration-300 border-b border-gray-100 hover:bg-gray-50 ${!notif.read ? "bg-blue-50" : ""
                  }`}
                onClick={() => handleNotificationClick(notif)}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <Tag color={getTypeColor(notif.type)}>{notif.type}</Tag>
                    <span className="ml-auto text-xs text-gray-500">
                      {formatTime(notif.createdAt)}
                    </span>
                  </div>
                  <h4 className={`text-sm font-medium ${!notif.read ? "text-blue-800" : "text-gray-800"}`}>
                    {notif.title}
                  </h4>
                  <p
                    className={`text-sm mt-1 ${!notif.read ? "font-medium" : "text-gray-600"}`}
                  >
                    {notif.message}
                  </p>
                  {notif.read && (
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <CheckCircleOutlined className="mr-1" /> Read
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default NotificationPopup;