import getAllVideos from "@/lib/getAllVideos";
import VideoItem from "@/components/Videos/VideoItem";
import LoadMoreVideos from "@/components/Videos/LoadMoreVideos";

const Videos = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const searchQuery = searchParams?.search || "";
  const { videos, has_next_page} = await getAllVideos(1, Array.isArray(searchQuery) ? searchQuery.join(' ') : searchQuery);
  
  const videosContent = videos.map((video: VideoType) => {
    return <VideoItem key={video.id} video={video} />
  });

  return (
    <div className="p-4">
      <ul className="list-none flex gap-4 flex-wrap w-fit justify-between">
        {videosContent}
        <LoadMoreVideos has_next_page={has_next_page} searchQuery={searchQuery} />
      </ul>
    </div>
  );
}

export default Videos;
