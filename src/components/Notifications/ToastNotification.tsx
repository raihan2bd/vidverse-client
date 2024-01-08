import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useGlobalState } from "@/context/store";
import useSound from "use-sound";
import axios from "axios";
import NotificationItem from "./NotificationItem";
import { errMsgWithStatus } from "@/utils/responseMsg";
import notificationSound from "../../../public/sounds/notification.mp3";
import { IoMdCloseCircle } from "react-icons/io";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ToastNotification = ({ token }: { token: string | undefined }) => {
  const [play] = useSound(notificationSound);
  const { newNotification, clearNewNotification, setError } = useGlobalState();
  const router = useRouter();

  const dismissHandler = useCallback(
    async (id: number) => {
      if (!token) {
        clearNewNotification();
        setError("You are not logged in");
        router.push("/login");
        return;
      }

      if (newNotification?.id) {
        clearNewNotification();
        return;
      }

      try {
        await axios.patch(
          `${API_URL}/api/v1/notifications/${newNotification?.id}`,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );
      } catch (error: any) {
        const { errMsg, status } = errMsgWithStatus(error);
        switch (status) {
          case 401:
            signOut();
            router.push("/login");
            setError(errMsg);
            break;
          default:
            break;
        }
      } finally {
        clearNewNotification();
      }
    },
    [clearNewNotification, setError, router, token, newNotification?.id]
  );

  const notificationType = useMemo(() => {
    return (
      newNotification &&
      (newNotification.type
        ? newNotification.type
        : newNotification.channel_id
        ? "subscribed to"
        : newNotification.video_id
        ? newNotification.like_id
          ? "liked"
          : "commented on"
        : "")
    );
  }, [newNotification]);

  const pageContent = useMemo(() => {
    if (!newNotification) return null;
    return (
      <div className="fixed bottom-[2rem] bg-violet-400/95 right-0 z-50 w-[350px] max-w-[100%] m-2 shadow-md text-violet-950 flex justify-between p-1 items-center gap-1">
        <NotificationItem
          onDismiss={() => dismissHandler(newNotification.id)}
          title={`${newNotification.sender_name} ${notificationType} your ${
            newNotification.channel_id ? "channel" : "video"
          }`}
          link={
            newNotification.video_id
              ? `/videos/${newNotification.video_id}`
              : `/channels/${newNotification.channel_id}`
          }
          thumb={newNotification.thumb}
          sender_avatar={newNotification.sender_avatar}
          is_read={newNotification.is_read ? true : false}
          createdAt={newNotification.created_at}
        />
        <button
          className="bg-red-500 p-1 rounded-sm text-white"
          onClick={() => {
            clearNewNotification();
          }}
        >
          <IoMdCloseCircle />
        </button>
      </div>
    );
  }, [newNotification, notificationType, dismissHandler, clearNewNotification]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (newNotification) {
      play();
      timeout = setTimeout(() => {
        // reset the notification
        clearNewNotification();
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [newNotification, play]);

  return pageContent;
};

export default ToastNotification;
