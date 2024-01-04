"use client";

import Link from "next/link";
import noThumb from "../../../public/images/default-thumb.jpg";
import Image from "next/image";

interface VideoItemProps {
  video: VideoType;
}

const VideoItem = ({ video }: VideoItemProps) => {
  return (
    <li className="w-[100%] max-w-[100%] shrink-1 rounded bg-white p-2 shadow-md flex flex-col justify-between gap-2 overflow-hidden">
      <Link href={`/videos/${video.id}`} className="block">
        <div className="relative w-full h-[240px] sm:h-[200px]">
          <Image
            src={video.thumb}
            alt={video.title}
            sizes="630px"
            fill={true}
            className="z-[1]"
            priority={true}
          />
        </div>
        <h4 className="text-sky-700 text-sm font-bold p-2">
          {video.title.length > 70
            ? `${video.title.substring(0, 70)}...`
            : video.title}
        </h4>
      </Link>
      <div className="text-xs text-slate-700 flex justify-between items-center p-2">
        <Link
          className="flex justify-between gap-3 items-center"
          href={`/channels/${video.channel_id}`}
        >
          <div className="relative w-[24px] h-[24px] rounded-full">
            <Image
              src={
                video.channel_logo && video.channel_logo !== ""
                  ? video.channel_logo.toString()
                  : noThumb.src
              }
              alt={video.channel_title}
              fill={true}
              className="rounded-full"
              sizes="24px"
            />
          </div>{" "}
          {video.channel_title}
        </Link>
        <span className="text-gray-500">{`${video.views} views`}</span>
      </div>
    </li>
  );
};

export default VideoItem;
