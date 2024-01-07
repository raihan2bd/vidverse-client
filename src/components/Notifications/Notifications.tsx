"use client";

import Button from "@/components/UI/Button";
import { useGlobalState } from "@/context/store";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IoMdNotifications } from "react-icons/io";
import NotificationItem from "./NotificationItem";
import { useRouter } from "next/navigation";
import axios from "axios";
import { errMsgWithStatus } from "@/utils/responseMsg";
import Spinner from "../UI/Spinner";
import LoadMoreNotifications from "./LoadMoreNotifications";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Notifications = ({ token }: { token: string | undefined }) => {
  const [notifications, setNotifications] = useState<NotificationType[] | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { totalNotification, newNotification } = useGlobalState();
  const [has_next_page, setHasNextPage] = useState(false);
  const [page, setPage] = useState(0);

  const { setError } = useGlobalState();
  const router = useRouter();

  const dismissHandler = async (id: number) => {
    // Todo: dismiss notification
    setShowNotification(false);
  };

  const fetchNotifications = useCallback(
    async (
      setPending: Dispatch<SetStateAction<boolean>> = setLoading
    ) => {
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        setPending(true);
        const res = await axios.get(
          `${API_URL}/api/v1/notifications?page=${page + 1}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (Array.isArray(res.data.notifications)) {
          if (notifications && page >= 1) {
            setNotifications([...notifications, ...res.data.notifications]);
          } else {
            setNotifications(res.data.notifications);
          }
          setHasNextPage(res.data.has_next_page);
          setPage(res.data.page);
        } else {
          setNotifications([]);
          setHasNextPage(false);
        }
      } catch (error: any) {
        console.log(error);
        const { errMsg, status } = errMsgWithStatus(error);
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
        setPending(false);
      }
    },
    [loading, setLoading, setError, router, token, setHasNextPage, setPage, setNotifications, notifications, page]
  );

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
            thumb={notification.thumb}
            sender_avatar={notification.sender_avatar}
            is_read={notification.is_read? true : false}
            createdAt={notification.created_at}
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
          // disabled translate
          style={{transform: 'none'}}
          className={`block rounded-full overflow-hidden focus:outline-none text-2xl ${showNotification ? " bg-orange-400" : " bg-transparent"}`}
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
    return (
      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
    );
  }, [totalNotification, showNotification]);

  const pageContent = useMemo(() => {
    return (
      <div className="relative p-2 flex justify-center items-center">
        {showNotification && (
          <ul className="flex flex-col gap-1 items-center list-none w-[350px] max-w-[100vw] h-[calc(100vh-7rem)] overflow-y-scroll fixed z-1 top-[63px] bg-violet-500/95 right-0 md:right-[2rem] rounded-lg border border-black/50 shadow-lg m-1 no-scrollbar backdrop-blur-[2px]">
            {notificationItems}
            {has_next_page && <LoadMoreNotifications fetchNotifications={fetchNotifications} />}
          </ul>
        )}
        {notificationBadge}
      </div>
    );
  }, [notifications, showNotification, totalNotification, has_next_page, fetchNotifications, page]);

  useEffect(() => {
    if (showNotification && !notifications) {
      fetchNotifications();
    }
  }, [showNotification, fetchNotifications]);

  return pageContent;
};

export default Notifications;
