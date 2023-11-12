import Link from "next/link";
import noThumb from "../../../public/images/default-thumb.jpg";

interface VideoItemProps {
  video: VideoType;
}

const VideoItem = ({ video }: VideoItemProps) => {
  const title = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam iusto hic modi, debitis impedit quaerat maiores quas sunt eligendi esse necessitatibus, magni velit aliquid expedita amet minus? Doloribus, rem tenetur?"
  return (
    <li className="w-[100%] sm:w-[48%] lg:w-[32%] max-w-[100%] shrink-1 rounded bg-white p-2 shadow-md flex flex-col justify-between gap-2">
      <div>
        <img
          src={video.thumb}
          alt={video.title}
          width={640}
          height={360}
          className="w-[full]"
        />
      </div>
      <Link
        href={`/videos/${video.id}`}
        className="text-sky-700 text-sm font-bold p-2"
      >
        {
          video.title.length > 70 ? `${video.title.substring(0, 70)}...` : video.title
        }

      </Link>
      <p className="text-xs text-slate-700 flex justify-between items-center p-2">
        <Link
          className="flex justify-between gap-3 items-center"
          href={`/channel/${video.channel_id}`}
        >
            <img
              src={
                video.channel_logo && video.channel_logo !== ""
                  ? video.channel_logo.toString()
                  : noThumb.src
              }
              alt={video.channel_title}
              width={24}
              height={24}
              className="rounded-full"
            />{" "}
            {video.channel_title}
          </Link>
        <span className="text-gray-500">{`${video.views} views`}</span>
      </p>
    </li>
  );
};

export default VideoItem;
