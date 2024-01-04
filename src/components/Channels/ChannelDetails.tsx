"use client";
import { useState } from "react";
import Button from "../UI/Button";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import VideoItem from "../Videos/VideoItem";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoadMoreVideos from "../Videos/LoadMoreVideos";
import LoadMoreChannelVideos from "./LoadMoreChannelVideos";
import Subscribe from "../Videos/Subscribe";

type PropTypes = {
  id: number;
  user_id: number;
  title: string;
  cover: string;
  logo: string;
  description: string;
  total_subscriber: number;
  total_videos: number;
  videos: VideoType[];
  hasNextPage: boolean;
  is_subscribed: boolean;
};

const ChannelDetails = ({
  id,
  cover,
  title,
  logo,
  description,
  total_subscriber,
  total_videos,
  hasNextPage,
  videos,
  user_id,
  is_subscribed,
}: PropTypes) => {
  const searchParams = useSearchParams();
  const [totalSubscriber, setTotalSubscriber] = useState(
    total_subscriber ? total_subscriber : 0
  );
  const [isAbout, setIsAbout] = useState(
    searchParams.get("about") ? true : false
  );

  const { data: session } = useSession();

  const activeAboutBtnCls = isAbout
    ? "bg-slate-300 text-sm text-black/70 border-0 px-4 py-3"
    : "px-4 py-3 bg-slate-500 text-sm text-black/70 border-0 text-white";
  const activeVideoBtnCls = isAbout
    ? "bg-slate-500 text-sm text-black/70 border-0 text-white px-4 py-3"
    : "bg-slate-300 text-sm text-black/70 border-0 px-4 py-3";

  const handleSubscribe = (subType: number) => {
    if (subType === 1) {
      setTotalSubscriber((prev) => prev + 1);
    } else {
      setTotalSubscriber((prev) => {
        if (prev > 0) return prev - 1;
        return 0;
      });
    }
  };

  let authorBtn;

  if (
    (session?.user.id === user_id && session?.user.user_role === "author") ||
    session?.user.user_role === "admin"
  ) {
    authorBtn = (
      <div className="flex flex-row justify-between items-center gap-2">
        <Link
          className="flex items-center w-fit my-3 bg-violet-950 text-white hover:bg-violet-700 active:bg-violet-950 px-4 py-2 rounded-sm"
          href={`/channels`}
        >
          <span className="pr-2 text-xl font-bold">&#9998;</span>Manage Channel
        </Link>
      <Link
        className="flex items-center w-fit my-3 bg-violet-950 text-white hover:bg-violet-700 active:bg-violet-950 px-4 py-2 rounded-sm"
        href="/dashboard/upload-video"
      >
        <span className="pr-2 text-xl font-bold">&#43;</span>Upload Video
      </Link>
      </div>

    );
  }

  let videoContent = null;
  if (videos.length > 0) {
    videoContent = videos.map((video: VideoType) => {
      return <VideoItem key={video.id} video={video} />;
    });
  } else {
    videoContent = (
      <p className="w-full col-span-full flex flex-col justify-center items-center p-4 bg-red-200 text-red-500 rounded-lg mx-auto text-center gap-3">
        <span className="font-bold py-2">
          No Videos found! The author is not upload any video yet!
        </span>
      </p>
    );
  }

  return (
    <>
      <div className="bg-slate-100 w-full h-[200px] rounded-xl">
        <img
          className="w-full h-full object-cover rounded-xl"
          src={cover}
          alt={title}
          width={"100%"}
          height={"200px"}
        />
      </div>
      <div className="flex flex-col justify-center items-stretch sm:flex-row sm:items-center gap-3">
        <div className="flex flex-row gap-3 items-center">
        <div className="flex-shrink-0 w-[72px] h-[72px] bg-black/10 rounded-full overflow-hidden relative">
          <Image
            className="rounded-full p-[2px] border border-violet-950"
            src={logo}
            alt={title}
            fill={true}
            sizes="72px"
          />
        </div>
        <div className="w-fit">
          <h1 className="text-xl mb-1 font-bold text-violet-800">{title}</h1>
          <span className="block text-xs font-normal text-gray-500 text-center mb-1">
            {totalSubscriber} subscribers
          </span>
          <Subscribe
            channel_id={id}
            is_subscribed={is_subscribed}
            onHandleSubscribed={handleSubscribe}
          />
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-between rounded-3xl bg-slate-300 w-full sm:w-[250px] max-w-[100%] ms-auto  text-black">
          <button
            type="button"
            className={`${activeAboutBtnCls} rounded-[20px] disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={() => setIsAbout((prev) => !prev)}
            disabled={isAbout}
          >
            About
          </button>
          <button
            type="button"
            className={`${activeVideoBtnCls} rounded-[20px] disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={() => setIsAbout((prev) => !prev)}
            disabled={!isAbout}
          >
            Videos
          </button>
        </div>
      </div>
      {authorBtn}
      {!isAbout ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 mt-4 min-h-[500px]">
          {videoContent}
          <LoadMoreChannelVideos has_next_page={hasNextPage} id={id} />
        </ul>
      ) : (
        <p className="mt-4 min-h-[500px]">{description}</p>
      )}
    </>
  );
};

export default ChannelDetails;
