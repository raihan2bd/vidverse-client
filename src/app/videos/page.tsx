import getAllVideos from "@/lib/getAllVideos";
import VideoItem from "@/components/VideoItem/VideoItem";

const Videos = async () => {
  const videos = await getAllVideos();
  
  const videosContent = videos.map((video: VideoType) => {
    return <VideoItem key={video.id} video={video} />
  });

  return (
    <div className="p-4">
      <ul className="list-none flex gap-4 flex-wrap w-fit mx-auto">
        {videosContent}
      </ul>
    </div>
  );
}

export default Videos;
