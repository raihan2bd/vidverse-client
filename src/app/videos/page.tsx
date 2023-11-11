import getAllVideos from "@/lib/getAllVideos";
import VideoItem from "@/components/VideoItem/VideoItem";

const Videos = async () => {
  const videos = await getAllVideos();
  
  const videosContent = videos.map((video: VideoType) => {
    return <VideoItem key={video.id} video={video} />
  });

  return (
    <div>
      <h1>Videos</h1>
      <ul>
        {videosContent}
      </ul>
    </div>
  );
}

export default Videos;
