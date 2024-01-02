import Button from "@/components/UI/Button";
import PageNotFound from "@/components/UI/PageNotFound";
import getSingleChannel from "@/lib/getSingleChannel";
import Image from "next/image";
import getVideosByChannelID from "@/lib/getVideosByChannelID";
import ChannelDetails from "@/components/Channels/ChannelDetails";
import Videos from "@/app/videos/page";

type PropsType = {
  params: {
    id: string;
  };
};

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Channel = async ({ params }: PropsType) => {
  const channelId = parseInt(params.id);
  if (isNaN(channelId)) return <PageNotFound />;

  const session = await getServerSession(authOptions);

  try {
    const channel = await getSingleChannel(channelId, session?.token as string);
    console.log
  } catch(err: any) {
    console.log(err);
    return <PageNotFound />;
  }

  const channel = await getSingleChannel(channelId, session?.token as string);
  if (!channel) return <PageNotFound />;
  const response = await getVideosByChannelID(channelId, 1);
  return (
    <article className="flex flex-col gap-2 justify-center item center bg-white p-4">
      <ChannelDetails
        id={channel.id}
        user_id={channel.user_id}
        title={channel.title}
        cover={channel.cover}
        logo={channel.logo}
        description={channel.description}
        total_subscriber={channel.total_subscriber? channel.total_subscriber : 0}
        total_videos={channel.total_video? channel.total_video : 0}
        is_subscribed={channel.is_subscribed? channel.is_subscribed : false}
        videos={response.videos}
        hasNextPage={response.has_next_page}
      />
    </article>
  );
};

export default Channel;
