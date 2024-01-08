import Link from "next/link";
import Image from "next/image";
import { convertTime } from "@/utils/convertTime";

type PropsTypes = {
  title: string;
  link: string;
  thumb?: string;
  sender_avatar?: string;
  createdAt: string;
  is_read?: boolean;
  onDismiss: () => void;
}

const NotificationItem = ({link, title, onDismiss, thumb, sender_avatar, createdAt, is_read}:PropsTypes) => {
  return (<li className="w-full relative list-none" onClick={onDismiss}>
    <Link className="w-full block bg-white/70 text-violet-950 p-2 hover:bg-violet-300/95 active:bg-white overflow-hidden transition-all duration-300 ease-in-out" href={link}>
      <div className="flex items-center justify-between">
        <div className="flex-shrink-0 rounded-full w-fit">
          <Image className="border border-white p-1 rounded-full" src={sender_avatar as string} width={24} height={24} alt={title} />
        </div>
          <p className="text-sm">{title}</p>
          <p className="text-gray-500 text-xs">{convertTime(createdAt)}</p>
          <div className="flex-shrink-0 relative w-fit">
            <Image className="" src={thumb as string} alt={title} width={32} height={32} />
          </div>
      </div>
    </Link>
      <span className={`absolute top-0 right-0 w-2 h-2 rounded-full ${is_read ? "bg-gray-500 hidden" : "bg-red-500"}`}></span>
  </li>)
}

export default NotificationItem;