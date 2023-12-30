import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getAllChannels from "@/lib/getAllChannels";
import { redirect } from "next/navigation";
import Link from "next/link";


const Channels = async() => {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    redirect('/login?callback=/channels')
  }

  if (session.user.user_role !== 'admin') {
    if (session.user.user_role !== 'author') {
      redirect('/contact-us?req_for=author&callback=/channels')
    }
  }

  const {channels} = await getAllChannels(session.token);

  let channelsContent;
  if (channels.length <= 0) {
    channelsContent = <p className="p-4 bg-red-300 text-red-500 w-[767px] max-w-full">
      <span className="font-bold">No channels found!</span>
      <br />
      Please create a <Link className="m-2 bg-violet-950 text-white hover:bg-violet-700 active:bg-violet-950 px-4 py-2 rounded-sm" href="/dashboard/new-channel">New Channel</Link> first!
    </p>
  } else {
    channelsContent = channels.map((channel: any) => (
      <div className="flex justify-between items-center p-4 bg-violet-900 text-white w-[767px] max-w-full" key={channel.id}>
        <p className="font-bold">{channel.title}</p>
        <Link className="m-2 bg-violet-950 text-white hover:bg-violet-700 active:bg-violet-950 px-4 py-2 rounded-sm" href={`/dashboard/new-channel?edit=${channel.id}`}>Edit</Link>
      </div>
    ))
  
  }

  return (
    <div>
      <h1 className="text-2xl text-center font-black text-violet-950 my-4">Channels</h1>
      {channelsContent}
    </div>
  )

}

export default Channels;