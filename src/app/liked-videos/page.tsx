import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CustomError from "@/components/UI/CustomError";
import LoadMoreLikedVideos from "@/components/Videos/LoadMoreLikedVideos";
import VideoItem from "@/components/Videos/VideoItem";
import getAllLikedVideos from "@/lib/getAllLikedVideos";
import { errMsgWithStatus } from "@/utils/responseMsg";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


const LikedVideos = async() => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    }

  const token = session.token;

  try {
    const res = await getAllLikedVideos(token, 1);
    if (res.data.videos.length === 0) {
      return <CustomError message="You have not liked any videos yet" title="No Liked Videos"/>
    }

    const videosContent = res.data.videos.map((video: VideoType) => {
      return <VideoItem key={video.id} video={video} />
    });

    return (
      <div className="p-4">
        <h2 className="text-xl font-bold text-center my-3 text-slate-500">Liked Videos</h2>
      <ul className="list-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
        {videosContent}
        <LoadMoreLikedVideos token={token} has_next_page={res.data.has_next_page} />
      </ul>
    </div>
    )
    
  } catch (err: any) {
    const {status} = errMsgWithStatus(err);
    if (status === 401) {
      redirect("/login");
    }
    if (status === 404) {
      return <CustomError message="You have not liked any videos yet" title="No Liked Videos" />
    }

    return <CustomError message="Something went wrong! Please try again later" />
  }
  
}

export default LikedVideos;