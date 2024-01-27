"use client";

import Link from "next/link";
import { ImHome, ImInfo } from "react-icons/im";
import { FaFilm } from "react-icons/fa6";
import { FaHeadphones, FaFolderPlus } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { FaPenToSquare, FaThumbsUp, FaClockRotateLeft, FaClock, FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { SiYoutubestudio } from "react-icons/si";
import { IoMdMail, IoIosSettings } from "react-icons/io";


import { useMemo, useState } from "react";
import { signOut } from "next-auth/react";

import shortsIcon from "../../../public/images/shorts-icon.svg";
import Image from "next/image";

interface PropTypes {
  sidebarClasses: string;
  onHideSidebar: () => void;
  user_id: number | undefined;
  user_role: string | undefined;
}

const Sidebar = ({
  sidebarClasses,
  onHideSidebar,
  user_id,
  user_role,
}: PropTypes) => {
  const [showMore, setShowMore] = useState(false)
  const year = new Date().getFullYear().toString();

  const navLinksCls =
    "flex gap-2 px-4 py-2 font-bold items-center hover:bg-custom-violet-300 hover:ps-8 transition-all duration-200 ease-in-out active:bg-white/10 md:active:bg-black/20 rounded-lg";

  return (
    <aside
      className={`${sidebarClasses} bg-custom-violet-500/30 backdrop-blur-md no-scrollbar overflow-hidden z-30`}
    >
      <span
        className="sm:hidden absolute text-xl z-[4] right-[1.5rem] bg-red-500 text-white p-1 rounded-sm top-[10rem] cursor-pointer"
        onClick={onHideSidebar}
      >
        <MdCancel />
      </span>

      <nav className="pt-20 md:pt-2 min-h-full w-[80%] md:w-full max-w-[100%] bg-custom-violet-500 absolute z-[2] overflow-y-scroll">
        <ul className="list-none flex flex-col gap-[2px] text-white px-4 overflow-y-scroll">
          <li onClick={onHideSidebar}>
            <Link href="/" className={navLinksCls}>
              <span>
                <ImHome />
              </span>
              Home
            </Link>
          </li>
          <li onClick={onHideSidebar}>
            <Link href="/shorts" className={navLinksCls}>
              <span>
                <Image src={shortsIcon} alt="short" width={20} height={20} />
              </span>
              Shorts
            </Link>
          </li>
          <li onClick={onHideSidebar}>
            <Link href="/videos" className={navLinksCls}>
              <span>
                <FaFilm />
              </span>
              Videos
            </Link>
          </li>
          <div className="py-2"></div>
          <li onClick={onHideSidebar}>
            <Link href="/history" className={navLinksCls}>
              <span>
              <FaClockRotateLeft />
              </span>
              History
            </Link>
          </li>
          <li onClick={onHideSidebar}>
            <Link href="/watch-later" className={navLinksCls}>
              <span>
              <FaClock />
              </span>
              Watch Later
            </Link>
          </li>
          <li onClick={onHideSidebar}>
            <Link href="/liked-videos" className={navLinksCls}>
              <span>
                <FaThumbsUp />
              </span>
              Liked Videos
            </Link>
          </li>
          <li onClick={onHideSidebar}>
            <Link href="/channels" className={navLinksCls}>
              <span>
                <SiYoutubestudio />
              </span>
              Your Channels
            </Link>
          </li>
          <li>
            <button className={navLinksCls} onClick={() => setShowMore((prev) => !prev)} style={{width: '100%'}}>
              <span>
                {showMore ? <FaAngleUp /> : <FaAngleDown />}
              </span>
              Show more
            </button>
          </li>
          {showMore && <p className="bg-custom-purple-400 p-2 rounded text-xs">This feature is under construction</p>}

          <li className="mt-8 flex flex-row gap-4 justify-center items-center text-white text-xl" onClick={onHideSidebar}>
            <Link href="/about">
              <ImInfo />
            </Link>
            <Link href="/contact-us">
              <FaHeadphones />
            </Link>
            <Link href="/">
              <IoIosSettings />
            </Link>
          </li>
        </ul>
      <footer className="fixed z-[1] bottom-0 left-0 bg-custom-violet-500 w-[80%] md:w-full max-w-full overflow-hidden text-sm text-white border-0 border-t p-2 text-center">
        Copyright &copy; {String(year)} Vidverse&#174;. All rights reserved.
      </footer>
      </nav>
    </aside>
  );
};

export default Sidebar;
