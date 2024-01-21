"use client";

import Link from "next/link";
import noThumb from "../../../public/images/default-thumb.jpg";
import Image from "next/image";

interface VideoItemProps {
  video: VideoType;
}

const VideoItem = ({ video }: VideoItemProps) => {
  return (
    <li className="w-[100%] max-w-[100%] shrink-1 bg-gradient-to-t from-[#BEB8E7] to-purple-white  p-2 flex flex-col justify-between overflow-hidden">
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
        <h4 className="text-custom-blue-400 text-sm font-bold pt-2">
          {video.title.length > 70
            ? `${video.title.substring(0, 70)}...`
            : video.title}
        </h4>
      </Link>
      <div className="text-xs text-slate-700 flex gap-2 pt-1 items-center">
        <Link
          className="flex justify-between gap-3 items-center"
          href={`/channels/${video.channel_id}`}
        >
          <div className="relative w-[30px] text-custom-blue-600 font-semibold h-[30px] rounded-full">
            <Image
              src={
                video.channel_logo && video.channel_logo !== ''
                  ? video.channel_logo.toString()
                  : noThumb.src
              }
              alt={video.channel_title}
              fill={true}
              className="rounded-full"
              sizes="24px"
            />
          </div>{' '}
        </Link>
        <div className="flex flex-col">
          <div className="flex font-bold justify-between">
            <span className="">{`${video.views}K views`}</span>
            <span>{video.channel_title}</span>
          </div>
          <div className="text-xs text-custom-blue-500">
            <p>
              Container house <span> ~ 2 hours ago</span>
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default VideoItem;
