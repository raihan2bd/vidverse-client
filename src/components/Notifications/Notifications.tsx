"use client";

import Button from "@/components/UI/Button";
import { useGlobalState } from "@/context/store";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import NotificationItem from "./NotificationItem";
import { useRouter } from "next/navigation";
import axios from "axios";
import { errMsgWithStatus } from "@/utils/responseMsg";
import Spinner from "../UI/Spinner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Notifications = ({token}: {token: string | undefined}) => {
  const [notifications, setNotifications] = useState<NotificationType[]| null >(null)
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const {totalNotification, newNotification} = useGlobalState();

  const {setError} = useGlobalState();
  const router = useRouter();

  const dismissHandler = async (id: number) => {
    // Todo: dismiss notification
    setShowNotification(false)
  };

  const fetchNotifications =useCallback(async () => {
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/v1/notifications`, {
        headers: {
          Authorization: token,
        },
      });
      if (Array.isArray(res.data.notifications)) {
        setNotifications(res.data.notifications);
      } else {
        setNotifications([]);
      }
    } catch (error: any) {
      console.log(error);
      const {errMsg, status} = errMsgWithStatus(error);
      switch (status) {
        case 401:   
          router.push("/login");
          setError(errMsg);
          break;
        default:
          setError(errMsg);
          break;
      }
    } finally {
      setLoading(false);
    }

  }, [])

  const notificationItems = useMemo(() => {
    if (loading) {
      return (
        <li className="text-gray-500 text-center item-center h-full my-auto">
          <Spinner />
        </li>
      );
    }
    if (notifications && notifications.length > 0) {

      return notifications.map((notification) => {
        const notificationType = notification.type
          ? notification.type
          : notification.channel_id
          ? "subscribed to"
          : notification.video_id
          ? notification.like_id
            ? "liked"
            : "commented on"
          : "";

        return (
          <NotificationItem
            key={notification.id}
            onDismiss={() => dismissHandler(notification.id)}
            title={`${notification.sender_name} ${notificationType} your ${
              notification.channel_id ? "channel" : "video"
            }`}
            link={
              notification.video_id
                ? `/videos/${notification.video_id}`
                : `/channels/${notification.channel_id}`
            }
          />
        );
      });
    }
    return (
      <p className="text-gray-500 text-center item-center h-full my-auto">
        No Notifications Found
      </p>
    );
  }, [notifications, loading]);

  const notificationBadge = useMemo(() => {
    if (totalNotification !== null) {
      return (
        <Button
            type="button"
            className="block rounded-full overflow-hidden focus:outline-none text-2xl"
            onClick={() => setShowNotification(!showNotification)}
          >
            <IoMdNotifications />
            {totalNotification > 0 && (
          <span className="absolute top-[2px] right-[2px] bg-red-500 text-white text-xs rounded-full px-1">
            {totalNotification}
          </span>
        )}
          </Button>
      );
    }
    return <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
  }, [totalNotification, showNotification]);


  const pageContent = useMemo(() => {
    return (
      <div className="relative p-2 flex justify-center items-center">
        {showNotification && (
          <ul className="flex flex-col gap-2 items-center list-none w-[350px] min-h-[200px] absolute z-1 top-[52px] bg-white right-[0.5rem] rounded-lg border border-orange-300 py-2">
            {notificationItems}
          </ul>
        )}
        {notificationBadge}
      </div>
    );
  }, [notifications, showNotification, totalNotification]);

  useEffect(() => {
    if (showNotification ) {
      fetchNotifications()
    }
  }, [totalNotification]);

  return pageContent;
};

export default Notifications;
