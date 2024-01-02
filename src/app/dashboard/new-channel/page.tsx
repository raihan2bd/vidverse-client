import getSingleChannel from "@/lib/getSingleChannel";
import CreateORUpdateChannelForm from "@/components/Channels/CreateORUpdateChannelForm";

type PropsType = {
  searchParams: { [key: string]: string | string[] | undefined },
};

const Page = async ({ searchParams }: PropsType) => {
  const channelId = parseInt(searchParams["edit"] as string)
  if (!isNaN(channelId)) {
    const channel = await getSingleChannel(channelId);

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
