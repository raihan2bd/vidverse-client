"use client";

import React, { useMemo, useState } from "react";
import Like from "./Like";
import Subscribe from "./Subscribe";
import Link from "next/link";
import Image from 'next/image'
import defaultThumb from "../../../public/images/default-thumb.jpg";

type PropTypes = {
  channel_id: number;
  channel_title: string;
  channel_logo: string;
  total_subscriber: number;
  is_subscribed: boolean;
  likes: number;
  is_liked: boolean;
  video_id: number;
};
const VideoChannelInfo = ({
  channel_id,
  channel_title,
  total_subscriber,
  is_subscribed,
  channel_logo,
  likes,
  is_liked,
  video_id,
}: PropTypes) => {
  const [subscribers, setSubscribers] = useState(total_subscriber);

  const LikeContent = useMemo(() => {
    return <Like is_liked={is_liked} likesCount={likes} video_id={video_id} />;
  }, [is_liked, likes, video_id]);

  const SubscribedBtnContent = useMemo(() => {
    return (
      <Subscribe
        is_subscribed={is_subscribed}
        channel_id={channel_id}
        onHandleSubscribed={(subType) => {
          if (subType === 1) {
            setSubscribers((prev) => prev + 1);
          } else {
            setSubscribers((prev) => prev - 1);
          }
        }}
      />
    );
  }, [setSubscribers, is_subscribed, channel_id]);

  return (
    <div className="flex gap-2 items-center justify-between p-4 bg-slate-100">
      <div className="flex gap-3 items-center text-sm">
        <div className="relative w-[42px] h-[42px] rounded-full">
        <Image
          className="rounded-full border border-violet-800 p-[2px] w-full h-full z-[1]"
          src={channel_logo ? channel_logo : defaultThumb.src}
         sizes={'42px'}
         fill={true}
         priority={true}
         alt={channel_title}
        />
        </div>
        <Link
          className="flex flex-col gap-1 text-sky-500 font-bold"
          href={`/channels/${channel_id}`}
        >
          {channel_title}
          <span className="block text-xs font-normal text-gray-500">
            {subscribers} Subscribers
          </span>
        </Link>
      </div>
      {SubscribedBtnContent}
      {LikeContent}
    </div>
  );
};

export default VideoChannelInfo;
