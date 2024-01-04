import getSingleVideo from "@/lib/getSingleVideo";
import RelatedVideos from "@/components/Videos/RelatedVideos";
import CommentList from "@/components/Videos/Comments/CommentList";
import PageNotFound from "@/components/UI/PageNotFound";
import { getServerSession,  } from "next-auth/next"
import {authOptions} from '../../api/auth/[...nextauth]/route'
import ResizeText from "@/components/Videos/ResizeText";
import VideoAction from "@/components/Videos/VideoActions";
import VideoChannelInfo from "@/components/Videos/VideoChannelInfo";

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

        <VideoChannelInfo channel_id={video.channel.id} channel_title={video.channel.title} channel_logo={video.channel.logo} total_subscriber={video.channel.subscriptions} is_subscribed={video.channel.is_subscribed} video_id={video.id} likes={video.likes} is_liked={video.is_liked} />
        
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
