import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { FaYoutube } from "react-icons/fa";
import shortIcon from "../../../public/images/shorts-icon.svg";
import Image from "next/image";

interface PropsTypes {
  showSideBar: boolean;
  onSetShowSideBar: Dispatch<SetStateAction<boolean>>;
}

const MobileTab = ({ showSideBar, onSetShowSideBar }: PropsTypes) => {
  const { data: session } = useSession();
  return (
    <nav className="flex items-center justify-center md:hidden bg-custom-violet-500 fixed z-10 bottom-0 left-0 right-0 w-full">
      <ul className="flex flex-row gap-4 list-none items-center justify-between text-white text-3xl w-full px-4 py-3">
        <li>
          <Link href="/">
            <IoHomeSharp />
          </Link>
        </li>
        <li>
          <Link href="/shorts">
            <Image width={30} height={30} alt="short" src={shortIcon} />
          </Link>
        </li>
        <li>
          <Link
            href={
              session?.user.user_role
                ? session.user.user_role === "admin" ||
                  session.user.user_role === "author"
                  ? "/dashboard/upload-video"
                  : "/contact-us?req_for=author"
                : "/login?callback=/dashboard/upload-video"
            }
          >
            <FaCirclePlus />
          </Link>
        </li>
        <li>
          <Link href="/videos">
            <FaYoutube />
          </Link>
        </li>
        <li>
          <button
            className={showSideBar ? "text-yellow-500" : ""}
            onClick={() => onSetShowSideBar((prev) => !prev)}
          >
            <MdOutlineVideoLibrary />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default MobileTab;
