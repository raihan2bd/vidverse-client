import VideoItem from "@/components/Videos/VideoItem";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import getAllSavedVideos from "@/lib/getAllSavedVideos";
import CustomError from "@/components/UI/CustomError";
import { errMsgWithStatus } from "@/utils/responseMsg";
import LoadMoreSavedVideos from "@/components/Videos/LoadMoreSavedVideos";

export const dynamic = 'force-dynamic'
export const revalidate = 0

type Props = {
  params: {
    id: string;
  };
};

const SavedVideos =  async ( {params: { id } }: Props) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    }

  const token = session.token;

  try {
    const res = await getAllSavedVideos(token, 1);
    console.log(res);
    if (res.videos.length === 0) {
      return <CustomError message="You have not saved any videos yet" title="No Save Videos"/>
    }

    const videosContent = res.videos.map((video: VideoType) => {
      return <VideoItem key={video.id} video={video} isSaved={true} />
    });

    return (
      <div className="p-4">
        <h2 className="text-xl font-bold text-center my-3 text-slate-500">Saved Videos</h2>
      <ul className="list-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
        {videosContent}
        <LoadMoreSavedVideos token={token} has_next_page={res.has_next_page} />
      </ul>
    </div>
    )
    
  } catch (err: any) {
    const {status} = errMsgWithStatus(err);
    if (status === 401) {
      redirect("/login");
    }
    if (status === 404) {
      return <CustomError message="You have not saved any videos yet" title="No Saved Videos" />
    }

    return <CustomError message="Something went wrong! Please try again later" />
  }
  
}

export default SavedVideos;