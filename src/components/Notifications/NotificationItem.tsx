import Link from "next/link";

type PropsTypes = {
  title: string;
  link: string;
  onDismiss: () => void;
}

const NotificationItem = ({link, title, onDismiss}:PropsTypes) => {
  return (<li className="w-full" onClick={onDismiss}>
    <Link className="w-full block bg-white text-violet-950 p-2 border-0 border-b-2" href={link}>{title}</Link>
  </li>)
}

export default NotificationItem;