import getRelatedVideos from "@/lib/getRelatedVideos";
import Link from "next/link";

const RelatedVideos = async ({id}: {id: number}) => {
  const relatedVideos = await getRelatedVideos(id);
  return (
    <div className="w-[100%]">
      <h1>Related Videos</h1>
      <ul className="list-none flex flex-col gap-3">
        {relatedVideos.map((video: VideoType) => (
          <li key={video.id} className="flex gap-2 bg-white rounded-lg p-4">
            <Link href={`/videos/${video.id}`}>
              <img className="rounded-lg" src={video.thumb} alt="" width={120} height={90} />
              <div className="flex flex-col gap-1 flex-auto">
                <h4 className="text-md font-bold text-violet-800">{video.title}</h4>
                <p className="text-sm text-gray-500">{video.channel_title}</p>
                <p className="text-sm text-gray-500">{video.views} views</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedVideos;