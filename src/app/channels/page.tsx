import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getAllChannels from "@/lib/getAllChannels";
import { redirect } from "next/navigation";
import Link from "next/link";
import ChannelItem from "@/components/Channels/ChannelItem";

const Channels = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/login?callback=/channels");
  }

  if (session.user.user_role !== "admin") {
    if (session.user.user_role !== "author") {
      redirect("/contact-us?req_for=author&callback=/channels");
    }
  }

  const { channels } = await getAllChannels(session.token);
  console.log(channels);

  let channelsContent;
  if (channels.length <= 0) {
    channelsContent = (
      <p className="p-4 bg-red-200 text-red-500 w-[580px] max-w-full rounded-lg mx-auto text-center flex flex-col gap-3">
        <span className="font-bold py-2">
          No channels found! Please create a new one!{" "}
          <Link
            className="block w-fit mx-auto mt-3 bg-violet-950 text-white hover:bg-violet-700 active:bg-violet-950 px-4 py-2 rounded-sm"
            href="/dashboard/new-channel"
          >
            New Channel
          </Link>
        </span>
      </p>
    );
  } else {
    channelsContent = channels.map((channel: any) => (
      <ChannelItem
        key={channel.id}
        title={channel.title}
        id={channel.id}
        cover={channel.cover}
        logo={channel.logo}
        totalVideos={channel.total_videos}
        totalSubscriber={0}
        user_id={session.user.id}
        token={session.token}
        user_role={session.user.user_role}
      />
    ));
  }

  return (
    <section className="p-4">
      <h1 className="text-2xl text-center font-black text-violet-950 my-4">
        Channels
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto list-none">
        {channelsContent}
      </ul>
    </section>
  );
};

export default Channels;
