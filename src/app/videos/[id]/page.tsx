import Link  from "next/link";

import getSingleVideo from "@/lib/getSingleVideo";
import RelatedVideos from "@/components/Videos/RelatedVideos";
import CommentList from "@/components/Videos/Comments/CommentList";
import Button from "@/components/UI/Button";
import PageNotFound from "@/components/UI/PageNotFound";
import defaultThumb from "../../../../public/images/default-thumb.jpg";
import { getServerSession,  } from "next-auth/next"
import {authOptions} from '../../api/auth/[...nextauth]/route'
import Subscribe from "@/components/Videos/Subscibe";
import Like from '@/components/Videos/Like'
import ResizeText from "@/components/Videos/ResizeText";
import VideoAction from "@/components/Videos/VideoActions";

type Props = {
  params: {
    id: string;
  };
};

const Video = async ({ params: { id } }: Props) => {
  const videoId = parseInt(id);
  if (isNaN(videoId)) return <PageNotFound />;

  const session = await getServerSession(authOptions)
  const token = session?.token || ""

  const video = await getSingleVideo(videoId, token);
  console.log(session?.user?.user_role === "admin" || (session?.user?.id === Number(video.channel.user_id) && session.user.user_role === 'author'))

  const adminContent = session && session.user && (session.user.user_role === "admin" || (session.user.id === Number(video.channel.user_id) && session.user.user_role === 'author')) ? (
    <VideoAction id={videoId} user_id={video.channel.user_id} />) : null

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6 justify-between">
      <article className="flex-shrink flex-grow w-[100vw] md:w-[33%] max-w-[100%] flex flex-col gap-2 bg-white rounded-xl">
        <video
          className="max-w-[100%] w-full overflow-hidden"
          src={video.vid_src}
          controls
        />
        <h2 className="text-md font-bold text-violet-800 px-4">
          {video.title}
        </h2>

        {adminContent}

        <div className="flex gap-2 items-center justify-between p-4 bg-slate-100">
          <div className="flex gap-3 items-center text-sm">
            <img className="rounded-full border border-violet-800 p-[3px]" src={defaultThumb.src} alt="" width={42} height={42} />
            <Link className="flex flex-col gap-1 text-sky-500 font-bold" href={`/channel/${video.channel.id}`}>{video.channel.title}
            <span className="block text-xs font-normal text-gray-500">{video.channel.subscriptions? video.channel.subscriptions: 0} Subscribers</span>
            </Link>
          </div>

          <Subscribe is_subscribed={video.channel.is_subscribed} channel_id={video.channel.id} />
          <Like is_liked={video.is_liked} likesCount={video.likes} video_id={video.id} />
          
        </div>
        
        <p className="max-w-[100%] text-gray-700 p-4" style={{
            overflowWrap: 'break-word',
            wordWrap: 'break-word',
            width: '100%'
          }}><ResizeText text={video.description} maxLen={150} /></p>

        <CommentList id={videoId} views={video.views} />
      </article>

      <aside className="md:ms-4 flex-auto flex-shrink-1 w-[100%] md:w-[280px] max-w-[100%]">
        <RelatedVideos id={videoId} />
      </aside>
    </div>
  );
};

export default Video;
