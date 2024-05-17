import getSingleChannel from "@/lib/getSingleChannel";
import CreateORUpdateChannelForm from "@/components/Channels/CreateORUpdateChannelForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type PropsType = {
  searchParams: { [key: string]: string | string[] | undefined },
};

const Page = async ({ searchParams }: PropsType) => {
  const channelId = parseInt(searchParams["edit"] as string)
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.token) {
    return redirect(
      `/login?callback=/dashboard/new-channel${
        channelId ? `?edit=${channelId}` : ""
      }}`
    );
  } else if (session.user.user_role !== "author") {
    if (session.user.user_role !== "admin") {
      return redirect(
        `/contact-us?req_for=author&callback=/dashboard/new-channel${
          channelId ? `?edit=${channelId}` : ""
        }`
      );
    }
  }
  if (!isNaN(channelId)) {
    const channel = await getSingleChannel(channelId, session.token);

    return (
      <div className="w-full flex justify-center p-4 bg-black/30">
        <CreateORUpdateChannelForm
          edit={true}
          chanTitle={channel.title}
          chanDescription={channel.description}
          chanId={channel.id}
          chanLogo={channel.logo}
        />
      </div>
    );
  } else {
    return (
      <div className="w-full flex justify-center p-4 bg-black/30">
        <CreateORUpdateChannelForm />
      </div>
    );
  }
};

export default Page;
