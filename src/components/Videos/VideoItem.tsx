"use client";
import Link from "next/link";
import noThumb from "../../../public/images/default-thumb.jpg";
import Image from "next/image";
import convertViews from "@/utils/convertViews";
import { convertTime } from "@/utils/convertTime";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import { useGlobalState } from "@/context/store";

interface VideoItemProps {
  video: VideoType;
  isSaved?: boolean;
}
const VideoItem = ({ video, isSaved = false }: VideoItemProps) => {
  const { data: session, status } = useSession();
  const [isMore, setIsMore] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setError, setSuccess } = useGlobalState();

  const onSave = async () => {
    if (status === "loading") return;
    if (!session) {
      router.push(`/login?callback=${pathname}`);
      return;
    }

    try {
      setLoading(true);
      if (!isSaved) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/watch_later`,
          {
            video_id: video.id,
          },
          {
            headers: {
              Authorization: `${session.token}`,
            },
          }
        );
        if (res.status === 201) {
          setSuccess("Video saved successfully");
        } else if (res.status === 401 || res.status === 403) {
          setError("Unauthorized");
          signOut();
          router.push(`/login?callback=${pathname}`);
        } else {
          setError("Failed to save video");
        }
      } else {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/watch_later/${video.id}`,
          {
            headers: {
              Authorization: `${session.token}`,
            },
          }
        );
        if (res.status === 204) {
          setSuccess("Video removed successfully");
          router.refresh();
        } else if (res.status === 401 || res.status === 403) {
          setError("Unauthorized");
          signOut();
          router.push(`/login?callback=${pathname}`);
        } else {
          setError("Failed to remove video");
        }
      }
    } catch {
      setError("Failed to save video");
    } finally {
      setIsMore(false);
      setLoading(false);
    }
  };

  return (
    <li className="w-[100%] max-w-[100%] shrink-1 bg-gradient-to-t from-[#BEB8E7] to-purple-white  p-2 flex flex-col justify-between overflow-hidden relative">
      {isMore && (
        <div className="absolute z-[2] top-[40px] left-1/2 -translate-x-1/2 w-fit max-w-[92%]">
          <ul className="list-none flex gap-4 bg-white p-2 rounded-md shadow-md items-center">
            <li>
              <button
                onClick={onSave}
                disabled={loading}
                type="button"
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 text-sm lg:text-base disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-800 min-w-[75px]"
              >
                {isSaved
                  ? loading
                    ? "Removing..."
                    : "Remove"
                  : loading
                  ? "Saving..."
                  : "Save"}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/videos/${video.id}`
                  );
                  setSuccess("Link copied to clipboard");
                }}
                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-700 text-sm lg:text-base"
              >
                Share
              </button>
            </li>
          </ul>
        </div>
      )}
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
        </Link>
        <div className="flex flex-col w-full justify-center">
          <div className="flex font-bold justify-between w-full items-center">
            <span>{video.channel_title}</span>
            <span className="ms-auto">{`${convertViews(
              video.views
            )} views`}</span>
          </div>
          <div className="text-xs text-custom-blue-500">
            <p className="">{convertTime(video.created_at)}</p>
          </div>
        </div>
      </div>

      <button
        className="text-white text-lg absolute z-[1] top-[2px] right-[0] hover:text-red-500 p-4"
        type="button"
        onClick={() => setIsMore((prev) => !prev)}
      >
        <BsThreeDotsVertical />
      </button>
    </li>
  );
};
export default VideoItem;
