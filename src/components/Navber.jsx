import { BellOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Card, Input, Spin, Tag } from "antd";
import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import {
  useGetNotificationQuery,
  useReadNotificationMutation,
} from "../features/notification/notification";
import { useGetProfileQuery } from '../features/settings/settingApi';
import { baseURL } from "../utils/BaseURL";

const Navber = ({ toggleSidebar }) => {
  const path = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);
  const popupRef = useRef(null);
  const iconRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");

  const { data: profile } = useGetProfileQuery();

  const { data: notifications, refetch, isLoading } = useGetNotificationQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const [readNotification, { isLoading: updateLoading }] = useReadNotificationMutation();
  const [readAllNotifications] = useReadNotificationMutation();

  // Clear search on page reload/mount
  useEffect(() => {
    setSearchValue("");
    if (path.search && (path.pathname === "/institute-management" || path.pathname === "/earning")) {
      navigate(path.pathname, { replace: true });
    }
  }, []);

  useEffect(() => {
    setSearchValue("");
  }, [path.pathname]);

  useEffect(() => {
    socketRef.current = io(baseURL);

    socketRef.current.on("connect", () => {
      console.log("Connected to notification server");
    });

    const handleNewNotification = (notification) => {
      console.log("New notification received:", notification);
      refetch();
    };

    socketRef.current.on(`notification::${localStorage.getItem("adminLoginId")}`, handleNewNotification);

    return () => {
      if (socketRef.current) {
        socketRef.current.off("connect");
        socketRef.current.off(`notification::${localStorage.getItem("adminLoginId")}`, handleNewNotification);
        socketRef.current.disconnect();
      }
    };
  }, [refetch]);

  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value === "") {
      if (path.pathname === "/institute-management") {
        navigate("/institute-management");
      } else if (path.pathname === "/earning") {
        navigate("/earning");
      }
    } else {
      const searchQuery = encodeURIComponent(value);
      if (path.pathname === "/institute-management") {
        navigate(`/institute-management?search=${searchQuery}`);
      } else if (path.pathname === "/earning") {
        navigate(`/earning?search=${searchQuery}`);
      }
    }
  };

  const handleNotificationClick = async (notification) => {
    try {
      if (!notification.read) {
        await readNotification(notification._id).unwrap();
      }
      // setVisible(false);
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  const handleSeeDetailsClick = () => {
    setVisible(false);
    navigate("/notification");
  };

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

  const unreadCount = notifications?.data?.filter(notif => !notif.read).length || 0;

  const markAllAsRead = async () => {
    try {
      await readAllNotifications().unwrap();
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  return (
    <div className="flex items-center justify-between w-full px-4 py-3 bg-white shadow-sm lg:px-6">
      <div className="flex items-center lg:hidden">
        <button
          onClick={toggleSidebar}
          className="p-2 mr-2 text-gray-600 rounded-md hover:bg-gray-100 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {path.pathname === "/institute-management" || path.pathname === "/earning" ? (
        <div className="flex-1 mx-2 md:mx-4 lg:flex lg:items-center lg:justify-between lg:w-7/12">
          <Input
            size="large"
            onChange={handleSearch}
            value={searchValue}
            placeholder="Please Input your Order Number"
            className="w-full"
            style={{
              borderColor: "#336C79",
              color: "#333",
            }}
            suffix={
              <CiSearch className="text-2xl text-opacity-50 text-textPrimary" />
            }
          />
        </div>
      ) : (
        <div className="flex-1 lg:flex lg:items-center lg:justify-between lg:w-7/12"></div>
      )}

      <div className="relative z-40 flex items-center justify-end gap-3 md:gap-5">
        <div
          onClick={() => navigate("/settings")}
          className="cursor-pointer hidden sm:flex items-center"
        >
          <span className="mr-2 text-gray-700 hidden md:inline">
            Hello, <b>{profile?.data?.name || "User"}</b>
          </span>
          <Avatar
            src={profile?.data?.profileImage ? `${baseURL}${profile?.data?.profileImage}` : "https://i.ibb.co.com/QF3711qv/Frame-2147226793.png"}
            size={30}
          />
        </div>

        <Badge count={unreadCount} className="ml-3 cursor-pointer" onClick={() => setVisible(!visible)} ref={iconRef}>
          <BellOutlined className="text-2xl text-gray-600 transition duration-300 hover:text-gray-800" />
        </Badge>

        {visible && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute overflow-hidden bg-white border border-gray-200 shadow-xl right-0 top-12 w-80 sm:w-96 rounded-xl"
          >
            <Card
              title="Notifications"
              className="p-0"
              extra={
                unreadCount > 0 && (
                  <Button size="small" type="link" onClick={markAllAsRead}>
                    Mark all as read
                  </Button>
                )
              }
            >
              <div className="overflow-y-auto cursor-pointer max-h-96 custom-scrollbar">
                {loading || updateLoading ? (
                  <div className="flex justify-center py-4">
                    <Spin size="small" />
                  </div>
                ) : !notifications?.data || notifications.data.length === 0 ? (
                  <div className="text-center text-gray-500">
                    <div className="flex justify-center">
                      <img
                        src={"/images/notification.png"}
                        width={200}
                        height={200}
                        alt="Notification Icon"
                      />
                    </div>
                    <h3 className="font-bold text-lg leading-[26px] pb-[5px]">
                      There's no notifications
                    </h3>
                    <p className="pb-[5px]">
                      Your notifications will appear on this page.
                    </p>
                    <Button
                      onClick={handleSeeDetailsClick}
                      type="primary"
                      className="w-full"
                      size="middle"
                    >
                      See More
                    </Button>
                  </div>
                ) : (
                  notifications.data.slice(0, 5).map((notif, index) => (
                    <div
                      key={notif._id || index}
                      className={`flex items-start p-3 transition duration-300 border-b border-gray-100 hover:bg-gray-50 ${!notif.read ? "bg-blue-50" : ""
                        }`}
                      onClick={() => handleNotificationClick(notif)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <Tag color={getTypeColor(notif.type)}>
                            {notif.type}
                          </Tag>
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
                {notifications?.data && (
                  <div className="p-3 text-center border-t border-gray-100">
                    <Button type="primary" onClick={handleSeeDetailsClick}>
                      View All Notifications
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Navber;