"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import AuthActionButtons from "../UI/AuthActionButtons";
import { BiMenu } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { BsArrowLeftShort } from "react-icons/bs";

import SearchForm from "../SearchForm/SearchForm";
import Notifications from "../Notifications/Notifications";
import { useSession } from "next-auth/react";
import ToastNotification from "../Notifications/ToastNotification";
import { RiVideoAddFill } from "react-icons/ri";

interface PropsTypes {
  showSideBar: boolean;
  onSetShowSideBar: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ onSetShowSideBar, showSideBar }: PropsTypes) => {
  const { data: session } = useSession();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const showSearchBarHandler = () => setShowSearchBar(true);
  const hideSearchBarHandler = () => setShowSearchBar(false);

  const showSidebarHandler = () => onSetShowSideBar(true);
  const hideSidebarHandler = () => onSetShowSideBar(false);
  const toggleSidebarHandler = () =>
    onSetShowSideBar((prevState) => !prevState);

  const hamburgerMenuClass = showSideBar
    ? "text-2xl text-red-400 font-black hidden md:block"
    : "text-2xl text-custom-blue-500 font-black hidden md:block";

  // Search bar
  let mobileSearchBarContent;

  if (!showSearchBar) {
    mobileSearchBarContent = (
      <div className="flex sm:hidden gap-2 items-center ms-auto">
        <button
          onClick={showSearchBarHandler}
          className="rounded-full h-full transform hover:translate-y-0 hover:translate-x-1"
        >
          <span className="text-3xl">
            <BiSearch />
          </span>
        </button>
      </div>
    );
  } else {
    mobileSearchBarContent = (
      <div className="left-0 px-6 fixed z-50 w-[100%] h-[5rem] bg-custom-violet-500 flex sm:hidden gap-2 items-center ms-auto justify-between shadow-lg">
        <button
          onClick={hideSearchBarHandler}
          className="h-fit p-2 bg-red-300 rounded-lg transform hover:translate-y-0 hover:translate-x-1"
        >
          <span className="text-2xl">
            <BsArrowLeftShort />
          </span>
        </button>
        <SearchForm onHideSearchBar={hideSearchBarHandler} />
      </div>
    );
  }

  const customSession = useMemo(() => {
    if (!session) return null;
    if (!session.user) return null;

    const { id, user_name, user_role, avatar } = session.user;
    return { id, user_name, user_role, avatar };
  }, [session]);

  const authNavigationContent = useMemo(() => {
    if (customSession && customSession.id) {
      return (
        <>
          {((session?.user.user_role === "admin") || (session?.user.user_role === "author")) && (
              <li className="hidden md:block">
                <Link
                  className="ms-1 rounded-full block text-2xl text-white hover:text-orange-300"
                  href="/dashboard/upload-video"
                >
                  <RiVideoAddFill />
                </Link>
              </li>
            )}
          <li className="relative p-2 flex justify-center items-center">
            <Notifications token={session?.token} />
          </li>
          <li>
            <AuthActionButtons session={customSession} />
          </li>
        </>
      );
    }

    return (
      <li>
        <AuthActionButtons session={null} />
      </li>
    );
  }, [customSession, session]);

  return (
    <header className="flex flex-row justify-between gap-2 p-4 md:px-6 bg-custom-violet-500 text-white items-center fixed w-[100%] h-[5rem] z-50">
      <div className="flex gap-2 items-center">
        <span className={hamburgerMenuClass} onClick={toggleSidebarHandler}>
          <BiMenu />
        </span>
        <Link
          href="/"
          className="text-2xl text-white font-bold border-2 border-white p-[2px] flex gap-[3px]"
        >
          <span className="bg-white text-custom-violet-500 p-[2px] font-poppins">
            VID
          </span>
          <span className="p-[2px]">VERSE</span>
        </Link>
      </div>
      {mobileSearchBarContent}
      <div className="hidden sm:flex gap-2 items-center">
        <SearchForm onHideSearchBar={hideSearchBarHandler} />
      </div>
      <nav>
        <ul className="flex flex-row gap-1 justify-center items-center">
          {authNavigationContent}
        </ul>
      </nav>
      <ToastNotification token={session?.token} />
    </header>
  );
};

export default Header;
