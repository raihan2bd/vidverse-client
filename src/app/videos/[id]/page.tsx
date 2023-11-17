import PageNotFound from "@/components/UI/PageNotFound";
import getSingleVideo from "@/lib/getSingleVideo";

type Props = {
  params: {
    id: string;
  };
};

const Video = async ({ params: { id } }: Props) => {
  const videoId = parseInt(id);
  if (isNaN(videoId)) return <PageNotFound />;

  const video = await getSingleVideo(videoId);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6 justify-between">
      <article className="flex-shrink flex-grow w-[100vw] md:w-[33%] max-w-[100%] flex flex-col gap-2 bg-white rounded-xl">
        <video
          className="max-w-[100%] w-full overflow-hidden"
          src={video.vid_src}
          controls
        />
        <h2 className="text-md font-bold text-violet-800 p-4">
          {video.title}
        </h2>
        <p>{video.description}</p>
      </article>
      <aside className="flex-auto flex-shrink-1 max-w-[100%]">
        <h3>Related Videos</h3>
        <ul>
          <li>Video 1</li>
          <li>Video 2</li>
          <li>Video 3</li>
        </ul>
      </aside>
    </div>
  );
};

export default Video;
