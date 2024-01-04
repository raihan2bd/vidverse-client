"use client";

import Link from "next/link";
import { ImHome, ImInfo } from "react-icons/im";
import { FaFilm } from "react-icons/fa6";
import { FaHeadphones, FaFolderPlus } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { FaPenToSquare, FaThumbsUp } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { SiYoutubestudio } from "react-icons/si";
import { IoMdMail } from "react-icons/io";

import { useMemo } from "react";
import { signOut } from "next-auth/react";

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
  const year = new Date().getFullYear().toString();

  const navLinksCls =
    "flex gap-2 px-4 py-3 font-bold bg-white/20 md:bg-black/10 items-center hover:text-orange-700 hover:bg-white/10 md:hover:bg-black/20 hover:ps-8 transition-all duration-200 ease-in-out active:bg-white/10 md:active:bg-black/20";

  const authLinksCls =
    "w-full flex gap-2 px-4 py-3 font-bold bg-slate-800 text-orange-300 items-center hover:text-orange-700 hover:bg-white/10 md:hover:bg-black/20 hover:ps-8 transition-all duration-200 ease-in-out active:bg-white/10 md:active:bg-black/20";

  const authBtns = useMemo(() => {
    if (user_id) {
      return (
        <li className="mt-16">
          <button
            className={authLinksCls}
            onClick={() => {
              signOut();
              onHideSidebar();
            }}
          >
            <span>
              <FiLogIn />
            </span>
            Logout
          </button>
        </li>
      );
    } else {
      return (
        <>
          <li className="mt-16" onClick={onHideSidebar}>
            <Link href="/login" className={authLinksCls}>
              <span>
                <FiLogIn />
              </span>
              Login
            </Link>
          </li>
          <li onClick={onHideSidebar}>
            <Link href="/register" className={authLinksCls}>
              <span>
                <FaPenToSquare />
              </span>
              Register
            </Link>
          </li>
        </>
      );
    }
  }, [user_id]);

  const roleBasedLinks = useMemo(() => {
    if (user_role === "admin" || (user_role === "author" && user_id)) {
      return (
        <>
          <li onClick={onHideSidebar}>
            <Link href="/dashboard/upload-video" className={navLinksCls}>
              <span>
                <FaFolderPlus />
              </span>
              New Video
            </Link>
          </li>
          <li onClick={onHideSidebar}>
            <Link href="/channels" className={navLinksCls}>
              <span>
                <SiYoutubestudio />
              </span>
              Channels
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li onClick={onHideSidebar}>
            <Link href="/liked-videos" className={navLinksCls}>
              <span>
                <FaThumbsUp />
              </span>
              Liked Videos
            </Link>
          </li>
          <li onClick={onHideSidebar}>
            <Link href="/contact-us?req_for=author" className={navLinksCls}>
              <span>
                <IoMdMail />
              </span>
              Request for Author
            </Link>
          </li>
        </>
      );
    }
  }, [user_role, user_id]);

  return (
    <aside
      className={`${sidebarClasses} bg-black/70 md:bg-white backdrop-blur-md no-scrollbar overflow-hidden`}
    >
      <span
        className="sm:hidden absolute text-xl z-[4] right-[1.5rem] bg-red-500 text-white p-1 rounded-sm top-[10rem] cursor-pointer"
        onClick={onHideSidebar}
      >
        <MdCancel />
      </span>

      <nav className="pt-20 md:pt-4 h-full w-[80%] md:w-full max-w-[100%] bg-white/60 absolute z-[2] overflow-y-auto">
        <ul className="list-none flex flex-col gap-[3px] text-violet-950">
          <li onClick={onHideSidebar}>
            <Link href="/" className={navLinksCls}>
              <span>
                <ImHome />
              </span>
              Home
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
          {roleBasedLinks}
          <li onClick={onHideSidebar}>
            <Link href="/contact-us" className={navLinksCls}>
              <span>
                <FaHeadphones />
              </span>
              Contact Us
            </Link>
          </li>
          <li onClick={onHideSidebar}>
            <Link href="/about" className={navLinksCls}>
              <span>
                <ImInfo />
              </span>
              About
            </Link>
          </li>
          {authBtns}
        </ul>
      </nav>
      <footer className="bg-white/70 flex justify-center flex-wrap items-center text-black text-center fixed z-[2] bottom-0  h-[3rem]  w-[80%] md:w-full max-w-full  md:bg-black/10 overflow-hidden text-sm">
        Copyright &copy; {String(year)} Vidverse&#174;. All rights reserved.
      </footer>
    </aside>
  );
};

export default Sidebar;
