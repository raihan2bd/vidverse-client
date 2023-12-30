import Button from "@/components/UI/Button";
import PageNotFound from "@/components/UI/PageNotFound";
import getSingleChannel from "@/lib/getSingleChannel";
import Image from "next/image";

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
          src={channel.cover}
          alt={channel.title}
          width={"100%"}
          height={"200px"}
        />
      </div>
      <div className="flex flex-row items-center gap-3">
        <div className="flex-shrink-0 w-[72px] h-[72px] bg-black/10 rounded-full overflow-hidden relative"> 
        <Image
          className="rounded-full p-[2px] border border-violet-950"
          src={channel.logo}
          alt={channel.title}
          fill={true}
          sizes="72px"
        />
        </div>
        <div className="w-fit">
          <h1 className="text-xl mb-1 font-bold text-violet-800">
            {channel.title}
          </h1>
          <span className="block text-xs font-normal text-gray-500">
            {channel.total_subscriber && channel.total_subscriber}
          </span>
          <Button
            type="button"
            btnClass="bg-red-600 text-sm p-1 text-white border-0" style={{borderRadius: "20px"}}
          >
            Subscribe
          </Button>
        </div>
        </div>
      {/* channel description */}

      {/* Videos by channels */}
      {/* Todo: display channel's video */}
    </article>
  );
};

export default Channel;
