"use client";

import { useState } from "react";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useGlobalState } from "@/context/store";
import Button from "../UI/Button";

type Props = {
  is_subscribed: boolean;
  channel_id: number;
  onHandleSubscribed?: (subType: number) => void
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Subscribe = ({ is_subscribed, channel_id, onHandleSubscribed }: Props) => {
  const [isSubscribed, setIsSubscribe] = useState<boolean>(is_subscribed? true: false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const { setError } = useGlobalState();
  const pathName = usePathname();

  const handleSubscribe = async () => {
    if (!session || !session.user || !session.token) {
      router.push(`/login?callback=${pathName}`);
      return;
    }
    setLoading(true);
    const token = session?.token || "";
    try {
      await axios.get(`${API_URL}/api/v1/subscribed_channels/${channel_id}`, {
        headers: {
          Authorization: token,
        },
      });
      if (onHandleSubscribed) {
        onHandleSubscribed(isSubscribed? 0 : 1);
      }
      setIsSubscribe((prev) => !prev);
    } catch (error: any) {
      const messge =
        error.response.data.error || error.message || "Something went wrong";
      const status = error.response.data.status || error.status || 500;
      switch (status) {
        case 401:
          signOut();
          setError(messge);
          router.push(`/login?callback=${pathName}`);
          break;
        case 403:
          setError(messge);
          router.push("/access-denied");
          break;
        default:
          setError(messge);
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  const btnClass = isSubscribed ? "border-gray-500 text-gray-600" : "bg-red-600 text-white border-red-500"

  return (
    <Button
      className={`text-sm p-2 rounded-2xl hover:text-red-600 hover:bg-white border border-1 border-red-5000 overflow-hidden ${btnClass} transition-all duration-300 ease-in-out`}
      onClick={handleSubscribe}
      disabled={loading}
    >
      {loading? "Loading..." : isSubscribed? "Subscribed" : "Subscribe"}
    </Button>
  );
};

export default Subscribe;
