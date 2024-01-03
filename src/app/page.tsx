import CustomError from "@/components/UI/CustomError";
import LoadMoreVideos from "@/components/Videos/LoadMoreVideos";
import VideoItem from "@/components/Videos/VideoItem";
import getAllVideos from "@/lib/getAllVideos";

const Home = async () => {
  let pageData: any = null;
  try {
    const res = await getAllVideos(1, '');
    pageData = res;
  } catch (error: any) {
    const errMsg =
      error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : error.message
        ? error.message
        : "Something went wrong";
    return <CustomError message={errMsg} disableActionBtn={true} />;
  }

  if (!pageData) {
    return <CustomError disableActionBtn={true} />;
  }

  if (pageData.videos.length <= 0) {
    return (
      <CustomError
        title="No videos found"
        message="No videos found for this page yet"
        disableActionBtn={true}
      />
    );
  }

  const VideoListContent = pageData.videos.map((video: any) => {
    return (
      <VideoItem key={video.id} video={video} />
    )
  });

  return (
    <section className="p-4">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {VideoListContent}
        <LoadMoreVideos has_next_page={pageData.has_next_page} searchQuery="" />
      </ul>
    </section>
  );
};

export default Home;
