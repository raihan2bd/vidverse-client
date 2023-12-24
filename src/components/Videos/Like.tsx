"use client";

import React, {useState} from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useGlobalState } from "@/context/store";
import axios from "axios";
import Button from "../UI/Button";
import { GoThumbsup, GoThumbsdown  } from "react-icons/go";

type Props = {
  likesCount: number;
  is_liked: boolean;
  video_id: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;


const Like = ({ likesCount, is_liked, video_id }: Props) => {
  const { data: session } = useSession();
  const { setError } = useGlobalState();
  const router = useRouter();
  const pathName = usePathname();
  const [likes, setLikes] = useState(likesCount);
  const [isLiked, setIsLiked] = useState(is_liked);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (!session || !session.token || !session.user) {
      router.push(`/login?callback=${pathName}`);
      return;
    }

    const token = session.token;
    try {
      
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/v1/likes/${video_id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      
      });

      if (res.data?.like_id) {
        setLikes((prev) => prev + 1);
        setIsLiked(true);
      } else {
        setLikes((prev) => prev -1 >= 0 ? prev - 1 : 0);
        setIsLiked(false);
      }
    } catch (error: any) {
      const messge =
        ((error.response && error.response.data) && error.response.data) || error.message || "Something went wrong";
      const status = error.response.data.status || error.status || 500;
      switch (status) {
        case 401:
          signOut();
          setError(messge);
          router.push(`/login?callbackUrl=${pathName}`);
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

    }

    return (
      <Button disabled={loading} type="button" onClick={handleLike} className="text-sm flex gap-1 items-center border border-1 border-violet-800 text-violet-800 p-2 rounded-2xl hover:bg-violet-800 hover:text-white"><span className="text-xl">{isLiked ? <GoThumbsdown /> : <GoThumbsup />}</span> {likes}</Button>
    )

  };


  export default Like;