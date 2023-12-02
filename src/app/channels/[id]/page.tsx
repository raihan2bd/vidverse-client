import Button from "@/components/UI/Button";
import PageNotFound from "@/components/UI/PageNotFound";
import getSingleChannel from "@/lib/getSingleChannel";

type PropsType = {
  params: {
    id: string;
  };
};

const Channel = async ({ params }: PropsType) => {
  const channelId = parseInt(params.id);
  if (isNaN(channelId)) return <PageNotFound />;

  const channel = await getSingleChannel(channelId);
  return (
    <article className="flex flex-col gap-2 justify-center item center bg-white p-4">
      <div className="bg-slate-100 w-full h-[200px] rounded-xl">
        <img
          className="w-full h-full object-cover rounded-xl"
          src={channel.banner}
          alt={channel.title}
          width={"100%"}
          height={"200px"}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <img
          className="rounded-full border border-violet-800 p-[3px]"
          src={channel.logo}
          alt=""
          width={42}
          height={42}
        />
        <div className="">
          <h1 className="text-2xl font-bold text-violet-800">
            {channel.title}
          </h1>
          <span className="block text-xs font-normal text-gray-500">
            1M Subscribers
          </span>
          <Button
            type="button"
            btnClass="bg-red-600 text-sm p-2 rounded-2xl text-white border-0"
          >
            Subscribe
          </Button>
          <p className="text-sm font-normal text-gray-500">
            {channel.description}
          </p>
        </div>
      </div>

    {/* Videos by channels */}
    {/* Todo: display channel's video */}
    </article>
  );
};

export default Channel;
